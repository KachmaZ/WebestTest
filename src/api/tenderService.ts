const BASE_URL = 'https://api.test-webest.ru';

export async function fetchTenders(page = 1) {
  try {
    const response = await fetch(`${BASE_URL}/list/?page=${page}`);
    if (!response.ok) throw new Error('Ошибка при загрузке тендеров');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchTenderById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/element/?id=${id}`);
    if (!response.ok) throw new Error('Ошибка при загрузке тендера');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}