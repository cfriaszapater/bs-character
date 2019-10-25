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
  equipment: Equipment;
  characteristics: Characteristics;
  defenseCharacteristics: DefenseCharacteristics;
}

export interface Characteristics {
  initiative: number;
  stamina: number;
  impact: number;
  damage: number;
  health: number;
}

export interface DefenseCharacteristics {
  dodge: number;
  coverage: number;
  blunt: number;
  cut: number;
  penetrating: number;
}

export interface Equipment {
  hand1: any;
  hand2: any;
  body: any;
  bag: [any];
}

export interface CharacterViewState {
  character: Character | null;
  loading: boolean;
  error: Error | null;
}
