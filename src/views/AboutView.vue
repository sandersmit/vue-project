<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
</script>
<template>
  <div class="page">
    <!-- <HelloWorld msg="Frontend Challenge: Interactive Grid" /> -->
    <h1>The Challenge</h1>

    <p>
      Build a web page with a 50x50 grid of interactive cells.
    </p>
    <h2>Behaviour</h2>
    <ul>
      <li>
        <span> Initial State:</span> All cells start empty (value of 0).
      </li>
      <li>
        <span> Click Action: </span> When a user clicks on a cell:
        <ul>
          <li>
            <span> Increment: </span> Increase the value of all cells in the same row and column by 1.
          </li>

          <li>
            <span> Empty Cells:</span> If a cell was empty (value 0), set its value to 1.
          </li>
          <li>
            <span> Visual Feedback:</span> Briefly highlight the affected cells in lightgreen, then fade to
            original style.
          </li>
        </ul>
      </li>
      <li>
        <span> Fibonacci Check:</span> After each click, check for 5 consecutive cells (horizontally or vertically)
        that.
      </li>
      <li>
        <span> Fibonacci Highlight:</span> If found, briefly highlight these cells in green.
      </li>
      <li>
        <span>Reset: </span> Then, reset the value of these cells back to 0 (empty).
        that.
      </li>
    </ul>
  </div>
</template>

<style>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    margin-top: 1rem;
    color: rgb(10, 169, 116);
  }

  span {
    font-weight: 600;
  }
}
</style>
