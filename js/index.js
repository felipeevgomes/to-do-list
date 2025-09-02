const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#tesk-title-input"); //campo para escrever o texto
const todoListUl = document.querySelector("#todo-lis"); //campo que vai aparaecer as tarefas adicionadas

let tasks = [];

function renderTaskOnHTML(taskTitle, done = false) {
  //adicionando a nova tarefa no HTML
  const li = document.createElement("li");

  //criando um input, para marcar quais foram as atividades realizadas
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement; //dispara um evento no elemento filho.
    const spanToToggle = liToToggle.querySelector("span");

    const done = event.target.checked;

    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }
    //se a palavra for marcada, troca o done pra true.
    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: event.target.checked,
        };
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  input.checked = done; 

  //texto da tarefa
  const span = document.createElement("span");
  span.textContent = taskTitle;
  if (done) {
    span.style.textDecoration = "line-through";
  }
  //botão para remover a tarefa
  const button = document.createElement("button");
  button.textContent = "Remover";
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;

    const titleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titleToRemove); //percorre cada tarefa, se o titulo for diferente do titulo que eu quero remover, coloca em um array final, senão exclui ela

    todoListUl.removeChild(liToRemove); //quando o botão for clicado, vai pegar a tag pai 'li' desse botão e remove essa tag filha da UL.

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  //Adicionando tudo isso q criamos no HTML
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);
}

window.onload = () => {
  const taskOnLocalStorage = localStorage.getItem("tasks");
  if (!taskOnLocalStorage) return;

  tasks = JSON.parse(taskOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHTML(t.title, t.done);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault(); //evita o comportamento padrão de recarregar à pagina ao submeter o formulário

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter pelo menos 3 caracteres!!");
    return; //faz com que a tarefa tenha pelo menos 3 letras, se não mostra um alerta
  }

  //adicionando a nova tarefa no array de tasks
  tasks.push({
    title: taskTitle,
    done: false, //não esta concluida, pois isso falso
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTaskOnHTML(taskTitle);

  taskTitleInput.value = ""; //deixando em branco o input para escrever alguma tarefa
});
