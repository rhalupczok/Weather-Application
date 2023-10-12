import React, { memo, useCallback, useState } from "react";
import "../style/header.css";
import { HeaderProps } from "../data/interfaces";

const Header: React.FC<HeaderProps> = memo(
    ({ weatherDataHandle, getCityDataHandle, getGPSDataHandle }) => {
        const [cityName, setCityName] = useState("");

        const onChange = (event: { target: { value: string } }) => {
            setCityName(event.target.value);
        };

        const setCity = useCallback(() => {
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
