<script setup lang="ts">
import { ref, computed, watch, ComputedRef, shallowRef, onMounted } from 'vue'
import { useDataNumberStore } from '../stores/DataNumberStore'

import CellItem from './CellItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const dataNumberStore = useDataNumberStore()

const itemValRef: number = ref(0)
const itemShallowRef: number = shallowRef(0)
const columnIndexRef: number = ref()
const rowIndexRef: number = ref()
const indexRef: number = ref(0)
const highlightRef: boolean = ref()
//shallowRef for no deep rectivity needed. 
const numberRowColRef = shallowRef(10)

// const arrShallowState: number[] = shallowRef()
const configTotal = 5

function reset() {
  console.log('reset All numbers')
  initAllNumberStates()
}

function initAllNumberStates() {
  //empty - reset all states in store
  dataNumberStore.allNumberArrayStates.length = 0
  dataNumberStore.allNumberRowStates.length = 0
  dataNumberStore.allRowStates.length = 0
  dataNumberStore.allColumnStates.length = 0

  //filling initial states all 0
  for (let indexitem = 0; indexitem < numberRowColRef.value; indexitem++) {
    //console.log(indexitem)
    dataNumberStore.allColumnStates.push(itemShallowRef)
    dataNumberStore.allRowStates.push(itemShallowRef)
    dataNumberStore.allNumberArrayStates.push([])
  }

  for (let index = 0; index < numberRowColRef.value; index++) {
    //push numberRowColRef rows as arrays
    for (let index2 = 0; index2 < numberRowColRef.value; index2++) {
      dataNumberStore.allNumberArrayStates[index].push(0)
    }
    // dataNumberStore.allNumberRowStates.push([index])
    // console.log(dataNumberStore.allNumberRowStates[index].length)
  }
}

// function initAllNumberRowStates(numberState: number) {
//   //console.log(dataNumberStore.allNumberStates)
//   dataNumberStore.allNumberRowStates.length = 0;
//   console.log('initAllNumberRowStates', numberState)
//   for (let index = 0; index < dataNumberStore.allNumberStates.length; index++) {
//     dataNumberStore.allNumberRowStates.push([numberState])
//   }
// }

// function checkAllRowStates(rowNumber: number) {
//   // for (let index = 0; index < dataNumberStore.allRowStates.length; index++) {
//   dataNumberStore.allRowStates[rowNumber]++
//   //}
// }

// function checkAllColumnStates(colNumber: number) {
//   // for (let index = 0; index < dataNumberStore.allRowStates.length; index++) {
//   dataNumberStore.allColumnStates[colNumber]++

//   // }
//   console.log(
//     'columnIndexRef.value',
//     dataNumberStore.allColumnStates[columnIndexRef.value],
//   )
//   //console.log('checkAllColumnStates', dataNumberStore.allColumnStates[colNumber])
// }

function resetHighlight() {
  highlightRef.value = false
}

//One-Way Data Flow - emited to prop
function emitClickedPositionValue(
  argument1: number,
  //row:
  //true
  argument2: boolean,
  //column:
  argument3: number,
) {
  console.log('emited', argument1, argument2, argument3)
  console.log(dataNumberStore.allColumnStates[columnIndexRef.value])
  indexRef.value = argument1
  //rowIndexRef.value = argument2

  columnIndexRef.value = argument3
  // checkAllRowStates(rowIndexRef.value)
  // checkAllColumnStates(columnIndexRef.value)
}

function emitHighLightValue(argument) {
  console.log('highlight Emit Send recieved', argument)
  highlightRef.value = argument
  setTimeout(resetHighlight, 700);
}





const computeAllRowStates: ComputedRef<number[]> = computed(function () {
  //trigger once : on single change in dataNumberStore.allNumberRowStates state
  // dataNumberStore.allNumberRowStates.length = 0;

  //for (let index = 0; index < dataNumberStore.allNumberRowStates.length; index++) {
  // for (let index = 0; index < 10; index++) {
  //   dataNumberStore.allNumberRowStates[index].push(0)
  // }
  //console.log(dataNumberStore.allNumberRowStates[index])
  //dataNumberStore.allNumberRowStates[index].push(dataNumberStore.allNumberStates[index])
  //}
  // dataNumberStore.allNumberStates.forEach((index, element) => {
  //   dataNumberStore.allNumberRowStates[index].push([element])
  // });
  //return dataNumberStore.allNumberRowStates
  // console.log(rowIndexRef.value)
  // console.log(dataNumberStore.allRowStates[0])
  return dataNumberStore.allRowStates
})

const computehighlightStates: ComputedRef<boolean> = computed(function () {
  return highlightRef.value
})

const computeAllColumnStates: ComputedRef<number[]> = computed(function () {
  return dataNumberStore.allColumnStates
})

const computeCounter: ComputedRef<number> = computed(function () {
  return dataNumberStore.highlightIndexOfArrRef.length
})

const computeCount: ComputedRef<number> = computed(function () {
  let count = 0
  dataNumberStore.highlightIndexOfArrRef.length = 0
  for (let index = 0; index < dataNumberStore.indexOfArrRef.length; index++) {
    const item = dataNumberStore.indexOfArrRef[index];
    if (item != -1 && count < configTotal) {
      count++
      dataNumberStore.highlightIndexOfArrRef.push(item)
      console.log('count', count)
      if (count === configTotal) {
        console.log('return')
      }
    } else if (item == -1 && count != configTotal) {
      dataNumberStore.highlightIndexOfArrRef.length = 0
      count = 0
    }
  }
  return count
})

// const computeEmitedCords: ComputedRef<number[]> = computed(function () {
//   // rowIndexRef.value = argument2
//   // columnIndexRef.value = argument3
//   return ['Y:', rowIndexRef.value, 'X:', columnIndexRef.value]
// })

const computeHighlights: ComputedRef<boolean> = computed(function () {
  //console.log('total to hightlight', computeCounter.value)
  return computeCounter.value === configTotal ? true : false
})

// const computeHaltCount: ComputedRef<number[]> = computed(function () {
//   let countHalt: number = 0
//   let flag: boolean = false
//   let target: number = -1
//   const haltArr: number[] = []
//   // haltArr = []
//   dataNumberStore.indexOfArrRef.filter(function (item, index) {
//     if (item != -1) {
//       countHalt++
//       if (countHalt > configTotal) {
//         target = item
//         flag = true
//         haltArr.push(item)
//       }
//     } else if (item === -1 && countHalt > configTotal) {
//       countHalt--
//     }
//   })
//   return haltArr
// })

const computeNumberArray: ComputedRef<boolean> = computed(function () {
  return dataNumberStore.allNumberArrayStates

})

//watchers
watch(
  [computeCounter],
  () => {
    //console.log('watcher')
  },
)

onMounted(() => {
  initAllNumberStates()
  // initAllNumberRowStates()
  //console.log(dataNumberStore.allColumnStates.length)
  //console.log(dataNumberStore.allNumberStates)
})
</script>

<template>
  <div class="page">
    <h1>Frontend Challenge: Interactive Grid</h1>
    <ul>
      <li>
        Total rows: <span>{{ computeAllRowStates.length }}</span>
      </li>
      <li>
        Total numbers : <span>{{ computeAllColumnStates.length * computeAllRowStates.length }}</span>
      </li>
      <li>
        Fibonacci numbers<span v-for="(item, index) in dataNumberStore.allFibStates" :key="index"> - {{ item }} </span>
      </li>
      <li>
        <button @click="reset()">Reset all nummbers</button>
      </li>
    </ul>
  </div>
  <!-- {{ dataNumberStore.highlightItemStore }} -->
  {{ dataNumberStore.getHighlight }}
  {{ computehighlightStates }}
  <section>
    <CellItem v-for="(item, index) in dataNumberStore.allNumberArrayStates" :key="index" :item-Prop="item"
      :item-Index-Ref-Prop="indexRef" :highlight-Prop="computehighlightStates"
      @emit-clicked-position-value="emitClickedPositionValue" @emit-highlight-value="emitHighLightValue">
    </CellItem>
  </section>
</template>
<style scoped>
.page {
  display: flex;

  ul {
    display: flex;
    list-style: none;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    padding-inline-start: 0px;

    li {
      padding: 1rem;
    }

    span {
      color: rgb(11, 243, 165);
    }
  }
}

@media (min-width: 1024px) {
  .page {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

}

section {
  .row {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
