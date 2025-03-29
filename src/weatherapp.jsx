import SearchBox from './searchbox';
import InfoBox from './infobox';
import { useState, useEffect } from 'react';
import "./weatherapp.css";
import sunny from './assets/sunny.mp4';
import rainy from './assets/rainy.mp4';
import winter from './assets/winter.mp4';
import earth from './assets/earth.mp4';
import snow from './assets/snow.mp4';

export default function WeatherApp() {
    
    const [weatherInfo, setWeatherInfo] = useState({
        city: "No City Searched",
        description: "",
        feelslike: 0,
        humidity: 0,
        maxtemp: 0,
        mintemp: 0,
        temp: 0,
        isDefault: true // Track if default state
    });

    const [bgVideo, setBgvideo] = useState(earth);

    let updateInfo = (result) => {
        setWeatherInfo({ ...result, isDefault: false });
    };

    // Update background video based on weather conditions
    useEffect(() => {
        if (weatherInfo.isDefault) {
            setBgvideo(earth); 
        } 
        else if (weatherInfo.description.includes("rain")) {
            setBgvideo(rainy);
        } 
        else if (weatherInfo.temp < 0) {
            setBgvideo(snow);
        } 
        else if (weatherInfo.temp < 15) {
            setBgvideo(winter);
        } 
        else {
            setBgvideo(sunny);
        }
    }, [weatherInfo]); 

    return (
        <div>
            <video src={bgVideo} autoPlay muted loop id="myVideo"/>
            <div className="portal" style={{ textAlign: "center", position: "relative", zIndex: "1" }}>
                <h2 style={{color:"white"}}>Welcome To Weather App</h2>
                <SearchBox updateInfo={updateInfo} />
                <InfoBox info={weatherInfo} />
            </div>
        </div>
    );
}
