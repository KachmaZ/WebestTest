<template>
  <div class="tender-list">
    <TenderSearch v-model:query="searchQuery" :foundCount="filteredTenders.length"/>

    <Transition name="fade-list" mode="out-in">
      <div v-if="tenders.length > 0" class="tender-list_grid" :key="currentPage">
        <TenderCard
          v-for="tender in filteredTenders"
          :key="tender.id"
          :tender="tender"
          @click="onCardClick(tender.id)"
        />
      </div>
      <div v-else class="tender-list_grid"></div>
    </Transition>

    <Paginator
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="onPageChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import TenderCard from '@/components/TenderCard.vue';
import Paginator from '@/components/Paginator.vue';
import { fetchTenders } from '@/api/tenderService';
import type { Tender } from '@/types/tender';
import TenderSearch from '@/components/TenderSearch.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tenders = ref<Tender[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);

const searchQuery = ref('')

const filteredTenders = computed(() => {
    return tenders.value.filter((tender) => tender.title.includes(searchQuery.value))
})

const loadTenders = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    tenders.value = [];
    const res = await fetchTenders(currentPage.value);
    tenders.value = res.data;
    totalPages.value = res.total;
};

const onPageChanged = (page: number) => {
    currentPage.value = page;
}

const onCardClick = (tenderID: number): void => {
    router.push({name: 'TenderDetail', params: {id: tenderID}})
}

watch([currentPage], loadTenders);

onMounted(loadTenders);
</script>

<style scoped lang="scss">
.tender-list {
    min-height: 100vh;
    overflow: scroll;
    padding: 20px;

    &_grid {
        min-height: calc(100vh - 140px);
        margin: 20px 0;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
    }
}

.fade-list-enter-active,
.fade-list-leave-active {
  transition: opacity 0.4s ease-out;
}

.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
}
</style>
