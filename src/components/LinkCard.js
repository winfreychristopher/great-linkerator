import React from "react";

const LinkCard = ({ url, date_shared, click_count, comment, tags = [] }) => {
  return (
    <div className="link-card">
      <div className="info">
        <p className="link-url">
          <a href="true">{url}</a> <br />
        </p>
        <p className="link-data">
          Date Shared:
          {date_shared}
          <br />
        </p>
        <p className="link-data">
          Clicks:
          {click_count} <br />
        </p>
        <p className="link-data">
          Comments:
          {comment} <br />
        </p>
        <p className="link-tag">
          tags:
          {tags.map((tag) => (
            <span key={tag.id}>{tag.name}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default LinkCard;
