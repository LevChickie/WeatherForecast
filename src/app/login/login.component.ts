import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm): void {
     if(form.invalid){
       return;
     }
     console.log(form.value.username);
     console.log(form.value.password);
     this.token = this.loginService.loginUser(form.value.username, form.value.password);
     //After validation, routing to the webpage.
     if(this.token==='this-is-the-mocked-token-for-the-app')
     {
       this.router.navigate(['/forecast']);
     }
  }

}
