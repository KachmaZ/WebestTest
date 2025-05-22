<template>
  <div class="paginator">
    <button @click="() => currentPage--" :disabled="currentPage === 1">Назад</button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button @click="currentPage++" :disabled="currentPage === totalPages">Вперёд</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalPages: number;
}>();

const currentPage = defineModel<number>('modelValue', {required: true})

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
