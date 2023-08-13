const mainForm = document.querySelector("form");
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
//globals

const itemForm = document.querySelector(".item-form");
const itemInput = document.querySelector(".text-field");
const itemList = document.querySelector(".item-list");
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

// Event Listeners
itemForm.addEventListener("submit", addItem);
