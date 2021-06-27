const delBtn = document.getElementsByClassName("fa-trash");
const editBtn = document.getElementsByClassName("fa-edit");
const addProduct = document.getElementsByClassName("add-btn")[0];
const addItemLi = document.querySelector("#myBtn");
const addProdBtn = document.querySelector(".add-prod-Btn");
const closeModalBtn =document.getElementById("btn-close")
const labelIndicators = document.getElementsByClassName("fa-exchange")
const summaryInputs = document.getElementsByClassName("number_detail")
const summaryDiv = document.querySelector(".info_card")
const deleteLi = document.querySelector(".remove")
const actionCell= document.getElementsByClassName("action")
const labelHeader = document.querySelector(".labelData")
const updateDetailsLi = document.querySelector(".update-details")
const rowField = document.getElementsByClassName("row-field")

$(document).ready(function () {
  $(".bar").click(function () {
    $(".sidebar-nav").toggleClass("hide");
    $("header , .main_contant").toggleClass("slide-left");
  });
  displayProducts();
changeLabelColors()
updateTotalQty()
updateTotalItems()
updateTotalCat()
  
  addProdBtn.addEventListener("click", () => {
    addProduct.innerText = "Add Product";
    addProduct.id = "btn-add";
    openModal();
    document.querySelector("#btn-add").addEventListener("click", () => {
      addItem();
    });
  });
  closeModalBtn.addEventListener('click',()=>{
    closeModal()
    location.reload()
  })
  deleteLi.addEventListener("click",()=>{
    hideSummaryArea()
    let delBtnArray = [...delBtn];
  delBtnArray.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // hideSummaryArea()
      let id = e.target.closest("tr").rowIndex;
      e.target.closest("tr").remove();
      updateLocalStorage(id);
      updateTotalQty()
      updateTotalItems()
      updateTotalCat()
    });
  });
  })
  updateDetailsLi.addEventListener("click",()=>{
    hideSummaryAreaEdit()
    let editBtnArray = [...editBtn];
  editBtnArray.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      let id = e.target.closest("tr").rowIndex;
      addProduct.innerText = "Update Product";
      addProduct.id = "add-btn";
      openModal();
      showItems(id);
      document.querySelector("#add-btn").addEventListener("click", () => {
        editItem(id);
        // updateTableFields(id)
      });
    });
  });
    
  })
  // console.log(rowField[0].children)

});

function openModal() {
  document.getElementById("pop_modal").style.visibility = "visible";
}

function closeModal() {
  document.getElementById("pop_modal").style.visibility = "hidden";
}

const editModalshow = () => {
  document.getElementById("pop_modal").style.visibility = "visible";
};

const hideSummaryArea =()=>{
  summaryDiv.classList.add('hidden')
  let actionCellArray = [...actionCell]
  actionCellArray.forEach((cell)=>{
    cell.innerHTML=""
    cell.innerHTML=`<i class="fas fa-trash" ></i>`
    labelHeader.innerHTML= "Delete"

  })
}

const hideSummaryAreaEdit =()=>{
  summaryDiv.classList.add('hidden')
  let actionCellArray = [...actionCell]
  actionCellArray.forEach((cell)=>{
    cell.innerHTML =""
    cell.innerHTML=`<i class="fas fa-edit"></i>`
    labelHeader.innerHTML= "Edit"

  })
}
const updateLocalStorage = (id) => {
  let product = JSON.parse(localStorage.getItem("product"));
  for (let i = 0; i < product.length; i++) {
    if (i == id - 1) {
      product.splice(i, 1);
    }
    localStorage.setItem("product", JSON.stringify(product));
  }
};

const displayProducts = () => {
  const storedProducts = getProducts();
  console.log(storedProducts);
  storedProducts.forEach((product) => PopulateRows(product));
};

const PopulateRows = (product) => {
  let productContainer = document.getElementById("table_body");
  productContainer.innerHTML += `
    <tr class= "row-field">
    <td>${product.Name}</td>
    <td> ${product.Desc} </td>
    <td>${product.Cat}</td>
    <td class="rule-center">${product.Qty}</td>
    <td class="action"><a href="#"><i class="fa fa-exchange " data-indicator=${product.Qty} ></i> </a></td>
    

</tr>`;
};
let ind ="";
const editItem = (id) => {
  let itemName = document.getElementById("item_name").value;
  let itemDesc = document.getElementById("itemDesc").value;
  let itemQty = document.getElementById("itemQty").value;
  let itemCat = document.getElementById("itemCat").value;
  let products = JSON.parse(localStorage.getItem("product")); 
  

  products.forEach((product, index) => {
    if (index == id - 1) {
      ind=index
      product.Name = itemName;
      product.Desc = itemDesc;
      product.Qty = itemQty;
      product.Cat = itemCat;
      //  console.log(rowField[index])
      // rowCells[index][0]=itemName
      // rowCells[index][1]=itemDesc
      // rowCells[index][2]=itemCat
      // rowCells[index][0]=itemQty
      
    }
  });
  console.log(rowField[parseInt(ind)])

  document.getElementById("pop_modal").style.visibility = "hidden";

  // rowC.forEach((row, tbIndex)=>{
  //   if(tbIndex===ind){
  //     console.log(tbIndex)
  //     console.log(ind)
    //   row.innerHTML=`
    //   <td>${itemName}</td>
    // <td> ${itemDesc} </td>
    // <td>${itemCat}</td>
    // <td class="rule-center">${itemQty}</td>
    // <td class="action"><a href="#"><i class="fas fa-edit " data-indicator=${itemQty} ></i> </a></td>`
      // tbIndex=""
      // ind=""

// }

  // })
  localStorage.setItem("product", JSON.stringify(products));
};


 


const updateTotalQty =()=>{
let itemsInLocalStorage= getProducts()
counter = 0;
itemsInLocalStorage.forEach((item)=>{
  counter += parseInt(item.Qty)
})
summaryInputs[0].children[1].innerHTML=counter;
}

const updateTotalItems=()=>{
 let numberOfItems = getProducts().length
 summaryInputs[1].children[1].innerHTML=numberOfItems;
 
}

const updateTotalCat=()=>{
  let itemsInLocalStorage= getProducts()
  let uniqueItemsArray =[];
  itemsInLocalStorage.forEach((item)=>{
    if(!uniqueItemsArray.includes(item.Cat)){
      uniqueItemsArray.push(item.Cat)
    }
  })
  summaryInputs[2].children[1].innerHTML=uniqueItemsArray.length;

}

const showItems = (id) => {
  let itemName = document.getElementById("item_name");
  let itemDesc = document.getElementById("itemDesc");
  let itemQty = document.getElementById("itemQty");
  let itemCat = document.getElementById("itemCat");

  let products = JSON.parse(localStorage.getItem("product"));
  products.forEach((product, index) => {
    if (index == id - 1) {
      itemName.value = product.Name;
      itemDesc.value = product.Desc;
      itemQty.value = product.Qty;
      itemCat.value = product.Cat;
    }
  });
};

const addItem = () => {
  document.getElementById("pop_modal").style.visibility = "hidden";
  let itemName = document.getElementById("item_name").value;
  let itemDesc = document.getElementById("itemDesc").value;
  let itemQty = document.getElementById("itemQty").value;
  let itemCat = document.getElementById("itemCat").value;

  if (itemName === "" && itemDesc === "" && itemQty === "" && itemDesc === "") {
    alert("Enter valid values and try again!");
  } else {
    let object = {
      Name: itemName,
      Desc: itemDesc,
      Cat: itemCat,
      Qty: itemQty,
    };
    PopulateRows(object);
    saveProducts(object);

    location.reload();
  }
};

const changeLabelColors= ()=>{
  let labelArray = [...labelIndicators]
labelArray.forEach((label)=>{
  let labelQty= parseInt(label.dataset.indicator)
  // console.log(labelQty)
  if(labelQty==0){
    label.classList.add('out-of-stock')
  }
  else if(labelQty<20){
    label.classList.add('almost-out-of-stock')
  }
  else{
    label.classList.add('in-stock')

  }
})
}

const getProducts = () => {
  let products = "";
  if (localStorage.getItem("product") == null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }
  return products;
};

const saveProducts = (prodObject) => {
  let productsFromLocalStorage = getProducts();
  productsFromLocalStorage.push(prodObject);
  localStorage.setItem("product", JSON.stringify(productsFromLocalStorage));
};
