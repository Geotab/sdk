import React, { useRef, useEffect, useCallback } from "react";
import { IconSearch, Tabs } from "@geotab/react-component-library";
import { APIReferenceIcon, GuidesIcon } from "../SearchModal"; 
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

  const tabsContent = (
    <Tabs
      defaultTab=""
      tabs={[
        {
          name: "All",
          content: (
            <div className="tab-container">
              <div className="tab-search-icon">
                <IconSearch width="14px" height="14px"/>
              </div>
              <div className="tab-content">Start typing to search</div>
            </div>
          ),
          icon: IconSearch,
          disabled: false
        },
        {
          name: "API Reference",
          content: "",
          icon: APIReferenceIcon,
          disabled: false
        },
        {
          name: "Guides",
          content: "",
          icon: GuidesIcon,
          disabled: false
        },
      ]}
    />
  );

  return (
    <div
      className="search-modal-backdrop"
      role="button"
      aria-labelledby="search-modal"
    >
      <div className="search-modal-container" ref={modalRef}>
        {/* Search modal header container */}
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
        {/* Search modal tabs container */}
        <div className="search-modal-tabs-container">{tabsContent}</div>
        {/* <div className="search-modal-tabs-container></div> */}
      </div>
    </div>
  );
}
