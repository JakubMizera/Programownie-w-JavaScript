import { React, useEffect, useState } from "react";
import openWeatherApi from "../APIs/openWeatherApi";
import GetWeather from "./GetWeather";

const GetLocation = () => {
    const [searchInput, setSearchInput] = useState('Warsaw');
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
            const response = await openWeatherApi.get(`/geo/1.0/direct?q=${debouncedSearchInput}&limit=1&appid=c75e43288f3d141adcea7c38ba53da51`);
            setLat(response.data[0].lat);
            setLon(response.data[0].lon);
        }
        fetchLocation();
    }, [debouncedSearchInput]);


    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Search city</label>
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