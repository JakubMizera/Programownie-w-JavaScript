import { React, useState, useEffect } from "react";
import axios from "axios";

const GetWeather = ({ lat, lon, city }) => {
    const [temp, setTemp] = useState(273);
    const [humidity, setHumidity] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [weatherIcon, setWeatherIcon] = useState('');
    const [debouncedLat, setDebouncedLat] = useState(lat);
    const [debouncedLon, setDebouncedLon] = useState(lon);

    useEffect(() => {
        const timerIdLat = setTimeout(() => {
            setDebouncedLat(lat);
        }, 500);
        const timerIdLon = setTimeout(() => {
            setDebouncedLon(lon);
        }, 500);

        return () => {
            clearTimeout(timerIdLat);
            clearTimeout(timerIdLon);
        };
    }, [lat, lon]);

    useEffect(() => {
        const fetchWeather = async () => {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${debouncedLat}&lon=${debouncedLon}&appid=c75e43288f3d141adcea7c38ba53da51`);
            console.log(data.weather[0].icon);
            setTemp((data.main.temp - 273.15).toFixed(1));
            setHumidity(data.main.humidity);
            setPressure(data.main.pressure);
            setWeatherIcon(data.weather[0].icon);
        }
        fetchWeather();
    }, [debouncedLat, debouncedLon]);

    return (
        <div>
            <h1>Weather in {city}:</h1>
            <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}></img>
            <p>Temperature: {temp} ℃</p>
            <p>Humidity: {humidity} %</p>
            <p>pressure: {pressure} hPa</p>
        </div>
    )
};

export default GetWeather;