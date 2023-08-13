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
const inputFilter = document.querySelector(".form-input-filter");
// Event Listeners Functions

const addItem = (e) => {
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please Add an Item");
    return;
  }
  addToDOM(newItem);
  addToLocal(newItem);
  itemInput.value = "";
  //create a list item
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
const addToDOM = (newItem) => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.classList.add("item-text");
  p.appendChild(document.createTextNode(newItem));
  const btn = createListRemoveButton();
  li.appendChild(p);
  li.appendChild(btn);
  li.classList.add("list-element");

  itemList.appendChild(li);
};

const addToLocal = (newItem) => {
  let itemsFromStorage = loadItemsFromStorage();
  itemsFromStorage.push(newItem);

  //convert back to string and set in local
  saveItemsToStorage(itemsFromStorage);
};

const getItemsFromStorage = () => {
  let itemsFromStorage = loadItemsFromStorage();
  itemList.innerHTML = "";
  itemsFromStorage.forEach((item) => {
    addToDOM(item);
  });
  checkUI();
};

const loadItemsFromStorage = () => {
  if (localStorage.getItem("items") == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("items"));
  }
};

const saveItemsToStorage = (itemsFromStorage) => {
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const itemDel = (e) => {
  let itemsFromStorage = loadItemsFromStorage();
  console.log(itemsFromStorage);
  if (e.target.tagName === "IMG") {
    const targetText =
      e.target.parentElement.parentElement.querySelector("p").textContent;
    const index = itemsFromStorage.indexOf(targetText);
    if (index > -1) {
      itemsFromStorage.splice(index, 1);
      saveItemsToStorage(itemsFromStorage);
    }
    e.target.parentElement.parentElement.remove();
  } else if (e.target.tagName === "BUTTON") {
    const targetText = e.target.parentElement.querySelector("p").textContent;
    const index = itemsFromStorage.indexOf(targetText);
    if (index > -1) {
      itemsFromStorage.splice(index, 1);
      saveItemsToStorage(itemsFromStorage);
    }

    e.target.parentElement.remove();
  }

  checkUI();
};

const itemsDel = () => {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  saveItemsToStorage([]);
  checkUI();
};

const checkUI = () => {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.visibility = "hidden";
    filter.style.visibility = "hidden";
  } else {
    clearBtn.style.visibility = "visible";
    filter.style.visibility = "visible";
  }
};

const filterItems = (e) => {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    const textContent = item.querySelector("p").textContent.toLocaleLowerCase(); //TextContent is your friend!
    if (textContent.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

function init() {
  // Event Listeners
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", itemDel);
  itemClear.addEventListener("click", itemsDel);
  inputFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", getItemsFromStorage());
}

init();
