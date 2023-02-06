import styled, { css } from "styled-components";
import { NeutralButtonStyles } from "styles/ButtonStyles";
import { COLORS } from "styles/GlobalStyles";
import { HTMLProps, PropsWithChildren } from "react";

export const PreviousButton = styled(NeutralButtonStyles)`
  //
`;

export const DisabledButton = styled(NeutralButtonStyles)`
  opacity: 0.5;
  cursor: not-allowed;
`;

export const AdvanceButton = styled(NeutralButtonStyles)``;

export type TimelineNodeProps = {
  enabled: boolean;
};

const buttonBorderGradient = css`
  linear-gradient(
          109.7deg,
            #d7a150 -2.61%,
          #411e0f 48%,
          #e4b061 95.55%
  )`;

const TimelineNodeContainer = styled.div<TimelineNodeProps>`
  opacity: ${({ enabled }) => (enabled ? 1 : 0.5)};
  box-shadow: 0px 0px 8px rgba(255, 214, 108, 0.2);
  border: double 2.5px transparent;
  border-radius: 13px;
  background-image: linear-gradient(${COLORS.brown800}, ${COLORS.brown800}),
    ${buttonBorderGradient};
  background-origin: border-box;
  background-clip: content-box, border-box;
  text-align: center;
  display: flex;
`;

const TextContainer = styled.div`
  padding: 0.25em;
`;

export const TimelineNode = ({
  children,
  ...rest
}: PropsWithChildren<TimelineNodeProps>) => (
  <TimelineNodeContainer {...rest}>
    <TextContainer>{children}</TextContainer>
  </TimelineNodeContainer>
);
