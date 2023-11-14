import React, { useState } from "react";
import { styled } from "styled-components";
import routeImg from "../img/route.png";
import iconMove from "../img/iconMove.mov";
import wallDraw from "../img/wallDraw.mov";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const StyledInstructionsContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
  button {
    background: none;
    border: none;
    margin: 20px;
    padding: 10px;
    background: #212b38;
    cursor: pointer;
    border-radius: 3px;
    svg {
      color: white;
    }
  }
  .instructions-div {
    background: #141b24;
    height: 80%;
    width: 60%;
    display: flex;
    font-family: "Barlow Condensed", sans-serif;
    padding: 25px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    text-align: center;
    color: #17cf97;
    .done {
      background: #17cf97;
      font-family: "Barlow Condensed", sans-serif;
      font-size: 24px;
      padding: 10px 20px;
    }
    img {
      margin-top: 50px;
      width: 40% !important;
      height: 50%;
    }
    video {
      margin-top: 50px;
      width: 80% !important;
      height: 50%;
    }
  }
`;

const instructionsData = [
  {
    id: "welcome",
    title: "Welcome to Pathfinder - Algorithm Visualizer",
    isImg: true,
    media: routeImg,
  },
  {
    id: "icons",
    title: "Drag and drop start and end icons to move them around",
    isImg: false,
    media: iconMove,
  },
  {
    id: "walls",
    title: "Click and move around to draw walls",
    isImg: false,
    media: wallDraw,
  },
];

const Instructions = () => {
  const [instructionsCounter, setInstructionsCounter] = useState(0);
  const [done, setDone] = useState(false);
  const data = instructionsData[instructionsCounter];
  const handleNextClick = () => {
    if (instructionsCounter < instructionsData.length - 1) {
      console.log("NEXT 1", instructionsCounter);
      setInstructionsCounter(instructionsCounter + 1);
    } else {
      console.log("NEXT 2", instructionsCounter);
      setInstructionsCounter(0);
    }
  };
  const handlePrevClick = () => {
    if (instructionsCounter > 0) {
      console.log("PREV 1", instructionsCounter);
      setInstructionsCounter(instructionsCounter - 1);
    } else {
      console.log("PREV 2", instructionsCounter);
      setInstructionsCounter(instructionsData.length - 1);
    }
  };
  return (
    !done && (
      <StyledInstructionsContainer>
        <button onClick={handlePrevClick}>
          <AiFillCaretLeft />
        </button>
        <div className="instructions-div">
          <h1>{data.title}</h1>
          {data.isImg ? (
            <img src={data.media} alt={data.title} />
          ) : (
            <video autoPlay loop muted key={data.title}>
              <source src={data.media} type="video/mp4" />
            </video>
          )}
          <button className="done" onClick={() => setDone(true)}>
            Done
          </button>
        </div>
        <button onClick={handleNextClick}>
          <AiFillCaretRight />
        </button>
      </StyledInstructionsContainer>
    )
  );
};

export default Instructions;
