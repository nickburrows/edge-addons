import styled from "styled-components";

export const LongEl = styled.div`
  min-height: 30vh;
  width: 100%;
`;

export const StyledAppContainer = styled.div`
  min-height: 100vh;
  margin: 0;
  font-family: sans-serif;
  text-align: center;
  background: #242424;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  background: #000;
  padding: 15px;
  border: 1px solid lightblue;
  border-radius: 8px;
  color: #fff;
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const Tooltip = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  text-align: left;
  position: relative;
  font-size: 0.8rem;
  max-width: 140px;
  visibility: hidden;

  &[data-show="true"] {
    visibility: visible;
  }
`;
