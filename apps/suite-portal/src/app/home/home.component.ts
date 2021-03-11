import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  maintForm = new FormGroup({
    apartmentUnit: new FormControl(''),
    requesterName: new FormControl(''),
    requesterEmail: new FormControl(''),
    serviceType: new FormControl(''),
    summary: new FormControl(''),
    details: new FormControl(''),
  });

  serviceTypes = ALL_SERVICE_TYPES;

  constructor() {
    //
  }

  ngOnInit(): void {
    //
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.maintForm.value);
  }

}
