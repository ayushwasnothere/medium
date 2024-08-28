import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signnup, Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { UserBlogs } from "./pages/UserBlogs";
import { Publish } from "./pages/Publish";
import { RequireAuth } from "./components/RequireAuth";
import { NoAuth } from "./components/NoAuth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<NoAuth><Signup /></NoAuth>} />
          <Route path="/signin" element={<NoAuth><Signin /></NoAuth>} />
          <Route path="/blog/:id" element={<RequireAuth><Blog /></RequireAuth>} />
          <Route path="/blogs" element={<RequireAuth><Blogs /></RequireAuth>} />
          <Route path="/blogs/user/:id" element={<RequireAuth><UserBlogs /></RequireAuth>} />
          <Route path="/publish" element={<RequireAuth><Publish /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
