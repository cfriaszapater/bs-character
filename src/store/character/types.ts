export interface Attributes {
  R: number;
  A: number;
  F: number;
  V: number;
  I: number;
  L: number;
  P: number;
  D: number;
  E: number;
}

export interface Character {
  name: string;
  attributes: Attributes;
}

export interface CharacterSheetState {
  character: Character | null;
  loading: boolean;
  error: Error | null;
}
