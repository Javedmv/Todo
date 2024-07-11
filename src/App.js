import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [toDos, setToDos] = useState(() => {
  const storedToDos = localStorage.getItem('toDos');
  return storedToDos ? JSON.parse(storedToDos) : []
  });

  const [toDo, setToDo] = useState('');
  const [edit, setEdit] = useState(null);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = new Date().getDay();

  useEffect(() => {
    console.log("Component mounted. Checking local storage for to-dos.");
    const storedToDos = localStorage.getItem('toDos');
    if (storedToDos) {
      console.log("To-dos found in local storage:", JSON.parse(storedToDos));
      setToDos(JSON.parse(storedToDos));
    } else {
      console.log("No to-dos found in local storage.");
    }
  }, []);

  useEffect(() => {
    console.log("To-dos state changed. Saving to-dos to local storage:", toDos);
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

  function handleEditClick(id) {
    setEdit(id);
    const edit = toDos.find((todo) => todo.id === id);
    setToDo(edit.text);
  }

  function handleAddClick(){
    if(toDo.trim() !== ''){
      const exists = toDos.some(todo => todo.text === toDo.trim().toLowerCase());
      if(!exists){
        setToDos([{ text: toDo.trim().toLowerCase(), id: Date.now(), status: false }, ...toDos]);
        setToDo('');
      } else {
        alert('This Todo already exists');
      }
    }
  }

  function handleSave(id) {
    const newText = toDo.trim().toLowerCase();
    if (newText !== '') {
      setToDos((prevToDos) => {
        const filteredToDos = prevToDos.filter(todo => todo.id !== id);
        const updatedItem = {text: newText, id, status:false};
        return [updatedItem, ...filteredToDos]
      });
      setEdit(null);
      setToDo('');
    }
  }
  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {daysOfWeek[day]} 🌝 ☕ </h2>
      </div>
      <div className="input" style={{ marginTop: '3rem' }}>
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        {!edit && <i onClick={handleAddClick} className="fas fa-plus" />}
      </div>
      <div className="todos">
        {toDos.map((list) => (
          <div key={list.id} className="todo-container">
            <div className="todo">
              <div className="left">
                <input
                  className="custom-checkbox"
                  id={`checkbox-${list.id}`}
                  checked={list.status}
                  onChange={(e) => {
                    setToDos(
                      toDos.map((obj) => {
                        if (obj.id === list.id) {
                          obj.status = e.target.checked;
                        }
                        return obj;
                      })
                    );
                  }}
                  type="checkbox"
                />
                <label htmlFor={`checkbox-${list.id}`}></label>
                <p className={list.status ? 'strikethrough' : ''}>{list.text}</p>
              </div>
              {!edit && <div className="right">
                <i
                  onClick={() => {
                    setToDos(toDos.filter((obj) => obj.id !== list.id));
                  }}
                  className="fas fa-times"
                />
              </div>}
            </div>
            {!list.status && <div>
              {edit === list.id ?
                <button onClick={() => handleSave(list.id)} className="save-button">
                  Save
                </button> :
                <button onClick={() => handleEditClick(list.id)} className="edit-button">
                  Edit
                </button>
              }
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
