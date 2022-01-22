function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
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



const selectbox = document.querySelectorAll('.select-box__current')[0];
document.querySelectorAll('.select-box__option').forEach((btn) => btn.addEventListener("click", () => selectbox.blur()));