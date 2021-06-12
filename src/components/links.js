import React, { useEffect, useState } from "react";
import { fetchAllLinks } from "../api";
import { updateClicker } from "../api";
import LinkModal from "./LinkModal";
import UpdateComments from "./addComment";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
      <div>
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
    <div>
      <div>
        <b>Url:</b>
        <a
          href="true"
          onClick={(event) => {
            event.preventDefault();
            updateClicker(link.id, link.click_count);
          }}
        >
          {link.url}
        </a>
      </div>
      <div>
        <b>Tags:</b>{" "}
        {link.tags.map(({ id, name }) => (
          <a href="true" key={id}>
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
