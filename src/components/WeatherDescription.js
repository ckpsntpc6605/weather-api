import styled from "styled-components";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DescContainer = styled.div`
  padding: 10px;
`;

const Description = styled.p`
  color: #ddd;
  display: inline-block;
  width: 100%;
`;

export default function WeatherDescription({ description, loading }) {
  console.log("loading:", loading);
  console.log("description:", description);
  return (
    <DescContainer>
      <Description>
        {loading ? (
          <Skeleton baseColor="#aaa" highlightColor="#ccc" duration={2} />
        ) : (
          description
        )}
      </Description>
    </DescContainer>
  );
}
