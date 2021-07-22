import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function Favorites () {

    const dispatch = useDispatch();
    const favorites = useSelector(store => store.favoritesReducer)

    const getFavorites = () => {
        dispatch({type: 'GET_FAVORITES'});
    }

    useEffect( () => {
        getFavorites;
      }, []);


    return(
        <div>
            {favorites.map((gif, index) => {
                return (
                    <div>
                        <img src={gif.url}></img>
                        <input type="radio" label="Funny" value="Funny" onChange={(event) => setCategory(event.target.value)} />Funny
                        <input type="radio" label="Cohort" value="Cohort" onChange={(event) => setCategory(event.target.value)} />Cohort
                        <input type="radio" label="Cartoon" value="Cartoon" onChange={(event) => setCategory(event.target.value)} />Cartoon
                        <input type="radio" label="nsfw" value="nsfw" onChange={(event) => setCategory(event.target.value)} />nsfw
                        <input type="radio" label="meme" value="meme" onChange={(event) => setCategory(event.target.value)} />meme
                    </div>
                )
            })}
        </div>
    )
}

export default Favorites;


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