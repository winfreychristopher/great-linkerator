import React, { useEffect, useState } from "react";
import { fetchAllLinks } from "../api";
import { updateClicker } from "../api";

const Links = ({results, setResults}) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchAllLinks()
      .then((links) => {
        setLinks(links);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setLinks]);

  return (
    <>
      <div id="link-container">
        {links.map((link) => (
          <div key={link.id}>
            <div>{createLinkHTML(link)}</div>
          </div>
        ))}
      </div>
    </>
  );
};

const createLinkHTML = (link) => {
  return (
    <div className="link-card">
      <div>
        <b>Url:</b>
        <a
          href="true"
          onClick={() => {
            updateClicker(link.id, link.click_count);
            window.open(link.url)
          }}
        >
          {link.url}
        </a>
      </div>
      <div>
        <b>Tags:</b>{" "}
        {link.tags.map(({ id, name }) => (
          <a href="true" key={id} onClick={(event) => {
            event.preventDefault();
          }}>
            {name}
          </a>
        ))}
      </div>
      <div>
        <b>Click Count:</b> <p>{link.click_count}</p>
      </div>
      <div>
        <b>Date:</b> <p>{link.date_shared}</p>
      </div>
      <div>
        <b>Comments</b> <p>{link.comment}</p>
      </div>
    </div>
  );
};

export default Links;
