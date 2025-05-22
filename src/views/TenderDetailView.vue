<template>
    <div class="tender-detail">
        <button class="tender-detail_back" @click="goBack">Назад</button>
        <div v-if="isLoading" class="tender-detail_loading"><Loader /></div>
        <Transition name="fade-detail" mode="out-in">
            <div v-if="tender" class="tender-detail_content">
                <h1>{{ tender.title }}</h1>
                <p>{{ tender.description }}</p>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchTenderById } from '@/api/tenderService';
import type { Tender } from '@/types/tender';
import Loader from '@/components/Loader.vue';

const props = defineProps<{
    id: string
}>()

const router = useRouter();
const tender = ref<Tender | null>(null);

const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true;
    await nextTick();
    tender.value = await fetchTenderById(props.id);
    await nextTick();
    isLoading.value = false;
});

const goBack = () => {
  router.push('/');
}
</script>

<style scoped lang="scss">
.tender-detail {
  width: 100%;
  padding: 20px;

  &_back {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_loading {
    height: calc(100vh - 90px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.fade-detail-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-detail-enter-from {
  opacity: 0;
  transform: translatex(200px);
}
</style>
