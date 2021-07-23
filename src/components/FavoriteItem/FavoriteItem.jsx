import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function FavoriteItem (favorites) {

    const dbCategories = useSelector(store => store.categoryReducer);
    const dispatch = useDispatch();
    const [category, setCategory] = useState();

        // this retrieves the category list from our database
        const getCategories = () => {
            dispatch({type: 'GET_CATEGORIES'});
        }

            // this updates our favorites category id inside our database
    const putCategory = () => {
        dispatch({ type: 'ADD_CATEGORY', payload: category});
    }

    useEffect( () => {
        getCategories();
        // putCategory(); // It's unclear to me why we would call this function when the page loads - Tim
      }, []);

    return (
            <div>
                <img src={favorites.url}></img>
                {dbCategories.map((category, index) => {
                    return (
                        <input type="radio" label={category} value={category} onChange={(event) => setCategory(event.target.value)} />
                    )
                })}
            </div>
    )
}

export default FavoriteItem;
