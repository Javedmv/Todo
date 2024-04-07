import React,{useState} from "react";

function App(){
    const [toDos,setToDos] = useState([]);
    const [toDo,setToDo] = useState('');
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date().getDay()

    return (
        <div className="app">
          <div className="mainHeading">
            <h1>ToDo List</h1>
          </div>
          <div className="subHeading">
            <br />
            <h2>Whoop, it's {daysOfWeek[day]} 🌝 ☕ </h2>
          </div>
          <div className="input">
            <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
            <i onClick={()=>setToDos([...toDos,{text:toDo,id:Date.now(),status:false}])} className="fas fa-plus"></i>
          </div>
          <div className="todos">
            { toDos.map((list) => {
                return (
                  <div key={list.id} className="todo">
                  <div className="left">
                    <input value={list.status} onChange={(e) => {
                      setToDos(toDos.filter(obj => {
                        if(obj.id === list.id){
                          obj.status = e.target.checked;                         
                        }
                        return obj;
                      }))
                    }
                      } type="checkbox" name="" id="" />
                    <p>{list.text}</p>
                  </div>
                  <div className="right">
                    <i className="fas fa-times"></i>
                  </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      );
}

export default App;