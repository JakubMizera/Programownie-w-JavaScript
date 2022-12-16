import { React, useEffect, useState } from "react";
import axios from "axios";
import GetWeather from "./GetWeather";

const GetLocation = () => {
    const [searchInput, setSearchInput] = useState('Warsaw');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(searchInput)
    }

    useEffect(() => {
        const fetchLocation = async () => {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=c75e43288f3d141adcea7c38ba53da51`);
            setLat(response.data[0].lat);
            setLon(response.data[0].lon);
        }
        fetchLocation();
    }, [searchInput]);


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
            <GetWeather lat={lat} lon={lon} city={searchInput}/>
        </>
    );
};

export default GetLocation;