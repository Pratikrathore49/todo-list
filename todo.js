let taskInput = document.getElementById("task");
let result = document.getElementById("task-list-container");
let addTaskButton = document.getElementById("btn");
let lists = document.querySelectorAll(".todoListItem");

let tasksList = [];

loadTodo(); //loading prev todo tasks if any
function loadTodo() {
  lists = document.querySelectorAll(".todoListItem");
  if (localStorage.getItem("todo")) {
    console.log("running");
    tasksList = JSON.parse(localStorage.getItem("todo"));
    tasksList.forEach((task) => {
      console.log("running2");
      result.innerHTML += task;
    });
  }
}

function clearToDoList() {
  let ask = confirm("Are you sure to clear tasks?");
  console.log(ask);
  if (ask) {
    result.innerHTML = "";
    localStorage.clear();
  } else {
    console.log("cancelled");
  }
}

function deleteItem(e, index) {
  console.log(e.target);
  let itemList = JSON.parse(localStorage.getItem("todo"));
  itemList.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(itemList));
  result.innerHTML = "";
  loadTodo();
}

const addNewTask = () => {
  let task = taskInput.value.trim();
  if (task.length < 3) {
    alert("Task must be at least 3 characters long");
    return;
  } else {
    let newTaskHtml = `<li  class="todoListItem bg-green-600 text-2xl text-white px-2 flex justify-between items-center my-2"><p>${task}</p><span class="deleteItem text-red-600 font-bold">X</span></li>`;
    result.innerHTML += newTaskHtml;
    tasksList.push(newTaskHtml);
    localStorage.setItem("todo", JSON.stringify(tasksList));
    alert("task has been added successfully");
    taskInput.value = "";
  }
};

result.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteItem")) {
    let todoArr = JSON.parse(localStorage.getItem("todo"));
    console.log("item", todoArr);
    let delIdx = todoArr.findIndex((item) => {
      return item.includes(e.target.previousSibling.innerHTML);
    });
    console.log("idx", delIdx);
    deleteItem(e, delIdx);
  }

  console.dir(e.target.previousSibling.innerHTML);
});
addTaskButton.addEventListener("click", addNewTask);

window.addEventListener("keypress", (e) => {
  console.log(e);
  if (e.key === "Enter") {
    addNewTask();
  }
  if (e.shiftKey === true && e.key === "D") {
    clearToDoList();
  }
});
