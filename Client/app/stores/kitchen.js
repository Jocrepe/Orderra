export const useKitchenStore = defineStore('kitchen',{
    state: () => ({
        items: [],
        loading: false
    }),
    actions: {
        async fetchKitchenOrders() {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const res = await $fetch(`${config.public.apiBase}/api/kitchen`, {
                    method: 'GET'
                })
                this.items = res.data
            } catch (error) {
                console.error('FETCH ORDERS ERROR', error)
            } finally {
                this.loading = false
            }
        },
        async updateKitchenOrder(orderId) {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                await $fetch(`${config.public.apiBase}/api/kitchen/${orderId}`, {
                    method: 'PATCH'
                })
                await this.fetchKitchenOrders()
            } catch (error) {
                console.error(error)
            } finally {
                this.loading = false
            }
        }
    }
})