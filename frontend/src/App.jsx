import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home/home";
import NewPost from "./pages/posts/NewPost";
import PostDetail from "./components/posts/PostDetail";

function App() {
  const currentUser = localStorage.getItem('userId');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home currentUser={currentUser} />} />
      <Route path="/posts/:id" element={<PostDetail currentUser={currentUser} />} />
      <Route path="/posts/new" element={<NewPost />} />
    </Routes>
  );
}

export default App;