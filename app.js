// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all events listeners
loadEventListeners();

function loadEventListeners() {
	//DOM onload
	document.addEventListener("DOMContentLoaded", onload);
	//Add Task
	form.addEventListener("submit", addTask);
	//Remove Task
	taskList.addEventListener("click", removeTask);
	//Clear Tasks
	clearBtn.addEventListener("click", clearTasks);
	// Fillter
	filter.addEventListener("keyup", filterTasks);
	//Check Task
	taskList.addEventListener("click", checkTask);
}
function displayTask(taskValue, isCompleted) {
	//Create li
	const li = document.createElement("li");
	//Add Class
	li.className = isCompleted
		? "collection-item completed"
		: "collection-item uncompleted";
	//Add Text
	li.innerText = taskValue;

	//Create Link
	const link = document.createElement("a");
	// Add Class
	link.className = "delete-item secondary-content";
	//Add Icon
	link.innerHTML = '<span class="del"></span>';
	// Add Link to Li
	li.appendChild(link);
	// Append Child to Ul
	taskList.appendChild(li);
}
function onload(e) {
	if (localStorage.getItem("tasks")) {
		tasks = JSON.parse(localStorage.getItem("tasks"));
		tasks.forEach(task => {
			displayTask(task.taskValue, task.isCompleted);
		});
	}
}

function addTask(e) {
	displayTask(taskInput.value, false);

	storeTask(taskInput.value, false);

	//Clear Input
	taskInput.value = "";

	e.preventDefault();
}

//Store Task
function storeTask(taskValue, isCompleted) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	tasks.push({ taskValue: taskValue, isCompleted: false });
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		// if (confirm("Delete Task?")) {
		// 	e.target.parentElement.parentElement.remove();
		// 	removeTaskLs(e.target.parentElement.parentElement.innerText);
		// }
		e.target.parentElement.parentElement.remove();
		removeTaskLs(e.target.parentElement.parentElement.innerText);
		e.preventDefault();
	}

	e.preventDefault();
}

//Check Task
function checkTask(e) {
	if (e.target.classList.contains("collection-item")) {
		e.target.className = "collection-item unchecked";
		let tasks = JSON.parse(localStorage.getItem("tasks"));
		selectedTask = tasks.filter(task => task.taskValue == e.target.innerText);
		console.log(selectedTask);
		e.target.className = selectedTask[0].isCompleted
			? "collection-item uncompleted"
			: "collection-item completed";
		selectedTask[0].isCompleted = !selectedTask[0].isCompleted;

		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	e.preventDefault();
}

function removeTaskLs(taskItem) {
	let tasks = JSON.parse(localStorage.getItem("tasks"));
	tasks = tasks.filter(task => task.taskValue != taskItem);
	console.log(tasks);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(e) {
	taskList.innerHTML = "";
	console.log("clear");

	clearLs();

	e.preventDefault();
}

function clearLs() {
	localStorage.clear();
}
//Filter Tasks
function filterTasks(e) {
	const items = document.querySelectorAll(".collection-item");
	items.forEach(item => {
		if (
			item.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
		) {
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	});
}
