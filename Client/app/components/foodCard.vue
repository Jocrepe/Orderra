<script setup>
import { useFoodStore } from '~/stores/food';

const foodStore = useFoodStore()

onMounted(async () => {
    foodStore.fetchMenu()
})
</script>
<template>
    <div class="grid grid-cols-2">
        <div v-for="food in foodStore.items">
            <p>{{ food.name }}</p>
            
        </div>
    </div>
</template>