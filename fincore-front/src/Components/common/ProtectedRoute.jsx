import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Optional role-based route guard. The original app does not
 * gate any route today (only CustomerReport reads the stored
 * role, to decide which menu to return to), so this component is
 * not wired into App.js — adding a guard there would change
 * existing navigation behavior. It is provided here, ready to use,
 * for any route that should require a specific role going forward.
 *
 * Usage: <ProtectedRoute allowedRoles={["Admin"]}><AdminMenu /></ProtectedRoute>
 */
const ProtectedRoute = ({ allowedRoles, children }) => {

    const role = localStorage.getItem("role");

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
