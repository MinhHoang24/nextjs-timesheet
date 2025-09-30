import api from "services/baseService";

interface ErrorData {
  code?: string;
  message?: string;
}

interface ApiError {
  response?: {
    data?: ErrorData;
  };
  message?: string;
}

export const getUserInfo = async () => {
    try {
        const userRes = await api.get("/services/app/User/Get");
        const user = userRes.data.result;

        const [avaRes] = await Promise.all([
            api.get("/services/app/User/GetUserAvatarById")
        ]);
        const ava = avaRes.data.result;
        return {
            ...user,
            ...ava
        };
    } catch (error) {
        if (error instanceof Error) {
            // If you expect error.response, use a type assertion with ApiError
            const apiError = error as ApiError;
            console.error(
                "Failed to fetch user info or avatar:",
                apiError.response?.data || error.message
            );
        } else {
            console.error("Failed to fetch user info or avatar:", error);
        }
        return null;
    }
};
