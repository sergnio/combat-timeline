export enum CombatPhase {
  setup = "Setup",
  initiative = "Initiative",
  movement = "Movement",
  action = "Action",
}

export type TurnEvent = {
  phase: CombatPhase;
  initiative: InitiativePhaseEvents;
  movement: MovementPhaseEvents;
  action: ActionPhaseEvents;
  turn: number;
};

export const INITIAL_TURN_EVENT = (turn = 1): TurnEvent => ({
  phase: CombatPhase.initiative,
  initiative: {},
  movement: {
    selectedCharacterIndex: 0,
  },
  action: { selectedCharacterIndex: 0 },
  turn,
});

export enum InitActor {
  Heroes = "Heroes",
  Enemies = "Enemies",
}

export type InitiativePhaseEvents = {
  initiativeWinner?: InitActor;
  movesFirst?: InitActor;
};

export type MovementPhaseEvents = {
  characterOrder?: MovementCharacterOrder;
  selectedCharacterIndex: number;
};

export type MovementCharacterOrder =
  | [InitActor.Enemies, InitActor.Heroes]
  | [InitActor.Heroes, InitActor.Enemies];

export type ActionCharacterOrder = (BadGuy | Hero)[];
export type ActionPhaseEvents = {
  characterOrder?: ActionCharacterOrder;
  selectedCharacterIndex: number;
};

export type RollInitiativeProps = {
  playerInitiativeModifier: number;
  enemiesInitiativeModifier: number;
  monsterTurnChance: number;
};

export type Undefinable<T> = T | undefined;

export type ActiveCombatant = {
  id: number;
  badGuyId: number;
  name: string;
  currentHp: number;
  maxHp: number;
  iconUrl: string;
  isDead: boolean;
  activeConditions: number[];
};

type TimelineBadGuy = {
  id: number;
  name: string;
  attackOrder: number;
};

export interface BadGuy {
  id: number;
  name: string;
  attackOrder: number;
  baseAd: number;
  description: string;
  maxHp: number;
  mt: number;
  dx: number;
  kn: number;
  grapple: number;
  move: number;
  weapon: string;
  iconUrl: string;
  armor?: string;
  other?: string;
}

export interface Hero {
  id: number;
  name: string;
  attackOrder: number;
}
