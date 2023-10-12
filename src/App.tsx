import React, { useEffect, useState } from "react";
import "./style/global.css";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { CurrentWeatherData, ForecastWeatherData } from "./data/interfaces";
import { apiSrc } from "./weatherApi";

const App: React.FC = () => {
    const [city, setCity] = useState<string | null>(null);
    const [coordinates, setCoordinates] = useState<{
        lat: number;
        long: number;
    } | null>(null);

    const [currentWeatherData, setCurrentWeatherData] =
        useState<CurrentWeatherData | null>(null);
    const [forecastData, setforecastData] =
        useState<ForecastWeatherData | null>(null);

    // GETDATA
    useEffect(() => {
        if (city) {
            const currentWeatherSrc: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiSrc}`;
            const forecastDataSrc: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiSrc}`;

            fetch(currentWeatherSrc).then((response) => {
                response.json().then((data) => {
                    data.cod != 200
                        ? window.alert(data.message)
                        : setCurrentWeatherData(data);
                });
            });
            fetch(forecastDataSrc).then((response) => {
                response.json().then((data) => {
                    data.cod != 200
                        ? window.alert(data.message)
                        : setforecastData(data);
                });
            });
        }
        setCity(null);
    }, [city]);

    useEffect(() => {
        if (coordinates) {
            const currentWeatherSrc: string = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=${apiSrc}`;
            const forecastDataSrc: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=${apiSrc}`;

            fetch(currentWeatherSrc).then((response) => {
                response.json().then((data) => {
                    data.cod != 200
                        ? window.alert(data.message)
                        : setCurrentWeatherData(data);
                });
            });
            fetch(forecastDataSrc).then((response) => {
                response.json().then((data) => {
                    data.cod != 200
                        ? window.alert(data.message)
                        : setforecastData(data);
                });
            });
        }
    }, [coordinates]);

    const getCityData: (cityName: string) => void = (cityName: string) => {
        setCity(cityName);
    };

    const getGPSData: () => void = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            setCoordinates({ lat: lat, long: long });
        });
    };

    useEffect(() => {
        getGPSData();
    }, []);

    return (
        <div className="container">
            <Header
                weatherDataHandle={currentWeatherData}
                getCityDataHandle={getCityData}
                getGPSDataHandle={getGPSData}
            />
            {currentWeatherData && (
                <CurrentWeather weatherDataHandle={currentWeatherData} />
            )}
            {forecastData && (
                <Forecast forecastWeatherDataHandle={forecastData} />
            )}
        </div>
    );
};

export default App;
