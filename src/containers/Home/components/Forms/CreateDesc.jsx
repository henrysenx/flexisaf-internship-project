import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { addNoteDescription } from "../../../../Redux/Actions/noteActions";

const CreateNoteDesc = ({ close, selectedItem }) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  console.log(selectedItem);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      itemId: selectedItem.id,
      desc: { id: "desc" + Date.now(), item: description },
      title: selectedItem.title,
    };
    dispatch(addNoteDescription(data));

    close(false);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3 className="header">Create Description</h3>

      <label htmlFor="description">Description</label>
      <StyledTextArea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="5"
      />
      <StyledButton type="submit">Add Description</StyledButton>
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
  background-color: #ffc107;
  color: #000;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

export default CreateNoteDesc;
