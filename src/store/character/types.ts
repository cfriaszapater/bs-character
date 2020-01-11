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

export type CharacterId = string;

export interface Character {
  id: CharacterId;
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
  reach: number;
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

export enum EquipPositions {
  MainHand = "hand1",
  SecondaryHand = "hand2",
  Body = "body"
}

export interface Equipment {
  // Items equipped are duplicates of those carried (carried are all items the character has available in combat; equipped are the ones currently in use)
  equipped: {
    [EquipPositions.MainHand]: Weapon | null;
    [EquipPositions.SecondaryHand]: Weapon | Shield | null;
    [EquipPositions.Body]: Armor | null;
  };
  carried: Item[];
}

export enum ItemTypes {
  Weapon = "weapon",
  Armor = "armor",
  Shield = "shield",
  Misc = "misc"
}

export interface Item {
  type: ItemTypes;
  weight: number;
  name: string;
  id: string;
  level: number;
}

export interface Weapon extends Item {
  type: ItemTypes.Weapon;
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
  type: ItemTypes.Armor;
}

export interface Shield extends DefenseItem {
  type: ItemTypes.Shield;
  dodge: 0;
}

export interface CharacterViewState {
  character: Character;
  loading: boolean;
  error: Error | null;
}
