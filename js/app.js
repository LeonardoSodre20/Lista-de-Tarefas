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

    updateLocalStorage()
}

const handleClick = (taskItemText) => {
    const tasks = tasksContainer.childNodes

    for(const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskItemText)

        if(currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('completed')
        }
    }

    updateLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskItemText) => {
    const tasks = tasksContainer.childNodes

    for(const task of tasks) {
        currentTaskIsBeingClicked = task.firstChild.isSameNode(taskItemText)

        if(currentTaskIsBeingClicked) {
            taskItemContainer.remove()
        }
    }

    updateLocalStorage()
}

const handleInputChange = () => {
    const inputIsValid = validateInput()

    if(inputIsValid) {
        return inputElement.classList.remove('error')
    }
}

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes

    const localStorageTasks = [...tasks].map((task) => {
        const content = task.firstChild
        const isCompleted = content.classList.contains('completed')

        return {description: content.innerText, isCompleted: isCompleted}
    })

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

    if(!tasksFromLocalStorage) return

    for(const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div')
        taskItemContainer.classList.add('task-item')
    
        const taskItemText = document.createElement('p')
        taskItemText.classList.add('task-description')
    
        taskItemText.addEventListener('click', () => handleClick(taskItemText))
    
        taskItemText.innerText = task.description

        if(task.isCompleted) {
            taskItemText.classList.add('completed')
        }
    
        const deleteItem = document.createElement('div')
        deleteItem.classList.add('icon-task-container')

        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskItemText))
    
        taskItemContainer.appendChild(taskItemText)
        taskItemContainer.appendChild(deleteItem)
        tasksContainer.appendChild(taskItemContainer)
    }
}

refreshTasksUsingLocalStorage()

addTaskButton.addEventListener('click', () => handleAddTask())

inputElement.addEventListener('change', () => handleInputChange())

