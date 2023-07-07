import React, { useEffect, useRef, useState } from "react";
import "./Modal.scss";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  onClose: () => void;
  onSave?: () => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  title: string;
  content?: React.ReactNode;
  isLoading?: boolean;
  showFooter?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  onSave,
  showModal,
  setShowModal,
  title,
  isLoading,
  content: Content,
  showFooter,
}) => {
  const [showModalFooter, setShowModalFooter] = useState(true);

  useEffect(() => {
    showFooter === false ? setShowModalFooter(false) : setShowModalFooter(true);
  });

  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const handleSaveClick = () => {
    setShowModal(false);
    onSave ? onSave() : onClose();
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains("modal-overlay")) {
      setShowModal(false);
      onClose();
    }
  };

  const handleCloseClick = () => {
    setShowModal(false);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        // event.preventDefault();
        saveButtonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal">
            <button
              type="button"
              className="modal-close"
              onClick={handleCloseClick}
            >
              <FontAwesomeIcon icon={faClose} size="lg" color="white" />
            </button>
            <div className="modal-content">
              <h2 className="modal-title">{title} </h2>
              {Content}
            </div>
            {showModalFooter && (
              <div className="modal-footer">
                <button
                  style={{ backgroundColor: "salmon" }}
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    ref={saveButtonRef}
                  >
                    Confirm
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
