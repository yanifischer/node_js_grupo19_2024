// Definir la función openForm() fuera del ámbito del evento DOMContentLoaded
function openForm() {
  const contactForm = document.querySelector(".formulario");
  contactForm.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const contactBtns = document.querySelectorAll(".contacto-boton");

  // Asignar event listeners a los botones de contacto
  contactBtns.forEach(function (btn) {
    btn.addEventListener("click", openForm);
  });

  // Función para cerrar el formulario de contacto
  function closeForm() {
    const contactForm = document.querySelector(".formulario");
    contactForm.style.display = "none";
  }

  // Asignar event listener al botón de cerrar el formulario
  const closeBtn = document.querySelector(".cancel");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeForm);
  }
});

function validateForm(event)
{
  event.preventDefault();

  //inputs
  let username = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  if(username.trim() === "")
  {
    alert("por favor ingresa un usuario");
    return false; // EVITA QUE SE ENVIE EL FORMULARIo
  }

  if(email.trim() === "")
  {
    alert("por favor ingresa un mail");
    return false;
  }

  if(!isValidEmail(email))
  {
    alert("Por favor ingresa un MAIL VALIDO");
    return true;
  }



function isValidEmail(email)
{
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}
alert("Formulario enviado correctamente");
return true;

}  


document.getElementById("myForm").addEventListener("submit", validateForm);