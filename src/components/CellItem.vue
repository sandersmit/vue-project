<script setup lang="ts">
import { ref, reactive, computed, watch, ComputedRef, onMounted } from 'vue'
import { useDataNumberStore } from '../stores/DataNumberStore';

const props = defineProps<{
  indexRowProp: number
  itemProp: number
  highlightsProp: boolean
  counterProp: number
  haltProp: number[]
  indexColumnProp: number
  clickedColposProp: number
  clickedRowposProp: number
}>()

const dataNumberStore = useDataNumberStore();
//const indexNumbPropRef = ref(props.indexNumbProp)

const itemindexRef: number = ref()

//define emits 
const emitClickedPos = defineEmits(['emit-clicked-position-value'])

function defaultCount(arg, arg2) {
  //count +1
  //dataNumberStore.allNumberStates[props.indexRowProp]++
  console.log(
    'arg?', arg,
    'arg2?', arg2,
    'count itemProp', dataNumberStore.allRowStates[props.indexRowProp],
    'item in row index ', props.indexRowProp,
    'item in comlumn index', props.indexColumnProp
  )

  emitClickedPos('emit-clicked-position-value',
    dataNumberStore.allNumberStates[props.indexRowProp],
    props.indexRowProp,
    arg2)
  // indexNumbPropRef.value++
  //newFibNumb++ next if true then ++ to next check
}

// const computeNumberState: ComputedRef<number> = computed(function () {
//   return dataNumberStore.allNumberStates[props.indexRowProp]
//   //return indexNumbPropRef.value
// })


const computeAllRowStates: ComputedRef<number[]> = computed(function () {
  return dataNumberStore.allRowStates
  //return indexNumbPropRef.value
})

const computeAllColumnStates: ComputedRef<number[]> = computed(function () {
  return dataNumberStore.allColumnStates
  //return indexNumbPropRef.value
})



// const computeFebernaci: ComputedRef<boolean> = computed(function () {
//   return dataNumberStore.allFibStates.includes(computeNumberState.value) ? true : false;
// })

// const computeFilterFebernaci: ComputedRef<number[]> = computed(function () {
//   const arrayFibonaciOnly = dataNumberStore.allNumberStates.filter(
//     (item) => dataNumberStore.allFibStates.includes(item)
//   );
//   return arrayFibonaciOnly;
// })

// const computeIndexOfFebernaci: ComputedRef<number> = computed(function () {
//   return computeFebernaci.value ? props.indexRowProp : -1
// })

// const computeAddIndex: ComputedRef<number[]> = computed(function () {
//   computeFebernaci.value ? dataNumberStore.indexOfArrRef.splice(props.indexRowProp, 1, computeIndexOfFebernaci.value) : dataNumberStore.indexOfArrRef.splice(props.indexRowProp, 1, computeIndexOfFebernaci.value)
//   return dataNumberStore.indexOfArrRef
// })

// const computeHighlightedItem: ComputedRef<boolean> = computed(function () {

//   const highlightItem = dataNumberStore.highlightIndexOfArrRef.find(
//     (item) => item == props.indexRowProp
//   );
//   return highlightItem == props.indexRowProp ? true : false;
// })

// const computeAllHighlights: ComputedRef<boolean> = computed(function () {
//   return props.counterProp === 3 ? true : false
// })


// const computeHalt: ComputedRef<number[] | string> = computed(function () {
//   const findItem = props.haltProp.filter(
//     (item) => item == props.indexRowProp
//   );
//   return findItem
// })

const computeCorrection: ComputedRef<number | string> = computed(function () {
  console.log(dataNumberStore.allRowStates[props.clickedRowposProp] - 1)
  dataNumberStore.allRowStates[props.clickedRowposProp] - 1
  return dataNumberStore.allRowStates[props.clickedRowposProp] - 1
})


///watchers
// watch([computeFebernaci, computeHalt], () => {
//   //console.log('watcher')
// })
</script>

<template>


  <!-- <br>Compute all indexes {{ computeAll }} 
  only show indexOf array dataNumberStore.allNumberStates: {{ dataNumberStore.indexOfArrRef[props.indexNumbProp] }}<br>
  index : {{ props.indexNumbProp }}<br>
  Highlight all ?{{ props.highlightsProp }}<br>
  props.haltProp {{ props.haltProp }}<br>-->
  <!-- computeAllHighlights {{ computeAllHighlights }}<br> -->
  <!-- computeFebernaci : {{ computeFebernaci }}<br> -->
  <!-- filter : {{ computeFilterFebernaci }}<br> -->
  <!-- indexOf: {{ computeIndexOfFebernaci }}<br> -->
  <!-- indexOfArrRef: {{ computeAddIndex }}<br> -->
  <!-- halt this item: {{ computeHalt }}<br> -->
  <!-- computeHighlightedItem : {{ computeHighlightedItem }} -->

  computeCorrection: {{ computeCorrection }}<br>

  <ul>
    <li v-for="(item, itemindex) in computeAllColumnStates" :key="itemindex">
      <div class="item">
        <!-- <a class="number green" @click="defaultCount(props.itemProp, itemindex)"
          v-if="itemindex === props.changeColumnProp">
          {{ dataNumberStore.allRowStates[itemindex] + dataNumberStore.allColumnStates[itemindex] }}
        </a> -->
        <!-- <a class="number green" @click="defaultCount(props.itemProp, itemindex)"
          v-else-if="dataNumberStore.allRowStates[itemindex] > 0">
          {{ dataNumberStore.allRowStates[itemindex] + dataNumberStore.allColumnStates[itemindex] }}
        </a> -->
        <!-- <a v-if="props.indexRowProp === itemindex" class="number green" :class="{
          greenAttention: (props.itemProp + dataNumberStore.allColumnStates[itemindex]) ===
            dataNumberStore.allFibStates[itemindex]
        }" @click="defaultCount(props.itemProp, itemindex)">
          ?
        </a> -->
        <!-- {{ item }} -->
        <!-- {{ itemindex }}
        {{ props.indexRowProp }} -->
        <!-- {{ props.indexColumnProp }} -->
        {{ props.clickedRowposProp === itemindex ? true : '' }}

        <a v-if="itemindex === item && props.indexRowProp === props.itemProp" class="number green" :class="{
          greenAttention: (props.itemProp + dataNumberStore.allColumnStates[itemindex]) ===
            dataNumberStore.allFibStates[itemindex]
        }" @click="defaultCount(props.itemProp, itemindex)">
          <!-- {{ itemindex }}
          {{ props.itemProp }} -->
          <!-- {{ computeAllRowStates[itemindex] }}
          {{ computeAllColumnStates[itemindex] }} -->
          <!-- {{ itemindex === props.indexColumnProp ? true : '' }} -->
          4
        </a>
        <a v-else-if="itemindex == props.clickedColposProp" class="number green" :class="{
          greenAttention: (props.itemProp + dataNumberStore.allColumnStates[itemindex]) ===
            dataNumberStore.allFibStates[itemindex]
        }" @click="defaultCount(props.itemProp, itemindex)">
          <!-- {{ computeCorrection }} -->
          {{ props.clickedRowposProp }}
          {{ props.clickedColposProp }}
        </a>
        <a v-else class="number green" :class="{
          greenAttention: (props.itemProp + dataNumberStore.allColumnStates[itemindex]) ===
            dataNumberStore.allFibStates[itemindex]
        }" @click="defaultCount(props.itemProp, itemindex)">
          {{ props.itemProp + item }}
        </a>
      </div>
    </li>
  </ul>
  <!-- <div class="item">
    <a class="number green" :class="`${indexRowProp}`, { all: computeHighlightedItem }"
      @click="defaultCount(props.itemProp)">
      {{ computeNumberState }} -->
  <!-- <i :class="{ greenAttention: computeFebernaci, all: computeHighlightedItem }">
        <slot name="icon">
        </slot>
      </i> -->
  <!-- </a>
    <br> -->



  <!-- <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot name="content"></slot>
      <slot></slot>
    </div> -->
  <!-- </div> -->
</template>

<style scoped lang="scss">
ul {
  display: flex;

  li {
    list-style: none;
  }
}

.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
  text-align: center;

  a {
    cursor: pointer;
    //font-size: 1rem;
    //min-width: 44px;
    font-size: 1.5rem;
    min-width: 44px;
    border: solid 1px;

    &.green {
      color: rgb(3, 130, 88);
      transition: 0.4s;

      &.greenAttention {
        color: rgb(11, 243, 165);
        transition: 0.4s;
      }

      i {
        color: rgb(3, 130, 88);

        &.greenAttention {
          color: rgb(11, 243, 165);
          transition: 0.4s;

          border: 1px solid rgb(3, 130, 88);

          &.all {
            color: rgb(11, 243, 165);
            transition: 0.4s;
            border: 1px solid rgb(11, 243, 165);

            &.halt {
              border: 1px solid rgb(3, 130, 88);
            }
          }
        }
      }
    }
  }
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    //padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: 20px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  i:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 50%;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
    height: 25px;
  }

  i:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);

  }

  .item:first-of-type:before {
    // display: none;
  }

  .item:last-of-type:after {
    // display: none;
  }
}
</style>
