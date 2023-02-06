import useNewCombatState from "hooks/useNewCombatState";
import { CombatPhase, InitActor } from "types/types";
import { TimelineNode } from "styles/Styles";

export default () => {
  const { phase, timeline } = useNewCombatState();
  const movementIndex = timeline.movement.selectedCharacterIndex;
  const movementOrder =
    timeline.initiative.movesFirst === InitActor.Heroes
      ? [InitActor.Heroes, InitActor.Enemies]
      : [InitActor.Enemies, InitActor.Heroes];

  return (
    <>
      {movementOrder &&
      (phase === CombatPhase.movement || phase === CombatPhase.action) ? (
        <>
          {movementOrder.map((actor, index) => (
            <TimelineNode
              key={`${actor}-${index}`}
              enabled={
                phase === CombatPhase.movement && movementIndex === index
              }
            >
              {actor.toString()} Move
            </TimelineNode>
          ))}
        </>
      ) : (
        <TimelineNode enabled={false}>Movement</TimelineNode>
      )}
    </>
  );
};
