import styled from 'styled-components/native';
export const Container = styled.View`

`;
export const GridContent = styled.View`
  height: 200px;
  margin-right:10px;
  min-width: 40%;
  flex: ${(p: { flex: number }) => p.flex};
  margin-bottom: 10px;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.27);
`;
