import type { AxiosError } from "axios";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import type { SubjectLevelItem } from "../types/subject.types.ts";
type ApiResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  message?: string;
};
export type CreateSubjectLevelDto = {
  levelId: number | string;
  associationId: number | string;
  subjectIds: (number | string)[];
};

const SubjectLevelServiceApi = {
  getAll: async (
    associationId: number
  ): Promise<ApiResponse<SubjectLevelItem[]>> => {
    try {
      const response = await axiosInstance.get(`/api/v1/level-subjects/association/${associationId}`);
      return { status: 'success', data: response.data };
    } catch (err) {
      return handleError<SubjectLevelItem[]>(err, {
        404: "Aucune association niveau-matières trouvée.",
        409: "Conflit détecté lors de la récupération des données.",
      });
    }
  },

  create: async (payload: CreateSubjectLevelDto): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.post(`/api/v1/level-subjects`, payload);
      return { status: 'success', data: response.data };
    } catch (err) {
      return handleError<any>(err, {
        400: "Requête invalide. Veuillez vérifier les champs.",
        404: "Niveau, matière ou association introuvable.",
        409: "Cette association existe déjà.",
      });
    }
  },

  updateSubjects: async (payload: CreateSubjectLevelDto): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosInstance.put(`/api/v1/level-subjects/by-level-and-association`, payload);
      return { status: 'success', data: response.data };
    } catch (err) {
      return handleError<any>(err, {
        400: "Requête invalide. Vérifiez les données envoyées.",
        404: "Niveau, matière ou association introuvable.",
      });
    }
  },

  delete: async (id: number | string): Promise<ApiResponse<null>> => {
    try {
      await axiosInstance.delete(`/api/v1/level-subjects/${id}`);
      return { status: 'success' };
    } catch (err) {
      return handleError<null>(err, {
        404: "Association niveau-matières introuvable.",
        409: "Impossible de supprimer : dépendances existantes.",
      });
    }
  }
};

function handleError<T>(
  err: unknown,
  messagesByCode: Record<number, string>
): ApiResponse<T> {
  const error = err as AxiosError;
  if (error.response) {
    const backendData = error.response.data as any;
    let message = messagesByCode[error.response.status] ?? "Une erreur inattendue s'est produite.";

    if (error.response.status === 400 && backendData?.errors && typeof backendData.errors === 'object') {
      const validationErrors = backendData.errors as Record<string, string>;
      message = Object.values(validationErrors).join(', ');
    }

    return { status: 'error', message };
  }
  return { status: 'error', message: "Erreur réseau ou serveur injoignable." };
}

export default SubjectLevelServiceApi;