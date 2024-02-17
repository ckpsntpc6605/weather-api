import styled from "styled-components";

const DescContainer = styled.div`
  width: 100%;
`;

const Description = styled.p`
  color: #ddd;
  display: inline-block;
`;

export default function WeatherDescription({ description }) {
  return (
    <DescContainer>
      <Description>{description}</Description>
    </DescContainer>
  );
}
