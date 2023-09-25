import React from "react";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { CurrentWeatherData, ForecastWeatherData } from "./data/interfaces";

const App: React.FC = () => {
    const apiKey = "aec2be107d23157731e420673782f5f3";
    const [city, setCity] = React.useState<string | null>(null);
    const [coordinates, setCoordinates] = React.useState<{
        lat: number;
        long: number;
    } | null>(null);

    const [currentWeatherData, setCurrentWeatherData] =
        React.useState<CurrentWeatherData | null>(null);
    const [forecastData, setforecastData] =
        React.useState<ForecastWeatherData | null>(null);

    // GETDATA
    React.useEffect(() => {
        if (city) {
            const currentWeatherSrc: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const forecastDataSrc: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

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

    React.useEffect(() => {
        if (coordinates) {
            const currentWeatherSrc: string = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=${apiKey}`;
            const forecastDataSrc: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=${apiKey}`;

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

    React.useEffect(() => {
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
