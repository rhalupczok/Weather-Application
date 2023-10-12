import React from "react";
import "../style/forecast.css";
import { ForecastWeatherProps } from "../data/interfaces";

const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Forecast: React.FC<ForecastWeatherProps> = ({
    forecastWeatherDataHandle,
}) => {
    const singleItem = forecastWeatherDataHandle.list.map((day) => {
        const date = new Date(
            (day.dt - forecastWeatherDataHandle.city.timezone) * 1000
        );
        const imgUrl =
            "http://openweathermap.org/img/wn/" +
            day.weather[0].icon +
            "@2x.png";
        return (
            <div key={date.valueOf()} className="weather-forecast--simple-item">
                <div className="weather-forecast--simple-item--txt">
                    <p className="weather-forecast--day">
                        {dayName[date.getDay()]}{" "}
                        {date.getHours() + ":0" + date.getMinutes()}
                    </p>
                    <p className="weather-forecast--desc">
                        {day.weather[0].description}
                    </p>
                    <p className="weather-forecast--temperature">
                        {day.main.temp.toPrecision(2)}°C
                    </p>
                </div>
                <img
                    className="weather-forecast--simple-item--img"
                    src={imgUrl}
                    alt=""
                />
            </div>
        );
    });

    return <div className="weather-forecast">{singleItem}</div>;
};

export default Forecast;
