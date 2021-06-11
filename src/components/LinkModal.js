import React from "react";
import ReactDom from "react-dom";

const LinkModal = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="background-open-modal" />
      <div className="link-modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default LinkModal;
