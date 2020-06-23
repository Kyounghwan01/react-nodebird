import React, { useCallback, useMemo } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import useInput from "../hooks/useInput";
import { loginAction } from "../reducers";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

export default function LoginForm() {
  const dispatch = useDispatch();
  /** 중복되는 로직은 (usestate, usecallback 함수) custome hook으로 중복 제거 */
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  // 컴포넌트에 함수로 넘기는 함수는 useCallback을 써라
  // markup에 인라인으로 넣으면 style={{}}객체가 있다면, 다른 객체가 있다고 판단하여 한번더 리렌더됨
  // 인라인 스타일 useMemo로 리렌더 최적화
  const style = useMemo(() => ({ marginTop: 10 }), []);

  // onFinish -> 이미 e.proventDefault 되있음
  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={style}>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={false}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </div>
    </FormWrapper>
  );
}
