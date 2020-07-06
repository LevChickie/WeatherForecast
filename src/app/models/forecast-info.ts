import { Weather } from './weather';
import { Temperature } from './temperature';
import { Clouds } from './clouds';
import { Wind } from './wind';
import { System } from './system';

export interface ForecastInfo {
    dt: number;
    main: Temperature;
    weather: Weather;
    clouds: Clouds;
    wind: Wind;
    sys: System;
    dt_txt: string;
}