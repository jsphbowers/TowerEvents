import { dbContext } from "../db/DbContext.js";

class TowerEventsService {
  async createTowerEvent(towerEventData) {
    const newTowerEvent = await dbContext.TowerEvents.create(towerEventData)
    await newTowerEvent.populate("creator", 'picture name')
    return newTowerEvent
  }

}

export const towerEventsService = new TowerEventsService();