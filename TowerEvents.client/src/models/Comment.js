import { Profile } from "./Account.js"

export class Comment {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.eventId = data.eventId
    this.creatorId = data.creatorId
    this.creator = new Profile(data.creator)
  }
}