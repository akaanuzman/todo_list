// Selectors

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstBody = document.querySelectorAll(".card-body")[0];
const secondBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener() // All event listeners 
{
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    secondBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Are you sure ?")){
        // todoList.innerHTML = "";
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
}

function deleteTodo(element){
    if(element.target.className === "fa fa-remove"){
        element.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(element.target.parentElement.parentElement.textContent);
        showSuccess("success","Todo successfully deleted!");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodoToStroge();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos)); 
}

function loadAllTodosUI(){
    let todos = getTodoToStroge();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(todos){
    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("danger","Please don't enter blank todo !");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showSuccess("success","Todo login succesfull !");
    }
    todos.preventDefault();
}

function getTodoToStroge(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newtodo){
    let todos = getTodoToStroge();

    todos.push(newtodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}

function showAlert(type,message){
    /* <div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
</div> */
    const alert = document.createElement("div");
    alert.className = "alert alert-danger";
    alert.textContent = message;
    firstBody.appendChild(alert);

    // setTimeout
    setTimeout(function(){
        alert.remove();
    },1000);
}

function showSuccess(type,message){
   /* <div class="alert alert-success" role="alert">
  This is a success alert—check it out!
</div> */
    const success = document.createElement("div");
    success.className = "alert alert-success";
    success.textContent = message;
    console.log(success);
    firstBody.appendChild(success);

    // setTimeout
    setTimeout(function(){
        success.remove();
    },1000);
}

function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href="#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";

    // Add text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Add list item
    todoList.appendChild(listItem);
    todoInput.value = "";
}

