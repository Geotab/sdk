import React, { useRef, useEffect, useCallback } from "react";
import { IconSearch } from "@geotab/react-component-library";
import "./SearchModal.scss";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("mousedown", handleOutsideClick);
      inputRef.current?.focus();
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-backdrop"
      role="button"
      aria-labelledby="search-modal"
    >
      <div className="search-modal-container" ref={modalRef}>
        <div className="search-modal-header-container">
          <div className="search-modal-input-field-container">
            <div className="search-modal-input-field">
              <div className="modal-search-icon">
                <IconSearch />
              </div>
              <input
                ref={inputRef}
                className="modal-search-input"
                type="search"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
