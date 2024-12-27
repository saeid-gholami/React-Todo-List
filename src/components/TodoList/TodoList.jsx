import React, { useState } from 'react'
import Header from './Header'
import Todo from './Todo'

export default function TodoList() {
    let [todos, setTodos] = useState([]);
    let [todoTitle, setTodoTitle] = useState("");
    let [filter, setFilter] = useState("all");
    let [TodoID, setTodoID] = useState(1);

    let completeHandler = (todoID) => {
        let newTodos = [...todos];
        let mainTodo = newTodos.find(todo => todo.id === todoID);
        mainTodo.isComplete = !mainTodo.isComplete;
        setTodos(newTodos)
    }

    let deleteHandler = (todoID) => {
        let newTodos = [...todos].filter(todo => todo.id !== todoID);
        setTodos(newTodos)
    }

    let filterHandler = (event) => {
        setFilter(event.target.value)
    }

    let titleHandler = (event) => {
        setTodoTitle(event.target.value)
    }

    let clickHandler = (event) => {
        if (todoTitle) {
            event.preventDefault();
            let newTodoInfo = {
                id: TodoID,
                title: todoTitle,
                isComplete: false
            }
            setTodos(prevState => [...prevState, newTodoInfo]);
            setTodoTitle("")
            setTodoID(prevState => prevState + 1);
        } else {
            alert("Please enter todo title.")
        }
    }
    return (
        <>
            <Header />
            <form>
                <input
                    type="text"
                    className="todo-input"
                    maxLength="40"
                    value={todoTitle}
                    onChange={titleHandler} />
                <button className="todo-button" type="submit" onClick={clickHandler}>
                    <i className="fas fa-plus-square"></i>
                </button>
                <div className="select">
                    <select name="todos" className="filter-todo" onChange={filterHandler}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>
            <div className="todo-container">
                <ul className="todo-list">
                    {filter === "all" && (
                        todos.map(todo => (
                            <Todo
                                key={todo.id}
                                {...todo}
                                onComplete={() => completeHandler(todo.id)}
                                onRemove={() => deleteHandler(todo.id)} />
                        ))
                    )}
                    {filter === "completed" && todos.filter(todo => todo.isComplete === true).map(todo => (
                        <Todo
                            key={todo.id}
                            {...todo}
                            onComplete={() => completeHandler(todo.id)}
                            onRemove={() => deleteHandler(todo.id)} />
                    ))}
                    {filter === "uncompleted" && todos.filter(todo => todo.isComplete === false).map(todo => (
                        <Todo
                            key={todo.id}
                            {...todo}
                            onComplete={() => completeHandler(todo.id)}
                            onRemove={() => deleteHandler(todo.id)} />
                    ))}
                </ul>
            </div>
        </>
    )
}
