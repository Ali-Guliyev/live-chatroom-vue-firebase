<template>
  <div
    class="spinner"
    :style="{ width: width + 'px', height: width + 'px' }"
  ></div>
</template>

<script>
export default {
  props: ["width"],
};
</script>

<style>
.spinner {
  border: 4px solid transparent;
  border-top-color: #4fc7b1;
  border-radius: 50%;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
