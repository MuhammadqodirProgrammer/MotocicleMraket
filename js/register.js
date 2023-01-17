const elform = document.querySelector(".js-form");
const elNameInput = document.querySelector(".js-name");
const elEmailInput = document.querySelector(".js-email");
const elPhoneInput = document.querySelector(".js-phone");
const elPasInput = document.querySelector(".js-password");
// 10.10.2.250

elform.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log("bosildi");
  fetch("http://10.10.2.250:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: elNameInput.value,
      phone: elPhoneInput.value,
      email: elEmailInput.value,
      password: elPasInput.value,
    }),
  })
  .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data.token){
localStorage.setItem("token",data.token)
location.replace("index.html")
      };
    })
    .catch((err) => console.log(err));
});


// Eye ===========================
const elpasbtn = document.querySelector(".js-eye");

elpasbtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (elPasInput.type === "password") {
    elPasInput.type = "text";
  } else {
    elPasInput.type = "password";
  }
  console.dir(elPasInput);
});


