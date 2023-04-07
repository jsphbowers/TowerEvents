<template>
  <div class="row">
    <!-- SECTION Top of page -->
    <div class="col-12">
      <section class="row details-card m-2 p-1">
        <div class="col-12 p-2">
          <div class="row">
            <div class="col-md-5">
              <img class="img-fluid" :src="towerEvent.coverImg" :alt="towerEvent.name">
            </div>
            <div class="col-md-7">
              <div class="row text-light justify-content-between">
                <div class="col-6 col-md-4">
                  <h3>{{ towerEvent.name }}</h3>
                  <h4>{{ towerEvent.location }}</h4>
                </div>
                <div class="col-6 col-md-4 text-end">
                  <h3>{{ towerEvent.startDate }}</h3>
                  <h3>{{ towerEvent.startTime }}</h3>
                </div>
                <div class="col-12 my-4">
                  <h6>
                    {{ towerEvent.description }}
                  </h6>
                </div>
              </div>
              <div class="row d-flex justify-content-between my-5"
                v-if="towerEvent.isCanceled == false && towerEvent.capacity >= 0">
                <div class="col-md-3">
                  <h4 v-if="towerEvent.capacity > 0" class="text-success">Spots Left: {{ towerEvent.capacity }}</h4>
                  <h4 v-if="towerEvent.capacity == 0" class="text-danger">Spots Left: {{ towerEvent.capacity }}</h4>
                </div>
                <div class="col-md-3 text-end mr-2 mx-md-2">
                  <button v-if="!hasTicket" @click="createTicket()" :disabled="!account.id || towerEvent.capacity == 0"
                    title="Get ticket" class="btn btn-warning"><i class="mdi mdi-ticket"></i> I'm In!</button>
                  <button v-else-if="account.id" @click="removeTicket(hasTicket.attendeeId)" :disabled="!account.id"
                    title="Remove Ticket" class="btn btn-danger"><i class="mdi mdi-ticket"></i> I'm Out!</button>
                </div>
              </div>
              <div class="row d-flex justify-content-between my-5" v-if="towerEvent.isCanceled == true">
                <div class="col-3">
                  <h4 class="text-danger">Spots Left: {{ towerEvent.capacity }}</h4>
                </div>
                <div class="col-3 text-end">
                  <button @click="createTicket()" disabled title="Get ticket" class="btn btn-danger"><i
                      class="mdi mdi-ticket"></i> I'm In!</button>
                </div>
              </div>
            </div>
            <div class="text-end" v-if="account.id == towerEvent.creatorId">
              <button @click="cancelEvent()" :disabled="towerEvent.isCanceled" class="btn btn-danger">Cancel
                Event</button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- SECTION Attendees -->
    <div class="col-12">
      <section class="row justify-content-center">
        <div class="col-11 text-light details-card my-3 p-2">
          <h6 class="text-success">See Whose Going:</h6>
          <img v-for="t in ticketHolders" class="ticketHolders elevation-2 mx-1" :title="t.name" :src="t.picture"
            :alt="t.name">
        </div>
      </section>
    </div>
    <!-- SECTION Comments -->
    <div class="col-12">
      <section class="row justify-content-center" v-if="towerEvent.isCanceled == false">
        <div class="col-11 p-2 details-card my-2" v-if="account.id">
          <form @submit.prevent="createComment()">
            <div class="mb-2 p-2">
              <label for="description" class="form-label text-success">Join the Conversation</label>
              <textarea v-model="editable.body" class="form-control" id="body" rows="3"></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-success m-2">Comment</button>
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
import { computed, onMounted, ref, watchEffect } from "vue"
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

    async function getTicketHolders() {
      try {
        const eventId = route.params.eventId
        await attendeesService.getTicketHolders(eventId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error.message)
      }
    }

    // onMounted(() => {
    // }
    // )

    watchEffect(() => {
      if (route.params.eventId) {
        console.log('watch effect runs');
        getEventById()
        getComments()
        getTicketHolders()
      }

    })

    return {
      route,
      editable,

      towerEvent: computed(() => AppState.towerEvent),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      ticketHolders: computed(() => AppState.ticketHolders),
      hasTicket: computed(() => AppState.ticketHolders.find(t => t.id == AppState.account.id)),

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
      },

      async cancelEvent() {
        try {
          if (await Pop.confirm('Are you sure you want to cancel this event?')) {
            await towerEventsService.cancelEvent()
          }
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },

      async removeTicket(attendeeId) {
        try {
          if (await Pop.confirm('Are you sure you want to give up your ticket?')) {
            if (await Pop.confirm('Really? I mean we will lose a ton of money if you do that')) {
              await attendeesService.removeTicket(attendeeId)
              Pop.toast('Fine then!', "success")
            }
          }
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

.ticketHolders {
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
}
</style>