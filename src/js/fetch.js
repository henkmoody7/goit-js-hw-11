import axios from 'axios';

export async function fetchImages(input) {
  const URL = 'https://pixabay.com/api/';
  const KEY = '29837109-1b31a6b22486f7808d21a2500';
  const params = 'image_type=photo&orientation=horizontal&safesearch=true';
  const prom = await axios.get(`${URL}?key=${KEY}&q=${input}&${params}`);
  return prom.data;
}
