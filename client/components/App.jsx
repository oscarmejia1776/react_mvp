import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Card from "./Card.jsx";

const App = () => {
  const [applications, setApplications] = useState([]);

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
      {applications.map((application) => (
        <Card
          className="applications"
          key={application.id}
          application={application}
        />
      ))}
      <button>+</button>
      <Footer />
    </>
  );
};

export default App;
