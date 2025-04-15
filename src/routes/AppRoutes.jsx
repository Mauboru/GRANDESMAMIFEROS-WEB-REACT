import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import RegisterUser from "../pages/RegisterUser";
import Acesso from "../pages/pedidos/Acesso";
import Controle from "../pages/dashboards/Controle";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Login público */}
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/register" element={<RegisterUser />} />

                {/* Rota protegida */}
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/dashboards/controle" element={<PrivateRoute><Controle /></PrivateRoute>} />
                <Route path="/pedidos/acesso" element={<PrivateRoute><Acesso /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}
