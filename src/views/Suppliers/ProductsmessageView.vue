<script setup>
import { ref,onMounted  } from 'vue';
import { useEvaluationDataStore } from "../../stores/EvaluationData.js";
import { useRoute} from'vue-router';

const EvaluationData = useEvaluationDataStore();

const router = useRoute();
const roomid = ref(router.params.id);
onMounted(async () => {
  await EvaluationData.EvaluationData(roomid.value);
})

</script>

<template>
  <div class="container">
    <div class="row mt-0"  v-for="review in EvaluationData.number" :key="review.customerId">
      <div class="material-icons col-1 d-flex justify-content-center" style="font-size: 20px">
        account_circle
      </div>
      <div class="col-11">
        {{ review.name }}
        <div>
          <span v-for="i in 5" :key="i">
            <i :class="i <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
          </span>
        </div>
        <div> {{review.time}} || 規格 :{{ review.title}} </div>
        <div> 評價 : {{review.review}}</div>
      </div>
    </div>
  </div>
</template>