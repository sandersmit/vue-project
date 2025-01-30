import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useDataNumberStore = defineStore({
  id: 'DataNumberStore',
  state: () => ({
    rawItems: [] as string[],
    allColumnStates: [],
    allRowStates: [],
    allNumberStates: [0, 0, 0, 0, 0],
    allNumberArrayStates: [[0]],
    allNumberRowStates: [],
    allFibStates: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
    indexOfArrRef: [],
    highlightIndexOfArrRef: [],
    highlightItemStore: true,
    loadstateStore: false,
    numberRowColState: 50,
    count: 0,
    dataPack: null
  }),
  getters: {
    getHighlight: (state) => state.highlightItemStore,
    //get the length of the last array
    getLoaderStatus: function (state) {
      console.log("show last array length:", state.allNumberArrayStates[state.allNumberArrayStates.length - 1].length == state.numberRowColState)
      // return state.allNumberArrayStates[state.allNumberArrayStates.length - 1].length == state.numberRowColState
      return state.loadstateStore
    },
    getData: function (state) {
      //{{ item != null ? item : 0 }}
      console.log(state.allNumberArrayStates.length)
      return state.allNumberArrayStates;
    }
  },

  actions: {
    toggleHighlight(arg) {
      //  this.highlightItemStore = !this.highlightItemStore;
      this.highlightItemStore = arg;
      console.log('toggleHighlight store state', this.highlightItemStore)
    },
    initAllNumberStates() {
      console.log('init')
      this.loadstateStore = false
      //empty - reset all states in store
      this.allNumberArrayStates.length = 0
      //filling initial states all 0
      for (let indexitem = 0; indexitem < this.numberRowColState; indexitem++) {
        this.allNumberArrayStates.push([])
        //if all row states are initialized 
        if (this.allNumberArrayStates.length === this.numberRowColState) {
          //set loaderstate 
          //this.loadstateStore = true
          console.log('init all colRows')
          this.initAllRowCol()
        }
      }
    },
    initAllRowCol() {
      for (let index = 0; index < this.numberRowColState; index++) {
        //this.allNumberArrayStates[index].length = this.numberRowColState
        //this.allNumberArrayStates[index].fill(0)
        // const newcollArr = []
        // newcollArr.length = this.numberRowColState
        this.allNumberArrayStates[index].length = this.numberRowColState
        //this.initAllRowColFinal()
        // {{ item != null ? item : 0 }}

        //if last array is filled with the total number set
        // if (this.allNumberArrayStates[this.allNumberArrayStates.length - 1].length == this.numberRowColState) {
        //console.log('set to true')
        // this.loadstateStore = true
        // }
      }
    },
    initAllRowColFinal() {
      for (let index = 0; index < this.numberRowColState; index++) {
        this.allNumberArrayStates[index].fill(0)
        if (index === this.numberRowColState - 1) {
          this.loadstateStore = true
        }
      }
    }
  }
})
