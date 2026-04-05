import { apiClient } from "@/lib/api";

export async function uploadAsset(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<{ url: string }>("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}