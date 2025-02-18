<script setup>
import { computed, ref } from "vue";
import { useClipboard } from "@vueuse/core";

import FitInput from "./components/FitInput.vue";
import { Counter } from "./helpers/counter";

const leftCount = ref(new Counter());
const rightCount = ref(new Counter());

const diffFits = computed(() => {
  const result = Counter.diff(leftCount.value, rightCount.value).toObject();

  return result;
});

const diffMarkdown = computed(() => {
  const diff = Object.entries(
    Counter.diff(leftCount.value, rightCount.value).toObject()
  );

  return (
    "```\n" +
    `${diff
      .filter((item) => item[1])
      .map((item) => `- ${item[1]} ${item[0]}`)
      .join("\n")}` +
    "\n```"
  );
});

const diffText = computed(() => {
  const diff = Object.entries(
    Counter.diff(leftCount.value, rightCount.value).toObject()
  );

  return diff
    .filter((item) => item[1])
    .map((item) => `- ${item[1]} ${item[0]}`)
    .join("\n");
});

const { text, copy, copied, isSupported } = useClipboard({
  diffMarkdown,
  diffText,
});
</script>

<template>
  <h1 class="text-3xl font-bold mb-4 mt-2 text-center">Fit Diff</h1>
  <div class="flex flex-row justify-center w-full gap-2">
    <div class="min-w-1/4">
      <FitInput
        placeholder="Before:"
        @change-fit="
          (ev) => {
            leftCount = ev;
          }
        "
      />
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
      <div class="copy-button-container">
        <div
          :class="`button${diffText ? '' : ' inactive'} fa-solid fa-copy`"
          @click="diffText.length ? copy(diffText) : null"
        ></div>
        <div
          :class="`button${diffText ? '' : ' inactive'} fa-brands fa-markdown`"
          @click="diffText ? copy(diffMarkdown) : null"
        ></div>
      </div>
    </div>
    <div class="min-w-1/4">
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
</template>

<style scoped>
@reference "./style.css";

div.diff {
  @apply font-mono min-w-1/3 max-w-[calc(50%_-_1rem)] px-4 bg-black rounded-lg text-white flex justify-center py-2;
  @apply relative;
}

div.copy-button-container {
  @apply absolute bottom-2 left-3;
}

div.button {
  @apply bg-slate-800 p-2 rounded-md active:bg-slate-500 mx-0.5 cursor-copy;
}

div.button.inactive {
  @apply bg-slate-900 text-slate-500 active:bg-slate-900 cursor-default;
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
