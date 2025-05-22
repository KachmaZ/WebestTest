import type { TenderDetailResponse, TenderListResponse } from "@/types";

const BASE_URL = 'https://api.test-webest.ru';

export async function fetchTenders(page = 1): Promise<TenderListResponse> {
  try {
    const response = await fetch(`${BASE_URL}/list/?page=${page}`);
    if (!response.ok) throw new Error('Ошибка при загрузке тендеров');
    
    const result = await response.json()
    result.data = result.data.slice(0, 30)

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchTenderById(id: number): Promise<TenderDetailResponse> {
  try {
    const response = await fetch(`${BASE_URL}/element/?id=${id}`);
    if (!response.ok) throw new Error('Ошибка при загрузке тендера');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}