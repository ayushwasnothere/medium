import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { UserBlogs } from "./pages/UserBlogs";
import { Publish } from "./pages/Publish";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginRoute } from "./components/LoginRoutes";
import { Blogss } from "./pages/Blogss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="/signup" element={<LoginRoute><Signup /></LoginRoute>} />
        <Route path="/signin" element={<LoginRoute><Signin /></LoginRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>}/>
        <Route path="/blogss" element={<ProtectedRoute><Blogss/></ProtectedRoute>}/>
        <Route path="/blogs/user/:id" element={<ProtectedRoute><UserBlogs /></ProtectedRoute>} />
        <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;
