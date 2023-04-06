import { AppState } from "../AppState.js";
import { Attendee } from "../models/Attendee.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async createTicket(eventData) {
    const res = await api.post('api/tickets', eventData)
    // logger.log('[TICKET GENERATED]', res.data)
    AppState.ticketHolders.push(new Attendee(res.data))
  }
}

export const attendeesService = new AttendeesService();