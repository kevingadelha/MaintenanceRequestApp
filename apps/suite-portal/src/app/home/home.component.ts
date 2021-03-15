import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { HTTPConfigService } from '../httpservice/httpconfig.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  providers: [HTTPConfigService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  maintForm = new FormGroup({
    unitNumber: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    serviceType: new FormControl('', [
      Validators.required,// <-- Here's how you pass in the custom validator.
    ]),
    summary: new FormControl('', [
      Validators.required,// <-- Here's how you pass in the custom validator.
    ]),
    details: new FormControl(''),
  });

  serviceTypes = ALL_SERVICE_TYPES;

  constructor(private httpConfigService: HTTPConfigService) {}

  ngOnInit(): void {
    //
  }

  onSubmit() {

    let maintenanceRequest = this.maintForm.value

    this.httpConfigService
      .addMaintenanceRequest(maintenanceRequest).subscribe(resp => {
        window.alert("Submitted");
        this.maintForm.reset();
      });;
  }

}
