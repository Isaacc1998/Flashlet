import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Row from "./row";
import "./Search.css";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as setActions from "../../store/flashcardSet";
import { Redirect } from "react-router-dom";

// let count = 1;
function Search() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const sets = useSelector((state) => {
    return state.sets;
  });
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });

  const [value, setValue] = useState();
  const [arr, setArr] = useState();
  const [count, setCount] = useState(1);

  // useEffect(() => {
  //   if () {

  //   }
  //   return history.push("/login");
  // }, []);

  useEffect(() => {
    dispatch(setActions.getAllFlashcardSets());
  }, []);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let name = params.get("q");
    if (Object.values(sets).length > 0 && params.get("q")) {
      setValue(name);
      let matches = Object.values(sets)
        .filter((set) => {
          if ("title" in set) {
            let title = set.title.toLowerCase();
            return title.startsWith(name.toLowerCase());
          } else {
            return false;
          }
        })
        .sort((a, b) => {
          return a.title.length - b.title.length;
        });

      let rows = [];

      for (let i = 0; i < count; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
          if (matches.length === 0) {
            break;
          }
          row.push(matches.shift());
        }
        //push in the component passing in row as prop for component
        rows.push(<Row key={i} row={row} />);
      }

      if (matches.length === 0) {
        document.getElementById("viewMore").style.display = "none";
      } else {
        document.getElementById("viewMore").style.display = "block";
      }
      setArr(rows);
    }
  }, [location, sets, count]);

  const handleClick = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  if (!sessionUser) {
    return history.push("/login");
  }

  return (
    <div className="background8">
      <div className="bigSearchContainer">
        <div className="bigGlass">
          <HiMagnifyingGlass
            size="2rem"
            color="white"
            fontWeight="900"
          ></HiMagnifyingGlass>
        </div>
        <input
          className="bigSearch"
          value={value}
          placeholder="Search Study Sets..."
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return history.push(`/search?q=${e.target.value}`);
            }
          }}
        ></input>
      </div>

      <div className="categoryTab">All results</div>
      <h2 className="study-sets-header">Study Sets</h2>
      <div className="searchedSets">{arr}</div>
      <div className="viewMore" id="viewMore" onClick={handleClick}>
        View more
      </div>
    </div>
  );
}

export default Search;
