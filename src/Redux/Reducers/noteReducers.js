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

const initialState = {
  notes: [],
  selectedNote: {},
  searchText: "",
  theme: localStorage.getItem("noteTheme"),
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTES:
      return {
        ...state,
        notes: action.payload,
      };

    case ADD_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === state.selectedNote.id) {
            note.id = state.selectedNote.id;
            note.name = state.selectedNote.name;
            note.items = [action.payload, ...state.selectedNote.items];
          }
          return note;
        }),
      };

    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === state.selectedNote.id) {
            note.id = state.selectedNote.id;
            note.name = state.selectedNote.name;
            note.items = state.selectedNote.items.map((item) => {
              if (item.id === action.payload.itemId) {
                item.id = action.payload.itemId;
                item.title = action.payload.title;
                item.description = item.description.map((desc) => {
                  if (desc.id === action.payload.id) {
                    desc.id = action.payload.id;
                    desc.item = action.payload.item;
                  }
                  return desc;
                });
              }
              return item;
            });
          }

          return note;
        }),
      };

    case ADD_NOTE_DESCRIPTION:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === state.selectedNote.id) {
            note.id = state.selectedNote.id;
            note.name = state.selectedNote.name;
            note.items = state.selectedNote.items.map((item) => {
              if (item.id === action.payload.itemId) {
                item.id = action.payload.itemId;
                item.title = action.payload.title;
                item.description = [action.payload.desc, ...item.description];
              }
              return item;
            });
          }

          return note;
        }),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === state.selectedNote.id) {
            note.id = state.selectedNote.id;
            note.name = state.selectedNote.name;
            note.items = state.selectedNote.items.filter(
              (item) => item.id !== action.payload.itemId
            );
          }

          return note;
        }),
      };

    case DELETE_NOTE_DESCRIPTION:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === state.selectedNote.id) {
            note.id = state.selectedNote.id;
            note.name = state.selectedNote.name;
            note.items = state.selectedNote.items.map((item) => {
              if (item.id === action.payload.itemId) {
                item.id = action.payload.itemId;
                item.title = action.payload.title;
                item.description = item.description.filter(
                  (desc) => desc.id !== action.payload.id
                );
              }
              return item;
            });
          }

          return note;
        }),
      };
    case NOTE_SELECTED:
      return {
        ...state,
        selectedNote: action.payload,
      };
    case FILTER_NOTES:
      return {
        ...state,
        searchText: action.payload,
      };
    case TOGGLE_THEME:
      localStorage.setItem("noteTheme", action.payload);
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};

export default noteReducer;
