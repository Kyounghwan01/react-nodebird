import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

function PostImages({ images }) {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 2) {
    return (
      <>
        {/* presentation - 클릭할수는 있으나, 굳이 안해도된다 (버튼, input아니면 넣어주라) 굳이 클릭을 안알려줘도될때 사용 */}
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 1) {
    <>
      <img
        role="presentation"
        style={{ width: "100%" }}
        src={images[0].src}
        alt={images[0].src}
        onClick={onZoom}
      />
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>;
  }
  return (
    <>
      <div>
        <img
          role="presentation"
          width="50%"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}>
          <PlusOutlined />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
