import { useState } from "react";
import { useDispatch } from "react-redux";

function SearchView() {
    
    const dispatch = useDispatch();
    const [ searchText, setSearchText ] = useState('');
    
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

        dispatch({ type: 'SEARCH_GIPHY', payload: searchText});
        setSearchText('');
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
            <img src="https://im.rediff.com/news/2020/sep/15funny1.jpg" />
        </div>
    );
}

export default SearchView;