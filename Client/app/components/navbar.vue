<script setup>
import { useCartStore } from '~/stores/cart.js';
const cartStore = useCartStore()
onMounted(() => {
    cartStore.load()
})

const cartOpen = ref(false)
const toggleCart = () => {
    cartOpen.value = true
}
const closeCart = () => {
    cartOpen.value = false
}

</script>
<template>
    <div class="w-full fixed top-0 left-0 p-5 flex border-b bg-base-100 justify-between">
        <div class="text-center">
            <p class="text-3xl font-bold">Orderra</p>
        </div>
        <div class="relative">
            <div v-if="cartStore.totalItem != 0" class="absolute badge badge-ghost bottom-6 left-10">
                {{ cartStore.totalItem }}
            </div>
            <button @click="toggleCart" class="btn btn-base-300 rounded-full"><img src="../assets/shopping-cart.png"
                    class="w-[32px] h-[32px]" alt=""></button>
        </div>
    </div>

    <div v-if="cartOpen" class="fixed top-0 left-0 w-full h-screen bg-base-100 px-5 py-20 flex flex-col gap-5">
        <div @click="closeCart" class="fixed top-5 right-5 cursor-pointer">X</div>
        <div v-for="item in cartStore.items" class="border rounded-md bg-base-200 flex flex-row gap-5 p-3">
            <div class="w-1/3">
                <p>{{ item.name }}</p>
            </div>
            <div class="w-1/3">
                <p>{{ item.price }}</p>
            </div>
            <div class="w-1/3">
                <p>{{ item.quantity }}</p>
            </div>
            <button @click="cartStore.removeById(item.menuId)" class="btn">ลบ</button>
        </div>
        <button @click="cartStore.createOrder()" class="btn btn-secondary text-white">Comfirm Order</button>
    </div>
</template>