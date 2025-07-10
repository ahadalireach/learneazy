import useAuth from "./useAuth";
import { redirect } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function UserProtected({ children }: ProtectedProps) {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : redirect("/");
}
