<script setup>
import { useFoodStore } from '~/stores/food.js';
import { useCartStore } from '~/stores/cart.js';

const foodStore = useFoodStore()
await foodStore.fetchMenu()

const cartStore = useCartStore()

const isAdd = ref(false)
const addToCart = (food) => {
    cartStore.addToCart(food)
    isAdd.value = true
    setTimeout(() => {
        isAdd.value = false
    }, 1500);

}
</script>
<template>
    <div v-if="isAdd" class="fixed inset-0 bg-black/50 items-center flex justify-center">
        <div class="bg-base-100 p-15 rounded-2xl"><p class="text-black font-bold">Added!</p></div>
    </div>
    <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        <div v-for="food in foodStore.items" class="border rounded-xl overflow-hidden bg-accent">
            <div>
                <img :src="food.image_url" alt="" class="w-full h-[120px]">
            </div>
            <div class="p-2 text-white flex flex-col gap-4">
                <p class="font-bold">{{ food.name }}</p>
                <p>{{ food.price }} $</p>
                <button @click="addToCart(food)" class=" btn rounded-full">add</button>
            </div>
            
        </div>
    </div>
</template>