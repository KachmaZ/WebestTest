<template>
  <div class="paginator">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Назад</button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Вперёд</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-changed', page: number): void;
}>();

function changePage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-changed', page);
  }
}
</script>

<style scoped lang="scss">
.paginator {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}
</style>
