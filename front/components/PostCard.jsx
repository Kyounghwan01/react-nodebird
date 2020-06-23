import React, { useState, useCallback } from "react";
import { Card, Button, Avatar, Popover, List, Comment } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import PostImages from "../components/PostImages";
import CommentForm from "../components/CommentForm";

export default function PostCard({ post }) {
  const [linked, setLinked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector(state => state.user.me?.id);
  // me && me.id === me?.id -> me.id가 있으면 id가 들어가고 없으면 undified -> 옵셔널 체이닝

  const onToggleLike = useCallback(() => {
    setLinked(prev => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages />}
        actions={[
          <RetweetOutlined key="retweet" />,
          linked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined key="elipsis" />
          </Popover>
        ]}
      >
        {/* 배열안에 jsx를 넣을때는 키를 넣으라 */}
        <Card.Meta
          description={post.content}
          title={post.User.nickname}
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

PostCard.defaultProps = {
  post: {}
};
