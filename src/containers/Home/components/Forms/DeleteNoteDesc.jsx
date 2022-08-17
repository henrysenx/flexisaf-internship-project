import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import {
  deleteNoteDesc,
  deleteNote,
} from "../../../../Redux/Actions/noteActions";

const DeleteNoteDesc = ({ close, deleteItem, removeNote, setSelectedItem }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (removeNote === "false") {
      dispatch(deleteNoteDesc(deleteItem));
    } else {
      dispatch(deleteNote(deleteItem));
      setSelectedItem(null);
    }

    close(false);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3 className="header">Are you sure you want to delete this item ?</h3>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton type="submit">Delete Description</StyledButton>
      </div>
    </StyledForm>
  );
};

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledForm = styled.form`
  padding: 10px;
  height: 100%;
  .header {
    margin: 10px 0;
  }
`;

const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 250px;
  resize: none;
  ${sharedStyles}
`;
const StyledButton = styled.button`
  display: block;
  background-color: red;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

export default DeleteNoteDesc;
