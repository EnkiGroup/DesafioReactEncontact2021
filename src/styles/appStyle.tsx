import styled from "styled-components";
import { Form as Unform } from "@unform/web";

export const SCContainer = styled.section`
  margin: 0 auto;
  background-color: ${(props) => props.theme.background};
  margin-top: 100px;
  margin-bottom: 100px;
  width: 48%;

  padding: 20px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

export const SCTitle = styled.h1`
  text-align: center;
  font-size: 42px;
  padding: 10px 0px 10px 0px;
  font-style: normal;
  font-weight: 700;
  font-family: "STIX Two Math", serif;
  color: #13c9aa;
  padding: 25px;
  line-height: 50%;

  span {
    font-family: "Roboto", serif;
    line-height: 0.5rem;
    font-size: 14px;
    color: #00ebb0;
  }
`;

export const SCForm = styled(Unform)`
  width: 100%;
  display: 1;
  justify-content: center;
  align-items: center;

  input {
    background-color: ${(props) => props.theme.backgroundSecond};
    border: none;
    font-size: 24px;
    line-height: 1.2;
    width: 100%;
    padding: 3px;
    color: ${(props) => props.theme.text};

    :focus {
      outline: none;
    }
  }

  #edited {
    background-color: "#4f3";
  }
`;

export const SCFormEdit = styled(Unform)`
  input {
    flex: 1;
    width: 100%;
    font-size: 19px;
    border: none;
    color: ${(props) => props.theme.text};

    :focus {
      outline: none;
    }
  }
`;

export const SCHeaderTodo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${(props) => props.theme.backgroundSecond};
  padding-left: 8px;
  height: 58px;
  border-bottom: 2px solid ${(props) => props.theme.background};
  margin-bottom: 0.3rem;
`;

export const SCListTODO = styled.div`
  min-height: 200px;
  margin-bottom: 10px;

  #editMode {
    background-color: ${(props) => props.theme.backgroundThird};
  }
`;

export const SCItemTODO = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.backgroundSecond};
  padding: 8px 1px 8px 1px;
  border-bottom: 2px solid ${(props) => props.theme.background};
  font-size: 18.5px;
  color: ${(props) => props.theme.text};
  * {
    cursor: pointer;
  }

  label {
    display: flex;
    background-color: ${(props) => props.theme.backgroundSecond};
  }

  input {
    flex-basis: 64px;
    background-color: ${(props) => props.theme.backgroundThird};
  }
`;

export const SCListEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 25px;

  h5 {
    font-size: 18px;
    color: ${(props) => props.theme.text};
  }
`;

export const SCFooterTodo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 10px;

  #count {
    color: ${(props) => props.theme.text};
    flex-basis: 180px;
  }

  #botoes {
    display: flex;
    width: 170px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  a {
    width: 190px;
    border: 1px solid ${(props) => props.theme.text};
    padding: 5px;
    border-radius: 10px;
    text-decoration: none;
  }

  #active {
    background-color: "#e28a42";
  }
`;
