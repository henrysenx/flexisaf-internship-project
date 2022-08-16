import React, { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Background,
  CloseModalButton,
  ModalWrapper,
  ModalContentWrap,
} from "./styles";

const Modal = ({ isOpen, close, children, modalWidth, modalHeight }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      close();
    }
  };

  const backgroundVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const modalVariants = {
    initial: {
      opacity: 0,
      y: 200,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
      },
    },

    exit: {
      y: -200,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Background
          variants={backgroundVariants}
          animate="animate"
          initial="initial"
          onClick={closeModal}
          ref={modalRef}
          exit={{
            opacity: 0,
          }}
          modalWidth="500"
        >
          <ModalWrapper
            variants={modalVariants}
            animate="animate"
            initial="initial"
            exit={{
              opacity: 0,
              y: "-100vh",
            }}
            modalWidth={modalWidth}
          >
            <CloseModalButton aria-label="Close modal" onClick={close} />
            <ModalContentWrap modalHeight={modalHeight}>
              {children}
            </ModalContentWrap>
          </ModalWrapper>
        </Background>
      )}
    </AnimatePresence>
  );
};

export default Modal;
