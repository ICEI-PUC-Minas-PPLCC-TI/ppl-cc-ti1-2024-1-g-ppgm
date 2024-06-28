document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('image-gallery');

    // Endpoint da API para imagens de treinos esportivos e festas
    const apiUrl = 'https://api.unsplash.com/photos/random?count=10&query=sports,party&client_id=YOUR_UNSPLASH_ACCESS_KEY';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(photo => {
                const imgElement = document.createElement('img');
                imgElement.src = photo.urls.regular;
                imgElement.alt = photo.alt_description;
                gallery.appendChild(imgElement);
            });
        })
        .catch(error => console.log('Erro ao buscar imagens:', error));
});
