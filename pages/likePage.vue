<template>
    <div class="like-wrap">
        <div class="container">
            <Card v-for="item in store?.like" :key="item" :product="item"/>
        </div>
    </div>
</template>

<script setup>
import {useStore} from "~/store/store"
const store = useStore()
</script>

<style lang="scss" scoped>
.like-wrap {
    margin-top: 50px;
    .container {
        
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        justify-content: center;
    }
}
</style>