import React from "react";
import { CurrentWeatherData } from "../data/interfaces";

interface Props {
    weatherDataHandle: CurrentWeatherData | null;
    getCityDataHandle: (cityName: string) => void;
    getGPSDataHandle: () => void;
}

const Header: React.FC<Props> = React.memo(
    ({ weatherDataHandle, getCityDataHandle, getGPSDataHandle }) => {
        const [cityName, setCityName] = React.useState("");

        const onChange = (event: { target: { value: string } }) => {
            setCityName(event.target.value);
        };

        const setCity = React.useCallback(() => {
            if (cityName === "") return;
            getCityDataHandle(cityName);
            setCityName("");
        }, [cityName, getCityDataHandle]);

        return (
            <div className="header">
                <div className="header--input-loc">
                    <input
                        type="text"
                        id="userLocation"
                        placeholder="Write location"
                        className="header--input-loc--input"
                        value={cityName}
                        onChange={onChange}
                    />
                    <img
                        src={require(`../images/check.png`)}
                        alt=""
                        className="header--input-loc--btn"
                        style={{ height: 30 }}
                        onClick={setCity}
                    />
                </div>

                {weatherDataHandle ? (
                    <h2>{weatherDataHandle.name}</h2>
                ) : (
                    <h2>Write Cityname or use GPS data</h2>
                )}
                <img
                    className="header--gps"
                    src={require(`../images/location_img.png`)}
                    alt="location"
                    onClick={getGPSDataHandle}
                />
            </div>
        );
    }
);

export default Header;
