<template>
  <div>
    <div class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
          {{ slug }}
        </h2>

        <div
          class="cardd mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          <Card v-for="item in detail?.products" :key="item" :product="item" />
        </div>
        <button v-if="limit < detail?.total" @click="addProducts()">more</button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useStore } from "~/store/store";
import services from "~~/services/services";
const store = useStore();
const { slug } = useRoute().params;
const detail = ref({});
const limit = ref(8);
const getDetail = async () => {
  const res = await services.getCategorysDetail(slug, limit);
  detail.value = res;
};

function addProducts() {
  if (limit.value < detail.value?.total) {
    limit.value += 4;
    getDetail()
  }
}
getDetail()
</script>
  
  <style lang="scss" scoped>
</style>