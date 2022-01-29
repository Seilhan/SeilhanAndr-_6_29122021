function setProfilInfo(data) {
    //console.log(data);
    document.querySelector('.photographer__title').textContent = data.name;
    document.querySelector('.photographer__infos__local').textContent = `${data.city}  ${data.country}`;
    document.querySelector('.photographer__infos__tagline').textContent = data.tagline;
    const photo = data.portrait.replace('.jpg', '');
    document.querySelector('.photographer__cover').innerHTML = `<img width="100" src="assets/photographers/${photo}-xxlight.jpg" alt="${data.name}">`;
}




function buildCard(media, medias) {
    const listElement = document.createElement('li');
    listElement.setAttribute('class', 'card__list card__list--picture');
    listElement.setAttribute('data-id', media.id);

    const image = media.image ? media.image.replace('.jpg', '') : media.video.replace('.mp4', '');
    const imgElement = document.createElement('img');
    imgElement.setAttribute('class', 'card__list--cover');
    imgElement.setAttribute('width', '100');
    imgElement.setAttribute('src', `assets/photos/${media.photographerId}/${image}-light.jpg`);
    imgElement.setAttribute('data-id', media.id);
    listElement.appendChild(imgElement);
    listElement.addEventListener("click", (el) => openLightBox(el, medias));

    const cardListContent = document.createElement('div');
    cardListContent.setAttribute('class', 'card__list--content');

    const h2Element = document.createElement('h2');
    h2Element.setAttribute('class', 'card__list--content--title');
    h2Element.setAttribute('tabindex', 0);
    h2Element.textContent = media.title;

    const divContentLikeElement = document.createElement('div');
    divContentLikeElement.setAttribute('class', 'card__list--content--like');

    const labelElement = document.createElement('label');
    labelElement.setAttribute('id', media.id);
    labelElement.setAttribute('for', media.id);
    labelElement.setAttribute('class', 'like__counter');
    labelElement.textContent = media.likes;

    const contentHeart = document.createElement('i');
    contentHeart.setAttribute('class', 'fas fa-heart');
    contentHeart.addEventListener('click', e => {
        //console.log(e.target);
    });

    console.log(imgElement);

    cardListContent.appendChild(h2Element);
    cardListContent.appendChild(divContentLikeElement);
    divContentLikeElement.appendChild(labelElement);
    divContentLikeElement.appendChild(contentHeart);
    listElement.appendChild(cardListContent);

    return listElement;

}

function setMedias(medias) {
    //console.log(medias);
    const cards = document.querySelector('.cards__list');
    medias.forEach(media => {
        const card = buildCard(media, medias);
        cards.appendChild(card);
    });
    let totalLikes = 0;
    const totalLike = totalLikes + medias.likes;
    totalLikes.textContent = medias.likes;
    console.log(totalLikes);
}

function openLightBox(el, medias) {

    const lightbox = document.querySelector(".lightbox");
    const lightBoxClose = document.querySelector(".lightbox__icon--close");
    const lightBoxNext = document.querySelector(".lightbox__icon--right");
    const lightBoxPrev = document.querySelector(".lightbox__icon--left");

    lightBoxClose.addEventListener("click", () => { lightbox.style.display = "none"; });
    lightBoxNext.addEventListener("click", setNextMedia);
    lightBoxPrev.addEventListener("click", setPrevMedia);

    const mediaId = el.target.getAttribute('data-id');
    let media = medias.find(el => el.id == mediaId);
    if (!mediaId) return
        //console.log(medias, mediaId, el.currentTarget);
    displayLB(media);

    function setNextMedia() {

        const getmediaIndex = medias.indexOf(media);
        if (getmediaIndex === medias.length - 1) {
            media = medias[0];
        } else {
            media = medias[getmediaIndex + 1];
        }
        displayLB(media);
    }

    function setPrevMedia() {
        const getmediaIndex = medias.indexOf(media);

        media = medias[getmediaIndex + 1];

        displayLB(media);
    }

    lightbox.style.display = "block";
}


function displayLB(media) {

    const lightboxContainer = document.querySelector(".lightbox__container");
    let tmpl = document.querySelector(".lightbox__container");
    if (!media) return

    if (media.video !== undefined) {
        tmpl = `<figure>
        <video controls class="lightbox__cover">  
        <source src="assets/photos/${media.photographerId}/${media.video}"type="video/mp4">
        </video>
        <figcaption class="lightbox__title" tabindex="0">${media.title}</figcaption>
        </figure>`;

    } else {
        tmpl = `<figure>
        <img class="lightbox__cover" src="assets/photos/${media.photographerId}/${media.image}" alt="${media.title}">
        <figcaption class="lightbox__title" tabindex="0">${media.title}</figcaption>
        </figure>`;
    }
    lightboxContainer.innerHTML = tmpl;
}

export { setProfilInfo, setMedias }