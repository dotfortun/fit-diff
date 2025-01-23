<script setup>
import { computed, ref } from "vue";

import FitInput from "./components/FitInput.vue";
import { Counter } from "./helpers/counter";

const leftCount = ref(new Counter());
const rightCount = ref(new Counter());

const diffFits = computed(() => {
  const result = Counter.diff(leftCount.value, rightCount.value).toObject();

  return result;
});
</script>

<template>
  <h1 class="text-3xl font-bold underline">Fit Diff</h1>
  <div class="columns-2 gap-8 w-full ps-4">
    <div>
      <FitInput
        placeholder="Before:"
        @change-fit="
          (ev) => {
            leftCount = ev;
          }
        "
      />
    </div>
    <div>
      <FitInput
        placeholder="After:"
        @change-fit="
          (ev) => {
            rightCount = ev;
          }
        "
      />
    </div>
  </div>
  <div class="diff">
    <ul>
      <template v-for="(count, mod) in diffFits" :key="mod">
        <template v-if="count">
          <li>
            <template v-if="count < 0">
              <span class="negative">{{ count }}</span>
            </template>
            <template v-else>
              <span class="positive">+{{ count }}</span>
            </template>
            <span class="module">&nbsp;{{ mod }}</span>
          </li>
        </template>
      </template>
      <template v-if="Object.keys(diffFits).length === 0">
        <li>Add fit to diff</li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
@reference "./style.css";

div.diff {
  @apply font-mono bg-black w-1/2 py-4 mx-auto my-2 rounded-lg text-white flex justify-center py-2;
}

li::before {
  content: "—";
  @apply ml-2 pr-2 font-bold;
}

.positive {
  @apply text-green-400;
}

.negative {
  @apply text-red-400;
}

.module {
  @apply text-blue-200 italic;
}
</style>
