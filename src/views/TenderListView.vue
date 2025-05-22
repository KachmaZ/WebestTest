<template>
    <div class="tender-list">
        <TenderSearch v-model:query="searchQuery" :foundCount="filteredTenders.length"/>

          <div v-if="isLoading" class="tender-list_loading">
            <Loader />
          </div>
          <Transition v-else name="fade-list" mode="out-in">
              <div v-if="filteredTenders.length > 0 && isVisible" class="tender-list_grid" :key="currentPage + '-' + isVisible">
                  <TenderCard
                    v-for="tender in filteredTenders"
                    :key="tender.id"
                    :tender="tender"
                    @click="onCardClick(tender.id)"
                  />
              </div>
          </Transition>

          <Paginator
            v-model="currentPage"
            :totalPages="totalPages"
          />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import TenderCard from '@/components/TenderCard.vue';
import Paginator from '@/components/Paginator.vue';
import Loader from '@/components/Loader.vue';
import { fetchTenders } from '@/api/tenderService';
import type { Tender } from '@/types/tender';
import TenderSearch from '@/components/TenderSearch.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tenders = ref<Tender[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);

const isVisible = ref(true);
const isLoading = ref(false); 

const searchQuery = ref('')

const filteredTenders = computed(() => {
    return tenders.value.filter((tender) => tender.title.includes(searchQuery.value))
})

const loadTenders = async () => {
    if (isLoading.value) return

    isVisible.value = false; // запускаем анимацию исчезновения
    await nextTick();
  
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(async () => {
      isLoading.value = true;
      tenders.value = [];

      const res = await fetchTenders(currentPage.value);
      tenders.value = res.data;
      totalPages.value = res.total;

      isLoading.value = false;
      await nextTick();
      isVisible.value = true; // запускаем появление новых карточек
    }, 400)
};

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

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &_grid {
        min-height: calc(100vh - 140px);
        margin: 20px 0;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
    }

    &_loading {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
}

.fade-list-enter-active,
.fade-list-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-list-enter-from {
  opacity: 0;
  transform: translateY(20px); // появляется снизу вверх
}

.fade-list-leave-to {
  opacity: 0;
  transform: translateY(20px); // уходит вниз
}
</style>
