import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { filterNote } from "../../../Redux/Actions/noteActions";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: white;
  .title {
    h1 {
      span {
        margin-left: 0.5rem;
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
        letter-spacing: 0.2rem;
      }
    }
  }
  .search {
    background-color: #212121;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: #ffc107;
    }
    input {
      background-color: transparent;
      border: none;
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;

          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState(null);
  const name = localStorage.getItem("username");

  const handleSearch = () => {
    dispatch(filterNote(searchText));
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <Nav>
      <div className="title">
        <h4>Hi {name},</h4>
        <h1>
          Welcome to <span>YOUR NOTE APP</span>
        </h1>
      </div>
      <div className="search">
        <BiSearch />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search Note"
        />
      </div>
    </Nav>
  );
};

export default Navbar;
