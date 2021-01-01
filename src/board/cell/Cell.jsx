import styled from "styled-components";

const Cell = styled.button`
  border: 1px solid black;
  flex-basis: ${(props) => props.size}%;
  height: ${(props) => props.size}%;
  width: ${(props) => props.size}%;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size * 30}%;
`;

export default Cell;
