import {
  ADD_NOTE,
  GET_ALL_NOTES,
  UPDATE_NOTE,
  DELETE_NOTE,
  NOTE_SELECTED,
  ADD_NOTE_DESCRIPTION,
  DELETE_NOTE_DESCRIPTION,
  FILTER_NOTES,
  TOGGLE_THEME,
} from "../types";

import noteData from "../data";

export const getAllNotes = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_NOTES,
      payload: noteData,
    });
  };
};

export const addNote = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_NOTE,
      payload: data,
    });
  };
};

export const addNoteDescription = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_NOTE_DESCRIPTION,
      payload: data,
    });
  };
};

export const updateNote = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_NOTE,
      payload: data,
    });
  };
};

export const deleteNote = (data) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_NOTE,
      payload: data,
    });
  };
};

export const filterNote = (filterData) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_NOTES,
      payload: filterData,
    });
  };
};

export const deleteNoteDesc = (data) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_NOTE_DESCRIPTION,
      payload: data,
    });
  };
};

export const selectNote = (note) => {
  return (dispatch) => {
    dispatch({
      type: NOTE_SELECTED,
      payload: note,
    });
  };
};

export const toggleTheme = (theme) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_THEME,
      payload: theme,
    });
  };
};
