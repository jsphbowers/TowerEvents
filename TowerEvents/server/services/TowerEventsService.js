import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js";

class TowerEventsService {
  async getMyTickets(accountId) {
    let tickets = await dbContext.Tickets.find({ accountId })
      .populate('event')
    return tickets
  }
  // GET ONE EVENT OR MANY
  async getTowerEvent(towerEventId) {
    let towerEvent = await dbContext.TowerEvents.findById(towerEventId)
    if (towerEvent == null) {
      throw new BadRequest('There is no corresponding event, please check your data and try again.')
    }
    return towerEvent
  }
  async getAllEvents() {
    let towerEvents = await dbContext.TowerEvents.find()
      .populate('creator', 'picture name')
    return towerEvents
  }


  // CREATING || EDITING || Archiving
  async createTowerEvent(towerEventData) {
    const newTowerEvent = await dbContext.TowerEvents.create(towerEventData)
    await newTowerEvent.populate("creator", 'picture name')
    return newTowerEvent
  }

  async editEvent(towerEventEdits, towerEventId) {
    let originalTowerEvent = await this.getTowerEvent(towerEventId)

    if (!originalTowerEvent) {
      throw new BadRequest('There is no tower with the provided credentials. Try again.')
    }

    if (originalTowerEvent.isCanceled == true) {
      throw new BadRequest('This event has already been canceled.')
    }

    originalTowerEvent.name = towerEventEdits.name ? towerEventEdits.name : originalTowerEvent.name
    originalTowerEvent.description = towerEventEdits.description ? towerEventEdits.description : originalTowerEvent.description
    originalTowerEvent.coverImg = towerEventEdits.coverImg ? towerEventEdits.coverImg : originalTowerEvent.coverImg
    originalTowerEvent.location = towerEventEdits.location ? towerEventEdits.location : originalTowerEvent.location
    originalTowerEvent.capacity = towerEventEdits.capacity ? towerEventEdits.capacity : originalTowerEvent.capacity
    originalTowerEvent.startDate = towerEventEdits.startDate ? towerEventEdits.startDate : originalTowerEvent.startDate
    originalTowerEvent.type = towerEventEdits.type ? towerEventEdits.type : originalTowerEvent.type


    await originalTowerEvent.save()

    return originalTowerEvent
  }

  async archive(userId, towerEventId) {
    let originalTowerEvent = await (await this.getTowerEvent(towerEventId)).populate('creator')
    if (!originalTowerEvent) {
      throw new BadRequest('There is no tower with the provided credentials. Try again.')
    }
    if (originalTowerEvent.creatorId != userId) {
      throw new UnAuthorized(`You are not the creator of ${originalTowerEvent.name}, be gone long one!`)
    }
    if (originalTowerEvent.isCanceled == true) {
      throw new Forbidden(`${originalTowerEvent.name} has already been canceled.`)
    }

    originalTowerEvent.isCanceled = true
    await originalTowerEvent.save()
    return `${originalTowerEvent.name} was successfully canceled!`
  }
}

export const towerEventsService = new TowerEventsService();