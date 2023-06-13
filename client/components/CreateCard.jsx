import React, { useState } from "react";

function CreateCard(props) {
  const [application, setApplication] = useState({
    company: "",
    position: "",
    submit_date: "",
    poc: "",
    poc_email: "",
    poc_phone: "",
    app_result: "",
    app_group: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setApplication((prevApplication) => {
      return {
        ...prevApplication,
        [name]: value,
      };
    });
  }

  function submitApplication(event) {
    props.onAdd(application);
    setApplication({
      company: "",
      position: "",
      submit_date: "",
      poc: "",
      poc_email: "",
      poc_phone: "",
      app_result: "",
      app_group: "",
    });
    event.preventDefault();
  }

  return (
    <>
      <form>
        <input
          name="company"
          value={application.company}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <input
          name="position"
          value={application.position}
          onChange={handleChange}
          placeholder="Position"
        />
        <input
          name="submit_date"
          type="date"
          value={application.submit_date}
          onChange={handleChange}
          placeholder="Submission Date"
        />
        <input
          name="poc"
          value={application.poc}
          onChange={handleChange}
          placeholder="Point of Contact"
        />
        <input
          name="poc_email"
          value={application.poc_email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="poc_phone"
          value={application.poc_phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          name="app_result"
          value={application.app_result}
          onChange={handleChange}
          placeholder="Application Status"
        />
        <input
          name="app_group"
          value={application.app_group}
          onChange={handleChange}
          placeholder="Application Group"
        />
        <button onClick={submitApplication}>+</button>
      </form>
    </>
  );
}

export default CreateCard;
