import React from "react";
// import DonutChart from "react-donut-chart";
import styled, { keyframes } from "styled-components";

function Donut({ color, percent, size, time }) {
  return (
    <Chart size={size}>
      <AniSvg viewBox="0 0 200 200">
        <circle cx="80" cy="80" r="40" fill="none" stroke="#3498db" strokeWidth="20" />
        <AnimatedCircle
          cx="80"
          cy="80"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeDasharray={`${2 * Math.PI * 40 * percent} ${2 * Math.PI * 40 * (1 - percent)}`}
          strokeDashoffset={2 * Math.PI * 40 * 0.25}
        />
      </AniSvg>
      <Percent color={time}>{time}초</Percent>
    </Chart>
  );
}

const Chart = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  position: relative;
  padding: 10px;
`;

const AniSvg = styled.svg`
  position: relative;
`;

const circleFill = keyframes`
    0%{
        stroke-dasharray:0 ${2 * Math.PI * 40};
    }
`;

const AnimatedCircle = styled.circle`
  animation: ${circleFill} 2s ease;
`;

const Percent = styled.span`
  position: absolute;
  top: 35%;
  right: 102px;
  font-size: 20px;
  color: ${(props) => {
    if (props.color <= 3) {
      return "red";
    }
  }};
`;

export default Donut;
