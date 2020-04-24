import React,{useEffect,useState, useCallback} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () =>{
    const App_Id =  "29bed857";
    const App_Key = "fd96834af1e2495ecd08a3c12e915e50";

    const [recips ,setRecips] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("Chicken")    
    const getRecipies = useCallback ( async() =>{
        const responce = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`);
        const data =await responce.json();
        setRecips(data.hits);
    },[query])
    useEffect(() => {
        getRecipies();
    },[getRecipies]);

    const updateSearch = e =>{
        setSearch(e.target.value);
    };

    const getSearch = e =>{
        e.preventDefault();
        setQuery(search);
        setSearch("");
        console.log(recips);
    };
    return(
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">search</button>
            </form>
            <div className="Recipes">
                {recips.map(recipe =>(
                    <Recipe key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories} 
                    image={recipe.recipe.image}
                    ingredients={recipe.recipe.ingredientLines}/>
                ))};
            </div>
           
        </div>
    );
};

export default App;
