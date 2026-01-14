export const useFoodStore = defineStore('food',{
    state: () => ({
        items: [],
        loading: false
    }),

    actions: {
        async fetchMenu () {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const res = await $fetch(`${config.public.apiBase}/api/menu`)
                this.items = res.data
            } catch (error) {
                console.error('FETCH MENU ERROR',error)
            } finally {
                this.loading = false
            }
        }
    }
})