Feature: Combat frontend
  "A clash between participant characters, divided in turns, in which each character acts in order of initiative"

  Scenario: combat starts, first turn starts
    Given character C1 with Ini 7
    And character C2 with Ini 6
    And combat.participants is [C1, C2]
    And combat.rounds is []
    And combat.events is []
    And turn is undefined
    When combat created
    Then turn.attacker.id is "C1"
    And charactersToAct = [C2]
    And turn.step is "SelectOpponent"
    And event "Combat started"
    And event "C1 turn started"

  Scenario Outline: turn starts for pending character with higher Ini
    Given character C1 with Ini 7
    And character C2 with Ini 6
    And charactersToAct = <givenCharactersToAct>
    And turn is undefined
    # XXX start turn could be an automatic event (eg: right after combat start), or a scheduled one (eg: a few seconds after turn end)
    When start turn
    Then turn.attacker.id is <thenTurnAttacker>
    And charactersToAct = <thenCharactersToAct>
    And turn.step is "SelectOpponent"
    And event "C1 turn started"
    Examples:
      | <givenCharactersToAct> | <thenTurnAttacker> | <thenCharactersToAct> |
      | "[C1, C2]"             | "C1"               | "[C2]"                |
      # givenCharactersToAct order does not matter, the Ini does
      | "[C2, C1]"             | "C1"               | "[C2]"                |
      | "[C2]"                 | "C2"               | "[]"                  |

  Scenario Outline: select opponent
    Given turn.step is "SelectOpponent"
    And turn.attacker is C1 with Ini 7
    And C2 has Ini <opponentIni>
    When C1 selects opponent C2
    Then turn.defender is C2
    And turn.step is "DecideStaminaLowerIni"
    And turn.currentDecision is <currentDecision>
    And event "C1 selects opponent C2"
    Examples:
      | <opponentIni> | <currentDecision> |
      | "6"           | "defender"        |
      | "8"           | "attacker"        |

  Scenario: lower Ini defender declares defense, attack not resolved
    Given turn.step is "DecideStaminaLowerIni"
    And turn.attacker is C1 with Ini 7
    And turn.defender is C2 with Ini 6, Sta 9
    And turn.defenderStamina is undefined (not yet decided)
    And turn.attackerStamina is undefined (not yet decided)
    And turn.currentDecision is "defender"
    When C2 invests stamina in Dodge, Block
    And C2 decides defense combat options "DCO1, DCO2"
    Then C2 Sta is 7
    And turn.defenderStamina is "{Dodge=1, Block=1}"
    And turn.defenderCombatOptions is "[DCO1, DCO2]"
    And turn.step is "DecideStaminaHigherIni"
    And turn.currentDecision is "attacker"
    And event "C2 declares defense"
    And C2 waits until turn[0].attacks[0].attackResult is not undefined

  Scenario: higher Ini attacker declares attack, attack resolved (causes damage)
    Given turn.step is "DecideStaminaHigherIni"
    And turn.attacker is C1 with Ini 7, Sta 10
    And turn.defender is C2 with Ini 6, Wil 2
    And turn.defenderStamina is not undefined (already decided)
    And turn.attackerStamina is undefined (not yet decided)
    And turn.currentDecision is "attacker"
    And attack will cause final damage "5"
    When C1 invests stamina in Impact, Damage
    And C1 decides attack combat options "ACO1"
    And C1 confirms attack
    Then C1 Sta is 8
    And turn.attackerStamina is "{Impact=1, Damage=1}"
    And turn.attackerCombatOptions is "[ACO1]"
    And turn.attackResult is "{hit: true, damage: 5, coverageDamage: 0, stunned=2}"
    And defender health is reduced by final damage "5"
    And defender is stunned for 2 turns
    And turn.step is "AttackResolved"
    And turn.currentDecision is undefined
    And event "C1 attacks C2 and causes damage!"

  Scenario: post-attack actions (IncreaseInitiative) and end turn
    Given turn.step is "AttackResolved"
    And turn.attacker is C1 with Int 3, Ini 7, Sta 8
    And turn.attackerCombatOptions is "[opportunist]"
    And combat option "opportunist" allows post-attack action "IncreaseInitiative"
    And turns is "[]"
    When C1 selects "IncreaseInitiative"
    And ends turn
    Then C1 Sta is 7
    And C1 Ini is 10
    And turns is "[turn]"
    And turn is undefined
    And event "C1 increases initiative"
    And wait until start turn

  Scenario: throw attack and defense runes
    And turn.attacker is C1 with Agi 2, Str 3
    And turn.attackerStamina is "{Impact=1, Damage=1}"
    And turn.defender is C2 with Agi 2, Str 3
    And turn.defenderStamina is "{Dodge=1, Block=1}"
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
