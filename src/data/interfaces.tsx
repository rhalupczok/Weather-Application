export interface CurrentWeatherProps {
    weatherDataHandle: CurrentWeatherData;
}

export interface ForecastWeatherProps {
    forecastWeatherDataHandle: ForecastWeatherData;
}

export interface HeaderProps {
    weatherDataHandle: CurrentWeatherData | null;
    getCityDataHandle: (cityName: string) => void;
    getGPSDataHandle: () => void;
}

export interface CurrentWeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface MainWeatherData {
    name: string;
    temp: string;
    imgUrl: string;
    tempMax: string;
    tempMin: string;
    desc: string;
    sunRise: string;
    sunSet: string;
    windSpeed: string;
    humidity: string;
    pressure: string;
    cloudsAmount: string;
    currentTime: string;
    currentDay: string;
}

export interface ForecastWeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: [
        {
            dt: number;
            main: {
                temp: number;
                feels_like: number;
                temp_min: number;
                temp_max: number;
                pressure: number;
                sea_level: number;
                grnd_level: number;
                humidity: number;
                temp_kf: number;
            };
            weather: {
                id: number;
                main: string;
                description: string;
                icon: string;
            }[];
            clouds: {
                all: number;
            };
            wind: {
                speed: number;
                deg: number;
                gust: number;
            };
            visibility: number;
            pop: number;
            rain?: {
                "3h": number;
            };
            sys: {
                pod: string;
            };
            dt_txt: string;
        }
    ];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}
