<script setup>
import Loading from '~/components/loading.vue'

const kitchenStore = useKitchenStore()
onMounted(() => {
    kitchenStore.fetchKitchenOrders()
})
const isDone = ref(false)
const updateOrder = async (orderId) => {
    await kitchenStore.updateKitchenOrder(orderId)
    isDone.value = true
    setTimeout(() => {
        isDone.value = false
    }, 2000);
}
</script>
<template>
    <Loading v-if="kitchenStore.loading"/>
    <div v-if="isDone" class="fixed inset-0 bg-black/50 items-center flex justify-center rounded-2xl">
        <div class="bg-base-100 p-10 "><p>Done !</p></div>
    </div>
    <div class="w-full text-center p-5">
        <p class="text-3xl font-bold">Orderra Kitchen</p>
    </div>
    <div class="mx-auto p-7 w-full flex flex-col gap-5">
        <div v-for="order in kitchenStore.items"
            class="bg-base-200 rounded-xl px-10 py-5 border w-full flex flex-row items-center justify-between gap-3">
            <div class="w-full">
                <div>
                    <p>TABLE : {{ order.table_id }}</p>
                </div>
                <div>
                    <p>STATUS : {{ order.status }}</p>
                </div>
                <div>
                    <p>MENU : </p>
                </div>
                <div class="flex p-4 w-full justify-between" v-for="item in order.items">
                    <div>
                        <p>{{ item.menu_id }} x {{ item.quantity }}</p>
                        <div v-if="item.note != null">
                            <p>NOTE : {{ item.note }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button @click="updateOrder(order.id)" class="btn btn-secondary">DONE</button>
            </div>
        </div>
    </div>
</template>