    async function getPhotographers() {
        const response = await fetch("data/photographers.json");
        return await response.json();
    }

    function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            console.log(photographerModel);
            photographersSection.appendChild(photographerModel);
        });
    };


    function photographerFactory(data) {
        const li = document.createElement('li');
        const photo = data.portrait.replace('.jpg', '');

        li.innerHTML = `<li>
            <article class="photographer">
                <a href="photographer.html?id=${data.id}" aria-label="${data.name}">
                    <div class="photographer__cover">
                        <img width="100" src="assets/photographers/${photo}-xxlight.jpg" alt="${data.name}">
                    </div>
                    <h2 class="photographer__title" tabindex="0">${data.name}</h2>
                </a>
                    <div class="photographer__infos" tabindex="0">
                        <div class="photographer__infos__local text--primary">${data.city}, ${data.country}</div>
                        <div class="photographer__infos__tagline">${data.tagline}</div>
                        <div class="photographer__infos__price text--grey">${data.price}€/jour</div>
                    </div>
            </article>
        </li>`;
        return li

    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    init();