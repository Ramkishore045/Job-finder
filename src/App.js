import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Candidate from "./components/Candidate/Candidate";
import Contact from "./components/Contact/ContactUs";
import Login from "./components/Login/login";

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
    { path: "/candidate-finder", element: <Candidate /> },
    {path: "/contact-us", element: <Contact />},
    {path: "/login", element: <Login />},

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
