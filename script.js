const navList = document.querySelector(".menu-icon");
const pages = document.querySelector(".menu-list");

navList.addEventListener('click', function(){
    pages.classList.toggle("show_menu");
})

function sendCode(){
 alert('We have sent you an email with the code!');
    
}
function ruajShenimet(){
   
    var name = document.getElementById("username");
    var password = document.getElementById("password");
   
  
    if (name.value == "") {
      name.style.border = "2px solid red";
    } else{
      name.style.border = "none";
    }
  
    if (password.value == "") {
      password.style.border = "2px solid red";
    }else{
      password.style.border = "none";
    }
  
  }
  function ruajRegister(){
   
    var username = document.getElementById("username");
    var password = document.getElementById("password");
   var email =  document.getElementById("email");
    var surname = document.getElementById("surname");
    var name = document.getElementById("name");
    var confpass = document.getElementById("confirmPassword");

  
    if (name.value == "") {
      name.style.border = "2px solid red";
    } else{
      name.style.border = "none";
    }
  
    if (password.value == "") {
      password.style.border = "2px solid red";
    }else{
      password.style.border = "none";
    }
    if (email.value == "") {
        email.style.border = "2px solid red";
      } else{
        email.style.border = "none";

      }
      if (surname.value == "") {
        surname.style.border = "2px solid red";
      } else{
        surname.style.border = "none";
      }
      if (confpass.value == "") {
        confpass.style.border = "2px solid red";
      } else{
        confpass.style.border = "none";
      }
  
  }