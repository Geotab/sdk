import React from "react";
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Search Modal opened</p>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
