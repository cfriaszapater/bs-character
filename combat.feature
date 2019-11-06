Feature: Combat frontend
  "A clash between participant characters, divided in turns, in which each character acts in order of initiative"

  Scenario: combat starts
    Given participants is "[C1, C2]"
    When combat starts
    Then charactersToAct = "[C1, C2]"

  Scenario Outline: turn starts for pending character with higher Ini
    Given character C1 with Ini 7
    And character C2 with Ini 6
    And charactersToAct = <givenCharactersToAct>
    And turn is "null"
    When turn starts
    Then turn is <thenTurn>
    And charactersToAct = <thenCharactersToAct>
    And turn.step is "SelectOpponent"
    Examples:
      | <givenCharactersToAct> | <thenTurn>       | <thenCharactersToAct> |
      | "[C1, C2]"             | "{attacker: C1}" | "[C2]"                |
      | "[C2, C1]"             | "{attacker: C1}" | "[C2]"                |
      | "[C2]"                 | "{attacker: C2}" | "[]"                  |

  Scenario: start turn - select opponent
    Given turn.step is "SelectOpponent"
    And turn.attacker is C1
    When C1 selects opponent C2
    Then turn.defender is C2
    And turn.step is "DecideStaminaLowerIni"

  Scenario: lower Ini defender invests stamina
    Given turn.step is "DecideStaminaLowerIni"
    And turn.attacker is C1 with Ini 7
    And turn.defender is C2 with Ini 6, Sta 9
    And turn.defenderStamina is null (not yet decided)
    And turn.attackerStamina is null (not yet decided)
    When C2 invests stamina in Dodge
    And C2 invests stamina in Block
    And C2 decides defense combat options "DCO1, DCO2"
    Then C2 Sta is 7
    And turn.defenderStamina is "[Dodge, Block]"
    And turn.defenderCombatOptions is "[DCO1, DCO2]"
    And turn.step is "DecideStaminaHigherIni"

  Scenario: higher Ini attacker invests stamina
    Given turn.step is "DecideStaminaHigherIni"
    And turn.attacker is C1 with Ini 7, Sta 10
    And turn.defender is C2 with Ini 6
    And turn.defenderStamina is not null (already decided)
    And turn.attackerStamina is null (not yet decided)
    When C1 invests stamina in Impact
    And C1 invests stamina in Damage
    And C1 decides attack combat options "ACO1"
    Then C1 Sta is 8
    And turn.attackerStamina is "[Impact, Damage]"
    And turn.attackerCombatOptions is "[ACO1]"
    And turn.step is "ConfirmAttack"

  Scenario: attacker confirms attack (causes damage)
    Given turn.step is "ConfirmAttack"
    And attack will cause final damage
    When turn.attacker confirms
    Then defender health is reduced by final damage
    And turn.step is "AttackResolved"

  Scenario: post-attack actions (IncreaseInitiative)
    Given turn.step is "AttackResolved"
    And turn.attacker is C1 with Int 3, Ini 7, Sta 8
    And turn.attackerCombatOptions is "[opportunist]"
    And combat option "opportunist" allows post-attack action "IncreaseInitiative"
    When C1 selects "IncreaseInitiative"
    Then C1 Sta is 7
    And C1 Ini is 10
    And turn.step is "TurnEnd"

  Scenario: show resolved attack summary, end of turn
    Given turn.step is "TurnEnd"
    And turn.attacker is C1
    And no more attacks left for C1
    And summary shown
    And turns is "[]"
    When dismiss
    Then turns is "[turn]" (attacker turn ends)
    And turn is "null"

  Scenario: throw attack and defense runes
    And turn.attacker is C1 with Agi 2, Str 3
    And turn.attackerStamina is "[Impact, Damage]"
    And turn.defender is C2 with Agi 2, Str 3
    And turn.defenderStamina is "[Dodge, Block]"
    When runes thrown
    And attacker throws 4 Impact runes
    And defender throws 4 Dodge runes
    And attacker throws 6 Damage runes
    And defender throws 6 Block runes

  Scenario: resolve attack (superficial impact with damage)
    Given attacker final Impact > defender final Dodge
    And attacker final Impact <= defender final Coverage
    And attacker final cut Damage > defender final cut defense
    When resolve attack
    Then final damage > 0
