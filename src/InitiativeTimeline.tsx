import useNewCombatState from "hooks/useNewCombatState";
import { TimelineNode } from "styles/Styles";
import { CombatPhase } from "types/types";

export default () => {
  const { phase } = useNewCombatState();

  return (
    <>
      <TimelineNode enabled={phase === CombatPhase.initiative}>
        Initiative
      </TimelineNode>
    </>
  );
};
