import styled from "styled-components";

export const SCContainer = styled.section`
  margin: 0 auto;
  background-color: #eeecec;
  margin-top: 100px;
  width: 64%;
  min-height: 250px;
  padding: 20px;
`;

export const SCTitle = styled.h1`
  font-size: 1.2rem;
  padding: 10px 0px 10px 0px;
  font-style: normal;
`;

export const SCHeaderTodo = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 0.9rem;

  input {
    border: none;
    font-size: 24px;
    line-height: 1.2;
    width: 100%;
    color: #8d8989;

    :focus {
      outline: none;
    }
  }
`;
