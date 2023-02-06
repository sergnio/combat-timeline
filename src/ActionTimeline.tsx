import { TimelineNode } from "./styles/Styles";
import useNewCombatState from "./hooks/useNewCombatState";
import { CombatPhase } from "./types/types";
import { useState } from "react";

export default ({ actionOrder, phase, actionIndex }: any) => {
  return (
    <>
      {actionOrder && phase === CombatPhase.action ? (
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
