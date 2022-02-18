
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.focus();
    const closeModalBtn = document.querySelector('.modal__close--btn');
    closeModalBtn.addEventListener('keydown', closeModal);
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const contactForm = document.getElementById("contactModalId");
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    closeModal();
});