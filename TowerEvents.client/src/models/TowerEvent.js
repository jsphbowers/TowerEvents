export class TowerEvent {
  constructor(data) {
    this.id = data.id || data._id
    this.capacity = data.capacity
    this.coverImg = data.coverImg
    this.createdAt = new Date(data.createdAt)
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.description = data.description
    this.isCanceled = data.isCanceled
    this.location = data.location
    this.name = data.name
    this.startDate = new Date(data.startDate)
    this.type = data.type
    this.updatedAt = new Date(data.updatedAt)
  }
}

export class Ticket extends TowerEvent {
  constructor(data) {
    super(data.towerEvent)
    this.ticketId = data.id
  }
}