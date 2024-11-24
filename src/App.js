import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import JobProfiles from "./components/JobProfiles/JobProfiles";
import Contact from "./components/Contact/ContactUs";
import Login from "./components/Login/login";
import Candidates from "./components/Candidates/Candidates";

const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet /> {/* Placeholder for child routes */}
    </>
  );
};


function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />, 
    children: [
    { path:'/',element:<Home />},
    { path: "/job-profiles", element: <JobProfiles /> },
    {path: "/contact-us", element: <Contact />},
    {path: "/login", element: <Login />},
    {path: "/about-us", element: <Home />},
    {path: "/candidates", element: <Candidates />}

  ]
  }
  ]);
  return (
    <div className="main">
     <RouterProvider router={router} />
  </div>
  );
}

export default App;
