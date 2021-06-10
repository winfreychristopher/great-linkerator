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

      return (

        <>
      <div>
        
      </div>
      <div>
        {links.map((link) => (
          <div key={link.id} >
            {<div>{<a href='true' >{link.url}</a>}</div>}
          </div>
        ))}
      </div>
    </>

      )
}



  export default Links