import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function FavoriteItem (favorites) {

    const dispatch = useDispatch();
    const dbCategories = useSelector(store => store.categoryReducer);

        // this retrieves the category list from our database
        const getCategories = () => {
            dispatch({type: 'GET_CATEGORIES'});
        }

            // this updates our favorites category id inside our database
    const handleClick = (event) => {
        dispatch({ type: 'ADD_CATEGORY', payload: {favoriteId: favorites.favorites.id, categoryName: event}});
    }

    useEffect( () => {
        getCategories();
      }, []);


    return (
            <div>
                <p><img src={favorites.favorites.url}></img></p>
                {dbCategories.map((category, index) => {
                    return (
                        <>
                            <input key={index} type="radio" name="category" id="category" value={category.name} onChange={(event) => handleClick(event.target.value)} />
                            <label for="category">{category.name}</label>
                        </>
                    )
                })}
            </div>
    )
}

export default FavoriteItem;
