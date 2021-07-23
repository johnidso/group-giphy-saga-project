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
        dispatch({type: 'GET_FAVORITES'});
    }

    useEffect( () => {
        getCategories();
      }, []);


    return (
            <div>
                <p><img src={favorites.favorites.url} height="200px"></img></p>
                <p>Category {favorites.favorites.category_id}</p>
                {dbCategories.map((category, index) => {
                    return (
                        <div key={index}>
                            <input 
                                type="radio" 
                                name={favorites.favorites.url} 
                                id="category" 
                                value={category.name} 
                                onChange={(event) => handleClick(event.target.value)} 
                            />
                            <label htmlFor="category">{category.name}</label>

                        </div>
                    )
                })}
            </div>
    )
}

export default FavoriteItem;
