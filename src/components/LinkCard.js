import React from "react";

const LinkCard = ({ url, date_shared, click_count, comment, tags = [] }) => {
  return (
    <div className="link-card">
      <div className="info">
        <p className="link-url">
          <span>Url:</span>
          <a href="true">{url.toUpperCase()}</a> <br />
        </p>
        <p className="link-data">
          <span>Date Shared:</span>
          {date_shared}

          <br />
        </p>
        <p className="link-data">
          <span>Clicks:</span>
          {click_count} <br />
        </p>
        <p className="link-data">
          <span>Comments:</span>
          {comment} <br />
        </p>
        <p className="link-tag">
          <span>Tags:</span>
          {tags.map((tag) => (
            <span className="tag-list" key={tag.id}>
              {tag.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default LinkCard;
