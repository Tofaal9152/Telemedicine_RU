import Toast, { ToastPosition } from "react-native-toast-message";

export type ToastType = "success" | "error" | "info";

export type ToastOptions = {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
};

export const showToast = ({
  type = "success",
  title,
  description,
  duration = 1500,
  position = "top",
}: ToastOptions) => {
  Toast.show({
    type,

    text1: title,
    text2: description,
    position,
    autoHide: true,
    visibilityTime: duration,
  });
};
