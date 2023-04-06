import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    // logger.log('[COMMENTS]', res.data);
    AppState.comments = res.data.map(c => new Comment(c))
    logger.log('[COMMENTS IN APPSTATE]', AppState.comments)
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('[MAKING COMMENT]', res.data)
    AppState.comments.push(new Comment(res.data))
  }
}

export const commentsService = new CommentsService();