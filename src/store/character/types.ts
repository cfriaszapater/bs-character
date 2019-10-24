export interface Attributes {
  T: number;
  A: number;
  S: number;
  W: number;
  I: number;
  L: number;
  P: number;
  D: number;
  E: number;
}

export interface Character {
  name: string;
  attributes: Attributes;
  equipment: {
    hand1: any;
    hand2: any;
    body: any;
    bag: [any];
  };
  characteristics: {
    initiative: number;
    stamina: number;
    impact: number;
    damage: number;
    health: number;
  };
  defenseCharacteristics: {
    dodge: number;
    coverage: number;
    blunt: number;
    cut: number;
    penetrating: number;
  };
}

export interface CharacterSheetState {
  character: Character | null;
  loading: boolean;
  error: Error | null;
}
