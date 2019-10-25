export interface Attributes {
  endurance: number;
  agility: number;
  strength: number;
  will: number;
  intelligence: number;
  leadership: number;
  power: number;
  defense: number;
  extension: number;
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

export interface CharacterViewState {
  character: Character | null;
  loading: boolean;
  error: Error | null;
}
