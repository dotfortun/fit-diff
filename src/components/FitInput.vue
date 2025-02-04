<script setup>
import { ref, toRaw, watch } from "vue";
import { Counter } from "../helpers/counter";

const emit = defineEmits(["change-fit"]);
const { placeholder } = defineProps(["placeholder"]);

const slots = ref(new Counter());

const model = ref("");

const parseFit = () => {
  const fit = model.value
    .split(/\n/)
    .splice(1)
    .filter((x) => x);

  for (const line of fit) {
    const groups = line.match(/(.+)\sx(\d+)/);
    const hasAmmo = line.match(/(.+),\s(.+)/);

    if (hasAmmo) {
      slots.value.add(hasAmmo[1]);
    } else if (!groups) {
      slots.value.add(line);
    } else {
      slots.value.add(groups[1], parseInt(groups[2]));
    }
  }

  return toRaw(slots.value);
};

watch(model, () => {
  slots.value.reset();
  emit("change-fit", parseFit());
});

parseFit();
</script>

<template>
  <textarea v-model="model" rows="24" :placeholder="placeholder"></textarea>
</template>

<style scoped>
@reference "../style.css";

textarea {
  @apply w-full border-2 border-solid border-slate-200 rounded-md px-4 py-2 font-mono text-sm;
  resize: none;
}
</style>
