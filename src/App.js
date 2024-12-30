import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import JobProfiles from "./components/JobProfiles/JobProfiles";
import Contact from "./components/Contact/ContactUs";
import Login from "./components/Login/login";
import Candidates from "./components/Candidates/Candidates";
import Register from "./components/Register/Register";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  // Manage the candidates state here
  const [candidates, setCandidates] = useState([
    {
      id: 1,
        firstName: "John",
        lastName: "Doe",
        experience: "5", 
        skillSet: "Java", 
        currentCompany: "XYZ Corporation", 
        currentLocation: "New York, NY", 
        preferredLocation: "Remote", 
        email: "john.doe@example.com", 
        mobile: "555-123-4567", 
        resume: "path/to/resume.pdf", 
        dateOfReceipt: "2024-07-05", 
        dateModified: "2024-07-05" ,
      
    },
  ]);
  const addCandidate = (newCandidateData) => {
    setCandidates((prevCandidates) => [...prevCandidates, newCandidateData]);
  };
  
  return (
    <div className="main">
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <Layout />,
            children: [
              { path: "/", element: <Home /> },
              { path: "/reqirements", element: <JobProfiles addCandidate={addCandidate} />},
              { path: "/contact-us", element: <Contact /> },
              { path: "/login", element: <Login /> },
              { path: "/about-us", element: <Home /> },
              { path: "/create-account", element: <Register /> },
              {
                path: "/candidates",
                element: (
                  <Candidates candidates={candidates} setCandidates={setCandidates} />
                ),
              },
            ],
          },
        ])}
      />
    </div>
  );
}

export default App;
