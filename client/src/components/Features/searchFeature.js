import React, { useState } from "react";

function searchFeature(props) {
  const [searchTerms, setSearchTerms] = useState("");

  const onChangeSearchEvent = (e) => {
    setSearchTerms(e.target.value);
    props.refreshFunction(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerms}
        onChange={onChangeSearchEvent}
        placeholder="Search by typing.."
      />
    </div>
  );
}

export default searchFeature;
