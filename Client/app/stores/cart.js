export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        loading: false,
        tableId: 1
    }),

    getters: {
        totalItem : (state) => {
            return state.items.length
        }
    },

    actions: {
        load() {
            const data = localStorage.getItem('cart')
            if (data) {
                this.items = JSON.parse(data)
            }
        },
        save() {
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        addToCart(food) {
            const existing = this.items.find(i => i.menuId == food.id)
            if (existing) {
                existing.quantity++
            } else {
                this.items.push({
                    menuId: food.id,
                    name: food.name,
                    price: food.price,
                    quantity: 1
                })
            }
            this.save()
            console.log(this.items)
        },
        removeById(menuId) {
            this.items = this.items.filter(item => item.menuId !== menuId)
            this.save()
        },
        clearCart() {
            localStorage.removeItem('cart')
            this.items = []
        },
        async createOrder() {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                await $fetch(`${config.public.apiBase}/api/orders`, {
                    method: 'POST',
                    body: {
                        tableId : this.tableId,
                        items : this.items
                    }
                })
                this.clearCart()
            } catch (error) {
                console.error('CREATE MENU ERROR', error)
            } finally {
                this.loading = false
            }
        }
    }
})