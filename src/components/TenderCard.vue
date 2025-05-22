<template>
  <div class="tender-card">
    <h3>{{ tender.title }}</h3>
    <p>{{ tender.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Tender } from '@/types/tender';

defineProps<{
  tender: Tender;
}>();
</script>

<style scoped lang="scss">
.tender-card {
  max-height: 500px;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;

  overflow: scroll;
}
</style>
