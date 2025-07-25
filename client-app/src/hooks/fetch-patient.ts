// hooks/useCheckPatientProfile.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth-store";

export const useCheckPatientProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(false); // already has user
        return;
      }

      try {
        const res = await fetch("/api/auth/patient/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUser(data.data); // or data.user based on backend
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Session expired. Please sign in.";
        toast.error(message);
        navigate("/auth/patient/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, setUser, navigate]);

  return { user, loading };
};
