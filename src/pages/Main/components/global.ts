import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 15px;
  margin: 20px 0;
  flex:1;
`;
export const Wraper = styled.View`
  flex-direction:row;
`;
export const BackgroundGlobal = styled.ImageBackground.attrs((p) => ({
  imageStyle: {
    resizeMode: "center",
  }
}))`
  width: 95%;
`;
export const SideBar = styled.View`
padding: 7px;
  background-color: ${(p: { color: string }) => p.color};
`;

export const Headline = styled.Text`
  font-size: 50px;
  font-family: 'Roboto-Light';
`;
export const LoadingHandler = styled.View`
  align-items:center;
  padding: 80px;
  justify-content: center;
`;
