import React, { useEffect, useState } from "react";
import SearchIcon from './search.svg'
import './App.css';
import MovieCard from "./MovieCard";

//api key 1d254d0

const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=1d254d0'
 

function App () {

    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] =('')

    const searchMovies =async (title) => {
        const response = await fetch(`${apiUrl}&s={title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() =>{
        searchMovies(searchText);
    },[])

    return(
        <div className="App">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                placeholder="Search for movies"
                />
                <img src={SearchIcon }
                alt="search"
                onClick={() => searchMovies(searchText)}
                />
            </div>
            {
                movies?.length > 0
                ?(
                    <div className="container">
                        {movies.map((movie) =>
                            <MovieCard key={movie.imdbID} movie={movie}/>
                        )}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    )
}

export default App