import styled from "styled-components";
import { Form as Unform } from "@unform/web";

export const SCContainer = styled.section`
  margin: 0 auto;
  background-color: #fcfcfc;
  margin-top: 100px;
  margin-bottom: 100px;
  width: 48%;
  min-height: 250px;
  padding: 20px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

export const SCTitle = styled.h1`
  font-size: 1.2rem;
  padding: 10px 0px 10px 0px;
  font-style: normal;
`;

export const SCForm = styled(Unform)`
  flex: 1;

  input {
    border: none;
    font-size: 24px;
    line-height: 1.2;
    width: 100%;
    padding: 3px;
    color: #8d8989;

    :focus {
      outline: none;
    }
  }
`;

export const SCHeaderTodo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding-left: 8px;
  height: 58px;
  border-bottom: 2px solid #f5f5f5;
  margin-bottom: 0.3rem;

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

export const SCItemTODO = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 8px 1px 8px 1px;
  border-bottom: 2px solid #f5f5f5;
  font-size: 24px;
  color: #8d8989;
  * {
    cursor: pointer;
  }

  label {
    flex: 1;
  }

  input {
    flex-basis: 64px;
  }
`;

export const SCListEmpty = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  align-items: center;

  h5 {
    font-size: 18px;
    color: #ccc;
  }
`;
