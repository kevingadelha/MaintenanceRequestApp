import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES, MaintenanceRequest } from '@suiteportal/api-interfaces';
import { FormGroup, FormControl } from '@angular/forms';

import { HTTPConfigService } from '../httpservice/httpconfig.service';

@Component({
  selector: 'pm-home',
  templateUrl: './admin-operations.component.html',
  providers: [HTTPConfigService],
  styleUrls: ['./admin-operations.component.scss']
})

export class AdminOperationsComponent implements OnInit {

  maintenanceRequests: MaintenanceRequest[] = [];


  serviceTypes = ALL_SERVICE_TYPES;

  constructor(private httpConfigService: HTTPConfigService) {}

  ngOnInit(): void {
    this.httpConfigService
    .verify().subscribe(resp => {
      //If the response is not correct, redirect and alert
      if (resp.toString() != sessionStorage.getItem('token')){
        window.alert("You are not logged in or your session has expired");
        window.location.href='/admin';
      }
      else{
        this.httpConfigService
    .getOpenRequests().subscribe(resp => {
      console.log(resp);
      this.maintenanceRequests = resp;
    });
      }
    });
  }

  onSubmit() {

    


   
  }

}
