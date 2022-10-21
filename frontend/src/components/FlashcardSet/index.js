import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as flashcardActions from "../../store/flashcard";
import * as setActions from "../../store/flashcardSet";
import Flashcard from "./flashcard";
import { resetCards } from "../../store/flashcard";
import "./FlashcardSet.css";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { BsCircle } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { CiCircleMore } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

let i = 0;
let filled = 0;

// function ForceUpdate() {
//   const [change, setChange] = useState(0);
//   return () => setChange(change + 1);
// }

function FlashcardSet() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setId } = useParams();
  const sets = useSelector((state) => state.sets);
  const set = sets[setId];
  const flashcards = useSelector((state) => state.flashcards);
  const [card, setCard] = useState();
  const [dummy, setDummy] = useState();
  const array = Object.keys(flashcards).map((key) => {
    return flashcards[key];
  });

  useEffect(() => {
    dispatch(resetCards());
    i = 0;
  }, []);

  useEffect(() => {
    setCard(array[i]);
    let progress = document.getElementById("fill");
    filled = ((i + 1) / array.length) * 100;
    progress.style.width = `${filled}%`;
  }, [array]);

  useEffect(() => {
    dispatch(setActions.getUserFlashcardSets());
    dispatch(flashcardActions.getFlashcards(setId));
  }, []);

  const handleLeft = (e) => {
    if (i > 0) {
      setCard(array[i - 1]);
      i -= 1;

      let progress = document.getElementById("fill");
      filled = ((i + 1) / array.length) * 100;
      progress.style.width = `${filled}%`;

      let card = document.getElementById("card");
      card.classList.toggle("slideLeft");

      setTimeout(() => {
        card.classList.toggle("slideLeft");
      }, 310);
    }
  };

  const handleRight = (e) => {
    if (i < array.length - 1) {
      setCard(array[i + 1]);
      i += 1;

      let progress = document.getElementById("fill");
      filled = ((i + 1) / array.length) * 100;
      progress.style.width = `${filled}%`;

      let card = document.getElementById("card");
      card.classList.toggle("slideRight");

      setTimeout(() => {
        card.classList.toggle("slideRight");
      }, 310);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    document.getElementById("delete").style.display = "block";
  };
  const numbers = { number: i + 1, length: array.length };
  return (
    <div className="outerBox">
      <div className="background2">
        {set && <div className="title">{set.title}</div>}
        <div className="progressBar">
          <div className="fill" id="fill"></div>
        </div>
        <Flashcard flashcard={{ ...card, ...numbers }}></Flashcard>
        <div className="directions">
          <div className="previous" onClick={handleLeft}>
            &lt;
          </div>
          <div className="next" onClick={handleRight}>
            &gt;
          </div>
        </div>
      </div>
      <div className="bottomStuff">
        <div className="ownerInfo">
          <div></div>
          <div className="by">Created by</div>
          <div className="creator"></div>
        </div>
        <div className="botRight">
          <div className="icons">
            <div className="addTo">
              <CiCirclePlus size="3rem" />
            </div>
            <div className="editCircle">
              <BsCircle size="2.5rem"></BsCircle>
              <div className="pencil">
                <HiOutlinePencil size="1.3rem" />
              </div>
            </div>
            <div onClick={handleDrop} className="more">
              <CiCircleMore className="more" size="3rem" />
            </div>
          </div>
          <div className="delete" id="delete">
            <div className="trash">
              <MdDeleteOutline size="1.5rem" color="white"></MdDeleteOutline>
            </div>
            <div className="deleteText">Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardSet;
