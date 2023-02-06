import { TimelineNode } from "./styles/Styles";
import useNewCombatState from "./hooks/useNewCombatState";
import { CombatPhase } from "./types/types";

export default ({ timeline }: any) => {
  return (
    <>
      <TimelineNode enabled={timeline.phase === CombatPhase.initiative}>
        Initiative
      </TimelineNode>
    </>
  );
};
