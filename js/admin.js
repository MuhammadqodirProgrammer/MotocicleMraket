const elForm = document.querySelector(".js-form");
const elList = document.querySelector(".js-list");
const elAdd = document.querySelector(".js-add");
const elInputName = document.querySelector(".js-productName");
const elInputDesc = document.querySelector(".js-productDesc");
const elInputFile = document.querySelector(".js-productFile");
const elInputPrece = document.querySelector(".js-productPrece");

const LocalData = localStorage.getItem("token");
console.log(elList);

if (!LocalData) {
  location.replace("login.html");
  location.reload();
}

const renderProduct = (arr, node) => {
    node.innerHTML = "";
    arr.forEach((el) => {
      node.innerHTML += `
      <div class="card mx-2 shadow mb-4" style="width: 18rem;">
    <img src="http://10.10.2.250:5000/${el.product_img}" class="card-img-top" alt="..."  width="285" height="285">
    <div class="card-body">
      <h5 class="card-title">${el.product_name}</h5>
      <p class="card-text">${el.product_desc}</p>
      <p class="card-text">${el.product_price}$</p>
       <button data-todo-id=${el.id} class="btn btn-warning js-edit ">Edit<img src="./images/pencil-solid.svg" alt="trash"
       width="20" class="mx-2"> </button>
   <button data-todo-id=${el.id} class="btn btn-danger js-delete">Delete <img src="./images/trash-can-solid.svg" alt="trash"
       width="20"></button>
    </div>
  </div>
      `;
      
    });
  };

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const elFile = elInputFile.files[0] ;
    const fd = new FormData();
    fd.append('product_name', elInputName.value);
    fd.append('product_desc', elInputDesc.value);
  fd.append('product_img', elFile);
  fd.append('product_price', elInputPrece.value);
  fetch("http://10.10.2.250:5000/product", {
    method: "POST",
    headers: {
    //   "Content-type": "multipart/form-data",
    Authorization: LocalData
    },
    body: fd,
  })
    .then((res) => res.json())
    .then((data) => {
        if(data){
            getProducts()
        }
    })
    .catch((err) => console.log(err));
    elInputName.value =""
    elInputDesc.value =""
    elInputPrece.value =""
    elFile =""
});




// // todolarni bacenddan get(olish) uchun func

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


const delataTodo =(id)=>{
    fetch(`http://10.10.2.250:5000/product/${id}`,{
        method:"DELETE",
        headers:{
            Authorization: LocalData,
        },
    }).then((res) => res.json())
    .then((data) => {
        if(data){
            getProducts()
        }
    })
    .catch((err) => console.log(err))
}


const elbody =document.querySelector('body')
elList.addEventListener("click",(evt)=>{
if(evt.target.matches(".js-delete")){
    console.log("bos");
    const todoId = evt.target.dataset.todoId;
    console.log(todoId);
delataTodo(todoId)
};
// if(evt.target.matches(".js-edit")){
//     elbody.classList.add("modal-open")
//     const todoId = evt.target.dataset.todoId;
// editTodo(todoId)
// }
})
