const elForm = document.querySelector(".js-form");
const elList = document.querySelector(".js-list");
const elAdd = document.querySelector(".js-add");
const elInputName = document.querySelector(".js-productName");
const elInputDesc = document.querySelector(".js-productDesc");
const elInputFile = document.querySelector(".js-productFile");
const elInputPrece = document.querySelector(".js-productPrece");
const logOut =document.querySelector(".logout")
const LocalData = localStorage.getItem("token");
console.log(elList);

if (!LocalData) {
  location.replace("login.html");
  location.reload();
}
logOut.addEventListener("click",(evt)=>{
    localStorage.removeItem("token")
  location.reload();

})
const renderProduct = (arr, node) => {
    node.innerHTML = "";
    arr.forEach((el) => {
      node.innerHTML += `
      <div class="card mx-3 mb-4 shadow" style="width: 18rem;">
    <img src="http://10.10.2.250:5000/${el.product_img}" class="card-img-top" alt="..." width="285" height="285">
    <div class="card-body">
      <h5 class="card-title">${el.product_name}</h5>
      <p class="card-text">${el.product_desc}</p>
      <p class="card-text">${el.product_price}</p>

    </div>
  </div>
      `;
      
    });
  };

async function getProducts() {
  const res = await fetch("http://10.10.2.250:5000/product", {
    headers: {
        Authorization: LocalData,
    },
  });
  const data = await res.json();
  console.log(data);
  renderProduct(data,elList)
}
getProducts();

