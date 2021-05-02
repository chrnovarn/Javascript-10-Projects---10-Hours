const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const todos = JSON.parse(localStorage.getItem('todos'));

if(todos){
    todos.forEach((todo) => {
        addTodo(todo);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
    
})
    

function addTodo(todo){
    
    let todoText = input.value;
    if(todo)
    {
        todoText = todo.text;
    }

    if(todoText){
        const todosEl = document.createElement('li');
        if(todo && todo.completed)
        {
            todosEl.classList.add('completed');
        }
        todosEl.innerHTML = todoText;

        todosEl.addEventListener('click', () => {
            todosEl.classList.toggle('completed');
            updateLS();
        })
        todosEl.addEventListener('contextmenu' , 
        (e) => {

            e.preventDefault();

            todosEl.remove();

            updateLS();
        });
        todosUL.appendChild(todosEl);

        input.value ="";

        updateLS();
        
    }


}


function updateLS(){

    const todosEl = document.querySelectorAll('ul#todos li');

    const todos = [];

    todosEl.forEach((todoEl) => {

        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    })

    localStorage.setItem('todos', JSON.stringify(todos));
}
