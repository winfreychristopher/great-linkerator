import React, { useEffect, useState } from "react";
import { getLinks } from "../api";


const Links = () => {
    const [links, setLinks] = useState([])

    useEffect(() => {
        getLinks()
          .then((links) => {
            setLinks(links);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [setLinks]);

      // const updateClicker = async (id) => {
      //   const [clicks, setClicks] = useState('')
      //   return fetch(`/api/links/${id}/clicks`, {
      //     method: "PATCH",
      //     header: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       click_count: clicks
      //     }),
      //   })
      //   //patch click count, return 

      // }

      return (

        <>
      <div>
        {links.map(link => (
          <div key={link.id} >
            {<div>
              {createLinkHTML(link)}
            </div>}
          </div>
        ))}
      </div>
    </>

      )
}

const createLinkHTML = (link) => {
  
  return (
    <div >
      <div >
        <b>Url:</b><a href='true'>{link.url}</a>
      </div>
      <div >
        <b>Tags:</b> {link.tags.map(({id, name}) => (<a href='true' key={id}>{name}</a> ))}
      </div>
      <div >
        <b>Click Count:</b> <p>{link.click_count}</p>
      </div>
      <div >
        <b>Date:</b> <p>{link.date_shared}</p>
      </div>
      <div>
        <b>Comments</b> <p>{link.comment}</p>
      </div>
    </div>
  );
};


  export default Links