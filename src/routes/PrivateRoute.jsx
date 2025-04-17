import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const storedUser = localStorage.getItem("dataUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.user);
        }
    }, []);

    const role = user?.role;

    if (!token) return <Navigate to="/" replace />;

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
}
