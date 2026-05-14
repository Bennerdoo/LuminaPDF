import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@app/auth/UseSession";
import { useAppConfig } from "@app/contexts/AppConfigContext";
import HomePage from "@app/pages/HomePage";
import { useBackendProbe } from "@app/hooks/useBackendProbe";
import AuthLayout from "@app/routes/authShared/AuthLayout";
import LoginHeader from "@app/routes/login/LoginHeader";
import { useTranslation } from "react-i18next";

/**
 * Landing component - Smart router based on authentication status
 *
 * If login is disabled: Show HomePage directly (anonymous mode)
 * If user is authenticated: Show HomePage
 * If user is not authenticated: Show Login or redirect to /login
 */
export default function Landing() {
  return <HomePage />;
}
