'use strict';
/*--------------------------------------------------------------------------------------------
creates a Weapon class
creates a add method on the prototype Weapon
--------------------------------------------------------------------------------------------*/
function Weapon(type, value, itemClass) {
    this.type = type;
    this.value = value;
    this.itemClass = itemClass;
}

Weapon.prototype.add = function () {
    addItem(this.itemClass);
};

/*--------------------------------------------------------------------------------------------
Creates the weapons and players
--------------------------------------------------------------------------------------------*/

let shortKnife = new Weapon('ShortKnife', 70, 'shortKnife weapon', 'avatarWin');
let longGun = new Weapon('LongGun', 60, 'longGun weapon');
let pistleGun = new Weapon('PistleGun', 40, 'pistleGun weapon');
let shortGun = new Weapon('ShortGun ', 30, 'shortGun  weapon');
let handBoom = new Weapon('HandBoom', 20, 'handBoom weapon');
let arrowGun = new Weapon('ArrowGun', 10, 'arrowGun weapon');
let combat1 = new Weapon('combat1', 40, 'combat1 weapon');
let combat2 = new Weapon('combat2', 20, 'combat2 weapon');
let combat3 = new Weapon('combat3', 30, 'combat3 weapon');
let combat4 = new Weapon('combat4', 30, 'combat3 weapon');
let shield = new Weapon('shield', 20, 'shield weapon');

/*--------------------------------------------------------------------------------------------
Change players weapon value
--------------------------------------------------------------------------------------------*/
function changeWeaponValue(playerDiv, player, weapon) {
    player.damage = weapon.value;
    $(playerDiv + ' .weapon-value').text(player.damage);
}

function removePlayerWeapon(playerActiveDiv, playerActive) {
    $(playerActiveDiv + ' .gun').removeClass(playerActive.weapon);
}

function addPlayerWeapon(playerActiveDiv, playerActive) {
    $(playerActiveDiv + ' .gun').addClass(playerActive.weapon);
}
/*--------------------------------------------------------------------------------------------
Find out who is active, remove the weapon from the square, remove players old weapon
set players weapon = to weapon from square, add the player weapon and new weapon value
--------------------------------------------------------------------------------------------*/
function changeWeapon(num, gun, weapon) {
    let square = $('.box[boxID = ' + num + ']');
    whoIsActive();
    square.removeClass(gun).addClass(playerActive.weapon);
    removePlayerWeapon(playerActiveDiv, playerActive);
    playerActive.weapon = gun;
    addPlayerWeapon(playerActiveDiv, playerActive);
    changeWeaponValue(playerActiveDiv, playerActive, weapon, weapon.value);
}

function extraPoints(playerActive, playerActiveDiv, item, itemClass, gain, text1, text2) {
    if (gain) {
        playerActive.score = playerActive.score + item.value;
    } else {
        playerActive.score = playerActive.score - item.value;
    }
    $(playerActiveDiv + ' .score').text(playerActive.score);
    $('.' + itemClass).removeClass(itemClass + ' weapon');
    $(playerActiveDiv + ' .message').text(text1 + text2 + ' ' + item.value);
}
/*--------------------------------------------------------------------------------------------
if there is a weapon see which one and call change Weapon function
--------------------------------------------------------------------------------------------*/
function checkWeapon(num) {
    let square = $('.box[boxID = ' + num + ']');
    if (square.hasClass('weapon')) {
        if (square.hasClass('combat1')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, combat1, 'combat1', true, 'You just beat the fire and ', 'got');
            return;
        }
        if (square.hasClass('combat2')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, combat2, 'combat2', false, 'You just lost against the fire and ', 'lost');
            return;
        }
        if (square.hasClass('combat3')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, combat3, 'combat3', true, 'You just beat the fire and ', 'got');
            return;
        }
        if (square.hasClass('combat4')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, combat4, 'combat4', false, 'You just lost against the fire and ', 'lost');
            return;
        }
        if (square.hasClass('shield')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, shield, 'shield', true, 'You just did a seminar and ', 'got');
            return;
        }
        if (square.hasClass('arrowGun')) {
            changeWeapon(num, 'arrowGun', arrowGun);
            return;
        }
        if (square.hasClass('handBoom')) {
            changeWeapon(num, 'handBoom', handBoom);
            return;
        }
        if (square.hasClass('shortGun')) {
            changeWeapon(num, 'shortGun', shortGun);
            return;
        }
        if (square.hasClass('pistleGun')) {
            changeWeapon(num, 'pistleGun', pistleGun);
            return;
        }
        if (square.hasClass('longGun')) {
            changeWeapon(num, 'longGun', longGun);
            return;
        }
        if (square.hasClass('shortKnife')) {
            changeWeapon(num, 'shortKnife', shortKnife);
            return;
        }
    }
}