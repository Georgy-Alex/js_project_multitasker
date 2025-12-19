
const formAdd = document.querySelector('.add-task__form')

// ДОБАВЛЕНИЕ ЗАДАЧИ
const textTaskadd = document.querySelector("#add-task")
const task_Block = document.querySelector("#taskboard__list__backlog")

// УДАЛЕНИЕ ЗАДАЧ
const taskBoatdTrash = document.querySelector(".taskboard__list--trash")
const btnTrash = document.querySelector(".button--clear")

// ПЕРЕТАСКИВАНИЕ

// const tasks = document.querySelectorAll('.task')
const bloks = document.querySelectorAll('.taskboard__list')

// ДОБАВЛЕНИЕ ЗАДАЧИ
formAdd.addEventListener('submit', AddTask)

function AddTask(event) {
  event.preventDefault()

  let textTask = textTaskadd.value

  let taskHtml = `<div class="taskboard__item task" draggable="true">
  <div class="task__body">
    <p class="task__view">${textTask}</p>
    <input class="task__input" type="text" >
  </div>
  <button class="task__edit" type="button" aria-label="Изменить"></button>
</div>`

  task_Block.insertAdjacentHTML("beforeend", taskHtml)

  textTaskadd.value = ""

  textTaskadd.focus()
}

// РЕДАКТИРОВАНИЕ
window.addEventListener("click", Editing)

function Editing(event) {

  if (event.target.className == "task__edit") {

    const taskCard = event.target.closest('.taskboard__item')

    let titleTask = taskCard.querySelector('.task__view')
    let textTask = titleTask.textContent

    let textTaskEdit = taskCard.querySelector('.task__input')

    if (taskCard.classList.contains("task--active")) {
      taskCard.classList.remove("task--active")
      titleTask.innerText = textTaskEdit.value
    } else {
      let taskboardItem = document.querySelectorAll('.taskboard__item')
      taskboardItem.forEach((elem) => elem.classList.remove("task--active"))
      textTaskEdit.value = textTask
      taskCard.classList.add("task--active")
    }
  }
}


// УДАЛЕНИЕ



btnTrash.addEventListener('click', DeleteTasks)

if (taskBoatdTrash.children.length > 1) {
  const cardTrash = taskBoatdTrash.querySelector('.task--empty-trash')
  taskBoatdTrash.removeChild(cardTrash)
}

function DeleteTasks() {
  taskBoatdTrash.innerHTML = ""
  taskBoatdTrash.insertAdjacentHTML("beforeend", `<div class="task--empty task task--empty-trash">
  <p>Корзина пуста</p>
</div>`)
}

// ПЕРЕТАСКИВАНИЕ

window.addEventListener("dragstart", DraggingElem)
window.addEventListener('dragend', OfDraggingElem)
let blokElem

function DraggingElem(e) {
  if (e.target.classList.contains('task')) {
    e.target.classList.add('task--dragged')
    blokElem = e.target.closest('.taskboard__list')
 
  }
}

function OfDraggingElem(e) {
  if (blokElem.children.length == 0){
    blokElem.insertAdjacentHTML("beforeend", `<div class="taskboard__item task task--empty">
    <p>Перетащите карточку</p>
  </div>`)
  }
  e.target.classList.remove('task--dragged')

  blokElem = e.target.closest('.taskboard__list')
  const cardTrash = blokElem.querySelector('.task--empty')
  blokElem.removeChild(cardTrash)
}


bloks.forEach(blok => {
  blok.addEventListener('dragover', e => {
    
    e.preventDefault()
    const afterElem = DegreesElem(blok, e.clientY)

    const draggable = document.querySelector('.task--dragged')
    if (afterElem == null) {
      blok.appendChild(draggable)
    } else {
      blok.insertBefore(draggable, afterElem)
    }
  })
})

function DegreesElem(blok, y) {
  const allElem = [...blok.querySelectorAll('.task:not(.task--dragged)')]
  
  return allElem.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }

  }, { offset: Number.NEGATIVE_INFINITY }).element
}