import React, { useState, useCallback, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

export default function PostForm() {
  const { imagePaths } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, setText] = useState("");

  const onChangeText = useCallback(
    e => {
      setText(e.target.value);
    },
    [text]
  );

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);

  const onClickInageUpLoad = useCallback(() => {
    // ref로 파일업로드 추가
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(e => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    const formData = new FormData();
    formData.append("file", img);
    [].forEach.call(e.target.files, f => {
      console.log(f);
      imageFormData.append("image", f);
    });
    console.log(imageFormData);
    // draft.imagePaths = action.data
  });

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="mutipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 일어낫나"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickInageUpLoad}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}
