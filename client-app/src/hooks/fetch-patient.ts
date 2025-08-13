import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth-store";

export const useCheckPatientProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const firstLoad = useRef(true); 

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(false); // already has user
        return;
      }

      try {
        const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/patient/profile`;
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401 && !firstLoad.current) {
            toast.error("Session expired. Please sign in.");
            navigate("/auth/patient/login");
          }
          return;
        }

        const data = await res.json();
        setUser(data.data);
      } catch (error) {
        if (!firstLoad.current) {
          const message =
            error instanceof Error
              ? error.message
              : "Session expired. Please sign in.";
          toast.error(message);
          navigate("/auth/patient/login");
        }
      } finally {
        setLoading(false);
        firstLoad.current = false; // mark first attempt as done
      }
    };

    fetchProfile();
  }, [user, setUser, navigate]);

  return { user, loading };
};
