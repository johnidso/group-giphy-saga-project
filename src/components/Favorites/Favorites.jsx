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

    const sortFavorites = (category, item) => {
        if(item.category == category){
            return (
                <img src={item.url} />
            )
        }
    }

    return(
        <>
            <h2>Funny</h2>
            {favorites.map(favorite => {
                sortFavorites('funny', favorite)
                })}
            <h2>Cohort</h2>
            {favorites.map(favorite => {
                sortFavorites('cohort', favorite)
                })}
            <h2>Cartoon</h2>
            {favorites.map(favorite => {
                sortFavorites('cartoon', favorite)
                })}
            <h2>NSFW</h2>
            {favorites.map(favorite => {
                sortFavorites('nsfw', favorite)
                })}
            <h2>Meme</h2>
            {favorites.map(favorite => {
                sortFavorites('meme', favorite)
                })}
        </>
    )
}

export default Favorites;