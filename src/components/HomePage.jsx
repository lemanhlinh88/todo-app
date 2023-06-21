import { useEffect, useState } from "react";
import { ACTIONS } from "../Utils/Constant";
import Form from "./Form";
import "./HomePage.scss";
import Todo from "./Todo";
import {
  getWorksFromLocalStorage,
  handleSaveOnLocalStorage,
} from "../Utils/handleLocalStorage";

const HomePage = () => {
  const [toDoList, setToDoList] = useState([]);
  const [valueInputSearch, setValueInputSearch] = useState("");

  // sort
  let showToDo =
    toDoList.length !== 0
      ? toDoList.sort(function (todo1, todo2) {
          return new Date(todo1.Date) - new Date(todo2.Date);
        })
      : [];

  // find text in title
  if (valueInputSearch.length > 0) {
    showToDo = showToDo.filter((item) =>
      item.Title.toLocaleLowerCase().includes(
        valueInputSearch.toLocaleLowerCase()
      )
    );
  }

  console.log(showToDo);

  // get Works from local storage
  useEffect(() => {
    setToDoList(getWorksFromLocalStorage());
  }, []);

  // save works to local storage
  useEffect(() => {
    if (toDoList.length > 0) {
      handleSaveOnLocalStorage(toDoList);
    }
  }, [toDoList]);

  // create a new work
  const createNewWork = (dataTodo) => {
    let id = toDoList.length === 0 ? 1 : toDoList[toDoList.length - 1].Id + 1;
    setToDoList((prev) => [...prev, { Id: id, ...dataTodo }]);
  };

  // delete a work
  const deleteWork = (id) => {
    let newList = toDoList.filter((item) => item.Id !== id);
    setToDoList(newList);
    handleSaveOnLocalStorage(newList);
  };

  // update a work
  const updateWork = (data) => {
    let updateTodo = toDoList.map((item) =>
      item.Id === data.Id ? { ...data, Checked: item.Checked } : item
    );
    setToDoList(updateTodo);
  };

  // Complete
  const toggleCheckBox = (id) => {
    let updateTodo = toDoList.map((item) =>
      item.Id === id ? { ...item, Checked: !item.Checked } : item
    );
    setToDoList(updateTodo);
  };

  return (
    <div className="container">
      <div className="create">
        <h2 className="title">New Task</h2>
        <Form type={ACTIONS.CREATE} actionForm={createNewWork} />
      </div>
      <div className="main">
        <h2 className="title">To Do List</h2>

        <input
          type="text"
          className="input-app input-search"
          placeholder="Search..."
          value={valueInputSearch}
          onChange={(event) => setValueInputSearch(event.target.value)}
        />

        {showToDo &&
          showToDo.length !== 0 &&
          showToDo.map((item, index) => {
            return (
              <Todo
                todo={item}
                key={index}
                updateAction={updateWork}
                deleteAction={deleteWork}
                toggleCheckboxAction={toggleCheckBox}
              />
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
