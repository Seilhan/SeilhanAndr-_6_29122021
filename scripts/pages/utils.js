function setProfilInfo(data) {
    //console.log(data);
    document.querySelector('.photographer__title').textContent = data.name;
    document.querySelector('.photographer__infos__local').textContent = `${data.city}  ${data.country}`;
    document.querySelector('.photographer__infos__tagline').textContent = data.tagline;
    const photo = data.portrait.replace('.jpg', '');
    document.querySelector('.photographer__cover').innerHTML = `<img width="100" src="assets/photographers/${photo}-xxlight.jpg" alt="${data.name}">`;
}

function setMedias(medias) {
    //console.log(medias);
    const cards = document.querySelector('.cards__list');
    medias.forEach(media => {
        const card = document.createElement('li');
        card.setAttribute('class', 'card__list card__list--picture');
        const image = media.image ? media.image.replace('.jpg', '') : media.video.replace('.mp4', '');

        card.innerHTML = `<li class="card__container" data-id="${media.id}">
            <img class="card__list--cover" width="100" src="assets/photos/${media.photographerId}/${image}-light.jpg" tabindex="0"  alt="">
             <div class="card__list--content">
                 <h2 class="card__list--content--title" tabindex="0">${media.title}</h2>
                 <div class="card__list--content--like">
                     <label id="${media.id}" for="${media.id}" class="like__counter">${media.likes}</label>
                     <i class="fas fa-heart"></i>
                 </div>
            </div>
         </li>`;

        const likeCounterEl = card.querySelector('.like__counter');
        const heartEl = card.querySelector('.fa-heart');
        //console.log(likeCounterEl.textContent);
        heartEl.addEventListener('click', e => {});

        card.querySelector('.card__container').addEventListener("click", (el) => openLightBox(el, medias));

        cards.appendChild(card);

    });

    //document.querySelector('.card__list--content--title').textContent = medias.title;
    //document.querySelector('card__list--content--like');
    //const cardLike = document.querySelector('.card__list--content--like');
}

function openLightBox(el, medias) {
    const lightbox = document.querySelector(".lightbox");
    const lightBoxClose = document.querySelector(".lightbox__icon--close");
    const lightBoxNext = document.querySelector(".lightbox__icon--right");
    const lightBoxPrev = document.querySelector(".lightbox__icon--left");


    lightBoxClose.addEventListener("click", () => { lightbox.style.display = "none"; });
    lightBoxNext.addEventListener("click", setNextMedia);
    lightBoxPrev.addEventListener("click", setPrevMedia);

    const mediaId = el.currentTarget.getAttribute('data-id');
    let media = medias.find(el => el.id == mediaId);


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

    if (media.video !== undefined) {
        tmpl = `<figure>
        <video controls class="lightbox__cover">  
        <source src="assets/photos/${media.photographerId}/${media.video}"type="video/mp4">
        </video>
        <figcaption class="lightbox__title" tabindex="0">${media.title}</figcaption>
        </figure>`;

    } else {
        tmpl = `<figure>
        <img class="lightbox__cover" src="assets/photos/${media.photographerId}/${media.image}" alt="">
        <figcaption class="lightbox__title" tabindex="0">${media.title}</figcaption>
        </figure>`;
    }
    lightboxContainer.innerHTML = tmpl;
}

export { setProfilInfo, setMedias }