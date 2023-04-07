import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TowerEventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    AppState.towerEvents = res.data.map(t => new TowerEvent(t))
    logger.log('[EVENTS IN THE APPSTATE]', AppState.towerEvents)
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    // logger.log('[THIS IS THE SPECIFIC EVENT]', res.data)
    AppState.towerEvent = new TowerEvent(res.data)
  }

  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    logger.log('[THIS IS THE CREATED EVENT]', res.data)
    let newEvent = res.data
    AppState.towerEvents.push(new TowerEvent(newEvent))
    return newEvent
  }

  async cancelEvent() {
    const towerEventId = AppState.towerEvent.id
    const res = await api.delete(`api/events/${towerEventId}`)
    logger.log('[ARCHIVING EVENT]', res.data)
    AppState.towerEvent.isCanceled = true
  }
}

export const towerEventsService = new TowerEventsService();