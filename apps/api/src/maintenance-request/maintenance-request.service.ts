import { Injectable } from '@nestjs/common';
import { Account, MaintenanceRequest, TokenWrapper } from '@suiteportal/api-interfaces';
import { MaintenanceRequestDao, MaintenanceRequestDB } from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {

  constructor(
    private readonly maintReqDao: MaintenanceRequestDao,
  ) {
    //
  }

  async getOpenMaintenanceRequests() {
    return await this.maintReqDao.getOpenMaintenanceRequests();
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getMaintenanceRequest(id);
  }

  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.closeMaintenanceRequest(id);
  }

  async login(account: Account): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.login(account);
  }

  async verify(token: TokenWrapper): Promise<MaintenanceRequestDB>  {
    return await this.maintReqDao.verify(token);
  }
}
