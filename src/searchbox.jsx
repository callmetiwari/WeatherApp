import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./searchbox.css";
import { red } from "@mui/material/colors";

export default function SearchBox({updateInfo}){

    const API_URL_LATLON="http://api.openweathermap.org/geo/1.0/direct";
    const API_KEY="bf43df26c4b8d611b3bd0376d07547cb";
    const API_URL="https://api.openweathermap.org/data/2.5/weather";

    let [city, setCity]=useState("");
    let [error, setError]=useState(false);

    let getWeatherInfo= async(city)=>{
        try{
        
            let  coordinates =
            await fetch(`${API_URL_LATLON}?q=${city}&limit=5&appid=${API_KEY}`
         );
         
         let jsonresponse=await coordinates.json();
         let latV=jsonresponse[0].lat,lonV=jsonresponse[0].lon;
         let tempres=await fetch(`${API_URL}?lat=${latV}&lon=${lonV}&appid=${API_KEY}&units=metric`);

         let jsontemp=await tempres.json();
   //   console.log(jsontemp);
         let result={
               city:jsontemp.name,
               temp:jsontemp.main.temp,
               maxtemp:jsontemp.main.temp_max,
               mintemp:jsontemp.main.temp_min,
               feelslike:jsontemp.main.feels_like,
               humidity:jsontemp.main.humidity,
               description:jsontemp.weather[0].description,

         };
       //   console.log(result);
        return result;

        }
        catch(err){
           throw err;
        }
         
        };
    let handleChange = (event)=>{
         setCity(event.target.value);
         if(error){
            setError(false);
         }
         
    };
    let handleSubmit=async (event)=>{
        try{
            event.preventDefault();
            
            let infot=await getWeatherInfo(city);
            updateInfo(infot);setCity("");
            
        }
        catch(err){
            setError(true);
        }
       
    };
    
    
    return (
        <div className="searchbox" >
            <h3 className="Heading" >Search For the Weather</h3>
             
            <form onSubmit={handleSubmit}>
                <input className="large-input"  label="Enter the City" required value={city} onChange={handleChange}/>
                <br /><br />
                <Button variant="contained" type="submit">
                Send
                </Button>
                {error&&<p className="error">No City Name Found</p>}
            </form>
        </div>
    );
}
