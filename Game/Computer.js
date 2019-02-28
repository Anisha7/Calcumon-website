
class Computer {
    constructor(attacks=[], health=100) {
        self.attacks = attacks
        self.health = health
    }

    attack() {
        i = Math.random()*(self.attacks.length)
        // pick attack at index i
        attack = self.attacks[i]
        // subtract attack token cost from player's tokens
        
        if (attack == 'Punch') {
            return 10
        }
        if (attack == 'Kick') {
            return 10
        }
        if (attack == 'Super Attack') {
            return 30
        }
        if (attack == 'Dodge') {
            // restore health to before opponent's attack affected it
            // OR DODGE next attack?
        }
        if (attack == 'Fireball') {
            return 20
        }
        // health restore power
        if (attack == 'Revive 10% health') {
            self.health += 10
            if (self.health > 100) {
                self.health = 100
            }
        }
        return 0
    }
}