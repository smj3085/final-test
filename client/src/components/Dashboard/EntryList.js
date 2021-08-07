import React from 'react';
import { Link } from 'react-router-dom';

const EntryList = ({ entries, title }) => {
  if (!entries.length) {
    return <h3>No entries yet!</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {entries &&
        entries.map((entry) => (
          <div key={entry._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {entry.entryAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                wrote this {entry.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <h3>{entry.entryPlace}</h3>
              <p>{entry.entryText}</p>
              <p>{entry.startDate}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/entries/${entry._id}`}
            >
              Click to see details!
            </Link>
          </div>
        ))}
    </div>
  );
};

export default EntryList;
