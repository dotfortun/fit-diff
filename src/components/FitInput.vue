<script setup>
import { ref, defineEmits, defineModel, toRaw } from "vue";
import { Counter } from "../helpers/counter";

const emit = defineEmits(["change-fit"]);

const slots = ref(new Counter());

const model = defineModel();

const parseFit = () => {
  const fit = model.value
    .split(/\n/)
    .splice(1)
    .filter((x) => x);

  for (const line of fit) {
    const groups = line.match(/(.+)\sx(\d+)/);

    if (!groups) {
      slots.value.add(line);
    } else {
      slots.value.add(groups[1], parseInt(groups[2]));
    }
  }

  return toRaw(slots.value);
};

parseFit();
</script>

<template>
  <textarea v-model="model" @change="emit('change-fit', parseFit())"></textarea>
</template>

<style scoped></style>
