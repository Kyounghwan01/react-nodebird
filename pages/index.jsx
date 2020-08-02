import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {/* key index하면 안되는 이유 -> 게시글이 지워질 가능성있고, 순서가 달라지거나, 중간에 추가될 가능성이 있다면 절대 index key로 쓰지말라, 반복문이 유지되어 순서가 보장되면 써도됨 */}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;

// next가 pages 폴더 안에있으면 코드 스플리팅한다
