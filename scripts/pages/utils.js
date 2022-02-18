function setProfilInfo(data) {

    const photo = data.portrait.replace('.jpg', '');
    document.querySelector('.photographer__title').textContent = data.name;
    document.querySelector('.title__modal__name').textContent = data.name;
    document.querySelector('.photographer__infos__local').textContent = `${data.city}  ${data.country}`;
    document.querySelector('.photographer__infos__tagline').textContent = data.tagline;
    document.querySelector('.photographer__cover').innerHTML = `<img width="100" src="assets/photographers/${photo}-xxlight.jpg" alt="${data.name}">`;
    document.querySelector(".widget__like-count-total").textContent = `${data.price}€ / jour`;
    
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
    imgElement.setAttribute('tabindex', 0);
    imgElement.setAttribute('data-id', media.id);
    listElement.appendChild(imgElement);
    listElement.addEventListener("click", (el) => openLightBox(el, medias));
    listElement.addEventListener("keydown", (el) =>  {
        if (el.key == 'Enter') openLightBox(el, medias)
    });
   
  
    const cardListContent = document.createElement('div');
    cardListContent.setAttribute('class', 'card__list--content');

    const h2Element = document.createElement('h2');
    h2Element.setAttribute('class', 'card__list--content--title');
    h2Element.setAttribute('tabindex', 0);
    h2Element.textContent = media.title;

    const divContentLikeElement = document.createElement('div');
    divContentLikeElement.setAttribute('class', 'card__list--content--like');

    const labelElement = document.createElement('label');
    labelElement.setAttribute('id', "label-" + media.id);
    labelElement.setAttribute('for', media.id);
    labelElement.setAttribute('class', 'like__counter');
    labelElement.textContent = media.likes;

   
    const contentHeart = document.createElement('i');
    contentHeart.setAttribute('class', 'fas fa-heart');
    contentHeart.setAttribute('data-media-id', media.id);

    contentHeart.addEventListener("click", e => {
        let additionalLike = 0;
        if ( Number(labelElement.textContent) ==  media.likes) {
            labelElement.textContent =  media.likes+1;
            additionalLike = 1;
            contentHeart.setAttribute('class', 'fas fa-heart active');
        } else  {
            labelElement.textContent =  media.likes;
            additionalLike = -1;
            contentHeart.setAttribute('class', 'fas fa-heart');
        }

        const widgetLikeCountElement = document.getElementById('widget__like-count');
        let totalLikes = parseInt(widgetLikeCountElement.textContent) + additionalLike;
        widgetLikeCountElement.textContent = totalLikes;
    });

    cardListContent.appendChild(h2Element);
    cardListContent.appendChild(divContentLikeElement);
    divContentLikeElement.appendChild(labelElement);
    divContentLikeElement.appendChild(contentHeart);
    listElement.appendChild(cardListContent);

    return listElement;
   

}

function fncOrder(order, a, b) {
    switch (order) {
        case "input-filter-popularity":
            return a.likes <= b.likes ? 1 : -1
        case "input-filter-date":
            return a.date <= b.date ? 1 : -1
        case "input-filter-title":
            return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);

        default:
            break;
    }

}

function setMedias(medias, order = "input-filter-popularity") {

    let totalLikes = 0;
    const cards = document.querySelector('.cards__list');

    const filtermedias = medias.sort((a, b) => fncOrder(order, a, b))

    cards.innerHTML = '';

    filtermedias.forEach(media => {
        const card = buildCard(media, medias);
        cards.appendChild(card);
        totalLikes = totalLikes + media.likes;
    });

    document.querySelector("#widget__like-count").textContent = totalLikes;

}


function openLightBox(el, medias) {
    
    const lightbox = document.querySelector(".lightbox");
    const lightBoxClose = document.querySelector(".lightbox__icon--close");
    const lightBoxNext = document.querySelector(".lightbox__icon--right");
    const lightBoxPrev = document.querySelector(".lightbox__icon--left");
    
    lightBoxClose.addEventListener("click", closeLightBox);
    lightBoxNext.addEventListener("click", setNextMedia);
    lightBoxPrev.addEventListener("click", setPrevMedia);
    
    lightBoxNext.addEventListener("keydown", (el) =>  {
        if (el.key == 'Enter') setNextMedia();
    });

    lightBoxPrev.addEventListener("keydown", (el) =>  {
        if (el.key == 'Enter') setPrevMedia();
    });

    lightBoxClose.addEventListener("keydown", (el) =>  {
        if (el.key == 'Enter') closeLightBox();
    });
    
   
function closeLightBox() {
    lightbox.style.display = "none";
    document.removeEventListener('keydown', kbNav);
  
}

    function kbNav(e) {
        if( e.key == 'ArrowRight') setNextMedia();
        if( e.key == 'ArrowLeft') setPrevMedia();
        if( e.key == 'Escape') closeLightBox();
       
    }
    

    const mediaId = el.target.getAttribute('data-id');
    let media = medias.find(el => el.id == mediaId);
    if (!mediaId) return
   
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
        if (getmediaIndex === 0) {
            media = medias[medias.length-1];
        } else {
            media = medias[getmediaIndex - 1];
        }
       
        displayLB(media);
      
    }
   
    lightbox.style.display = "block";
    document.addEventListener('keydown', kbNav, {passive:true} );
    lightbox.focus();
}



function displayLB(media) {
   
    const lightboxContainer = document.querySelector(".lightbox__container");
    let tmpl = document.querySelector(".lightbox__container");
    if (!media) return
  
    if (media.video !== undefined) {
        tmpl = `<figure>
        <video controls class="lightbox__cover">  
        <source  tabindex="0" src="assets/photos/${media.photographerId}/${media.video}"type="video/mp4">
        </video>
        <figcaption class="lightbox__title" tabindex="0">${media.title}</figcaption>
        </figure>`;

    } else {
        tmpl = `<figure>
        <img class="lightbox__cover"  tabindex="0" src="assets/photos/${media.photographerId}/${media.image}" alt="${media.title}">
        <figcaption class="lightbox__title" tabindex="0">${media.title}</figcaption>
        </figure>`;
    }
   
   
    lightboxContainer.innerHTML = tmpl;
    
   
}


export { setProfilInfo, setMedias}