import { defineStore } from "pinia";
import equivalents from "../sde/equiv.json";

export const useModuleStore = defineStore('modules', () => {
    return {
        equivalents
    }
})
