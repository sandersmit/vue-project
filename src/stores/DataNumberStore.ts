import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useDataNumberStore = defineStore({
  id: 'DataNumberStore',
  state: () => ({
    rawItems: [] as string[],
    allColumnStates: [],
    allRowStates: [],
    allNumberStates: [0, 0, 0, 0, 0],
    allNumberRowStates: [],
    allFibStates: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
    indexOfArrRef: [],
    highlightIndexOfArrRef: [],

  }),
  getters: {
    items: (state): Array<{ name: string; amount: number }> =>
      state.rawItems.reduce((items, item) => {
        const existingItem = items.find((it) => it.name === item)

        if (!existingItem) {
          items.push({ name: item, amount: 1 })
        } else {
          existingItem.amount++
        }

        return items
      }, [] as Array<{ name: string; amount: number }>),
  },
  actions: {
    addItem(name: string) {
      this.rawItems.push(name)
    },

    removeItem(name: string) {
      const i = this.rawItems.lastIndexOf(name)
      if (i > -1) this.rawItems.splice(i, 1)
    },

    async purchaseItems() {
      const user = useUserStore()
      if (!user.name) return

      console.log('Purchasing', this.items)
      const n = this.items.length
      this.rawItems = []

      return n
    },
  }
})
