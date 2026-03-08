import API from "./api";

export const request = {
  get: async <T = unknown>(url: string): Promise<T> => {
    const res = await API.get<T>(url);
    return res.data;
  },

  post: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await API.post<TRes>(url, data);
    return res.data;
  },

  put: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await API.put<TRes>(url, data);
    return res.data;
  },

  patch: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await API.patch<TRes>(url, data);
    return res.data;
  },

  delete: async <T = unknown>(url: string): Promise<T> => {
    const res = await API.delete<T>(url);
    return res.data;
  },
};
