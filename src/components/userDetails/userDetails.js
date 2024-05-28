import React from "react";
import "./userDetails.css";

const UserDetails = ({ name, email, phone, city, street, suite, company }) => {
  return (
    <div className="user-details">
      <p className="name">
        <span>Name : </span>
        {name}
      </p>
      <p className="name">
        <span>Company : </span>
        {company}
      </p>
      <p className="email">
        <span>Email : </span>
        {email}
      </p>
      <p>
        <span>Phone : </span>
        {phone}
      </p>
      <p className="address">
        <span>Location : </span>
        {street}, {suite}, {city}
      </p>
    </div>
  );
};

export default UserDetails;
