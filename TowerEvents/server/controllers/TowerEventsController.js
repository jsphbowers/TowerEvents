import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { dbContext } from "../db/DbContext.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getTowerEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.editEvent)
      .delete('/:id', this.archive)
  }

  async editEvent(req, res, next) {
    try {
      let towerEventEdits = req.body
      let towerEventId = req.params.id
      let editedTowerEvent = await towerEventsService.editEvent(towerEventEdits, towerEventId)
      return res.send(editedTowerEvent)
    } catch (error) {
      next(error);
    }
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
  async getAllEvents(req, res, next) {
    try {
      let towerEvents = await towerEventsService.getAllEvents()
      return res.send(towerEvents)
    } catch (error) {
      next(error);
    }
  }

  async getTowerEvent(req, res, next) {
    try {
      let towerEventId = req.params.id
      let towerEvent = await towerEventsService.getTowerEvent(towerEventId)
      return res.send(towerEvent)
    } catch (error) {
      next(error);
    }
  }

  async archive(req, res, next) {
    try {
      let userId = req.userInfo.id
      let towerEventId = req.params.id
      let message = await towerEventsService.archive(userId, towerEventId)
      return res.send(message)
    } catch (error) {
      next(error);
    }
  }
}