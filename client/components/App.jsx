import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import CreateCard from "./CreateCard.jsx";
// import Footer from "./Footer.jsx";
import Card from "./Card.jsx";

const App = () => {
  const [applications, setApplications] = useState([]);

  function addApplication(newApplication) {
    fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newApplication),
    })
      .then((res) => res.json())
      .then((createdApplication) => {
        setApplications((prevApplications) => {
          return [...prevApplications, createdApplication];
        });
      });
  }

  function deleteApplication(id) {
    fetch(`/api/applications/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((deletedApplication) => {
        setApplications((prevApplications) => {
          return prevApplications.filter((app) => app.id !== id);
        });
      });
  }

  function updateApplication(modifiedApplication, id) {
    fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedApplication),
    })
      .then((res) => res.json())
      .then((updatedApplication) => {
        setApplications((prevApplications) => {
          const updatedIndex = prevApplications.findIndex(
            (app) => app.id === updatedApplication.id
          );

          if (updatedIndex !== -1) {
            const updatedApplications = [...prevApplications];
            updatedApplications[updatedIndex] = updatedApplication;
            return updatedApplications;
          }
          return prevApplications;
        });
      });
  }

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((applications) => {
        setApplications(applications);
      });
  }, []);

  return (
    <>
      <Header />
      <CreateCard onAdd={addApplication} />
      {applications.map((app) => (
        <Card
          className="applications"
          id={app.id}
          key={app.id}
          application={app}
          onDelete={deleteApplication}
          onUpdate={updateApplication}
        />
      ))}
      {/* <Footer /> */}
    </>
  );
};

export default App;
