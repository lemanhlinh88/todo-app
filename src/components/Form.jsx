import { useState } from "react";
import { ACTIONS } from "../Utils/Constant";
import "./Form.scss";

const Form = (props) => {
  const todo = props.value;
  const action = props.type;
  const actionForm = props.actionForm;
  const hideFormAction = props.hideFormAction;
  const [title, setTitle] = useState(todo ? todo.Title : "");
  const [description, setDescription] = useState(todo ? todo.Description : "");

  // get current date
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month =
    dateNow.getMonth() + 1 < 10
      ? `0${dateNow.getMonth() + 1}`
      : dateNow.getMonth() + 1;
  const day = dateNow.getDate();
  const [date, setDate] = useState(
    todo ? todo.Date : `${year}-${month}-${day}`
  );
  const [piority, setPiority] = useState(todo ? todo.Piority : "Normal");
  const [error, setError] = useState("");

  // submit data to create or change
  const handleSubmitData = () => {
    if (!title || !description || !date || !piority) {
      setError("Please enter your input fields");
    } else if (new Date(date) - new Date(`${year}-${month}-${day}`) < -86400) {
      setError("Please enter a day in the future");
    } else if (action === ACTIONS.CREATE) {
      actionForm({
        Title: title,
        Description: description,
        Date: date,
        Piority: piority,
        Checked: false,
      });

      setTitle("");
      setDescription("");
      setDate(`${year}-${month}-${day}`);
      setPiority("Normal");
    } else {
      actionForm({
        Id: todo.Id,
        Title: title,
        Description: description,
        Date: date,
        Piority: piority,
      });

      hideFormAction();
    }
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Add new Task..."
        className="input-app work"
        value={title}
        onChange={(event) => {
          setError("");
          setTitle(event.target.value);
        }}
      />

      <div className="description-group">
        <label htmlFor="description" className="desc-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="5"
          cols="50"
          className="desc-input"
          value={description}
          onChange={(event) => {
            setError("");
            setDescription(event.target.value);
          }}
        />
      </div>

      <div className="select">
        <div className="date">
          <label htmlFor="date" className="date-label">
            Due Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="input-app date-input"
            value={date}
            onChange={(event) => {
              setError("");
              setDate(event.target.value);
            }}
          />
        </div>

        <div className="piority">
          <label htmlFor="piority" className="pio-label">
            Piority
          </label>

          <select
            name="piority"
            id="piority"
            className="input-app pio-input"
            value={piority}
            onChange={(event) => {
              setError("");
              setPiority(event.target.value);
            }}
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <p className="error">{error}</p>

      <button className="btn btn-update-create" onClick={handleSubmitData}>
        {action && action === ACTIONS.CREATE
          ? "Add"
          : action && action === ACTIONS.EDIT
          ? "Update"
          : ""}
      </button>
    </div>
  );
};

export default Form;
