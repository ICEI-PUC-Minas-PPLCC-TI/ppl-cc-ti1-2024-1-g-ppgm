const accessKey = 'BVuM7V7vvXmOBRbmvNLATyYagqcCZNh4_l0DyX0I3EY';

async function fetchImages(query, containerId) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const imagesContainer = document.getElementById(containerId);
    imagesContainer.innerHTML = '';

    data.results.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.classList.add('image-item');
        imgElement.innerHTML = `<img src="${image.urls.small}" alt="${image.alt_description}">`;
        imagesContainer.appendChild(imgElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchImages('sports', 'sports-images');
    fetchImages('party', 'party-images');
});
