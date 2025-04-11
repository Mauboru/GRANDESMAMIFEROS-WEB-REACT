import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import RegisterUser from "../pages/RegisterUser";
import Saldo from "../pages/carteira/Saldo";
import Apostas from "../pages/corridas/Apostas";
import Transmissao from "../pages/corridas/Transmissao";
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
                <Route path="/carteira/saldo" element={<PrivateRoute><Saldo /></PrivateRoute>} />
                <Route path="/corridas/apostas" element={<PrivateRoute><Apostas /></PrivateRoute>} />
                <Route path="/corridas/transmissao" element={<PrivateRoute><Transmissao /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}
