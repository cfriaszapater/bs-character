import { AppState } from "../store";
import { Character } from "../store/character/types";

export function givenAppStateWithCharacter(): AppState {
  return {
    alert: {},
    character: {
      character: givenTestCharacter(),
      error: null,
      loading: false
    },
    login: {
      loggingIn: false,
      password: "",
      submitted: false,
      username: ""
    },
    register: {
      password: "",
      password2: "",
      registerInProgress: false,
      submitted: false,
      username: ""
    }
  };
}

export function givenTestCharacter(): Character {
  return {
    name: "Jarl",
    attributes: {
      endurance: 2,
      agility: 2,
      strength: 3,
      will: 3,
      intelligence: 2,
      leadership: 2,
      power: 2,
      defense: 2,
      extension: 5
    },
    equipment: {
      hand1: {
        type: "weapon",
        id: "long-sword",
        level: 1,
        reach: 2,
        structure: 3,
        weight: 2
      },
      hand2: {
        type: "shield",
        id: "round-shield",
        level: 1,
        structure: 1,
        weight: 1,
        coverage: 1,
        blunt: 0,
        cut: 0,
        penetrating: 2
      },
      body: {
        type: "armor",
        id: "chainmail",
        level: 1,
        structure: 3,
        weight: 11,
        dodge: 2,
        coverage: 5,
        blunt: 2,
        cut: 3,
        penetrating: 3
      },
      bag: [
        {
          type: "miscelaneous",
          id: "flask"
        }
      ]
    },
    characteristics: {
      initiative: {
        current: 5,
        max: 6
      },
      stamina: {
        current: 9,
        max: 10
      },
      impact: 4,
      damage: 5,
      health: {
        current: 14,
        max: 15
      },
      dodge: 2,
      coverage: {
        current: 5,
        max: 6
      },
      blunt: 2,
      cut: 3,
      penetrating: 5
    }
  };
}
