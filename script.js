const mainForm = document.querySelector("form");
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
//globals

const itemForm = document.querySelector(".item-form");
const itemInput = document.querySelector(".text-field");
const itemList = document.querySelector(".item-list");
const itemClear = document.querySelector(".btn-clear");

const filter = document.querySelector(".filter");
const clearBtn = document.querySelector(".div-clear-btn");
// Event Listeners Functions

const addItem = (e) => {
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please Add an Item");
    return;
  }
  console.log(newItem);

  //create a list item
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.classList.add("item-text");
  p.appendChild(document.createTextNode(newItem));
  const btn = createListRemoveButton();
  li.appendChild(p);
  li.appendChild(btn);
  li.classList.add("list-element");
  console.log(li);

  itemList.appendChild(li);
  checkUI();
};

// create li-remove-button
const createListRemoveButton = () => {
  const btn = document.createElement("button");
  btn.classList.add("item-rm-bt");
  const img = document.createElement("img");
  img.src = "images/remove.png";
  img.alt = "remove";
  btn.appendChild(img);
  return btn;
};

const itemDel = (e) => {
  console.log(e.target.id);
  console.log(e.target.tagName);
  if (e.target.tagName === "IMG") {
    e.target.parentElement.parentElement.remove();
  } else if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
  checkUI();
};

const itemsDel = () => {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkUI();
};

const checkUI = () => {
  const items = itemList.querySelectorAll("li");

  console.log(items.length);
  if (items.length === 0) {
    clearBtn.style.visibility = "hidden";
    filter.style.visibility = "hidden";
  } else {
    clearBtn.style.visibility = "visible";
    filter.style.visibility = "visible";
  }
};
// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", itemDel);
itemClear.addEventListener("click", itemsDel);

checkUI();
