"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signin",
        { email, password },
        { withCredentials: true }
      );
  
      console.log("Usuario recibido en login:", res.data); // Debugging
  
      if (res.data) {
        setUser({ id: res.data.userId, email: res.data.email });
  
        localStorage.setItem(
          "user",
          JSON.stringify({ id: res.data.userId, email: res.data.email })
        );
  
        router.push("/dashboard");
      } else {
        throw new Error("No se recibió usuario en la respuesta");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error en el servidor";
        console.error("Error en login:", errorMessage);
        throw new Error(errorMessage); 
      } else {
        console.error("Error en login:", error);
        throw new Error("Error desconocido");
      }
    }
  };
  
  

  
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/signout", {}, { withCredentials: true });
      setUser(null);
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error en logout:", error.response?.data || error.message);
      } else {
        console.error("Error en logout:", error);
      }
    }
  };


  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", { withCredentials: true });

        if (res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Error al validar usuario:", error.response?.data || error.message);
        } else {
          console.error("Error al validar usuario:", error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : <p>Cargando...</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
