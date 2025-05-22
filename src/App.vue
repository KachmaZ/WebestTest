<template>
  <RouterView  v-slot="{ Component }">
    <Transition name="fade-page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
</style>
