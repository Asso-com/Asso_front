import React from "react";
import "./modalOverlay.css";

export const ModalLoading = () => {
  return (
    <div className="custom-overlay">
      <span className="loader"></span>
    </div>
  );
};

// Function to toggle the visibility of the progress overlay
export const switchLoadingModal = () => {
  document.querySelector(".custom-overlay")!.classList.toggle("show");
};
