import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async create(req, res, next) {
    try {
      let towerEventData = req.body
      towerEventData.creatorId = req.userInfo.id
      let towerEvent = await towerEventsService.createTowerEvent(towerEventData)
      return res.send(towerEvent)
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }
}