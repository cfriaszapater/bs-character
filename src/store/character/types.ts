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
  initiative: Initiative;
  stamina: Stamina;
  currentStamina: number;
  impact: number;
  damage: number;
  health: Health;
  currentHealth: number;
}

export type Initiative = VariableCharacteristic;

export type Stamina = VariableCharacteristic;

export type Health = VariableCharacteristic;

export interface VariableCharacteristic {
  current: number;
  max: number;
  editing?: boolean;
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
  character?: Character;
  loading: boolean;
  error: Error | null;
}
