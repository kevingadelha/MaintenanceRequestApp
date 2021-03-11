import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { FormGroup, FormControl } from '@angular/forms';

import { HTTPConfigService } from '../httpservice/httpconfig.service';

@Component({
  selector: 'pm-home',
  templateUrl: './admin.component.html',
  providers: [HTTPConfigService],
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  serviceTypes = ALL_SERVICE_TYPES;

  constructor(private httpConfigService: HTTPConfigService) {}

  ngOnInit(): void {
    //
  }

  onSubmit() {

    let loginRequest = this.loginForm.value

    /*this.httpConfigService
      .addMaintenanceRequest(maintenanceRequest).subscribe(resp => {
        console.log(resp);
      });;*/
  }

}
