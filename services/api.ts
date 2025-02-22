const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginPayload {
  email: string;
  username: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

interface ProfilePayload {
  name?: string;
  birthday?: string;
  height?: number;
  weight?: number;
  interests?: string[];
}

export interface AuthResponse {
  access_token: string;
}

interface ApiResponse {
  message: string;
  data: any;
}

export interface GetProfileResponse extends ApiResponse {
  data: {
    email?: string;
    username?: string;
    interests?: string[];
    horoscope?: string;
    zodiac?: string;
    gender?: string;
    birthday?: string;
    height?: number;
    weight?: number;
  };
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  },
};

export const profileService = {
  async getProfile(token: string): Promise<GetProfileResponse> {
    const response = await fetch(`${API_BASE_URL}/getProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        "x-access-token": `${token}`,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  },

  async updateProfile(token: string, payload: ProfilePayload) {
    const response = await fetch(`${API_BASE_URL}/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  },
};
