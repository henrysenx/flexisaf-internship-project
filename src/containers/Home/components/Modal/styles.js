import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

export const Background = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const ModalWrapper = styled(motion.div)`
  width: ${(props) => (props.modalWidth ? `${props.modalWidth}px` : "50vw")};
  /* min-height: 60vh; */
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  z-index: 100;
`;
export const ModalContentWrap = styled.div`
  padding: 4rem 2rem;
  width: 100%;
  height: ${(props) => (props.modalHeight ? `${props.modalHeight}px` : "60vh")};
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
