import { BadRequestException, Body, Headers, Controller, Post, Get, Param } from '@nestjs/common';
import { Account, MaintenanceRequest, TokenWrapper } from '@suiteportal/api-interfaces';
import { isNullOrUndefined } from 'util';
import { MaintenanceRequestService } from './maintenance-request.service';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest,
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }

  @Get('/')
  public async getOpenMaintenanceRequests(
    @Headers('AuthorizationToken') token: string
  ) {
    var tokenWrapper = { token: token };
    var result = await this.maintenanceRequestService.verify(tokenWrapper);
    if (result.toString() == token) {
      return await this.maintenanceRequestService.getOpenMaintenanceRequests();
    }
    //Don't return anything if the user is not authorized
  }

  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @Post('/:id/close')
  public async closeMaintenanceRequest(
    @Param('id') id: string,
    @Headers('AuthorizationToken') token: string,
  ) {
    //The token is undefined for some reason
    //It works with get but not with post
    //It also works in postman but not with the actual app
    //TODO: Figure out how to get the token from this request
    //Or change the request to work like how postman works
    //I could alternatively have the token be a paramater,
    //But I would rather try and fix the underlying issue
    console.log(token);
    var tokenWrapper = { token: token };
    var result = await this.maintenanceRequestService.verify(tokenWrapper);
    //if (result.toString() == token) {
      if (!id) {
        throw new BadRequestException('No id provided');
      }
      var result = await this.maintenanceRequestService.closeMaintenanceRequest(
        id
      );
      if (isNullOrUndefined(result.id)) {
        return 'id not found';
      } else {
        //I could alternatively return a completed message but this is more useful
        return result;
      }
    //}
  }

  @Post('/login')
  public async login(
    @Body() account: Account,
  ) {
    if (!account?.username) {
      throw new BadRequestException('Must provide a valid username');
    }
    if (!account?.password) {
      throw new BadRequestException('Must provide a valid password');
    }
    return await this.maintenanceRequestService.login(account);
  }

  @Post('/verify')
  public async verify(
    @Body() token: TokenWrapper,
  ) {
    if (!token) {
      throw new BadRequestException('Must provide a token');
    }
    return await this.maintenanceRequestService.verify(token);
  }

}
