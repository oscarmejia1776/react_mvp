import React, { useState } from "react";

function Card(props) {
  const [editedData, setEditedData] = useState({
    ...props.application,
  });

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      props.onUpdate(editedData, props.id);
    }
  }

  return (
    <div className="card">
      <form>
        <button className="delete" onClick={handleClick}>
          X
        </button>
        <input
          name="company"
          value={editedData.company}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Company Name"
        />
        <input
          name="position"
          value={editedData.position}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Position"
        />
        <input
          name="submit_date"
          value={new Date(editedData.submit_date).toISOString().split("T")[0]}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Submission Date"
        />
        <input
          name="poc"
          value={editedData.poc}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Point of Contact"
        />
        <input
          name="poc_email"
          value={editedData.poc_email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Email"
        />
        <input
          name="poc_phone"
          value={editedData.poc_phone}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Phone"
        />
        <input
          name="app_result"
          value={editedData.app_result}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Application Status"
        />
      </form>
    </div>
  );
}

export default Card;
