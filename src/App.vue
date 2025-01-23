<script setup>
import { ref } from "vue";

import FitInput from "./components/FitInput.vue";
import { Counter } from "./helpers/counter";
const left = ref(`[Sabre, Sabre]

Damage Control II
Nanofiber Internal Structure II

Medium Shield Extender II
5MN Cold-Gas Enduring Microwarpdrive
Faint Epsilon Scoped Warp Scrambler
Fleeting Compact Stasis Webifier

200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
Interdiction Sphere Launcher I, Warp Disrupt Probe

Small Projectile Burst Aerator I
Small Projectile Collision Accelerator I


Barrage S x4200
Hail S x4200
Warp Disrupt Probe x33
Nanite Repair Paste x64
Republic Fleet EMP S x4200
Republic Fleet Fusion S x4200
Republic Fleet Phased Plasma S x4200`);
const right = ref(`[Sabre, Sabre 2]

Damage Control II
Nanofiber Internal Structure II

Medium F-S9 Regolith Compact Shield Extender
5MN Cold-Gas Enduring Microwarpdrive
Faint Epsilon Scoped Warp Scrambler
Fleeting Compact Stasis Webifier

200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
200mm AutoCannon II, Republic Fleet Phased Plasma S
Interdiction Sphere Launcher I, Warp Disrupt Probe

Small Projectile Burst Aerator I
Small Projectile Collision Accelerator I


Barrage S x4200
Hail S x4200
Warp Disrupt Probe x33
Nanite Repair Paste x64
Republic Fleet EMP S x4200
Republic Fleet Fusion S x4200
Republic Fleet Phased Plasma S x4200`);

const leftCount = ref(new Counter());
const rightCount = ref(new Counter());

const diffFits = () => {
  const result = Counter.diff(leftCount.value, rightCount.value).toObject();

  return result;
};
</script>

<template>
  <h1 class="text-3xl font-bold underline">Fit Diff</h1>
  <FitInput
    v-model="left"
    @change-fit="
      (ev) => {
        leftCount = ev;
      }
    "
  />
  <FitInput
    v-model="right"
    @change-fit="
      (ev) => {
        rightCount = ev;
      }
    "
  />
  <ul>
    <template v-for="(count, mod) in diffFits()" :key="module">
      <template v-if="count">
        <li>{{ count < 0 ? count : `+${count}` }} {{ mod }}</li>
      </template>
    </template>
  </ul>
</template>

<style scoped>
ul {
  @apply font-mono;
}
</style>
