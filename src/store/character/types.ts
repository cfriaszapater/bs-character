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
  // items in hands or body are duplicates of those carried (carried is the list of all items the characters has available in combat)
  hand1: Weapon | null;
  hand2: Weapon | Shield | null;
  body: Armor | null;
  carried: Item[];
}

export interface Item {
  type: string;
  weight: number;
  name: string;
  id: string;
  level: number;
}

export interface Weapon extends Item {
  type: "weapon";
  weaponType: "sword";
  reach: number;
  structure: number;
}

export interface DefenseItem extends Item {
  dodge: number;
  coverage: number;
  structure: number;
  blunt: number;
  cut: number;
  penetrating: number;
}

export interface Armor extends DefenseItem {
  type: "armor";
}

export interface Shield extends DefenseItem {
  type: "shield";
  dodge: 0;
}

export interface CharacterViewState {
  character: Character;
  loading: boolean;
  error: Error | null;
}
