<template>
  <div>
    <div v-if="categoryOpen" class="overlay"></div>
    <header class="relative bg-white">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </NuxtLink>
        </div>

        <button @click="categoryOpen = !categoryOpen">categorys</button>
        <button class="ml-[10px]" @click="translateSearch = 3">
          <svg
            style="width: 25px"
            enable-background="new 0 0 32 32"
            id="Glyph"
            version="1.1"
            viewBox="0 0 32 32"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
              stroke="#4f46e5"
              fill="#4f46e5"
              id="XMLID_223_"
            />
          </svg>
        </button>

        <div
          class="search-input relative"
          :style="{ top: translateSearch + '%' }"
        >
          <input type="text" placeholder="search..." @input="search()" v-model="searchVal"/>
          <span
            @click="translateSearch = -100"
            style="font-size: 20px; cursor: pointer"
            class="absolute top-[-4px] right-[15px]"
            >x</span
          >

          <div class="search-list mb-[-100px]">
             <ul>
               <li v-for="item in searchList?.products" :key="item">
               <NuxtLink :to="`/product/${item?.id}`">
               {{ item?.title }}
               </NuxtLink>
               </li>
             </ul>
          </div>
        </div>

        <div
          class="hidden flex items-center gap-4 lg:flex lg:flex-1 lg:justify-end"
        >
          <NuxtLink class="relative" to="/likePage"
            ><svg
              style="width: 20px"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                stroke="#4f46e5"
                fill="#fff"
                stroke-width="30px"
              />
            </svg>

            <span
              style="font-size: 10px"
              class="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-indigo-600 text-white absolute top-0 right-0 translate-x-[50%] translate-y-[-50%]"
              >{{ store.like.length }}</span
            >
          </NuxtLink>

          <NuxtLink
            to="/cart"
            class="relative text-sm font-semibold leading-6 w-[20px] h-[20px] text-gray-900"
          >
            <span
              style="font-size: 10px"
              class="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-indigo-600 text-white absolute top-0 right-0 translate-x-[50%] translate-y-[-50%]"
              >{{ cartCount }}</span
            >
            <cart-icon />
          </NuxtLink>
        </div>
      </nav>
      <!-- Mobile menu, show/hide based on menu open state. -->
      <div
        v-if="categoryOpen"
        id="tabs-1-panel-2"
        aria-labelledby="tabs-1-tab-2"
        role="tabpanel"
        tabindex="0"
      >
        <div
          style="box-shadow: 1px 1px 10px 3px #c9c9c9"
          class="shadow-md space-y-10 z-10 bg-white px-4 pb-8 pt-10 absolute top-[0] left-0 w-full"
        >
          <button @click="categoryOpen = !categoryOpen" class="close">x</button>
          <ul
            role="list"
            aria-labelledby="men-clothing-heading-mobile"
            class="header-nav mx-auto grid grid-cols-7 items-center gap-6 space-y-6 max-w-7xl p-6 lg:px-8"
          >
            <li class="flow-root" v-for="item in categorys" :key="item">
              <NuxtLink
                style="width: 200px"
                :to="`/categorys/${item?.slug}`"
                @click="categoryOpen = false"
                class="category-link block p-2 text-gray-500 hover:text-indigo-600"
                >{{ item?.name }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </header>

    <NuxtPage />
  </div>
</template>

<script setup>
import CartIcon from "~/components/icons/CartIcon.vue";
import services from "~/services/services";
import { useStore } from "~/store/store";
const store = useStore();
const categoryOpen = ref(false);
const translateSearch = ref(-100);

const searchVal = ref("");
const searchList = ref({});

async function search() {
  const res = await services.search(searchVal.value);
  searchList.value = res;
}


const cartCount = computed(() => {
  let count = 0;
  store.cart.forEach((el) => {
    count += el.quantity;
  });
  return count;
});

const categorys = ref({});
const getCategorys = async () => {
  const res = await services.getCategorys();
  categorys.value = res;
};
onMounted(() => {
  getCategorys();
});
 search();
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 25px;
  &:hover {
    color: #4f46e5;
    transition: all 0.3s ease;
  }
}

.search-input {
  position: fixed;
  overflow: hidden;
  left: 400px;
  height: 100%;
  max-height: 300px;
  z-index: 12;
  width: 500px;
  transition: all 0.5s ease;
  border-radius: 12px;
  padding: 17px;
  background: #fff;
  border: 1px solid #d2cfcf;
  input {
    width: 70%;
    padding: 7px 10px;
    border-radius: 10px;
    border: 2px solid #4f46e5;
    outline: none;
    margin: 20px;
  }
}
.search-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>