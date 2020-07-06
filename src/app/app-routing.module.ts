import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CurrentForecastComponent } from './current-forecast/current-forecast.component';
import { ForecastFivedaysComponent } from './forecast-fivedays/forecast-fivedays.component';
import { NotFoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'forecast', component: CurrentForecastComponent },
  { path: 'forecast-fivedays', component: ForecastFivedaysComponent},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
