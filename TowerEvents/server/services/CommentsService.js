import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { towerEventsService } from "./TowerEventsService.js";

class CommentsService {
  async deleteComment(commentId, userId) {
    let comment = await dbContext.Comments.findById(commentId)

    if (comment == null) {
      throw new BadRequest('We could not find that comment to delete')
    }

    if (comment.creatorId != userId) {
      throw new Forbidden('You cannot delete other users comments, be gone long one!')
    }

    await comment.remove()
    let message = `Comment has been deleted.`
    return message
  }
  async getComments(eventId) {
    let comments = await dbContext.Comments.find({ eventId })
      .populate('creator', 'name picture')

    return comments
  }
  async createComment(commentData) {
    let towerEvent = await towerEventsService.getTowerEvent(commentData.eventId)
    if (towerEvent.isCanceled == true) {
      throw new Forbidden('You cannot post comments on cancelled events.')
    }

    let comment = await dbContext.Comments.create(commentData)
    await comment.populate("creator", 'picture name')
    return comment
  }

}

export const commentsService = new CommentsService();