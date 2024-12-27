import React from 'react'

export default function Todo(props) {
    let { title, isComplete, id } = props;

    let checkHandler = id => props.onComplete(id);

    let removeHandler = id => props.onRemove(id);

    return (
        <div className={isComplete ? 'todo completed' : 'todo'} style={{ display: 'flex' }}>
            <li className="todo-item">{title}</li>
            <button className="check-btn" onClick={() => checkHandler(id)}>
                <i className="fas fa-check" aria-hidden="true"></i>
            </button>
            <button className="trash-btn" onClick={() => removeHandler(id)}>
                <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    )
}
