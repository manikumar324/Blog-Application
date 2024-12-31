import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThreeDots } from "react-loader-spinner";

// Lazy-loaded components for initial routes
const Login = lazy(() => import("./components/account/Login"));
const Home = lazy(() => import("./components/Home"));
const Contact = lazy(() => import("./components/contact"));
const About = lazy(() => import("./components/About"));

// Eagerly-loaded components for faster navigation
import CreatePost from "./components/CreatePost";
import DetailView from "./components/DetailView";
import UpdatePost from "./components/UpdatePost";

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-screen bg-white">
    <ThreeDots
      height="80"
      width="80"
      color="#3498db"
      ariaLabel="three-dots-loading"
    />
  </div>
);

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Check if components should hide (e.g., Header)
  const shouldHideComponents = location.pathname === "/";

   // Exclude specific routes from showing the loader
   const excludedRoutes = ["/home/create", "/update/:id", "/categories", "/home"];

   useEffect(() => {
     if (excludedRoutes.some((route) => location.pathname.startsWith(route))) {
       setLoading(false);
       return;
     }
    })

  // Trigger loader on navigation
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate a small delay for loading animation

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {!shouldHideComponents && <Header />}
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/details/:id"
              element={
                <ProtectedRoute>
                  <DetailView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update/:id"
              element={
                <ProtectedRoute>
                  <UpdatePost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default App;
