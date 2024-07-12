<template>
  <div class="detailll flex">
    <div>
      <h2 class="detail-title">{{ detail?.title }}</h2>
    </div>
    <div class="container flex gap-40">
      <img
        class="detail-img w-[300px] h-[340px] flex"
        v-for="img in detail?.images"
        :key="img"
        :src="img"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import services from "~~/services/services";
const route = useRoute();

const detail = ref({});

async function getDetail() {
  const res = await services.getDetailProduct(route.params.id);
  detail.value = res;
}
onMounted(() => {
  getDetail();
});
</script>

<style lang="scss" scoped>
</style>