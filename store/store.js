import { defineStore } from "pinia";
export const useStore = defineStore("store", () => {
  const count = ref(0);
  const cart = ref([])
  const like = ref([])
  return {
    cart,
    like,
    count,
  };
});
