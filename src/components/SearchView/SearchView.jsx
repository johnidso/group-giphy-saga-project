import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import '../SearchView/SearchView.css';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, TextField } from "@material-ui/core";

function SearchView() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [ searchText, setSearchText ] = useState('search');
    const currentSearch = useSelector(store => store.currentSearch);
    const useStyles = makeStyles({
        root: {
            
        },
        searchImage: {
            margin: "16px"
        },
        searchButton: {
            margin: "8px"
        },
        button: {
            margin: "8px"
        },
        favButton: {
            margin: "8px",
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white'
        },
        searchIcon: {
            margin: "0 -8px 0 8px"
        }
    });
    const classes = useStyles();

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
                {/* <input 
                    type="text"
                    name="searchField"
                    value={searchText}
                    onChange={handleChange} 
                /> */}
                <TextField 
                    id="outlined-basic" 
                    label="search" 
                    variant="filled"
                    value={searchText}
                    onChange={handleChange} 
                    className={classes.searchField}
                />
                <Button 
                    type="submit" 
                    className={classes.searchButton}
                    variant="contained"
                    color="primary"
                >
                    Search
                    <SearchIcon className={classes.searchIcon}/>
                </Button>
            </form>
            <img src={currentSearch} height="250px" className={classes.searchImage}/>
            <div className="search-button-container">
                <Button 
                    onClick={goToFavorites} 
                    className={classes.button}
                    variant="contained"
                >
                    View Favorites
                </Button>
                <Button
                    onClick={() => {favoriteHandler(currentSearch)}}
                    className={classes.favButton}
                    variant="contained"
                >
                    Add Favorite
                </Button>
            </div>
        </div>
    );
}

export default SearchView;