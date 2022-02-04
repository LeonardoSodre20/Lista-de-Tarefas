const inputElement = document.querySelector('[data-input]')
const addTaskButton = document.querySelector('[data-button]')
const tasksContainer = document.querySelector('[data-tasks-container]')

//Validação do Input

const validateInput = () => inputElement.value.trim().length > 0

const handleAddTask = () => {
    const inputIsValid = validateInput()

    if(!inputIsValid) {
        return inputElement.classList.add('error')
    }

    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskItemText = document.createElement('p')
    taskItemText.classList.add('task-description')

    taskItemText.addEventListener('click', () => handleClick(taskItemText))

    taskItemText.innerText = inputElement.value

    const deleteItem = document.createElement('div')
    deleteItem.classList.add('icon-task-container')

    taskItemContainer.appendChild(taskItemText)
    taskItemContainer.appendChild(deleteItem)
    tasksContainer.appendChild(taskItemContainer)

    inputElement.value = ''

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskItemText))
}

const handleClick = (taskItemText) => {
    const tasks = tasksContainer.childNodes

    for(const task of tasks) {
        if(task.firstChild.isSameNode(taskItemText)) {
            task.firstChild.classList.toggle('completed')
        }
    }
}

const handleDeleteClick = (taskItemContainer, taskItemText) => {
    const tasks = tasksContainer.childNodes

    for(const task of tasks) {
        if(task.firstChild.isSameNode(taskItemText)) {
            taskItemContainer.remove()
        }
    }
}



const handleInputChange = () => {
    const inputIsValid = validateInput()

    if(inputIsValid) {
        return inputElement.classList.remove('error')
    }
}

addTaskButton.addEventListener('click', () => handleAddTask())

inputElement.addEventListener('change', () => handleInputChange())