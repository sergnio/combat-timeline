import styled from "styled-components";
import useNewCombatState from "hooks/useNewCombatState";
import { CombatPhase } from "types/types";

const EntireContainer = styled.div`
  //
`;

const ButtonsContainer = styled.div`
  //
`;

const TimelineContainer = styled.div`
  display: flex;
  /** TODO - remove this?? */
  & + div {
    padding: 0.25em;
  }
`;

export default () => {
  const { turn, phase, firstActor, initiativeWinner , onAdvanceClick, onPreviousClick } = useNewCombatState();

  const hasFirstActor = Boolean(firstActor);
  const initPhaseDisabled =
    phase === CombatPhase.initiative && (!initiativeWinner || !hasFirstActor);
  const firstTurnFirstClick = phase === CombatPhase.initiative && turn === 1;

  return (
    <EntireContainer>
      Turn: {turn}
      <TimelineContainer>
        <InitiativeTimeline />
        <MovementTimeline />
        <ActionTimeline />
        <div style={{ width: "200px" }}>
          <AddNewAlly />
        </div>
      </TimelineContainer>
      <ButtonsContainer>
        <TimelineButtons
          previousDisabled={firstTurnFirstClick}
          nextDisabled={initPhaseDisabled}
          onAdvanceClick={() => {
            onAdvanceClick();
          }}
          onPreviousClick={onPreviousClick}
        />
      </ButtonsContainer>
    </EntireContainer>
  );
};
