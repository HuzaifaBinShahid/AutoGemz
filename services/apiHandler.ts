import { Toast } from "expo-react-native-toastify";

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const ax = err as { response?: { data?: { message?: string } } };
    if (ax.response?.data?.message) return ax.response.data.message;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again.";
}

export async function withToast<T>(
  promise: Promise<T>,
  successMessage: string
): Promise<T> {
  try {
    const data = await promise;
    Toast.success(successMessage);
    return data;
  } catch (err) {
    Toast.error(getErrorMessage(err));
    throw err;
  }
}
