import React from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import useInput from "../hooks/useInput";

function CommentForm({ post }) {
  const [commentText, setCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {
    callback;
  }, [commentText]);
  return (
    <div>
      <Form onFinish={onSubmitComment}>폼</Form>
    </div>
  );
}

CommentForm.propTypes = {};

export default CommentForm;
