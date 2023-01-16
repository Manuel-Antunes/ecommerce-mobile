import styled from 'styled-components/native';


export const Container = styled.View`
  flex-direction:row;
`;
export const SideBar = styled.View`
  padding: 0 7px;
  background-color: ${(p: { color: string }) => p.color};
`;
