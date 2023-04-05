import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:id', this.deleteTicket)
  }
  async deleteTicket(req, res, next) {
    try {
      let ticketId = req.params.id
      let userId = req.userInfo.id
      let message = await ticketsService.deleteTicket(ticketId, userId)
      return res.send(message)
    } catch (error) {
      next(error);
    }
  }
  async createTicket(req, res, next) {
    try {
      let ticketData = req.body
      ticketData.accountId = req.userInfo.id
      let ticket = await ticketsService.create(ticketData)
      return res.send(ticket)
    } catch (error) {
      next(error);
    }
  }
}