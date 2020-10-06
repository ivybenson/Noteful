import React from "react";

export default function NoteForm(props) {
  const { className, ...otherProps } = props;
  return (
    <form
      className={["note-form", className].join(" ")}
      action="#"
      {...otherProps}
    />
  );
}
