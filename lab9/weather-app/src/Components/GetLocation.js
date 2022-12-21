import { React, useEffect, useState } from "react";
import openWeatherApi from "../APIs/openWeatherApi";
import { KEY } from "../APIs/openWeatherApi";
import GetWeather from "./GetWeather";

import './../Style/Location.css';

const GetLocation = () => {
    const [searchInput, setSearchInput] = useState('Kraków');
    const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    const onSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchInput(searchInput);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchInput]);

    useEffect(() => {
        const fetchLocation = async () => {
            const response = await openWeatherApi.get(`/geo/1.0/direct?q=${debouncedSearchInput}&limit=1&appid=${KEY}`);
            setLat(response.data[0].lat);
            setLon(response.data[0].lon);
        }
        fetchLocation();
    }, [debouncedSearchInput]);

    return (
        <>
            <div className="location">
                <form onSubmit={onSubmit}>
                    <div className="citySearch">
                        <label>Find city:</label>
                        <input
                            type='text'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <GetWeather lat={lat} lon={lon} city={debouncedSearchInput} />
        </>
    );
};

export default GetLocation;