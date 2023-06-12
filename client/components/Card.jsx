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
    poc_result,
    poc_group,
  } = props.application;
  return (
    <div className="card">
      <button className="delete" onClick>
        X
      </button>
      <h1>{company}</h1>
      <p>{position}</p>
      <p>Submit Date: {new Date(submit_date).toLocaleDateString()}</p>
      <p>Response Date: {new Date(response_date).toLocaleDateString()}</p>
      <p>{poc}</p>
      <p>{poc_email}</p>
      <p>{poc_phone}</p>
      <p>{poc_result}</p>
      <p>{poc_group}</p>
    </div>
  );
}

export default Card;
