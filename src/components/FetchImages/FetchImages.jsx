import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api/";

export async function fetchImages(inputData, page) {
    const searchParameters = new URLSearchParams({
        q: inputData,
        page,
        key: '34731135-6d68099f6d308706ad328c34f',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    })
    const images = await axios.get(`?${searchParameters}`);

    return images.data;
}