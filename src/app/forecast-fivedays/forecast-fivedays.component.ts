import { Component, OnInit } from '@angular/core';
import { Forecast5Days } from '../models/forecast-5days';
import { ForecastService } from '../forecast.service';
import { ForecastInfo } from '../models/forecast-info';
import { Temperature } from '../models/temperature';
import { LoginService} from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forecast-fivedays',
  templateUrl: './forecast-fivedays.component.html',
  styleUrls: ['./forecast-fivedays.component.css']
})
export class ForecastFivedaysComponent implements OnInit {
  forecastFiveDays: Forecast5Days;
  listOfForecast: ForecastInfo[];
  city: string;
  lengthOfForecast = 5;
  array: number[] = [12,13,15,10,4];
  temperatureForecast: Temperature[];
  result: boolean;

  // options for the chart
  titleOfGraph = 'Weather forecast for five days';
  view: any[] = [600, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '5 Following Day';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature (in Kelvin)';
  timeline = true;
  autoScale = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  showLabels = true;
  dataForGraph: any[]; 

  constructor(
    private forecastService: ForecastService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.loginService.checkTokenAndAllowAccess(this.loginService.getTokenForCheck())){
      this.getForecastForFiveDaysByName('London');
      setTimeout(()=>{
        this.updateServiceInformation();
        this.forecastService.getEmittedValueDueToChangedForecast().subscribe(()=>{this.monitorIfModified();});
      },1000);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  getForecastForFiveDaysByName(cityName: string): void {
    this.forecastService.getForecastByName5Days(cityName).subscribe(forecastFiveDays=>this.forecastFiveDays=forecastFiveDays); 
    setTimeout( ()=>{
      this.getListofItems();
      this.getCityName();
      this.fillGraphWithData();
      this.updateServiceInformation();
    },1000);
     
  }

  updateServiceInformation(): void {
    this.forecastService.setForecastInfoFiveDays(this.forecastFiveDays);
    this.forecastService.setCityNameInFiveDaysForecast(this.forecastFiveDays);
  }

  fillGraphWithData(): void {
    this.dataForGraph =  [
      {
        name: this.city,
        series: [
          {
            name: 1,
            value: this.temperatureForecast[0].temp
          },
          {
            name: 2,
            value:  this.temperatureForecast[1].temp    
          },
          {
            name: 3,
            value:  this.temperatureForecast[2].temp
          },
          {
            name: 4,
            value:  this.temperatureForecast[3].temp
          },
          {
            name: 5,
            value:  this.temperatureForecast[4].temp
          },
        ]
      }
    ]; 
  }

  getListofItems(): void {
    this.temperatureForecast = this.forecastService.getList(this.forecastFiveDays.list);
    setTimeout(()=>{
      var size = 5;
      for (let i = 0; i < size; i++) {
        this.array.splice(i,1,this.temperatureForecast[i].temp);        
      }
      console.log(this.array);
    },5000);
  }

  getCityName(): void {
    this.city = this.forecastService.getCityName(this.forecastFiveDays.city);
  }

  monitorIfModified(): void {
    this.result = this.forecastService.monitorIfModified();
    console.log(this.result);
    if(this.result)
    {
      this.city = this.forecastService.getCityNameInCurrentForecast();
      setTimeout(()=>{ 
        this.getForecastForFiveDaysByName(this.city);
      },1000);
    }
  }
}
