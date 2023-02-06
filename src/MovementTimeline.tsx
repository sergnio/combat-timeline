import { CombatPhase, InitActor } from "./types/types";
import { TimelineNode } from "./styles/Styles";
import useNewCombatState from "./hooks/useNewCombatState";

export default ({ timeline, movementIndex, movementOrder }: any) => {
  return (
    <>
      {movementOrder &&
      (timeline.phase === CombatPhase.movement ||
        timeline.phase === CombatPhase.action) ? (
        <>
          {movementOrder.map((actor: any, index: number) => (
            <TimelineNode
              key={`${actor}-${index}`}
              enabled={
                timeline.phase === CombatPhase.movement &&
                movementIndex === index
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
