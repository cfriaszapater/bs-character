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

  Scenario: lower Ini defender decides stamina investment
    Given turn.step is "DecideStaminaLowerIni"
    And turn.attacker is C1 with Ini 7
    And turn.defender is C2 with Ini 6
    When C2 decides to invest stamina in Dodge
    And C2 decides to invest stamina in Block
    And C2 decides defense combat options "DCO1, DCO2"
    Then turn.defenderStamina is "[Dodge, Block]"
    And turn.defenderCombatOptions is "[DCO1, DCO2]"
    And turn.step is "DecideStaminaHigherIni"

  Scenario: higher Ini attacker decides stamina investment
    Given turn.step is "DecideStaminaHigherIni"
    And turn.attacker is C1 with Ini 7
    And turn.defender is C2 with Ini 6
    When C1 decides to invest stamina in Impact
    And C1 decides to invest stamina in Damage
    And C1 decides attack combat options "ACO1"
    Then turn.attackerStamina is "[Impact, Damage]"
    And turn.attackerCombatOptions is "[ACO1]"
    And turn.step is "ConfirmAttack"

  Scenario: attacker confirms attack (causes damage)
    Given turn.step is "ConfirmAttack"
    And attack will cause final damage
    When turn.attacker confirms
    Then defender health is reduced by final damage
    And turn.step is "AttackResolved"

  Scenario: show resolved attack summary, end of turn
    Given turn.step is "AttackResolved"
    And turn.attacker is C1
    And no more attacks left for C1
    And summary shown
    And turns is "[]"
    When dismiss
    Then turns is "[turn]" (attacker turn ends)
    And turn is "null"


# TODO
Feature: Combat backend

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
    # TODO
    Given attacker final Impact > defender final Dodge
    And attacker final Impact <= defender final Coverage
    And attacker final cut Damage > defender final cut defense
    When resolve attack
    Then final damage > 0
