<template>
  <div class="group relative card">
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
    >
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="card-img w-[300px]"
      />
    </div>
    <div class="mt-4">
      <div class="mb-2">
        <h3 class="text-sm text-gray-700">
          <NuxtLink :to="`/product/${product?.id}`">
            {{ product?.title }}
          </NuxtLink>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ product?.category }}</p>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900">$ {{ product?.price }}</p>

        <button class="like-btn" :class="{'like-active': likely}" @click="addToLike(like)">
          <svg style="width: 25px;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" fill="#929191"/></svg>
        </button>

        <button
          v-if="!productCart"
          :class="{ 'active-cart': checkSaved }"
          class="cart-btn w-[20px] h-[20px]"
          @click="addToCart(item)"
        >
          <cart-icon />
        </button>
        <div v-else class="flex items-center gap-4 bg-[#eae3e3d7] rounded-full">
          <button class="flex ml-3 mb-0.5" @click="remCountProduct(item)">
            -
          </button>
          <span>{{ productCart?.quantity }}</span>
          <button class="flex mr-3 mb-0.5" @click="addCountProduct(item)">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { addToLike } from "~/composables/savedLike";
import { addCountProduct } from "~/composables/addCountProduct";
import { remCountProduct } from "~/composables/remCountProduct";
import { useStore } from "~/store/store";
import { addToCart } from "~/composables/addToCart";
import CartIcon from "./icons/CartIcon.vue";

const { product } = defineProps(["product"]);
const store = useStore();

const item = computed(() => {
  const item = {
    title: product?.title,
    thumbnail: product?.thumbnail,
    price: product?.price,
    id: product?.id,
    category: product?.category,
    quantity: 1,
  };
  return item;
});

const like = computed(() => {
  const item = {
    title: product?.title,
    thumbnail: product?.thumbnail,
    price: product?.price,
    id: product?.id,
    category: product?.category,
  };
  return item;
});


const likely = computed(() => {
  const item = store.like.find((el) => el.id == product.id);
  if (item) {
    return true;
  } else {
    return false;
  }
});


const checkSaved = computed(() => {
  const item = store.cart.find((el) => el.id == product.id);
  if (item) {
    return true;
  } else {
    return false;
  }
});

const productCart = computed(() => {
  const item = store.cart.find((el) => el.id == product.id);
  if (item) {
    return item;
  } else {
    return false;
  }
});
</script>

<style lang="scss" scoped>
.like-active {
  svg {
    path {
      fill: red;
    }
  }
}
</style>