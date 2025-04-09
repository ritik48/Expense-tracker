import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import SignUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import { Tracker } from "./pages/Tracker";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="tracker" element={<Tracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
