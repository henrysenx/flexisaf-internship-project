import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { TbNotes } from "react-icons/tb";

import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
import { useSelector, useDispatch } from "react-redux";
import { selectNote } from "../../../Redux/Actions/noteActions";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { notes } = useSelector((state) => state.NoteReducer);

  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);

  const handleNoteClick = (note) => {
    setCurrentLink(note.id);
    dispatch(selectNote(note));
  };

  const logout = () => {
    localStorage.removeItem("username");
    navigate(`/`);
  };

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <TbNotes />
            <span>MY NOTES</span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="links">
            <ul>
              {notes.length > 0 &&
                notes.map((note) => (
                  <li
                    key={note.id}
                    className={currentLink === note.id ? "active" : "none"}
                    onClick={() => handleNoteClick(note)}
                  >
                    <a href="#">
                      <span> {note.name}</span>
                    </a>
                    <p>{note.items.length === 0 ? "0" : note.items.length}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div onClick={logout} className="logout">
          <a href="#">
            <FiLogOut />
            <span className="logout">Logout</span>
          </a>
        </div>
      </Section>
      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <ul>
            {notes.length > 0 &&
              notes.map((note) => (
                <li
                  key={note.id}
                  className={currentLink === note.id ? "active" : "none"}
                  onClick={() => handleNoteClick(note)}
                >
                  <a href="#">
                    <span> {note.name}</span>
                  </a>
                  <p>{note.items.length === 0 ? "0" : note.items.length}</p>
                </li>
              ))}
          </ul>
        </div>
      </ResponsiveNav>
    </>
  );
};

export default Sidebar;

const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
    .links {
      display: flex;
      justify-content: center;

      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        width: 15vw;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          display: flex;
          justify-content: space-between;
          &:hover {
            background-color: #ffc107;
            a {
              color: black;
            }
            p {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
          p {
            color: white;
            font-size: 14px;
          }
        }
        .active {
          background-color: #ffc107;
          a {
            color: black;
          }
          p {
            color: black;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        cursor: pointer;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #ffc107;
        a {
          color: black;
        }
      }
    }
  }
`;
