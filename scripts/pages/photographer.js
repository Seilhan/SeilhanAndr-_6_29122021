//Mettre le code JavaScript lié à la page photographer.html

function setProfilInfo(data) {
    //console.log(data);

    document.querySelector('.photographer__title').textContent = data.name;
    document.querySelector('.photographer__infos__local').textContent = `${data.city}  ${data.country}`;
    document.querySelector('.photographer__infos__tagline').textContent = data.tagline;

    const photo = data.portrait.replace('.jpg', '');
    document.querySelector('.photographer__cover').innerHTML = `<img width="100" src="assets/photographers/${photo}-xxlight.jpg" alt="${data.name}">`;

}

function setMedias(medias) {
    // console.log(medias);
    const cards = document.querySelector('.cards__list');
    medias.forEach(media => {

        const card = document.createElement('li');
        card.setAttribute('class', 'card__list card__list--picture');

        const image = media.image ? media.image.replace('.jpg', '') : media.video.replace('.mp4', '');

        card.innerHTML = `<li>
            <img class="card__list--cover" width="100" src="assets/photos/${media.photographerId}/${image}-light.jpg" tabindex="0" alt="">
             <div class="card__list--content">
                 <h2 class="card__list--content--title" tabindex="0">${media.title}</h2>
                 <div class="card__list--content--like">
                     <label id="${media.id}" for="${media.id}" class="like__counter">${media.likes}</label>
                     <i class="fas fa-heart"></i>
                 </div>
            </div>
         </li>`;

        cards.appendChild(card);

    });

    // document.querySelector('.card__list--content--title').textContent = medias.title;

}

async function getPhotographers() {
    const id = new URLSearchParams(window.location.search).get('id');

    const response = await fetch("/data/photographers.json");
    const { photographers, media } = await response.json();

    //console.log(media);

    const photographer = photographers.find(el => el.id == id);
    const medias = media.filter(el => el.photographerId == id);

    //console.log(medias);

    setProfilInfo(photographer);
    setMedias(medias);

}

getPhotographers();