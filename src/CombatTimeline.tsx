import styled from "styled-components";
import InitiativeTimeline from "./InitiativeTimeline";
import MovementTimeline from "./MovementTimeline";
import useNewCombatState from "./hooks/useNewCombatState";
import { CombatPhase, InitActor } from "./types/types";
import TimelineButtons from "./TimelineButtons";
import ActionTimeline from "./ActionTimeline";

const EntireContainer = styled.div`
  margin-left: 5em;
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

const Main = styled.main`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: hsl(0, 0%, 36%);
  color: white;
`;

export default () => {
  const {
    turn,
    phase,
    firstActor,
    initiativeWinner,
    onAdvanceClick,
    entireTimeline,
    timeline,
    onPreviousClick,
  } = useNewCombatState();

  const hasFirstActor = Boolean(firstActor);
  const initPhaseDisabled =
    phase === CombatPhase.initiative && (!initiativeWinner || !hasFirstActor);
  const firstTurnFirstClick = phase === CombatPhase.initiative && turn === 1;

  const movementIndex = timeline.movement.selectedCharacterIndex;
  const movementOrder =
    timeline.initiative.movesFirst === InitActor.Heroes
      ? [InitActor.Heroes, InitActor.Enemies]
      : [InitActor.Enemies, InitActor.Heroes];

  const actionIndex = timeline.action.selectedCharacterIndex;
  const actionOrder = timeline.action.characterOrder;

  return (
    <Main>
      <EntireContainer>
        Turn: {turn}
        Timeline: {JSON.stringify(entireTimeline)}
        <TimelineContainer>
          <InitiativeTimeline {...{ timeline }} />
          <MovementTimeline {...{ movementOrder, timeline, movementIndex }} />
          <ActionTimeline {...{ actionIndex, phase, actionOrder }} />
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
    </Main>
  );
};
