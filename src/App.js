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
      name: "John Doe",
      picture: "https://via.placeholder.com/50",
      resume: "https://example.com/resume.pdf",
      phone: "+1 465 456 4656",
      notes: "Need to do document verification.",
      stage: "Technical",
      applicationDate: "2021-02-02",
      lastProcessDate: "2021-02-05",
      nextProcessDate: "2021-02-18",
      appliedFor: "Associate Product Manager",
      ratings: { screening: 3, technical: 3, hr: 2 },
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
