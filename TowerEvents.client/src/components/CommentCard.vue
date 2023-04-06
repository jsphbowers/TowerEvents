<template>
  <section class="row p-2">
    <div class="col-1">
      <img class="profile-pic elevation-2" :src="comment.creator.picture" :alt="comment.creator.name">
    </div>

    <div class="col-10 details-card d-flex align-items-center text-light">
      <h6>
        "{{ comment.body }}"
      </h6>
    </div>
  </section>
</template>


<script>
import { Comment } from "../models/Comment.js";

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup() {
    return {}
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