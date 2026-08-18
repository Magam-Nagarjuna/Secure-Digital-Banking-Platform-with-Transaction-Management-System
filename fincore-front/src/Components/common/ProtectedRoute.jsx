import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ allowedRoles, children }) => {

    const role = localStorage.getItem("role");

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
