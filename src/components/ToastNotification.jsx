import React from "react";
import { useCart } from "../context/CartContext";

export const ToastNotification = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="thaangi-toast" role="alert">
      <i
        className={`bi ${
          toastMessage.type === "success"
            ? "bi-check-circle-fill text-success"
            : toastMessage.type === "info"
            ? "bi-info-circle-fill text-info"
            : "bi-exclamation-triangle-fill text-warning"
        } fs-5`}
      ></i>
      <span>{toastMessage.message}</span>
    </div>
  );
};

export default ToastNotification;
