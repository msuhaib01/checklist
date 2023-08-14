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
const formButton = itemForm.querySelector("button");
const divDanger = document.querySelector(".div-danger");
let isEditMode = false;
let globalCurrentEditListElement = undefined;

// Event Listeners Functions

const checkIfDuplicate = (textInput) => {
  let itemsFromStorage = loadItemsFromStorage();
  return itemsFromStorage.includes(textInput);
};

const formHandler = (e) => {
  const newItem = itemInput.value;
  if (newItem === "") {
    dangerVisible("Please Add an Item!");
    return;
  } else if (checkIfDuplicate(newItem)) {
    dangerVisible("Item already Exists!");
    return;
  } else if (newItem.length > 30) {
    dangerVisible("Input too long!");
  } else {
    dangerInvisible();
  }

  isEditMode ? saveEditItem(newItem) : addItem(newItem);
};
const dangerVisible = (errorType) => {
  console.log("ERROR BANG");
  console.log(divDanger);
  divDanger.classList.add("div-visible");
  divDanger.firstElementChild.textContent = errorType;
  setTimeout(dangerInvisible, 4000);
};
const dangerInvisible = () => {
  console.log("CORRECT BANG", divDanger);
  divDanger.classList.remove("div-visible");
};
const addItem = (newItem) => {
  addToDOM(newItem);
  addToLocal(newItem);
  itemInput.value = "";
  //create a list item
  checkUI();
};

const saveEditItem = (newItem) => {
  const targetListElementParagraph =
    globalCurrentEditListElement.querySelector("p");
  const ogText = targetListElementParagraph.textContent;
  editInDOM(newItem, targetListElementParagraph);
  editInLocalMem(newItem, ogText);

  exitEditMode();
};

const editInDOM = (newItem, targetListElementParagraph) => {
  targetListElementParagraph.textContent = newItem;
};

const editInLocalMem = (newItem, ogText) => {
  let itemsFromStorage = loadItemsFromStorage();

  itemsFromStorage = itemsFromStorage.map((item) => {
    if (item == ogText) {
      return newItem;
    } else {
      return item;
    }
  });
  saveItemsToStorage(itemsFromStorage);
};

// create li-remove-button
const createListRemoveButton = () => {
  const btn = document.createElement("button");
  btn.classList.add("item-rm-bt");
  const img = document.createElement("img");
  img.src = "images/remove.png";
  img.alt = "remove";
  img.classList.add("img-remove");

  btn.appendChild(img);
  return btn;
};
const createListEditButton = () => {
  const btn = document.createElement("button");
  btn.classList.add("item-ed-bt");
  const img = document.createElement("img");
  img.src = "images/edit.svg";
  img.alt = "edit";
  img.classList.add("img-edit");
  btn.appendChild(img);
  return btn;
};
const addToDOM = (newItem) => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.classList.add("item-text");
  p.appendChild(document.createTextNode(newItem));
  const btn = createListRemoveButton();
  const editBtn = createListEditButton();
  const btnsDiv = document.createElement("div");
  btnsDiv.appendChild(editBtn);
  btnsDiv.appendChild(btn);
  li.appendChild(p);

  li.appendChild(btnsDiv);

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

// const itemDel = (e) => {
//   let itemsFromStorage = loadItemsFromStorage();
//   if (e.target.tagName === "IMG") {
//     const targetText =
//       e.target.parentElement.parentElement.querySelector("p").textContent;
//     const index = itemsFromStorage.indexOf(targetText);
//     if (index > -1) {
//       itemsFromStorage.splice(index, 1);
//       saveItemsToStorage(itemsFromStorage);
//     }
//     e.target.parentElement.parentElement.remove();
//   } else if (e.target.tagName === "BUTTON") {
//     const targetText = e.target.parentElement.querySelector("p").textContent;
//     const index = itemsFromStorage.indexOf(targetText);
//     if (index > -1) {
//       itemsFromStorage.splice(index, 1);
//       saveItemsToStorage(itemsFromStorage);
//     }

//     e.target.parentElement.remove();
//   }

//   checkUI();
// };

const listItemClicked = (e) => {
  if (e.target.classList.contains("img-remove")) {
    const targetListElement =
      e.target.parentElement.parentElement.parentElement.querySelector("p");
    delTypeHandler(targetListElement);
  } else if (e.target.classList.contains("item-rm-bt")) {
    const targetListElement =
      e.target.parentElement.parentElement.querySelector("p");
    delTypeHandler(targetListElement);
  } else if (e.target.classList.contains("img-edit")) {
    const targetListElement =
      e.target.parentElement.parentElement.parentElement;
    editModeTypeHandler(targetListElement);
  } else if (e.target.classList.contains("item-ed-bt")) {
    const targetListElement = e.target.parentElement.parentElement;
    editModeTypeHandler(targetListElement);
  }
  checkUI();
};
const delTypeHandler = (targetListElement) => {
  exitEditMode();
  itemDelLocal(targetListElement);
  itemDelDOM(targetListElement);
};
const editModeTypeHandler = (targetListElement) => {
  if (
    globalCurrentEditListElement === undefined ||
    targetListElement === globalCurrentEditListElement
  ) {
    isEditMode ? exitEditMode() : setEditMode(targetListElement);
  }
};
const setEditMode = (targetListElement) => {
  isEditMode = true;
  globalCurrentEditListElement = targetListElement;
  itemInput.value = "";

  const targetListElementParagraph = targetListElement.querySelector("p");
  const targetListElementButtonEdit =
    targetListElement.querySelector(".item-ed-bt");
  targetListElementButtonEdit.classList.add("ed-btn-edit-mode");
  targetListElementParagraph.classList.add("edit-mode");
  formButton.firstChild.textContent = "Save Edit";
  itemInput.placeholder = "Edit...";
  itemInput.focus();
};

const exitEditMode = () => {
  if (isEditMode) {
    isEditMode = false;

    const targetListElementParagraph =
      globalCurrentEditListElement.querySelector("p");
    globalCurrentEditListElement = undefined;

    const targetListElementButtonEdit = document.querySelector(".item-ed-bt");
    targetListElementParagraph.classList.remove("edit-mode");
    targetListElementButtonEdit.classList.remove("ed-btn-edit-mode");
    itemInput.value = "";
    formButton.firstChild.textContent = "Add Item";
    itemInput.placeholder = "Add...";
  }
};
const itemDelLocal = (targetListElement) => {
  const targetText = targetListElement.textContent;
  let itemsFromStorage = loadItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== targetText);
  saveItemsToStorage(itemsFromStorage);
};
const itemDelDOM = (targetListElement) => {
  targetListElement.parentElement.remove();
};

const itemsDel = () => {
  console.log("WHYYYY");
  exitEditMode();
  console.log("YOU NO BANGGG");
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
  itemForm.addEventListener("submit", formHandler);
  itemList.addEventListener("click", listItemClicked);
  itemClear.addEventListener("click", itemsDel);
  inputFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", getItemsFromStorage());
}

init();
