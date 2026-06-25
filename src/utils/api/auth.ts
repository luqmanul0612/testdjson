import axios from "@/lib/axios";
import type { PostLoginRequest, PostLoginResponse, GetAuthMeResponse, GetAuthMeRequest } from "@/types/auth";

export const postLogin = async (body: PostLoginRequest) => {
  return axios.post<PostLoginResponse>("/auth/login", body);
};

export const getAuthMe = async (body?: GetAuthMeRequest) => {
  return axios.get<GetAuthMeResponse>(`/auth/me`, {
    headers: { Authorization: body?.accessToken ? `Bearer ${body?.accessToken}` : undefined },
  });
};
