import controls from '../../constants/controls';

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function criticalHitChance(min, max) {
    return randomNum(min, max);
}

function getDodgeChance(min, max) {
    return randomNum(min, max);
}

export function getHitPower(fighter) {
    return fighter.attack * criticalHitChance(1, 2);
}

export function getBlockPower(fighter) {
    return fighter.defense * getDodgeChance(1, 2);
}

export function getDamage(attacker, defender) {
    let damageDone = 0;

    if (defender.isBlocking) {
        damageDone = getHitPower(attacker) - getBlockPower(defender);
    } else {
        damageDone = getHitPower(attacker);
    }

    return damageDone > 0 ? damageDone : 0;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const firstHealthBar = document.getElementById('left-fighter-indicator');
        const secondHealthBar = document.getElementById('right-fighter-indicator');

        const firstDiv = document.querySelector('.arena___left-fighter');
        const secondDiv = document.querySelector('.arena___right-fighter');

        const firstPlayer = {
            ...firstFighter,
            currLife: +firstFighter.health,
            isBlocking: false,
            canAttack: true
        };

        const secondPlayer = {
            ...secondFighter,
            currLife: +secondFighter.health,
            isBlocking: false,
            canAttack: true
        };

        function setHealthBar(player) {
            const result = (100 / player.health) * player.currLife;
            return `${result}%`;
        }

        function handleBlockOfFirst(e) {
            if (e.code === controls.PlayerOneBlock) {
                firstPlayer.isBlocking = true;
                firstPlayer.canAttack = false;
                firstDiv.style.boxShadow = '20px 0 10px white';
            }
        }

        function handleBlockOfSecond(e) {
            if (e.code === controls.PlayerTwoBlock) {
                secondPlayer.isBlocking = true;
                secondPlayer.canAttack = false;
                secondDiv.style.boxShadow = '-20px 0 10px white';
            }
        }

        function handleUnBlockOfFirst(e) {
            if (e.code === controls.PlayerOneBlock) {
                firstPlayer.isBlocking = false;
                firstPlayer.canAttack = true;
                firstDiv.style.boxShadow = 'none';
            }
        }

        function handleUnBlockOfSecond(e) {
            if (e.code === controls.PlayerTwoBlock) {
                secondPlayer.isBlocking = false;
                secondPlayer.canAttack = true;
                secondDiv.style.boxShadow = 'none';
            }
        }

        function handleAttackOfFirst(e) {
            if (e.code === controls.PlayerOneAttack && firstPlayer.canAttack) {
                const damage = getDamage(firstPlayer, secondPlayer);

                secondPlayer.currLife -= damage;
                if (secondPlayer.currLife <= 0) {
                    secondPlayer.currLife = 0;
                }

                const damagePercentOfCurrLife = (damage / (+secondPlayer.currLife + damage)) * 100;
                secondHealthBar.style.background = `linear-gradient(to right, #ebd759 ${100 - damagePercentOfCurrLife}%,
                    red ${100 - damagePercentOfCurrLife}%)`;
                setTimeout(() => {
                    secondHealthBar.style.width = setHealthBar(secondPlayer);
                    secondHealthBar.style.background = `linear-gradient(to right, #ebd759, #ebd759)`;
                }, 200);

                if (secondPlayer.currLife <= 0) {
                    window.removeEventListener('keydown', handleAttackOfFirst);
                    window.removeEventListener('keydown', handleBlockOfFirst);
                    window.removeEventListener('keydown', handleBlockOfSecond);
                    resolve(firstFighter);
                }
            }
        }

        function handleAttackOfSecond(e) {
            if (e.code === controls.PlayerTwoAttack && secondPlayer.canAttack) {
                const damage = getDamage(secondPlayer, firstPlayer);

                firstPlayer.currLife -= damage;
                if (firstPlayer.currLife <= 0) {
                    firstPlayer.currLife = 0;
                }

                const damagePercentOfCurrLife = (damage / (+firstPlayer.currLife + damage)) * 100;
                firstHealthBar.style.background = `linear-gradient(to right, #ebd759 ${100 - damagePercentOfCurrLife}%,
                     red ${100 - damagePercentOfCurrLife}%)`;
                setTimeout(() => {
                    firstHealthBar.style.width = setHealthBar(firstPlayer);
                    firstHealthBar.style.background = `linear-gradient(to right, #ebd759, #ebd759)`;
                }, 500);

                if (firstPlayer.currLife <= 0) {
                    window.removeEventListener('keydown', handleAttackOfFirst);
                    window.removeEventListener('keydown', handleAttackOfSecond);
                    window.removeEventListener('keydown', handleBlockOfFirst);
                    window.removeEventListener('keydown', handleBlockOfSecond);
                    resolve(secondFighter);
                }
            }
        }

        window.addEventListener('keydown', handleAttackOfFirst);
        window.addEventListener('keydown', handleAttackOfSecond);

        window.addEventListener('keydown', handleBlockOfFirst);
        window.addEventListener('keydown', handleBlockOfSecond);
        window.addEventListener('keyup', handleUnBlockOfFirst);
        window.addEventListener('keyup', handleUnBlockOfSecond);
    });
}
