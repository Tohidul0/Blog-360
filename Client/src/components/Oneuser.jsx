import React from "react";

function Oneuser(props) {
  const { profilePicture, username, email } = props.one;
  return (
    <div className="w-40 mx-auto h-40 overflow-hidden flex-row items-center justify-center">
      <img
        className="rounded-full w-20 h-20 mx-auto"
        src={profilePicture}
      ></img>
      <h1 className="text-center truncate">{username}</h1>
      <h1 className="text-center truncate">{email}</h1>
    </div>
  );
}

export default Oneuser;
