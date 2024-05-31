import axios from 'axios';

export async function getPhotos(input, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '20488832-3f7ee310b3351fba3525ae600',
    q: input,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: '15',
  });

  try {
    const result = await axios.get(`${BASE_URL}?${params}`);
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
