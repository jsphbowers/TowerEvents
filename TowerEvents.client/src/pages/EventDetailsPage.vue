<template>
  <div class="row">
    <!-- SECTION Top of page -->
    <div class="col-12">
      <section class="row details-card m-2 p-1">
        <div class="col-12 p-2">
          <div class="row">
            <div class="col-5">
              <img class="img-fluid" :src="towerEvent.coverImg" :alt="towerEvent.name">
            </div>
            <div class="col-7">
              <div class="row text-light justify-content-between">
                <div class="col-4">
                  <h3>{{ towerEvent.name }}</h3>
                  <h4>{{ towerEvent.location }}</h4>
                </div>
                <div class="col-4 text-end">
                  <h3>{{ towerEvent.startDate }}</h3>
                </div>
                <div class="col-12 my-4">
                  <h6>
                    {{ towerEvent.description }}
                  </h6>
                </div>
              </div>
              <div class="row d-flex justify-content-between my-5"
                v-if="towerEvent.isCanceled == false && towerEvent.capacity > 0">
                <div class="col-3">
                  <h4 class="text-success">Spots Left: {{ towerEvent.capacity }}</h4>
                </div>
                <div class="col-3 text-end">
                  <button @click="createTicket()" :disabled="!account.id" title="Get ticket" class="btn btn-warning"><i
                      class="mdi mdi-ticket"></i> I'm
                    In!</button>
                </div>
              </div>
              <div class="row d-flex justify-content-between my-5"
                v-if="towerEvent.isCanceled == true || towerEvent.capacity == 0">
                <div class="col-3">
                  <h4 class="text-danger">Spots Left: {{ towerEvent.capacity }}</h4>
                </div>
                <div class="col-3 text-end">
                  <button @click="createTicket()" disabled title="Get ticket" class="btn btn-danger"><i
                      class="mdi mdi-ticket"></i> I'm
                    In!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- SECTION Attendees -->
    <div class="col-12">
      <section class="row justify-content-center">
        <!-- <div class="col-11" v-for="t in ticketHolders">

        </div> -->
      </section>
    </div>
    <!-- SECTION Comments -->
    <div class="col-12">
      <section class="row justify-content-center">
        <div class="col-11 p-2 details-card my-2" v-if="account.id">
          <form @submit.prevent="createComment()">
            <div class="mb-2 p-2">
              <label for="description" class="form-label text-success">Join the Conversation</label>
              <textarea v-model="editable.body" class="form-control" id="body" rows="3"></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-success">Comment</button>
            </div>
          </form>
        </div>
        <div class="col-11 my-2" v-for="c in comments" :key="c.id">
          <CommentCard :comment="c" />
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router"
import { towerEventsService } from "../services/TowerEventsService.js"
import { computed, onMounted, ref } from "vue"
import { AppState } from "../AppState.js"
import { commentsService } from "../services/CommentsService.js"
import { attendeesService } from "../services/AttendeesService.js"
import Pop from "../utils/Pop.js"
import { logger } from "../utils/Logger.js"
import CommentCard from "../components/CommentCard.vue"

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await towerEventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error.message)
      }
    }

    async function getComments() {
      try {
        const eventId = route.params.eventId
        await commentsService.getComments(eventId)
      } catch (error) {
        Pop.error(error)
        logger.error(error.message)
      }
    }

    // async function getTicketHolders() {
    //   try {
    //     const eventId = route.params.eventId
    //   } catch (error) {
    //     Pop.error(error.message)
    //     logger.error(error.message)
    //   }
    // }

    onMounted(() => getEventById())
    onMounted(() => getComments())
    return {
      route,
      editable,

      towerEvent: computed(() => AppState.towerEvent),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),

      async createComment() {
        try {
          let commentData = editable.value
          commentData.eventId = route.params.eventId
          await commentsService.createComment(commentData)
        } catch (error) {
          Pop.error(error.message)
          logger.error(error.message)
        }
      },

      async createTicket() {
        try {
          await attendeesService.createTicket({ eventId: route.params.eventId })
        } catch (error) {
          Pop.error(error.message)
          logger.error(error.message)
        }
      }
    }
  },
  components: { CommentCard }
}
</script>


<style lang="scss" scoped>
.details-card {
  background-color: #474C61;
  border-radius: .75em;
}
</style>