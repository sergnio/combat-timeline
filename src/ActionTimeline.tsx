import { TimelineNode } from "./styles/Styles";
import { CombatPhase } from "./types/types";

export default ({ actionOrder, phase, actionIndex, updateOrder }: any) => {
  // todo - call updateOrder on the final order whenever we rearrange the action order

  return (
    <>
      {phase === CombatPhase.action ? (
        <>
          {actionOrder?.map((actor: any, index: number) => (
            <TimelineNode
              key={`${actor.id}-${index}`}
              enabled={phase === CombatPhase.action && actionIndex === index}
            >
              <div>
                {actor.name} ({actor.attackOrder})
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
