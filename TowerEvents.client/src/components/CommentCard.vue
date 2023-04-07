<template>
  <section class="row p-2">
    <div class="col-1">
      <img class="profile-pic elevation-2" :src="comment.creator.picture" :alt="comment.creator.name">
    </div>

    <div class="col-9 details-card d-flex align-items-center text-light">
      <div class="justify-content-between">
        <div>
          <h5>{{ comment.creator.name }}</h5>
          <h6>
            "{{ comment.body }}"
          </h6>
        </div>
      </div>
    </div>
    <div v-if="account.id == comment.creatorId" class="col-1">
      <button @click="deleteComment(comment.id)" class="btn btn-danger" title="delete comment"><i
          class="mdi mdi-delete"></i></button>
    </div>
  </section>
</template>


<script>
import { computed } from "@vue/reactivity";
import { Comment } from "../models/Comment.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { commentsService } from "../services/CommentsService.js";

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),

      async deleteComment(commentId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete your comment? Im sure some people thought it was a comment.'))
            await commentsService.deleteComment(commentId)
        } catch (error) {
          Pop.error(error.message)
          logger.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-pic {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
}

.details-card {
  background-color: #474c61;
  border-radius: .75em;
}
</style>