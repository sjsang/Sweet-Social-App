import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/posts/Home";
import NewPost from "./pages/posts/CreatePost";
import PostDetail from "./components/posts/PostDetail";
import Profile from "./pages/user/Profile";
import Notifications from "./pages/notifications/Notifications";
import Connect from "./pages/connect/Connect";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/new" element={<NewPost />} />

      <Route path="/users/:id" element={<Profile />} />

      <Route path="/notifications" element={<Notifications />} />

      <Route path="/connect" element={<Connect />} />
    </Routes>
  );
}

export default App;