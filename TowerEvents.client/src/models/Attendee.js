import { Profile } from "./Account.js";

export class Attendee extends Profile {
  constructor(data) {
    super(data.profile)
    this.attendeeId = data.id
  }
}