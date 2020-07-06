import { Injectable, EventEmitter, Output } from '@angular/core';
import { Forecast } from './models/forecast';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ForecastInfo } from './models/forecast-info';
import { Temperature } from './models/temperature';
import { City } from './models/city';
import { Forecast5Days } from './models/forecast-5days';
import { Weather } from './models/weather';
import { Wind } from './models/wind';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  private forecastURL = 'https://api.openweathermap.org/data/2.5';
  private appKey = 'a46eded8c9fd8193750488a032cf3732';
  forecast: Forecast;
  forecast5Days: Forecast5Days;
  temperatureList: Temperature[]=[];
  sizeOfForecast: number = 5;
  city: City;
  cityName: string;

  constructor(private http: HttpClient) { }

  getForecastByName(name: string): Observable<Forecast> {
    const url =  `${this.forecastURL}/weather?q=${name}&appid=${this.appKey}`; 
    return this.http.get<Forecast>(url);
  }

  getForecastByName5Days(name: string): Observable<Forecast5Days> {
    const url =  `${this.forecastURL}/forecast?q=${name}&appid=${this.appKey}`;
    return this.http.get<Forecast5Days>(url);
  }

  setForecastInfoCurrent(forecast: Forecast): void {
    this.forecast = forecast;
  }

  setForecastInfoFiveDays(forecast5Days: Forecast5Days) : void {
    this. forecast5Days = forecast5Days;
  }

  updateForecast5Days(name: string): Observable<Forecast5Days> {
    return this.getForecastByName5Days(name);
  }

  getList(listOfForecast: ForecastInfo[]): Temperature[] {
    for (let i = 0; i < this.sizeOfForecast; i++) {
      this.temperatureList.splice(i,1,listOfForecast[i].main);
    }
    setTimeout(()=>{
      console.log(this.temperatureList);
    },1000)
    return this.temperatureList;
  }

  getWeather(weather: Weather[]): string {
    console.log(weather[0].description);
    return weather[0].description;
  }

  getCityName(cityInformation: City): any {
    return cityInformation.name;
  }

  getWindSpeed(wind: Wind): number {
    return wind.speed;
  }

  getWindDegree(wind: Wind): number {
    console.log(wind.deg);
    return wind.deg;
  }

  monitorIfModified(): boolean {
    console.log(this.city);
    console.log(this.forecast);
    console.log(this.forecast5Days);
    if(this.forecast.name!==this.city.name)
    {
      return true;
    }
    return false;
  }

  getCityNameInCurrentForecast(): string {
    console.log(this.city.name);
    console.log(this.forecast.name);
    this.cityName=this.forecast.name;
    return this.cityName;
  }

  setCityNameInFiveDaysForecast(forecast5Days: Forecast5Days): string {
    this.city = forecast5Days.city;
    setTimeout(()=>{
      return this.city.name;
    },1000);
    return '';
  }

  fireChangedForecastInfoEvent(): void {
    this.fire.emit(true);
  }

  getEmittedValueDueToChangedForecast(): EventEmitter<any> {
    return this.fire;
  }

  getPressure(temperature: Temperature): number {
    return temperature.pressure;
  }

  getHumidity(temperature: Temperature): number {
    return temperature.humidity;
  }
}
