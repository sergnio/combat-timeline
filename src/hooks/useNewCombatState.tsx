import { useState } from "react";
import {
  BadGuy,
  CombatPhase,
  Hero,
  InitActor,
  INITIAL_TURN_EVENT,
  TurnEvent,
  Undefinable,
} from "types/types";
import { sortActionOrder } from "helpers/helper";

export default (badGuys: BadGuy[] = [], heroes: Hero[] = []) => {
  const [turn, setTurn] = useState<number>(1);
  const [entireTimeline, timelineSetter] = useState<TurnEvent[]>([
    INITIAL_TURN_EVENT(),
  ]);
  const timeline = entireTimeline.find((t) => t.turn === turn) as TurnEvent;
  const phase = timeline.phase;

  const setTimeline = (
    newTimeline: TurnEvent | ((prevState: TurnEvent) => TurnEvent)
  ) =>
    timelineSetter((prevState) =>
      prevState.map((turnEvent) => {
        if (turnEvent.turn !== turn) {
          return turnEvent;
        }

        return typeof newTimeline === "function"
          ? newTimeline(turnEvent)
          : newTimeline;
      })
    );

  const uptickMovementIndex = (): boolean => {
    const numChars: Undefinable<number> =
      timeline.movement.characterOrder?.length;
    if (numChars === undefined) {
      throw new Error("DEV error: No characters in movement order...");
    }

    const endIndex = numChars - 1;
    const isAtEnd = timeline.movement.selectedCharacterIndex >= endIndex;

    if (isAtEnd) {
      return true;
    }

    setTimeline((prevTimeline) => ({
      ...prevTimeline,
      movement: {
        ...prevTimeline.movement,
        selectedCharacterIndex:
          prevTimeline.movement.selectedCharacterIndex + 1,
      },
    }));
    return false;
  };

  const uptickActionIndex = (): boolean => {
    const numChars: Undefinable<number> =
      timeline.action.characterOrder?.length;
    if (numChars === undefined) {
      throw new Error("DEV error: No characters in action order...");
    }

    const endIndex = numChars - 1;
    const isAtEnd = timeline.action.selectedCharacterIndex >= endIndex;

    if (isAtEnd) {
      return true;
    }

    setTimeline((prevTimeline) => ({
      ...prevTimeline,
      action: {
        ...prevTimeline.action,
        selectedCharacterIndex: prevTimeline.action.selectedCharacterIndex + 1,
      },
    }));

    return false;
  };

  /**
   * Updates this in the timeline
   * @param initiativeWinner
   */
  const updateInitWinner = (initiativeWinner: InitActor) =>
    setTimeline((prevTimeline) => ({
      ...prevTimeline,
      initiative: {
        ...prevTimeline.initiative,
        initiativeWinner,
      },
    }));

  const setFirstActorsMovementPhase = (firstActors: InitActor) => {
    setTimeline((prevTimeline) => ({
      ...prevTimeline,
      movement: {
        ...prevTimeline.movement,
        characterOrder:
          firstActors === InitActor.Heroes
            ? [InitActor.Heroes, InitActor.Enemies]
            : [InitActor.Enemies, InitActor.Heroes],
      },
      action: {
        ...prevTimeline.action,
        characterOrder: sortActionOrder(
          [...badGuys, ...heroes],
          InitActor.Heroes
        ),
      },
    }));
  };

  const onAdvanceClick = () => {
    switch (phase) {
      case CombatPhase.initiative:
        setPhase(CombatPhase.movement);
        break;
      case CombatPhase.movement:
        const atMovementPhaseEnd = uptickMovementIndex();
        if (atMovementPhaseEnd) {
          setPhase(CombatPhase.action);
        } else {
          console.log("not there yet");
        }
        break;
      case CombatPhase.action:
        console.log("action");
        const atActionPhaseEnd = uptickActionIndex();
        console.log("atActionPhaseEnd", atActionPhaseEnd);
        if (atActionPhaseEnd) {
          advanceTimeline();
          setPhase(CombatPhase.initiative);
          rollInitiative();
        }
        break;
    }
  };

  const rollInitiative = () => {
    setFirstActorsMovementPhase(InitActor.Heroes)
    updateInitWinner(InitActor.Heroes)
  }

  const advanceTimeline = () => {
    console.log("advance");

    setTimeline(INITIAL_TURN_EVENT(1));
    setTurn(turn + 1);
  };


  const setPhase = (newPhase: CombatPhase) =>
    setTimeline((prevTimeline) => ({
      ...prevTimeline,
      phase: newPhase,
    }));
    }

  return {
    timelineData: timeline,
    onAdvanceClick
  };
};
