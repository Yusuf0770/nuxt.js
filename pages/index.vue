<template>
  <div>
    <div class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
          customers also purchased
        </h2>

        <div
          class="cardd mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          <Card v-for="item in product?.products" :key="item" :product="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
import services from "~~/services/services";
const store = useStore();

const product = ref({});

async function getProducts() {
  const res = await services.getProducts();
  product.value = res;
  console.log(res);
}
onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" scoped>
</style>