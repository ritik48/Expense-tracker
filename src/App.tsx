import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import SignUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import { Tracker } from "./pages/Tracker";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Tracker />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}
