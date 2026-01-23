<script setup>
import FoodCard from '~/components/foodCard.vue';
import Loading from '~/components/loading.vue';

const cartStore = useCartStore()
const foodStore = useFoodStore()
</script>

<template>
    <NuxtLayout>
        <Loading v-if="cartStore.loading || foodStore.loading" />
        <div class="px-8 py-30">
            <FoodCard></FoodCard>
        </div>
    </NuxtLayout>
</template>