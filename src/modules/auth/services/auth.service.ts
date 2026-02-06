import { api } from "../../../services/api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  expiresAt: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export const AuthService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("api/auth/login", data);

    // 🔐 persistência do token
    localStorage.setItem("mywallet:token", res.data.token);
    localStorage.setItem("mywallet:expiresAt", res.data.expiresAt);

    return res.data;
  },

  register: async (data: RegisterRequest) => {
    const res = await api.post("api/users", data);
    return res.data;
  },
};
