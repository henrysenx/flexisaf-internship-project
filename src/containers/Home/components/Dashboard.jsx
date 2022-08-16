import React, { useState, useEffect } from "react";
import styled from "styled-components";
import scrollreveal from "scrollreveal";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Modal from "./Modal/Modal";
import CreateNote from "./Forms/CreateUpdateNote";
import CreateNoteDesc from "./Forms/CreateDesc";
import DeleteNoteDesc from "./Forms/DeleteNoteDesc";

const Dashboard = () => {
  const { selectedNote, notes, searchText } = useSelector(
    (state) => state.NoteReducer
  );
  const [currentLink, setCurrentLink] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDesc, setShowDesc] = useState(false);
  const [showDeleteDesc, setShowDeleteDesc] = useState(false);
  const [showDeleteNote, setShowDeleteNote] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [results, setResults] = useState(null);

  const handleNoteClick = (item) => {
    setSelectedItem(null);
    setSelectedItem(item);
    setCurrentLink(item.id);
  };

  const handleUpdateClick = (note) => {
    //
    const data = {
      id: note.id,
      title: selectedItem.title,
      item: note.item,
      itemId: selectedItem.id,
    };
    setUpdateItem(data);
    setUpdateOpen(true);
  };

  const handleDeleteNoteDesc = (note) => {
    const data = {
      id: note.id,
      title: selectedItem.title,
      itemId: selectedItem.id,
    };
    setDeleteItem(data);
    setShowDeleteDesc(true);
  };

  console.log(searchText);

  const handleNoteDelete = (item) => {
    const data = {
      itemId: item.id,
    };
    setDeleteItem(data);
    setShowDeleteNote(true);
  };

  const Notes = () => {
    const nut = [];

    notes.forEach((note) => {
      note.items.map((item) => {
        item.description.map((desc) => {
          nut.push(desc);
          return desc;
        });
        return item;
      });
    });

    setAllNotes(nut);
  };

  const handleSearch = () => {
    const result = allNotes.filter((notes) => {
      return notes.item.toLowerCase().includes(searchText.toLowerCase());
    });

    setResults(result);
  };

  useEffect(() => {
    setSelectedItem(null);
  }, [selectedNote]);

  useEffect(() => {
    Notes();
  }, [notes]);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  console.log(results);

  return (
    <Section>
      <Navbar />
      <div className="grid">
        <div className="row__one">
          <div className="note_title">
            {selectedNote.items !== undefined &&
              selectedNote.items.map((item) => (
                <div
                  onClick={() => handleNoteClick(item)}
                  className={
                    currentLink === item.id ? "note_card_active" : "note_card"
                  }
                  key={item.id}
                >
                  <h1>{item.title}</h1>
                  <MdOutlineDeleteOutline
                    onClick={() => handleNoteDelete(item)}
                    className={currentLink === item.id ? "showSvg" : "hideSvg"}
                    color="red"
                    size={25}
                  />
                </div>
              ))}

            {selectedNote.items === undefined && (
              <div className="emptyNote">
                <h1>No Note Selected</h1>
              </div>
            )}

            <div onClick={() => setOpen(true)} className="addTitleBtn">
              <BiPlus size={30} />
            </div>
          </div>
          <div className="note_content">
            {searchText === null && selectedItem !== null && (
              <div className="addItemBtn">
                <button onClick={() => setShowDesc(true)}>
                  {" "}
                  <BiPlus size={20} className="icon" />
                  Add description
                </button>
              </div>
            )}
            <div className="content">
              <div className="container">
                <h1 className="center">
                  {selectedItem !== null && selectedItem.title}
                </h1>
                {searchText === null &&
                  selectedItem !== null &&
                  selectedItem.description.map((desc, index) => (
                    <article key={desc.id} className="episode">
                      <div className="episode__number">{index + 1}</div>
                      <div className="episode__content">
                        <div className="title">Description</div>
                        <div className="story">
                          {desc !== null && desc.item}
                          <div className="buttonWrapper">
                            <FiEdit
                              onClick={() => handleUpdateClick(desc)}
                              color="blue"
                              size={25}
                            />
                            <MdOutlineDeleteOutline
                              onClick={() => handleDeleteNoteDesc(desc)}
                              color="red"
                              size={25}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}

                {searchText === "" &&
                  selectedItem !== null &&
                  selectedItem.description.map((desc, index) => (
                    <article key={desc.id} className="episode">
                      <div className="episode__number">{index + 1}</div>
                      <div className="episode__content">
                        <div className="title">Description</div>
                        <div className="story">
                          {desc !== null && desc.item}
                          <div className="buttonWrapper">
                            <FiEdit
                              onClick={() => handleUpdateClick(desc)}
                              color="blue"
                              size={25}
                            />
                            <MdOutlineDeleteOutline
                              onClick={() => handleDeleteNoteDesc(desc)}
                              color="red"
                              size={25}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}

                {searchText !== "" && searchText !== null && results !== null && (
                  <div>
                    {results.length > 0 ? (
                      results.map((desc, index) => (
                        <article key={desc.id} className="episode">
                          <div className="episode__number">{index + 1}</div>
                          <div className="episode__content">
                            <div className="title">Description</div>
                            <div className="story">
                              {desc.item}
                              <div className="buttonWrapper">
                                <FiEdit
                                  onClick={() => handleUpdateClick(desc)}
                                  color="blue"
                                  size={25}
                                />
                                <MdOutlineDeleteOutline
                                  onClick={() => handleDeleteNoteDesc(desc)}
                                  color="red"
                                  size={25}
                                />
                              </div>
                            </div>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="no-note">
                        <h1>No result </h1>
                      </div>
                    )}
                  </div>
                )}

                {searchText === null && selectedItem === null && (
                  <div className="no-note">
                    <h1>No Item Selected</h1>
                  </div>
                )}
                {searchText === "" && selectedItem === null && (
                  <div className="no-note">
                    <h1>No Item Selected</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal modalWidth="500" isOpen={isOpen} close={() => setOpen(false)}>
          <CreateNote operation="create" close={setOpen} />
        </Modal>
      </div>
      <div>
        <Modal
          modalWidth="500"
          isOpen={isUpdateOpen}
          close={() => setUpdateOpen(false)}
        >
          <CreateNote
            updateItem={updateItem}
            operation="update"
            close={setUpdateOpen}
          />
        </Modal>
      </div>
      <div>
        <Modal
          modalWidth="500"
          isOpen={showDesc}
          close={() => setShowDesc(false)}
        >
          <CreateNoteDesc selectedItem={selectedItem} close={setShowDesc} />
        </Modal>
      </div>
      <div>
        <Modal
          modalWidth="500"
          modalHeight="200"
          isOpen={showDeleteDesc}
          close={() => setShowDeleteDesc(false)}
        >
          <DeleteNoteDesc
            removeNote="false"
            deleteItem={deleteItem}
            close={setShowDeleteDesc}
          />
        </Modal>
      </div>
      <div>
        <Modal
          modalWidth="500"
          modalHeight="200"
          isOpen={showDeleteNote}
          close={() => setShowDeleteNote(false)}
        >
          <DeleteNoteDesc
            removeNote="true"
            deleteItem={deleteItem}
            close={setShowDeleteNote}
            setSelectedItem={setSelectedItem}
          />
        </Modal>
      </div>
    </Section>
  );
};

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: 500px 4fr;
      height: 83vh;
      /* width: 100%; */
      background-color: black;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
    .note_title {
      width: 95%;
      height: 100%;
      border-radius: 10px;
      margin-right: 10px;
      padding: 10px 0;
      border: 1px solid #333333;
      padding: 0 5px;
      cursor: pointer;
      position: relative;
      overflow-y: scroll;
    }
    .note_content {
      background-color: #212121;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      border: 1px solid #333333;
      padding: 50px;
      position: relative;
      overflow-y: hidden;
    }
    .note_card {
      padding: 35px 15px;
      background-color: #212121;
      margin: 15px 0;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
    }
    .note_card h1 {
      color: white;
      font-size: 20px;
    }
    .note_card_active {
      background-color: #ffc107;
      margin: 10px 0;
      border-radius: 10px;
      padding: 35px 15px;
      display: flex;
      justify-content: space-between;
    }
    .note_card_active h1 {
      color: black;
      font-size: 20px;
    }
    .emptyNote {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .emptyNote h1 {
      font-size: 1.3rem;
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
    }
    .description {
      width: 100%;
      padding: 15px 0;
    }
    .description h2 {
      font-size: 0.8rem;
      color: #ffc107;
    }
    .tilesWrap {
      padding: 0;
      margin: 50px auto;
      list-style: none;
      text-align: center;
      position: relative;
    }
    .closeBtn {
      position: absolute;
      top: -5px;
      right: -10px;
      background-color: #b2beb5;
      padding: 4px 6px;
      border-radius: 50%;
      cursor: pointer;
    }

    .addTitleBtn {
      position: absolute;
      bottom: 5px;
      right: 3px;
      background-color: #ffc107;
      padding: 15px 15px;
      border-radius: 50%;
    }
    .addItemBtn {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 20px;
      margin-bottom: 10px;
    }
    .addItemBtn button {
      background: transparent;
      border: 1px solid #b7b7b7;
      padding: 12px 20px;
      color: #ffc107;
      border-radius: 3px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 15px;
    }
    .addItemBtn button:hover {
      background: gray;
    }
    .icon {
      margin-right: 10px;
      color: #ffc107;
    }
    .content {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }

    .center {
      text-align: center;
      margin: 10px 0;
      font-size: 1.5rem;
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 4px;
    }

    .container {
      width: 100%;
      margin: 0 auto;
      padding: 15px 10px;
      color: #fff;
      height: 100%;
    }
    .container p {
      margin: 0 0 13px 0;
    }
    .container a {
      color: #fff;
    }

    .episode {
      display: grid;
      grid-template-columns: 1fr 3fr;
      position: relative;
    }

    .episode__number {
      font-size: 5vw;
      font-weight: 600;
      padding: 10px 0;
      position: sticky;
      top: 0;
      text-align: center;
      height: calc(10vw + 20px);
      transition: all 0.2s ease-in;
      color: #ffc107;
    }

    .episode__content {
      border-top: 2px solid #fff;
      display: grid;
      grid-template-columns: 1fr 4fr;
      grid-gap: 10px;
      padding: 15px 0;
    }
    .episode__content .title {
      font-weight: 600;
    }
    .episode__content .story {
      line-height: 26px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .buttonWrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }
    .buttonWrapper svg {
      margin: 0 5px;
    }
    .buttonWrapper svg:hover {
      transform: scale(1.3);
    }
    .hideSvg {
      opacity: 0;
    }
    .showSvg {
      opacity: 1;
    }
    .no-note {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .no-note h1 {
      font-size: 1.3rem;
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
    }

    @media (max-width: 600px) {
      .episode__content {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 576px) {
      .episode__content .story {
        font-size: 15px;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default Dashboard;
