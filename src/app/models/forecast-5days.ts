import { City } from './city';
import { ForecastInfo } from './forecast-info';

export interface Forecast5Days {
    cod: number;
    message: number;
    cnt: number;
    list: ForecastInfo[];
    city: City;
}