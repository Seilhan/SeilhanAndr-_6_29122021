import { setProfilInfo, setMedias } from "./utils.js"

async function getPhotographers() {

    const id = new URLSearchParams(window.location.search).get('id');
    if (!id)
        return
    const response = await fetch("data/photographers.json");
    const { photographers, media } = await response.json();
    const photographer = photographers.find(el => el.id == id);
    const medias = media.filter(el => el.photographerId == id);

    setProfilInfo(photographer);
    setMedias(medias);
}

getPhotographers();