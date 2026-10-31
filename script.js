const API = 'http://localhost:4000/api/tasks';
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const titleInput = document.getElementById('titleInput');
const statusInput = document.getElementById('statusInput');
async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  renderTasks(tasks);
}
function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.status === 'done' ? 'done' : ''}`;
    li.innerHTML = `
      <span>${task.title} — <em>${task.status}</em></span>
      <span class="actions">
        <button data-action="toggle" data-id="${task.id}">✓</button>
        <button data-action="delete" data-id="${task.id}">✕</button>
      </span>
    `;
    taskList.appendChild(li);
  });
}
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: titleInput.value, status: statusInput.value })
  });
  titleInput.value = '';
  loadTasks();
});
taskList.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.dataset.action === 'delete') {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
  }
  if (e.target.dataset.action === 'toggle') {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'done' })
    });
  }
  loadTasks();
});
loadTasks();
