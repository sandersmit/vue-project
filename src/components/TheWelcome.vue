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

const itemValRef: number = ref()
const columnIndexRef: number = ref()
const rowIndexRef: number = ref()

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
  for (let indexitem = 0; indexitem < 10; indexitem++) {
    //console.log(indexitem)
    dataNumberStore.allColumnStates.push(0)
    dataNumberStore.allRowStates.push(0)
    dataNumberStore.allNumberArrayStates.push([])
  }

  for (let index = 0; index < 10; index++) {
    //push 5 rows as arrays
    for (let index2 = 0; index2 < 10; index2++) {
      dataNumberStore.allNumberArrayStates[index].push(0)
    }
    // dataNumberStore.allNumberRowStates.push([index])
    // console.log(dataNumberStore.allNumberRowStates[index].length)
  }
}

function initAllNumberRowStates(numberState: number) {
  //console.log(dataNumberStore.allNumberStates)
  dataNumberStore.allNumberRowStates.length = 0;
  console.log('initAllNumberRowStates', numberState)
  for (let index = 0; index < dataNumberStore.allNumberStates.length; index++) {
    dataNumberStore.allNumberRowStates.push([numberState])
  }
}

function checkAllRowStates(rowNumber: number) {
  // for (let index = 0; index < dataNumberStore.allRowStates.length; index++) {
  dataNumberStore.allRowStates[rowNumber]++
  //}
}

function checkAllColumnStates(colNumber: number) {
  // for (let index = 0; index < dataNumberStore.allRowStates.length; index++) {
  dataNumberStore.allColumnStates[colNumber]++

  // }
  console.log(
    'columnIndexRef.value',
    dataNumberStore.allColumnStates[columnIndexRef.value],
  )
  //console.log('checkAllColumnStates', dataNumberStore.allColumnStates[colNumber])
}

//One-Way Data Flow - emited to prop
function emitClickedPositionValue(
  argument1: number,
  //row:
  argument2: number,
  //column:
  argument3: number,
) {
  console.log('emited', argument1, argument2, argument3)
  console.log(dataNumberStore.allColumnStates[columnIndexRef.value])
  itemValRef.value = argument1
  rowIndexRef.value = argument2
  columnIndexRef.value = argument3
  checkAllRowStates(rowIndexRef.value)
  checkAllColumnStates(columnIndexRef.value)
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
  console.log(rowIndexRef.value)
  console.log(dataNumberStore.allRowStates[0])
  return dataNumberStore.allRowStates
})


const computeAllColumnStates: ComputedRef<number[]> = computed(function () {
  return dataNumberStore.allColumnStates
})

const computeCounter: ComputedRef<number> = computed(function () {
  return dataNumberStore.highlightIndexOfArrRef.length
})

// const computeCount: ComputedRef<number> = computed(function () {
//   let count = 0
//   dataNumberStore.highlightIndexOfArrRef.length = 0
//   for (let index = 0; index < dataNumberStore.indexOfArrRef.length; index++) {
//     const item = dataNumberStore.indexOfArrRef[index];
//     if (item != -1 && count < configTotal) {
//       count++
//       dataNumberStore.highlightIndexOfArrRef.push(item)
//       console.log('count', count)
//       if (count === configTotal) {
//         console.log('return')
//       }
//     } else if (item == -1 && count != configTotal) {
//       dataNumberStore.highlightIndexOfArrRef.length = 0
//       count = 0
//     }
//   }
//   return count

// })

const computeEmitedCords: ComputedRef<number[]> = computed(function () {
  // rowIndexRef.value = argument2
  // columnIndexRef.value = argument3
  return ['Y:', rowIndexRef.value, 'X:', columnIndexRef.value]
})

const computeHighlights: ComputedRef<boolean> = computed(function () {
  //console.log('total to hightlight', computeCounter.value)
  return computeCounter.value === configTotal ? true : false
})

const computeHaltCount: ComputedRef<number[]> = computed(function () {
  let countHalt: number = 0
  let flag: boolean = false
  let target: number = -1
  const haltArr: number[] = []
  // haltArr = []
  dataNumberStore.indexOfArrRef.filter(function (item, index) {
    if (item != -1) {
      countHalt++
      if (countHalt > configTotal) {
        target = item
        flag = true
        haltArr.push(item)
      }
    } else if (item === -1 && countHalt > configTotal) {
      countHalt--
    }
  })
  return haltArr
})

const computeNumberArray: ComputedRef<boolean> = computed(function () {
  return dataNumberStore.allNumberArrayStates

})

//watchers
watch(
  [computeHighlights, computeCounter, computeHaltCount, computeAllRowStates],
  () => {
    //console.log('watcher')
  },
)

onMounted(() => {
  initAllNumberStates()
  // initAllNumberRowStates()
  console.log(dataNumberStore.allColumnStates.length)
  //console.log(dataNumberStore.allNumberStates)
})
</script>

<template>
  the welcome component:<br />
  <!-- compute all states: {{ computeAllColumnStates }} <br> -->
  computeAllRowStates( {{ computeAllRowStates.length }} ):
  {{ computeAllRowStates }} <br />
  compute all column states ( {{ computeAllColumnStates.length }} ):
  {{ computeAllColumnStates }} <br />
  computeNumberArray: {{ computeNumberArray }}<br>
  <br>
  <!-- dataNumberStore.allNumberArrayStates:{{ dataNumberStore.allNumberArrayStates }} <br> -->

  <!-- compute all rows ({{ dataNumberStore.allNumberRowStates.length }}) : {{ dataNumberStore.allNumberRowStates }}<br> -->

  <!-- computeHighlights (counter) {{ computeHighlights }} <br> -->

  <!-- computeCounter ? : {{ computeCounter }} <br> -->

  <!-- computeCount ? : {{ computeCount }} <br> -->

  <!-- computeHaltCount X : {{ computeHaltCount }} <br> -->

  highlightIndexOfArrRef : {{ dataNumberStore.highlightIndexOfArrRef }} <br />

  <!-- <ul>
    <li v-for="item in dataNumberStore.allNumberStates" :key="item">
      repeat {{ item }}
    </li>
  </ul> -->

  <button @click="reset()">Reset all nummbers</button>
  <section>
    total rows: {{ computeAllRowStates.length }} <br />
    1e row in rows state {{ computeAllRowStates[0] }}<br />
    coordinates (Y): {{ computeEmitedCords[1] }} <br />
    coordinates (X): {{ computeEmitedCords[3] }} <br />
    <!-- <div class="row" v-for="(item1, index1) in 10" :key="index1">
      {{ item1 }} -->
    {{ dataNumberStore.allRowStates[rowIndexRef] }}<br />
    {{ rowIndexRef }}
    ?{{ dataNumberStore.allRowStates[rowIndexRef] === 2 ? true : false }}
    <br />
    <br />

    <!-- <CellItem v-for="(item, index) in computeAllRowStates" :key="index"
      :item-Prop="index === computeEmitedCords[1] ? [item, computeEmitedCords[3]] : [item]" :index-Row-Prop="index"
      :highlights-Prop="computeHighlights" :halt-Prop="computeHaltCount" :index-Column-Prop="columnIndexRef"
      :counter-Prop="computeCounter" :clicked-Colpos-Prop="columnIndexRef" :clicked-Coordx-Prop="computeEmitedCords[3]"
      :clicked-Rowpos-Prop="rowIndexRef" @emit-clicked-position-value="emitClickedPositionValue">
      <template #icon>
        <DocumentationIcon />
      </template>
<template #heading>Documentation</template>
<template #content>
        Vue’s
        <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
        provides you with
      </template>
all information you need to get started.
</CellItem> -->

    <CellItem v-for="(item, index) in dataNumberStore.allNumberArrayStates" :key="index" :item-Prop="item"
      :highlights-Prop="computeHighlights" @emit-clicked-position-value="emitClickedPositionValue">
    </CellItem>
    <!-- </div> -->
  </section>
</template>
<style scoped>
section {
  .row {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
