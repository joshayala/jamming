import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const [term, setTerm] = useState("");

  function passTerm() {
    props.onSearch(term)
  }

  function handleTermChange({target}) {
    setTerm(target.value);
  }

  function handleEnter (e) {
    if (e.key === 'Enter') passTerm();
  }
    return (
        <div className={styles.SearchBar}>
        <input
          placeholder="Enter A Song, Album, or Artist!"
          onKeyDown={handleEnter}
          onChange={handleTermChange}
        />
        <button className={styles.SearchButton}
                onClick={passTerm} >
          SEARCH
        </button>
      </div>
        );
}

export default SearchBar;