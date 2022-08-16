import React, { useEffect } from "react";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

import { useDispatch } from "react-redux";

import { getAllNotes } from "../../Redux/Actions/noteActions";

const Div = styled.div`
  position: relative;
`;

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  return (
    <Div>
      <Sidebar />
      <Dashboard />
    </Div>
  );
};

export default Home;
