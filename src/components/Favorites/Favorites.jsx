import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { useHistory } from "react-router";


function Favorites () {

    const history = useHistory();
    const dispatch = useDispatch();
    const favorites = useSelector(store => store.favoritesReducer);

    // this retrieves the favorites set in database
    const getFavorites = () => {
        dispatch({type: 'GET_FAVORITES'});
    }

    //handles click back to search
    const backToSearchClick = () => {
        history.push('/');
    }

    useEffect( () => {
        getFavorites();
      }, []);


    return(
        <>
        <div>
            <p>Favorite Count: {favorites.length}</p>
        </div>
        <div>
            {favorites.map((gif, index) => {
                return (
                    <FavoriteItem key={index} favorites={gif}/>
                )
            })}
        </div>
        <div>
            <button onClick={backToSearchClick}>Back to Search</button>
        </div>
        </>
    )
}

export default Favorites;

// Kong's old radio buttons
{/* <input type="radio" label="Funny" value={dbCategories.name[0]} onChange={(event) => setCategory(event.target.value)} />Funny
                        <input type="radio" label="Cohort" value={dbCategories.name[1]} onChange={(event) => setCategory(event.target.value)} />Cohort
                        <input type="radio" label="Cartoon" value={dbCategories.name[2]} onChange={(event) => setCategory(event.target.value)} />Cartoon
                        <input type="radio" label="nsfw" value={dbCategories.name[3]} onChange={(event) => setCategory(event.target.value)} />nsfw
                        <input type="radio" label="meme" value={dbCategories.name[4]} onChange={(event) => setCategory(event.target.value)} />meme */}


//JOHN'S CODE BELOW

// const sortFavorites = (displayCategory, item) => {
//     if(item.category == displayCategory){
//         return (
//             <img src={item.url} />
//         )
//     }
// }
// <>
//             <h2>My Favorites</h2>
//             {favorites.map(favorite => {
//                 !favorite.category && <img src={favorite.url}/> 
//                 })}    
//             <h2>Funny</h2>
//             {favorites.map(favorite => {
//                 sortFavorites('funny', favorite)
//                 })}
//             <h2>Cohort</h2>
//             {favorites.map(favorite => {
//                 sortFavorites('cohort', favorite)
//                 })}
//             <h2>Cartoon</h2>
//             {favorites.map(favorite => {
//                 sortFavorites('cartoon', favorite)
//                 })}
//             <h2>NSFW</h2>
//             {favorites.map(favorite => {
//                 sortFavorites('nsfw', favorite)
//                 })}
//             <h2>Meme</h2>
//             {favorites.map(favorite => {
//                 sortFavorites('meme', favorite)
//                 })}
//         </>