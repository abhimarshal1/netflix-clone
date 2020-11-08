import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/"

const Row = ({ title, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [showYoutube, setShowYoutube] = useState(false);
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    useEffect(() => {
        async function fetchMovies() {
            const response = await axios.get(fetchUrl);
            setMovies(response.data.results);
            return response;
        };
        fetchMovies();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        setShowYoutube(true);
        movieTrailer((movie?.title || movie?.name || movie?.original_name))
            .then((url) => {
                console.log("url", url);
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'))
            })
            .catch((error) => setTrailerUrl(''))
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && 'row__postersLarge'}`}
                        src={`${IMG_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={() => { handleClick(movie) }}
                    />
                ))}
            </div>
            {showYoutube && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
