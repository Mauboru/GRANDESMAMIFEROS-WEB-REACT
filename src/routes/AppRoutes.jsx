import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import NotAuthorized from "../pages/NotAuthorized";
import RegisterUser from "../pages/RegisterUser";
import ResetPassword from "../pages/ResetPassword";
import Acess from "../pages/orders/Acess";
import Control from "../pages/dashboards/Control";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Login público */}
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Rota protegida */}
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/dashboards/control" element={<PrivateRoute><Control /></PrivateRoute>} />
                <Route path="/orders/acess" element={<PrivateRoute requiredRole="manager"><Acess /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}
