import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import Todo from "./components/Todo";
import todo from "./Assets/images/todo.png";
import Pagination from "./components/shared/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState([
    { id: new Date().getTime().toString(), title: "Learn React" },
  ]);
  const [value, setValue] = useState("");
  const [nextId, setNextId] = useState(4);
  const [isEdit, setIsEdit] = useState(false);
  const [currentEditId, setCurrentEditId] = useState({});
  const [tasksPagination, setTasksPagination] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const inputRef = useRef();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    const filteredslice = filtered.slice(0, 5);
    console.log("filtered", filteredslice);
    setTasksPagination(filteredslice);
  }, [search, currentPageNo]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleAdd = (event) => {
    if (value == "") return;

    const buttonType = event.target.id;
    // if(buttonType=='addbtn'){
    console.log("in add", value);
    const [...tempTasks] = tasks;
    tempTasks.push({ id: new Date().getTime().toString(), title: value });
    setTasks(tempTasks);
    setValue("");
    // }
    //  if(buttonType=='updatebtn'){
    //   setIsEdit(false)
    // }
    console.log("tasks", tasks);
  };

  const handleEdit = (task) => {
    setIsEdit(true);
    inputRef.current.focus();
    const currentTask = tasks.filter((task) => task.id == task.id);
    console.log("in edit", task.id, task.title);
    setValue(task.title);
    // const updatedTask=currentTask[0].title
    setCurrentEditId(task.id);
  };

  const handleUpdate = () => {
    const updatedTasks = tasks.map((task) =>
      task.id == currentEditId ? { ...task, title: value } : task
    );
    setTasks(updatedTasks);
    setIsEdit(false);
    setValue("");
  };

  const handleRemove = (id) => {
    // console.log(id)
    const updatedTasks = tasks.filter((task) => task.id != id);
    setTasks(updatedTasks);
  };

  const handlePage = (page) => {
    console.log("page no.", page);
    setCurrentPageNo(page);
    // const currentPageArray=tasks.slice(0,6)
    // setTasksPagination(currentPageArray)
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [tasks]);

  useEffect(() => {
    console.log("curr page", (currentPageNo - 1) * 5, currentPageNo * 5);
    const currentPageArray = tasks.slice(
      (currentPageNo - 1) * 5,
      currentPageNo * 5
    );
    // const currentPageArray=tasks.slice(5,10)
    console.log("tasks", tasks);
    console.log("sliced", currentPageArray);
    setTasksPagination(currentPageArray);
  }, [tasks, currentPageNo]);

  return (
    <div className="app">
      <div className="wrapper">
        <div
          style={{
            position: "sticky",
            top: "0",
            paddingTop: "10px",
            backgroundColor: "#1c0730",
          }}
        >
          <div className="header">
            <img className="todo-img" src={todo} alt="" />
            <h2>Get Things Done!</h2>
          </div>
          <div>
            <input
              className="search-input"
              type="text"
              name=""
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <FontAwesomeIcon icon={faSearch} style={{marginLeft:'-20px'}} />
          </div>
          <div className="form">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter your task"
              value={value}
              onChange={handleChange}
            />
            {isEdit ? (
              <button id="updatebtn" onClick={(event) => handleUpdate(event)}>
                Update
              </button>
            ) : (
              <button id="addbtn" onClick={(event) => handleAdd(event)}>
                Add Task
              </button>
            )}
          </div>
        </div>

        <div className="tasks">
          {tasks.length > 0 ? (
            <div>
              {" "}
              {tasksPagination.map((task, key = task.id) => {
                return (
                  <Todo
                    key={key}
                    task={task}
                    handleEdit={handleEdit}
                    handleRemove={() => handleRemove(task.id)}
                  />
                );
              })}{" "}
            </div>
          ) : (
            <div
              style={{
                marginTop: "90px",
                fontSize: "30px",
                fontFamily: "sans-serif",
              }}
            >
              Empty list{" "}
            </div>
          )}
        </div>

        <Pagination items={tasks.length} handlePage={handlePage} currentPageNo={currentPageNo} />
      </div>
    </div>
  );
}

export default App;
