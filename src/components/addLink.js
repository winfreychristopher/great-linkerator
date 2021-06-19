import axios from "axios";
import React, { useState } from "react";

const CreateLinks = () => {
  const [url, setUrl] = useState();
  const [tags, setTags] = useState();
  const [date, setDate] = useState();
  const [comment, setComment] = useState();
  const [click_count, setClick_Count] = useState(0);

  const createLinksApi = async () => {
    try {
      return await axios
        .post("/api/links", {
          url: url,
          tags: [tags],
          date_shared: date,
          comment: comment,
          click_count: click_count,
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setTags([]);
    setClick_Count(0);
    createLinksApi();
  };
  return (
    <div>
      <header></header>
      <form className="create-link" onSubmit={onSubmit}>
        <label>
          Url Name:
          <input
            type="text"
            name="url"
            placeholder="Url"
            onInput={(event) => {
              setUrl(event.target.value);
            }}
          ></input>
        </label>
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            placeholder="tags"
            onInput={(event) => {
              setTags(event.target.value);
            }}
          ></input>
        </label>
        <label>
          Comments:
          <input
            type="text"
            name="comments"
            placeholder="comments"
            onInput={(event) => {
              setComment(event.target.value);
            }}
          ></input>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            placeholder="date"
            onInput={(event) => {
              setDate(event.target.value);
            }}
          ></input>
        </label>
        <button type="submit" style={{ marginLeft: "100px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateLinks;
