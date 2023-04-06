<template>
  <form @submit.prevent="createEvent()">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
      <input v-model="towerEvent.name" type="text" class="form-control" aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default" required maxlength="100">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Capacity</span>
      <input v-model="towerEvent.capacity" type="number" class="form-control" aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default" required>
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Cover Image</span>
      <input v-model="towerEvent.coverImg" type="url" name="coverImg" id="coverImg" class="form-control"
        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Location</span>
      <input v-model="towerEvent.location" type="text" class="form-control" aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default" required>
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Start Date</span>
      <input v-model="towerEvent.startDate" type="datetime-local" class="form-control" aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default" required>
    </div>

    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">Type</label>
      <select v-model="towerEvent.type" class="form-select" id="inputGroupSelect01">
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Describe Your Event</label>
      <textarea v-model="towerEvent.description" class="form-control" id="description" rows="3"></textarea>
    </div>

    <div class="d-flex justify-content-end">
      <button class="btn btn-success" type="submit">Submit</button>
    </div>
  </form>
</template>


<script>
import { ref } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { router } from "../router.js";
import { useRouter } from "vue-router";
import { TowerEvent } from "../models/TowerEvent.js";

export default {

  setup() {
    const towerEvent = ref({})
    const router = useRouter()
    return {
      towerEvent,


      async createEvent() {
        try {
          let eventData = towerEvent.value
          let newTowerEvent = await towerEventsService.createEvent(eventData)
          logger.log('[THIS IS THE EVENT BEING RETURNED]', newTowerEvent)
          router.push({ name: 'EventDetails', params: { eventId: newTowerEvent.id } })
        } catch (error) {
          Pop.error(error.message)
          logger.error(error.message)
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped></style>