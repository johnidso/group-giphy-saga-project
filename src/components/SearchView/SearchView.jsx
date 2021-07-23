import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import '../SearchView/SearchView.css';

function SearchView() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [ searchText, setSearchText ] = useState('search');
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

    // On component load search for 'search'
    // TODO: Uncomment when the app is live
    // useEffect(() => {
    //     handleSubmit();
    // }, []);

    return (
        <div className="search-body">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="searchField"
                    value={searchText}
                    onChange={handleChange} 
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            <img src={currentSearch} height="200px" className="search-image"/>
            <div className="search-button-container">
                <button
                    onClick={() => {favoriteHandler(currentSearch)}}
                    className="search-button"
                >
                    Add to Favorites
                </button>
                <button onClick={goToFavorites} className="search-button">
                    View Favorites
                </button>
            </div>
        </div>
    );
}

export default SearchView;