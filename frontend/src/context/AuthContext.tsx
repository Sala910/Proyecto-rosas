/* src/context/AuthContext.tsx */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

export interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const API = '/api';

  // Carga el usuario de localStorage al montar
  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    let success = false;
    if (!email || !password) return success;  // validación previa

    setIsLoading(true);
    try {
      const resp = await fetch(`${API}/login.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          const u: User = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
          };
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
          success = true;
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    }
    setIsLoading(false);
    return success;
  };

  // Registro
  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    let success = false;
    if (!email || !password || !name) return success;  // validación previa

    setIsLoading(true);
    try {
      const resp = await fetch(`${API}/register.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        // tu PHP espera el campo "nombre"
        body: JSON.stringify({ email, password, nombre: name }),
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          const u: User = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
          };
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
          success = true;
        }
      }
    } catch (err) {
      console.error('Register error:', err);
    }
    setIsLoading(false);
    return success;
  };

  // Eliminar usuario
  const deleteUser = async (id: number): Promise<boolean> => {
    let success = false;
    if (id <= 0) return success;  // validación previa

    setIsLoading(true);
    try {
      const resp = await fetch(`${API}/delete_user.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          // si borramos al usuario logueado, hacemos logout
          if (user?.id === id) logout();
          success = true;
        }
      }
    } catch (err) {
      console.error('Delete user error:', err);
    }
    setIsLoading(false);
    return success;
  };

  // Logout
  const logout = (): void => {
    // avisamos al backend, pero limpiamos en frontend siempre
    fetch(`${API}/logout.php`, { credentials: 'include' }).finally(() => {
      localStorage.removeItem('user');
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, deleteUser, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
