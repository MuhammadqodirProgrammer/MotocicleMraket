console.log("Bismillah");

const elpasInput =document.querySelector(".js-pasword")
const elEmailInput =document.querySelector(".js-email")
const elpasbtn =document.querySelector(".js-eye")
const elform =document.querySelector(".js-form")

// http://10.10.2.250:5000/user/login
// email: input.value
// password: input.value
const LocalData = localStorage.getItem("token")
// console.log(LocalData);
// if (!LocalData) {
//     location.replace("registir.html")
// }


elform.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.dir(elEmailInput.value);
    console.log();
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:elEmailInput.value,
        password:elpasInput.value
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



elpasbtn.addEventListener("click",(evt)=>{
    evt.preventDefault()
    if (elpasInput.type === "password") {
        elpasInput.type ="text"
    }else{
        elpasInput.type ="password"
    }
})


