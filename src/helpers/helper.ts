import { BadGuy, Hero, InitActor } from "types/types";

export const sortActionOrder = (
  combatants: (Hero | BadGuy)[],
  initPhaseWinner: InitActor
): (Hero | BadGuy)[] => {
  // TODO - should eventually be the battle state
  const heroes: Hero[] = [];
  const enemies: BadGuy[] = [];

  combatants.forEach((c) => {
    const current = <BadGuy>c;
    if (current !== undefined) {
      enemies.push(current);
    } else {
      heroes.push(c as Hero);
    }
  });

  const heroesAndEnemies: (Hero | BadGuy)[] = [...heroes, ...enemies];
  return heroesAndEnemies.sort((a, b) => {
    const aIsEnemy = (<BadGuy>a).maxHp !== undefined;
    const bIsEnemy = (<BadGuy>b).maxHp !== undefined;

    const aIsHero = !aIsEnemy;
    const bIsHero = !bIsEnemy;

    // only enter this if statement if we're comparing an enemy and a hero
    if (
      a.attackOrder === b.attackOrder &&
      ((aIsEnemy && bIsHero) || (bIsEnemy && aIsHero))
    ) {
      switch (initPhaseWinner) {
        case InitActor.Heroes:
          return aIsHero && bIsEnemy ? -1 : 1;
        case InitActor.Enemies:
          return aIsEnemy && bIsHero ? -1 : 1;
        default:
          return 0;
      }
    }

    // default
    return b.attackOrder - a.attackOrder;
  });
};
