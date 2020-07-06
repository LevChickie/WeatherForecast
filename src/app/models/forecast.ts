import { Weather } from './weather';
import { Temperature } from './temperature';
import { System } from './system';
import { Coord } from './coord';
import { Wind } from './wind';
import { Clouds } from './clouds';

export interface Forecast {
    weather: Weather[];
    coord: Coord;
    wind: Wind;
    clouds: Clouds;
    main: Temperature;
    sys: System;
    timezone: number;
    id: number;
    name: string;
    base: string;
    visibility: number;
    dt: number;
    cod: number;
}