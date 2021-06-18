import React from "react"
const LinkCard = ({ url, date_shared, click_count, comment, tags = [] }) => {
    return (
      <div className="link-card">
        <div className="info">
          <p className="link-url">
            <a href="true">{url}</a> <br />
          </p>
          <p className="link-data">
            {date_shared}
            <br />
          </p>
          <p className="link-data">
            {click_count} <br />
          </p>
          <p className="link-data">
            {comment} <br />
          </p>
          <p className="link-tag">
            {tags.map((tag) => (
              <p key={tag.id}>{tag.name}</p>
            ))}
          </p>
        </div>
      </div>
    );
  };
  export default LinkCard;