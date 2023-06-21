import { useState } from "react";
import Form from "./Form";
import "./Todo.scss";
import { ACTIONS } from "../Utils/Constant";

const Todo = (props) => {
  const { todo, updateAction, deleteAction, toggleCheckboxAction } = props;
  const [isShowForm, setIsShowForm] = useState(false);
  const [isChecked, setIsChecked] = useState(todo ? todo.Checked : false);

  const handleClickDetail = () => {
    setIsShowForm(true);
  };

  const handleHideForm = () => {
    setIsShowForm(false);
  };

  const handleDeleteAction = () => {
    deleteAction(todo.Id);
  };

  const handleOnchangeCheckbox = (event) => {
    setIsChecked((prev) => !prev);
    toggleCheckboxAction(todo.Id);
  };

  return (
    <div className="todo">
      <div className="content">
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="work"
            className="work"
            checked={isChecked}
            onChange={handleOnchangeCheckbox}
          />
          <label htmlFor="work">{todo && todo.Title}</label>
        </div>

        <div className="btn-actions">
          {isShowForm ? (
            <button className="btn detail" onClick={handleHideForm}>
              Hide
            </button>
          ) : (
            <button className="btn detail" onClick={handleClickDetail}>
              Detail
            </button>
          )}
          <button className="btn delete" onClick={handleDeleteAction}>
            Remove
          </button>
        </div>
      </div>
      {isShowForm && (
        <div className="todo-form">
          <Form type={ACTIONS.EDIT} value={todo} actionForm={updateAction} />
        </div>
      )}
    </div>
  );
};

export default Todo;
