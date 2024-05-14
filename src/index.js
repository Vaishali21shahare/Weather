import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import searchIcon from "../src/images/search.png";
import rainIcon from "../src/images/rain.png";
import humidityIcon from "../src/images/humidity.png";
import windIcon from "../src/images/wind.png";
import drizzleIcon from "../src/images/drizzle.png";
import cloudsIcon from "../src/images/clouds.png";
import clearIcon from "../src/images/clear.png";
import mistIcon from "../src/images/mist.png";

const AppComponent = () =>{
    const inputRef =  useRef();
    const [details, setData] = useState([]);
    let weartherIcon = '';
    
    useEffect(() => {
        loadData('Delhi');
    }, []);

    loadData = (city) => {
        const appId = '1ba0728e869bb9563b529ca575b21ec3';
        const cityName =  city;
        const fetchPost = async () => {
            const response = await fetch(
               'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+appId+'&units=metric'
            );
            const data = await response.json();
            console.log(data);
            setData(data);
            
         };
         fetchPost();
    };

    const getCityInformation = () => {
        loadData(inputRef.current.value);
    }
    return (
        <div className="card">
            <div className="search">
                <input type="text" ref={inputRef} placeholder="enter city name" spellCheck="false" className="border-0 outline-0 bg-green-200 text-slate-400 py-2.5 px-3.5 rounded-3xl flex-1 mx-5 my-5 w-64 h-10"/>
                <button onClick={getCityInformation}><img src={searchIcon}/></button>
            </div>
            <div className="weather">
                <img src={rainIcon} className="weather-icon"/>
                <h1 className="temp">{details?.main?.temp}°C</h1>
                <h2 className="city">{details?.name}</h2>
                <div className="details">
                    <div className="col">
                        <img src={humidityIcon}/>
                        <div>
                            <p className="humidity">{details?.main?.humidity} %</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src={windIcon}/>
                        <div>
                            <p className="wind">{details?.wind?.speed} km/hr</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppComponent/>);