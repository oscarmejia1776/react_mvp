import React from "react";

function Card(props) {
  const {
    company,
    position,
    submit_date,
    response_date,
    poc,
    poc_email,
    poc_phone,
    app_result,
    app_group,
  } = props.application;

  function handleClick() {
    props.onDelete(props.id);
  }
  return (
    <div className="card">
      <button className="delete" onClick={handleClick}>
        X
      </button>
      <h1>{company}</h1>
      <p>{position}</p>
      <p>Submit Date: {new Date(submit_date).toLocaleDateString()}</p>
      <p>POC:{poc}</p>
      <p>{poc_email}</p>
      <p>{poc_phone}</p>
      <p>{app_result}</p>
      <p>{app_group}</p>
    </div>
  );
}

export default Card;
