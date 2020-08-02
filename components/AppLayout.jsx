import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      {/* gutter - 컬럼사이 간격 */}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://kyounghwan01.github.io/blog/"
            target="_blank"
            rel="noreferrer noopener"
          >
            blog
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

AppLayout.defaultProps = {
  children: {}
};

// 반응형할때는 모바일 먼저 -> 테블릿 -> 데스크탑 (가로먼저 만들고 세로만듬)
// col - n/24
// <Col xs={24} md={6}></Col> - 모바일은 전체화면 데스크탑은 25%
