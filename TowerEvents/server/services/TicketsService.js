import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { towerEventsService } from "./TowerEventsService.js";

class TicketsService {
  async deleteTicket(ticketId, userId) {
    let ticket = await dbContext.Tickets.findById(ticketId)

    if (ticket == null) {
      throw new BadRequest('There is no ticket to delete')
    }

    if (userId != ticket.accountId) {
      throw new Forbidden('You are not the holder of this ticket, begone long one!')
    }

    const towerEvent = await towerEventsService.getTowerEvent(ticket.eventId)
    towerEvent.capacity++
    await towerEvent.save()

    await ticket.remove()
    let message = `This ticket has successfully been removed.`
    return message
  }
  async getTicketHolders(eventId) {
    let ticketHolders = await dbContext.Tickets.find({ eventId })
      .populate('profile', "name picture")
    return ticketHolders
  }
  async create(ticketData) {
    const towerEvent = await towerEventsService.getTowerEvent(ticketData.eventId)

    if (towerEvent.isCanceled == true) {
      throw new BadRequest('Something went wrong')
    }

    if (towerEvent.capacity == 0) {
      throw new BadRequest('There is no capacity left for this event.')
    }

    let ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('event')
    await ticket.populate('profile')

    towerEvent.capacity--
    await towerEvent.save()

    return ticket
  }

}

export const ticketsService = new TicketsService();