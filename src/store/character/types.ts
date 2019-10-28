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
}

export interface Characteristics
  extends AttackCharacteristics,
    DefenseCharacteristics {}

export interface AttackCharacteristics {
  initiative: Initiative;
  stamina: Stamina;
  impact: number;
  damage: number;
}

export type Initiative = VariableCharacteristic;

export type Stamina = VariableCharacteristic;

export type Health = VariableCharacteristic;

export type Coverage = VariableCharacteristic;

export interface VariableCharacteristic {
  current: number;
  max: number;
  editing?: boolean;
}

export interface DefenseCharacteristics {
  dodge: number;
  coverage: Coverage;
  blunt: number;
  cut: number;
  penetrating: number;
  health: Health;
}

export interface Equipment {
  hand1: any;
  hand2: any;
  body: any;
  bag: [any];
}

export interface CharacterViewState {
  character: Character;
  loading: boolean;
  error: Error | null;
}
