import { React, useState, useEffect } from "react";
import axios from "axios";

const GetWeather = ({lat, lon, city}) => {
    const [temp, setTemp] = useState(273);
    
    useEffect(() => {
      const fetchWeather = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c75e43288f3d141adcea7c38ba53da51`);
        console.log(response.data.main.temp - 273);
        setTemp(response.data.main.temp - 273);
      }
      fetchWeather();
    }, [lat, lon]);

    return (
        <div>Weather in {city}: {temp}</div>
    )
};

export default GetWeather;