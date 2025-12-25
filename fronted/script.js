//  logged in user
const user = localStorage.getItem("loggedUser"); // user jo mane singin ke time save kiya tha

if (!user) {
  alert("Login first");
  window.location.href = "signin.html";
}

// show username
document.getElementById("greetingName").textContent = user;

// elements
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// LOAD TASKS (GET) 
async function loadTasks() {
  const res = await fetch(`https://todolistbasic01.onrender.com/api/getTasks/${user}`);
  const data = await res.json();

  todoList.innerHTML = "";

  if (data.success && data.tasks.length > 0) {
    data.tasks.forEach(task => addTaskToUI(task)); // har task ko UI me add karenge
  } else {
    todoList.innerHTML = "<li>No task yet</li>";
  }
}

loadTasks();  // direct call  above function ko taaki page load hote hi tasks show ho jaye

// ADD TASK (POST)
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();
  if (!text) return;

  const res = await fetch("http://localhost:5000/api/addTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user,
      task: text
    })
  });

  const data = await res.json();

  if (data.success) {
    todoInput.value = "";
    loadTasks(); // task add karne pr reload function ki help se add honge
  } else {
    alert(data.message);
  }
});

// UI helper
function addTaskToUI(task) {
  const li = document.createElement("li");  // for each task ek list banayenge

  li.innerHTML = `
    <span>${task}</span>
    <button>Delete</button>
  `;

  // DELETE TASK  // task ko id se delete nhi kar rhe user ke array me same task choice kar ke use delete kar rhe he
  li.querySelector("button").onclick = async () => {
    const res = await fetch("http://localhost:5000/api/deleteTaskByText", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user,
        task: task
      })
    });

    const data = await res.json();
    if (data.success) li.remove();
  };

  todoList.appendChild(li);
}
