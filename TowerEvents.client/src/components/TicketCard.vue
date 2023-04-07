<template>
  <section class="row justify-content-center">
    <div class="col-6 text-light m-2 ticket-card">
      <section class="row">
        <div class="col-4">
          <img class="img-fluid" :src="ticket.coverImg" :alt="ticket.name">
        </div>
        <div class="col-8">
          <h3>
            {{ ticket.name }}
          </h3>
          <h5>
            {{ ticket.location }}:
            {{ ticket.startDate }}
          </h5>
          <div class="text-end pt-4">

          </div>
        </div>
      </section>
    </div>
  </section>
</template>


<script>
import { onMounted } from "vue";
import { Ticket } from "../models/TowerEvent.js";
import { attendeesService } from "../services/AttendeesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import { AppState } from "../AppState.js";
import { computed } from "@vue/reactivity";

export default {
  props: {
    ticket: { type: Ticket, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),

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
  }
}
</script>


<style lang="scss" scoped>
.ticket-card {
  background-color: #474C61;

}
</style>