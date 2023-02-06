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
  initiative: {
    initiativeWinner: InitActor.Enemies,
    movesFirst: InitActor.Enemies,
  },
  movement: {
    selectedCharacterIndex: 0,
    characterOrder: [InitActor.Enemies, InitActor.Heroes],
  },
  action: {
    selectedCharacterIndex: 0,
    characterOrder: [...badGuys, ...heroes],
  },
  turn,
});

export const badGuys = [
  { id: 1, name: "Bad Guy 1", attackOrder: 1 },
  { id: 2, name: "Bad Guy 2", attackOrder: 2 },
  { id: 3, name: "Bad Guy 3", attackOrder: 3 },
];

export const heroes = [
  { id: 4, name: "Hero 1", attackOrder: 4 },
  { id: 5, name: "Hero 2", attackOrder: 5 },
  { id: 6, name: "Hero 3", attackOrder: 6 },
];

export enum InitActor {
  Heroes = "Heroes",
  Enemies = "Enemies",
}

export type InitiativePhaseEvents = {
  initiativeWinner?: InitActor;
  movesFirst?: InitActor;
};

export type MovementPhaseEvents = {
  characterOrder: MovementCharacterOrder;
  selectedCharacterIndex: number;
};

export type MovementCharacterOrder =
  | [InitActor.Enemies, InitActor.Heroes]
  | [InitActor.Heroes, InitActor.Enemies];

export type ActionCharacterOrder = (BadGuy | Hero)[];
export type ActionPhaseEvents = {
  characterOrder: ActionCharacterOrder;
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
