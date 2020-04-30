//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listener
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change',filterTodo);

//Functions

function addTodo(event){
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value)

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value= "";
}

    function deleteCheck(e) {
        const item = e.target;

        if (item.classList[0] === "trash-btn") {
            const todo = item.parentElement;

            todo.classList.add("fall");
            removeLocalTodos(todo);
            todo.addEventListener('transitionend', function() {
                todo.remove();
            })
            removeLocalCompleted(todo)           
        }

        if (item.classList[0] === "complete-btn") {
            const todo = item.parentElement;
            todo.classList.toggle("completed");
            if (todo.classList.contains("completed")){
                saveLocalCompleted(todo)  
            } else {
                removeLocalCompleted(todo)     
            }
        }
    }

    function filterTodo(e) {
        const todos = todoList.childNodes;
        todos.forEach(function(todo) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    } else {
                        todo.style.display ="none";
                    }
                    break;       
                case "uncompleted":
                    console.log('kool')
                    if (!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        });
    }


    function saveLocalTodos(todo){
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

function getTodos(){
    let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalCompleted(todo){
    let todos;
    if(localStorage.getItem('completed') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("completed"));
    }

    todos.push(todo.children[0].innerText);
    localStorage.setItem("completed", JSON.stringify(todos));
}

function removeLocalCompleted(todo) {
    let todos;
    if(localStorage.getItem('completed') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("completed"));
    }
    const todoIndex = todo.children[0].innerText;

    if (todos.indexOf(todoIndex) !== -1) {
        todos.splice(todos.indexOf(todoIndex),1);
        localStorage.setItem("completed", JSON.stringify(todos));
    }    
}
