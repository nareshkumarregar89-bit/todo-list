import { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx";
import { stringify, v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
  let todosstring = localStorage.getItem("todos")
  if (todosstring) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  setTodos(todos);
  }
  }, [])
  
  const savetodosLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id);
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos);
    savetodosLS()
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos);
     savetodosLS()
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log({todos});
     savetodosLS()
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
   
  };
  const handleCheckbox = (e) => {
   let id = e.target.name;
   let index = todos.findIndex(item=>{
    return item.id === id;
    });
   let newTodos =[...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos);
   savetodosLS()
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-gray-200 p-5 mt-5 rounded min-h-[80vh]">
        <div className="addtodo my-5 ">
          <h2>Add Task</h2>
          <input onChange={handleChange} value={todo} type="text" placeholder="Enter task..." className="bg-white w-80" />
          <button onClick={handleAdd} className="bg-violet-500 hover:bg-violet-600 transition-all text-white px-3 py-1 rounded-md ml-2 font-bold text-sm">
           Save
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Tasks</h2>

        <div className="todos">
          {todos.length === 0 && <div className="text-gray-500">No tasks added yet.</div>}
          {todos.map(item=>{
        
        return <div className="todo flex justify-around  w-1/4 bg-white p-3 my-2 rounded-md" key={item.id}>
          <div className="flex gap-5 w-full ">
          <input name={item.id} onChange={handleCheckbox} type="checkbox"  value={item.isCompleted} id="" />
          <div className={item.isCompleted ? "line-through text-gray-500" : "text-gray-800"} >{item.todo}</div>
          <div className="buttons">
            <button onClick={(e)=>handleEdit(e, item.id)} className="bg-violet-500 hover:bg-violet-600 transition-all text-white px-3 py-1 rounded-md mr-2 font-bold text-sm">Edit</button>
            <button onClick={(e)=>handleDelete( e, item.id)} className="bg-red-500 hover:bg-red-600 transition-all text-white px-3 py-1 rounded-md font-bold text-sm">Delete</button>
          </div>
         </div> 
        </div>
        })}
        </div>
      </div>
    </>
  );
}

export default App;
