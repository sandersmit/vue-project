<script setup lang="ts">
import { ref, computed, watch, ComputedRef, shallowRef, onMounted, onBeforeMount, onBeforeUpdate, onActivated, onUpdated, onUnmounted } from 'vue'
import { useDataNumberStore } from '../stores/DataNumberStore'

import CellItem from './CellItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { storeToRefs } from 'pinia'

const dataNumberStore = useDataNumberStore()

const itemValRef: number = ref(0)
const itemShallowRef: number = shallowRef(0)
const columnIndexRef: number = ref()
const rowIndexRef: number = ref()
const indexRef: number = ref(0)
const highlightRef: boolean = ref()
const testing: boolean = ref()

// const arrShallowState: number[] = shallowRef()
//const configTotal = 5

function reset() {
  console.log('reset All numbers')
  // dataNumberStore.initAllNumberStates()
  dataNumberStore.initAllRowColFinal()
}

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


const computeCounter: ComputedRef<number> = computed(function () {
  return dataNumberStore.highlightIndexOfArrRef.length
})

const computeLoaderStore: ComputedRef<boolean> = computed(function () {
  console.log('computeLoaderStore', dataNumberStore.getLoaderStatus)
  return dataNumberStore.getLoaderStatus
})


//watchers
watch(
  [computeCounter],
  () => {
    //console.log('watcher')
  },
)

onMounted(() => {
  console.log("onMounted TheWelcome.vue")
  //dataNumberStore.initAllNumberStates()
  //dataNumberStore.initAllRowColFinal()
})

</script>

<template>
  <div class="page">
    <h1>Frontend Challenge: Interactive Grid</h1>
    <ul>
      <li>
        <span v-if="!computeLoaderStore">
          loading...
        </span>
        <span v-else>
          loaded
        </span>
      </li>
      <li>
        Total rows: <span>{{ dataNumberStore.numberRowColState }}</span>
      </li>
      <li>
        Total numbers : <span>{{ dataNumberStore.allNumberArrayStates.length *
          dataNumberStore.numberRowColState }}</span>
      </li>
      <li>
        Fibonacci numbers<span v-for="(item, index) in dataNumberStore.allFibStates" :key="index"> - {{ item }} </span>
      </li>
      <li>
        <button @click="reset()">Reset all nummbers</button>
      </li>
    </ul>
  </div>

  <!-- <section class="loadContainer">
    <button @click="dataNumberStore.initAllRowColFinal()">Show data</button>
    <div v-if="!dataNumberStore.getLoaderStatus">Loading..</div>
    <div v-else>Loaded</div>
  </section> -->
  <selection>
    <CellItem v-for="(item, index) in dataNumberStore.getData" :key="index" :item-Prop="item"
      :item-Index-Ref-Prop="indexRef" @emit-clicked-position-value="emitClickedPositionValue"
      @emit-highlight-value="emitHighLightValue">
    </CellItem>
  </selection>
</template>
<style scoped>
.loadContainer {
  display: flex;
  justify-content: center;
  height: 100vh;
  font-size: 2rem;
  color: rgb(11, 243, 165);
  justify-content: center;
  align-items: center;
}

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
