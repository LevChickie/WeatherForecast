import { Component, OnInit, OnChanges } from '@angular/core';
import { Forecast } from '../models/forecast';
import { ForecastService } from '../forecast.service';
import { LoginService} from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-forecast',
  templateUrl: './current-forecast.component.html',
  styleUrls: ['./current-forecast.component.css']
})
export class CurrentForecastComponent implements OnInit {
  forecast: Forecast;
  weather: string="";
  windSpeed: number =0;
  windDegree: number =0;
  humidity: number =0;
  pressure: number =0;
  date: Date;
  forecastList: Forecast[]=[];
  addNewCity: string;

  constructor(
    private forecastService: ForecastService, 
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.loginService.checkTokenAndAllowAccess(this.loginService.getTokenForCheck())){
      this.addNew('London');
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  
  changeTab(event): void {
    if(event.tab.textLabel!='+')
    {
    var selectedCityForecast = this.forecastList.find(currentForecast => currentForecast.name === event.tab.textLabel);
    setTimeout(()=>{
      this.forecast=selectedCityForecast;
      this.forecastService.setForecastInfoCurrent(selectedCityForecast);
      this.forecastService.fireChangedForecastInfoEvent();
      this.getWeather();
    },1000);
    }
  }

  getWeather(): void {
    this.weather= this.forecastService.getWeather(this.forecast.weather);
    this.windDegree = this.forecastService.getWindDegree(this.forecast.wind);
    this.windSpeed=this.forecastService.getWindSpeed(this.forecast.wind);
    this.pressure = this.forecastService.getPressure(this.forecast.main);
    this.humidity = this.forecastService.getHumidity(this.forecast.main);
    this.date= new Date(this.forecast.dt*1000);
    setTimeout(
      ()=>{console.log(this.weather);}
    ,1000);
  }

  updateServiceInformation(): void {
    this.forecastService.setForecastInfoCurrent(this.forecast);
  }

  addNew(addNewCity: string) {
    this.forecastService.getForecastByName(addNewCity).subscribe(forecast => this.forecast=forecast);
    setTimeout(
      ()=>{
        this.getWeather();this.updateServiceInformation();
        this.forecastList.splice(this.forecastList.length,0,this.forecast);
      },1000);
  }
}
