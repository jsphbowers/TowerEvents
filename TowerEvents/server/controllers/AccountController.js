import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { towerEventsService } from "../services/TowerEventsService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getMyTickets(req, res, next) {
    try {
      let accountId = req.userInfo.id
      let tickets = await towerEventsService.getMyTickets(accountId)
      return res.send(tickets)
    } catch (error) {
      next(error);
    }
  }
}
