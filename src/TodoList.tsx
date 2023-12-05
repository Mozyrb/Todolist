import React, {useState} from 'react';

interface ITodoListItem{
    id:number;
    text:string;
    completed:boolean;
    isEditing:boolean;
}
const TodoList:React.FC = () => {
    const [todos, setTodos] = useState<ITodoListItem[]>([
        {id:1, text:'Task 1', completed:false, isEditing:false},
        {id:2, text:'Task 2', completed:false, isEditing:false}
    ])

    const [input, setInput] = useState<string>('')
    const [edit, setEdit] = useState<string>('')

    const addNewTodo=()=>{
        const newTodo:ITodoListItem={id:Date.now(), text:input, completed:false, isEditing:false}
        setTodos([...todos,newTodo])
        setInput('')
    }

    const handleCheckBox=(id:number)=>{
        setTodos(
            todos.map((todo)=>
                todo.id===id ? {...todo, completed:! todo.completed} : todo
            )
        )
    }

    const handleDeleteTodo=(id:number)=>{
        setTodos(
            todos.filter((todo)=> todo.id!==id)
        )
    }

    const handleEditTodo=(id:number)=>{
        setTodos(
            todos.map((todo)=>
                todo.id===id ? {...todo, isEditing:true} : todo
            )
        )
        const editingTodo=todos.find((todo)=>todo.id===id)
        if(editingTodo){
            setEdit(editingTodo.text)
        }
    }

    const handleEditBlur=(id:number)=>{
        setTodos(
            todos.map((todo)=>
                todo.id===id ? {...todo, text:edit, isEditing:false} : todo
            )
        )
    }

    return (
        <div className='main-container'>
            <h1>Todo list</h1>
            <ul>
                {todos.map((todo)=>
                    todo.isEditing ? (
                        <input type='text' value={edit} onChange={(e)=>setEdit(e.currentTarget.value)} onBlur={()=>handleEditBlur(todo.id)}/>
                        ) : (
                        <li>
                            <input className='checkBox' type='checkbox' onClick={()=>handleCheckBox(todo.id)}/>
                            <span style={{textDecoration:todo.completed ? 'line-through' : 'none'}} onClick={()=>handleEditTodo(todo.id)}>{todo.text}</span>
                            <button className='del' onClick={()=>handleDeleteTodo(todo.id)}>delete</button>
                        </li>
                        )
                )}
            </ul>
            <input type='text' placeholder='Add new task' value={input} onChange={(e)=>setInput(e.currentTarget.value)}/>
            <button onClick={addNewTodo}>Add</button>
        </div>
    );
};

export default TodoList;