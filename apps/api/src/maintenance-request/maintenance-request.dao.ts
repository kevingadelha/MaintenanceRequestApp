import { Injectable } from '@nestjs/common';
import { Account, MaintenanceRequest, TokenWrapper } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
const db = low(adapter)

db.defaults({ requests: [], admins: [{
  "username": "admin",
  //TODO: hash password
  "password": "pass",
  //TODO: implement token generation on login
  "token": "randomToken"
}]}).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');
  }

  private get admins(): any {
    return db.get('admins');
  }

  constructor() {
    //
  }

  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),
        //Added an open field since it seems like that was needed according to the requirements
        open: true,
      })
      .write()
    return id;
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {

    return await this.collection.find({ id }).value();
  }

  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return this.collection.find({ id })
    .assign({"open" : false})
    .write();
  }
  
  async getOpenMaintenanceRequests(): Promise<MaintenanceRequestDB> {
    return await this.collection.filter( {"open": true} ).value();
  }

  async login(account: Account): Promise<MaintenanceRequestDB> {
    return await this.admins.filter( {"username" : account.username, "password" : account.password}).map("token").value();
  }

  async verify(tokenWrapper: TokenWrapper): Promise<MaintenanceRequestDB> {
    return await this.admins.filter( {"token" : tokenWrapper.token}).map("token").value();
  }
}
