import React from "react";
import PropTypes from "prop-types";

const URL = "https://wa.me";

const WhatsappSend = ({ number, message, element, onClick, ...props }) => {
  number = number.replace(/[^\w\s]/gi, "").replace(/ /g, "");

  let url = `${URL}/${number}`;

  if (message) {
    url += `?text=${encodeURI(message)}`;
  }

  return (
    <button
      onClick={(e) => {
        window.open(url);

        if (onClick) {
          onClick(e);
        }
      }}
      {...props}
    />
  );
};

WhatsappSend.propTypes = {
  number: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default WhatsappSend;
