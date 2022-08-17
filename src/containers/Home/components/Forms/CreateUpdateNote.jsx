import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { addNote, updateNote } from "../../../../Redux/Actions/noteActions";

const initialState = {
  title: "",
  description: "",
};

const CreateNote = ({ close, operation, updateItem }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleInput = (e) => {
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;

    setState((prev) => ({ ...prev, [inputName]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: Date.now(),
      title: title,
      description: [{ id: "desc" + Date.now(), item: description }],
      dateCreated: "2022-08-12",
    };

    if (operation === "create") {
      dispatch(addNote(data));
    } else {
      const newData = {
        id: updateItem.id,
        title: title,
        item: description,
        itemId: updateItem.itemId,
      };

      dispatch(updateNote(newData));
    }
    //

    close(false);
  };

  useEffect(() => {
    if (operation === "update") {
      setTitle(updateItem.title);
      setDescription(updateItem.item);
    }
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3 className="header">
        {operation === "create" ? "Create Form" : "Update Form"}
      </h3>
      <label htmlFor="title">Title</label>
      <StyledInput
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <StyledTextArea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="5"
      />
      <StyledButton type="submit">
        {operation === "create" ? "Create" : "Update"}
      </StyledButton>
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

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
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

export default CreateNote;
