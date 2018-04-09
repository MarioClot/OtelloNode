
// Get the modal
var modal_login = document.getElementById('login');
var modal_registre = document.getElementById('registre');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal_login) {
        modal_login.style.display = "none";
    }
    if (event.target == modal_registre) {
        modal_registre.style.display = "none";
    }
}