import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useDataNumberStore = defineStore({
  id: 'DataNumberStore',
  state: () => ({
    rawItems: [] as string[],
    allColumnStates: [],
    allRowStates: [],
    allNumberStates: [0, 0, 0, 0, 0],
    allNumberArrayStates: [],
    allNumberRowStates: [],
    allFibStates: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
    indexOfArrRef: [],
    highlightIndexOfArrRef: [],
    highlightItemStore: true,
    count: 0

  }),
  getters: {
    getHighlight: (state) => state.highlightItemStore
  },

  actions: {
    toggleHighlight(arg) {
      //  this.highlightItemStore = !this.highlightItemStore;
      this.highlightItemStore = arg;
      console.log('toggleHighlight store state', this.highlightItemStore)
    },
  }
})
