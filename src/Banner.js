import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './requests'
import _ from 'lodash'
import './Banner.css'

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/"

const Banner = () => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[_.random(0, request.data.results.length)]);
            return request;
        }
        fetchData();
    }, []);
    return (
        <header
            className="banner"
            style={{
                backgroundImage: `url(${IMG_BASE_URL}${movie?.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }}>
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{movie.overview}</h1>
            </div>
            <div className="banner__fadeBottom"></div>
        </header>
    )
}

export default Banner
