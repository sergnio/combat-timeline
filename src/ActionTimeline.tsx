import useNewCombatState from "hooks/useNewCombatState";
import { CombatPhase } from "types/types";
import { TimelineNode } from "styles/Styles";

export default () => {
  // todo - always need to show previous turn's orders
  const { timeline } = useNewCombatState();

  const currentIndex = timeline.action.selectedCharacterIndex;
  const phase = timeline.phase;
  const actionOrder = timeline.action.characterOrder;

  return (
    <>
      {actionOrder && phase === CombatPhase.action ? (
        <>
          {actionOrder?.map((actor, index) => (
            <TimelineNode
              key={`${actor.id}-${index}`}
              enabled={phase === CombatPhase.action && currentIndex === index}
            >
              <div>
                {actor.name} {actor.attackOrder}
              </div>
            </TimelineNode>
          ))}
        </>
      ) : (
        <TimelineNode enabled={false}>Action</TimelineNode>
      )}
    </>
  );
};
