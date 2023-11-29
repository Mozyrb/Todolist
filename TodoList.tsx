import React, {useState} from 'react';

interface ITodoListItem {
    id: number;
    text: string;
    completed: boolean;
    isEditing: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<ITodoListItem[]>([
        {id: 1, text: "Task 1", completed: false, isEditing: false},
        {id: 2, text: "Task 2", completed: false, isEditing: false}
    ])
    const [input, setInput] = useState<string>('')
    const [isEditing, setIsEditing] = useState<string>('')

    const addNewTodo = () => {
        const newTodo: ITodoListItem = {id: Date.now(), text: input, completed: false, isEditing: false}
        setTodos([...todos, newTodo]);
        setInput('')
    }

    const toggleCheckBox = (id: number) => {
        setTodos(
            todos.map((todo) => {
                return todo.id === id ? {...todo, completed: !todo.completed} : todo
            })
        )
    }
    const handleEdit = (id: number) => {
        setTodos(
            todos.map((todo) => {
                return todo.id === id ? {...todo, isEditing: true} : todo
            })
        )
        const editingTodo = todos.find((todo) => todo.id === id)
        if (editingTodo) {
            setIsEditing(editingTodo.text)
        }
    }

    const handleEditBlur = (id: number) => {
        setTodos(
            todos.map((todo) => {
                return todo.id === id ? {...todo, text: isEditing, isEditing: false} : todo
            })
        )
    }

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        )
    }


    return (
        <div className='main-container'>
            <h1>Todo list</h1>
            <ul>
                {todos.map((todo) =>
                    todo.isEditing ? (
                        <input value={isEditing} onChange={(e) => setIsEditing(e.currentTarget.value)}
                               onBlur={() => handleEditBlur(todo.id)}/>
                    ) : (
                        <li>
                            <input className='checkBox' type='checkbox' onChange={() => toggleCheckBox(todo.id)}
                                   checked={todo.completed}/>
                            <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
                                  onClick={() => handleEdit(todo.id)}>{todo.text}</span>
                            <button className='del' onClick={() => handleDelete(todo.id)}>delete</button>
                        </li>)
                )}
            </ul>
            <input
                type='text'
                placeholder='Add new Todo'
                value={input}
                onChange={(event) => setInput(event.currentTarget.value)}
            />
            <button onClick={addNewTodo}>Add</button>
        </div>
    );
};

export default TodoList;