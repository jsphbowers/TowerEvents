<template>
  <div class="about text-center text-light">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div v-for="t in myTickets" :key="t.id">
    <TicketCard :ticket="t" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from "../utils/Pop.js"
import { logger } from "../utils/Logger.js"
import { attendeesService } from "../services/AttendeesService.js"
export default {
  setup() {
    async function getMyTickets() {
      try {
        await attendeesService.getMyTickets()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }
    onMounted(() => getMyTickets())
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
