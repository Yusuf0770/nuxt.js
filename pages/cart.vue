<template>
  <div @click="categoryOpen = !categoryOpen">
    <div class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 class="text-2xl mb-6 font-bold tracking-tight text-gray-900">Cart</h2>

        <div v-if="store.cart?.length"
          class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          <Card v-for="item in store?.cart" :key="item" :product="item" />
        </div>

        <div v-if="!store.cart?.length" class="w-full flex items-center justify-center h-48 p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold">Don't have product in cart!</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
const store = useStore();
const categoryOpen = ref(false);

</script>

<style lang="scss" scoped>
</style>