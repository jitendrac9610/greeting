import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import ProfileSetup from "../pages/ProfileSetup";
import Home from "../pages/Home";
import Preview from "../pages/Preview";

import { SignedOut, useUser } from "@clerk/clerk-react";

import { getProfile } from "../utils/storage";

const AppRoutes = () => {
  const { isLoaded, isSignedIn } = useUser();

  const guestUser = Boolean(
    JSON.parse(localStorage.getItem("guestUser") || "null"),
  );
  const profile = getProfile();
  const isGuest = guestUser;
  const hasProfile = Boolean(profile);

  const isAuthenticated = isGuest || hasProfile || isSignedIn;
  const shouldCompleteProfile = isSignedIn && !hasProfile && !isGuest;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading authentication...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            shouldCompleteProfile ? (
              <Navigate to="/profile-setup" replace />
            ) : isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <SignedOut>
                <Login />
              </SignedOut>
            )
          }
        />

        {/* Profile Setup */}
        <Route
          path="/profile-setup"
          element={
            hasProfile ? (
              <Navigate to="/home" replace />
            ) : isAuthenticated ? (
              <ProfileSetup />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
        />

        {/* Preview */}
        <Route
          path="/preview/:id"
          element={isAuthenticated ? <Preview /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
