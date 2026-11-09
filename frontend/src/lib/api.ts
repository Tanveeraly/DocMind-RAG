import { API_URL } from "./config";
import { getToken, clearToken } from "./token";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type Options = {
  method?: "GET" | "POST" | "DELETE";
  body?: unknown; // a plain object (sent as JSON) or FormData (sent as a file upload)
};

export async function api<T>(path: string, { method = "GET", body }: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload: BodyInit | undefined;
  if (body instanceof FormData) {
    payload = body; // the browser sets the multipart header itself
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new ApiError(0, "Cannot reach the server. Is the backend running?");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // An expired or invalid token on a protected call: sign the user out
    if (res.status === 401 && token) {
      clearToken();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    throw new ApiError(res.status, data?.error ?? data?.message ?? "Something went wrong");
  }

  return data as T;
}