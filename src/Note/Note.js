import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiContext from "../APIContext";
import config from "../config";
import "./Note.css";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
    id: 0,
    name: "Default Note",
    modified: new Date(),
  };

  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteid = this.props.id;

    fetch(`${config.API_ENDPOINT}/notes/${noteid}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_TOKEN}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        this.context.deleteNote(noteid);
        this.props.onDeleteNote(noteid);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { name, id } = this.props;
    const modified = new Date(this.props.modified);
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon="trash-alt" />
          {""}
          remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified <span className="Date">{modified.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.instanceOf(Date).isRequired,
};
