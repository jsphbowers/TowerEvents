import { AppState } from "../AppState.js";
import { Attendee } from "../models/Attendee.js";
import { Ticket } from "../models/TowerEvent.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async createTicket(eventData) {
    const res = await api.post('api/tickets', eventData)
    logger.log('[TICKET GENERATED]', res.data)
    AppState.ticketHolders.push(new Attendee(res.data))
    AppState.myTickets.push(new Ticket(res.data))
  }

  async getTicketHolders(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('[GETTING TICKETHOLDERS]', res.data)
    AppState.ticketHolders = res.data.map(t => new Attendee(t))
  }

  async getMyTickets() {
    const res = await api.get(`account/tickets`)
    logger.log('[GETTING ACCOUNT TICKETS]', res.data)
    AppState.myTickets = res.data.map(t => new Ticket(t))
  }

  async removeTicket(attendeeId) {
    const res = await api.delete(`api/tickets/${attendeeId}`)
    logger.log('[REMOVING TICKET]', res.data)

    const attendeeIndex = AppState.ticketHolders.findIndex(a => a.attendeeId == attendeeId)
    if (attendeeIndex !== -1) {
      AppState.ticketHolders.splice(attendeeIndex, 1)
    }

    const myTicketIndex = AppState.myTickets.findIndex(t => t.attendeeId == attendeeId)
    if (myTicketIndex !== -1) {
      AppState.myTickets.splice(myTicketIndex, 1)
    }
  }
}

export const attendeesService = new AttendeesService();