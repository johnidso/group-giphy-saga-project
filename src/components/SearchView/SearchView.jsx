import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchView() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [ searchText, setSearchText ] = useState('');
    const currentSearch = useSelector(store => store.currentSearch);
    
    const handleChange = (event) => {
        setSearchText(event.target.value);        
    }

    const handleSubmit = () => {
        event.preventDefault();
        // Validate Input
        if (searchText === '') {
            alert('Please enter a search input.') // TODO: replace this with an update to the DOM 
            return;
        }

        console.log('This is when we dispatch to saga'); // test
        // searchText here becomes the key and the value
        dispatch({ type: 'SEARCH_GIPHY', payload: {searchText}});
        setSearchText('');
    }

    const favoriteHandler = (gifUrl) => {
        console.log('In favoriteHandler'); // test
        console.log('Id, name, URL', gifUrl); // test


        // dispatch favorite to Saga
        dispatch({ type: 'ADD_FAVORITE', payload: { url: gifUrl}});
    }

    const goToFavorites = () => {
        history.push('/favorites')
    }

    return (
        <div>
            <p>SearchView content</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="searchField"
                    value={searchText}
                    onChange={handleChange} 
                />
                <button type="submit">
                    Search
                </button>
            </form>
            <p>display searched gif here:</p>
                    <img src={currentSearch} height="200px"/>
                    <br />
                    <button
                        onClick={() => {favoriteHandler(currentSearch)}}
                    >
                        Add to Favorites
                    </button>
                    <br />
                    <button onClick={goToFavorites}>
                        View Favorites
                    </button>
        </div>
    );
}

export default SearchView;