console.log("Todo List Ready!");

let listTodo = [];
let currentFilter = "all"; // default filter

function validateForm() {
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date-input");

  if (taskInput.value === '' || dueDateInput.value === '') {
    alert("Please enter task and due date!");
  } else {
    addTodo(taskInput.value, dueDateInput.value);
    taskInput.value = "";
    dueDateInput.value = "";
  }
}

function addTodo(task, dueDate) {
  listTodo.push({
    task: task,
    dueDate: dueDate,
    done: false
  });
  renderTodoList();
}

function toggleStatus(index) {
  listTodo[index].done = !listTodo[index].done;
  renderTodoList();
}

function deleteTask(index) {
  listTodo.splice(index, 1);
  renderTodoList();
}

function deleteAll() {
  listTodo = [];
  renderTodoList();
}

function applyFilter() {
  const filterSelect = document.getElementById("filterSelect");
  currentFilter = filterSelect.value;
  renderTodoList();
}

function renderTodoList() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = '';

  // filter tasks
  let filteredTasks = listTodo;
  if (currentFilter === "pending") {
    filteredTasks = listTodo.filter(todo => !todo.done);
  } else if (currentFilter === "done") {
    filteredTasks = listTodo.filter(todo => todo.done);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="text-center py-3 text-gray-400">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach((todo, index) => {
    taskList.innerHTML += `
      <tr class="border-b border-slate-700">
        <td class="px-3 py-2">${todo.task}</td>
        <td class="px-3 py-2">${todo.dueDate}</td>
        <td class="px-3 py-2 ${todo.done ? 'text-green-400' : 'text-yellow-400'}">
          ${todo.done ? "Done" : "Pending"}
        </td>
        <td class="px-3 py-2 space-x-2">
          <button onclick="toggleStatus(${index})" class="bg-green-500 hover:bg-green-600 px-2 py-1 rounded">✔</button>
          <button onclick="deleteTask(${index})" class="bg-red-500 hover:bg-red-600 px-2 py-1 rounded">✖</button>
        </td>
      </tr>
    `;
  });
}

// render awal
renderTodoList();
