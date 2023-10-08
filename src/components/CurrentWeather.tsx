import React from "react";
import { CurrentWeatherData, MainWeatherData } from "../data/interfaces";

interface Props {
    weatherDataHandle: CurrentWeatherData;
}
const CurrentWeather: React.FC<Props> = ({ weatherDataHandle }) => {
    const [weatherData, setWeatherData] =
        React.useState<MainWeatherData | null>(null);

    function sunWalk() {
        //sunwalk effect - func returns style of div with sun symbol - angle depends on current time
        const time: number = new Date().valueOf(); //current time
        const x: number = //percentage value of current time counted since sunrise to sunset
            ((Math.round(time / 1000) - weatherDataHandle.sys.sunrise) * 100) /
            (weatherDataHandle.sys.sunset - weatherDataHandle.sys.sunrise);
        let sunWalkProperties = {
            angle: 0,
            display: "flex",
        };
        if (0 < x && x <= 100) {
            //if current time is betwen sunrise and sunset (daytime) then display sun and return propper angle
            sunWalkProperties.angle = (180 * x) / 100;
            sunWalkProperties.display = "flex";
        } else {
            sunWalkProperties.angle = 0;
            sunWalkProperties.display = "none";
        }
        return {
            transform: `rotate(${sunWalkProperties.angle}deg)`,
            display: `${sunWalkProperties.display}`,
        };
    }

    function clockFormatter(time: Date) {
        return (
            time.getHours() +
            ":" +
            (time.getMinutes() < 10 ? "0" : "") +
            time.getMinutes()
        );
    }
    React.useEffect(() => {
        if (weatherDataHandle) {
            const sunRise = new Date(weatherDataHandle.sys.sunrise * 1000);
            const sunSet = new Date(weatherDataHandle.sys.sunset * 1000);
            const currentTime = new Date();
            setWeatherData((prevState) => ({
                ...prevState,
                name: weatherDataHandle.name,
                temp: weatherDataHandle.main.temp.toPrecision(2) + "°C",
                imgUrl:
                    "http://openweathermap.org/img/wn/" +
                    weatherDataHandle.weather[0].icon +
                    "@2x.png",

                tempMax: weatherDataHandle.main.temp_max.toPrecision(2),
                tempMin: weatherDataHandle.main.temp_min.toPrecision(2),
                desc: weatherDataHandle.weather[0].description,
                sunRise: clockFormatter(sunRise),
                sunSet: clockFormatter(sunSet),
                windSpeed: weatherDataHandle.wind.speed + "km/h",
                humidity: weatherDataHandle.main.humidity + "%",
                pressure: weatherDataHandle.main.pressure + "HPa",
                cloudsAmount: weatherDataHandle.clouds.all + "%",
                currentTime: clockFormatter(currentTime),
                currentDay: `${currentTime.getDate()}-${currentTime.getMonth()}-${currentTime.getFullYear()}`,
            }));
        }
    }, [weatherDataHandle]);

    return (
        weatherData && (
            <div className="current-weather">
                <div className="current-weather--sunrise">
                    <img
                        className="img"
                        src={require(`../images/sunrise.png`)}
                        alt="sunrise"
                    />
                    <p>{weatherData.sunRise}</p>
                </div>
                <div className="current-weather--sunset">
                    <img
                        className="img"
                        src={require("../images/sunset.png")}
                        alt="sunset"
                    />
                    <p>{weatherData.sunSet}</p>
                </div>
                <div className="current-weather--min-max-temp">
                    {weatherData.tempMin} / {weatherData.tempMax}°C
                </div>
                <div className="current-weather--temp">{weatherData.temp}</div>
                <img
                    className="current-weather--img"
                    //if clear sky - changing the default sun symbol for the better one (personal opinion)
                    src={
                        weatherDataHandle.weather[0].icon === "01d"
                            ? require("../images/sun.png")
                            : "http://openweathermap.org/img/wn/" +
                              weatherDataHandle.weather[0].icon +
                              "@2x.png"
                    }
                    alt="weather-symbol"
                />
                <div className="current-weather-description">
                    {weatherData.desc}
                </div>
                <div className="current-weather--wind-humadity">
                    <span>
                        <img
                            className="img"
                            src={require("../images/cloud.png")}
                            alt="cloud"
                        />
                        <p>{weatherData.cloudsAmount}</p>
                    </span>
                    <span>
                        <img
                            className="img"
                            src={require("../images/wind.png")}
                            alt="wind"
                        />{" "}
                        <p>{weatherData.windSpeed}</p>
                    </span>
                    <span>
                        <img
                            className="img"
                            src={require("../images/humidity.png")}
                            alt="humidity"
                        />
                        <p>{weatherData.humidity}</p>
                    </span>
                </div>
                <div className="current-weather--time">
                    {weatherData.currentTime}
                </div>
                <div className="current-weather--date">
                    {weatherData.currentDay}
                </div>
                <div className="current-weather--semicircle"></div>
                <div className="current-weather--sun-rotate" style={sunWalk()}>
                    <div className="current-weather--sun">
                        <img src={require("../images/sun.png")} alt="sun" />
                    </div>
                </div>
            </div>
        )
    );
};

export default CurrentWeather;
