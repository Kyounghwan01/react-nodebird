import React from "react";
import PropTypes from "prop-types";

function PostImages({ images }) {
  return (
    <div>
      <div className="div">구현중</div>
    </div>
  );
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
};

export default PostImages;
