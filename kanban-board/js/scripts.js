const form = document.querySelector(".add-task__form")
const Task = document.querySelector('#add-task') 
const addButton = document.querySelector('.add-task__button')
const taskBcklog = document.querySelector('#taskboard__list__backlog')


form.addEventListener('submit', Taskadd)

function Taskadd(event) {
    event.preventDefault();

    let TaskText = Task.value;

    let TaskHtml = `<div class="taskboard__item task">
    <div class="task__body">
      <p class="task__view">${TaskText}</p>
      <input class="task__input" type="text" value="Название первой задачи">
    </div>
    <button class="task__edit" type="button" aria-label="Изменить"></button>
  </div>`

    taskBcklog.insertAdjacentHTML("beforeend", TaskHtml)

    Task.value = ''
    Task.focus()
}
