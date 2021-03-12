import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { FormGroup, FormControl } from '@angular/forms';

import { HTTPConfigService } from '../httpservice/httpconfig.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'pm-home',
  templateUrl: './admin.component.html',
  providers: [HTTPConfigService],
  styleUrls: ['./admin.component.scss']
})

//TODO: rename this to adminlogin
export class AdminComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  serviceTypes = ALL_SERVICE_TYPES;

  constructor(private httpConfigService: HTTPConfigService) {}

  ngOnInit(): void {
    this.httpConfigService
    .verify().subscribe(resp => {
      //If the user's already logged in, send them to the right place
      if (resp.toString() == sessionStorage.getItem('token')){
        window.location.href='/admin-operations';
      }
    });;
  }

  onSubmit() {

    let loginRequest = this.loginForm.value



    this.httpConfigService
      .login(loginRequest).subscribe(resp => {
        //If the response is empty, the username or password was wrong
        if (!resp.toString()){
          window.alert("Username or password was incorrect");
        }
        else{
          sessionStorage.setItem('token', resp.toString());
          window.location.href='/admin-operations';
        }
      });;
  }

}
