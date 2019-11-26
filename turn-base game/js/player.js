'use strict';
const boardSize = 89;
const numObstacles = 10;
let squares = [];
let maxMoves = 3;
let newPos;
let playerActive;
let playerNotActive;
let playerActiveDiv;
let playerNotActiveDiv;
let player1Active = true;
let move = true;
let attacked = false;
let defended = false;
let player1Defended = false;
let player2Defended = false;
let hover = false;
const attackButton = $('.attack');
const defendButton = $('.defend');
const startButton = $('#start');
const playAgainButton = $('#play-again');
const boardGameDiv = $('#board-game');
const gameOverDiv = $('#game-over');
const startGameDiv = $('#start-game');
const playerContainerDiv = $('.player-container');
const body = $('body');
const messageDiv = $('.message');
const playerNameDiv = $('.player-name');
const winnerDiv = $('.winner');
const player1AvatarDiv = $('#player-1-avatar');
const player2AvatarDiv = $('#player-2-avatar');
let computerPlay = false;
const alertMove = 'That square is not a valid move. You can only move a max of 3 spaces vertical or horizontal You cant land on a tree or jump over it. Is it even your go?';
const alertPlayer = 'you cant land on a player or pass over a player';
const alertAttackDefend ='you must attack or defend';
const alertMustMove = 'you must move';

'use strict';

/*--------------------------------------------------------------------------------------------
creates a Player class
creates a add method on the prototype Player
--------------------------------------------------------------------------------------------*/
function Player(name, score, itemClass, player, weapon, damage) {
    this.name = name;
    this.score = score;
    this.itemClass = itemClass;
    this.player = player;
    this.weapon = weapon;
    this.damage = damage;
}

Player.prototype.add = function () {
    addItem(this.itemClass, this.player);
};
function Activity(active, notActive, attack, win, dead) {
    this.active = active;
    this.notActive = notActive;
    this.attack = attack;
    this.win = win;
    this.dead = dead;
}
/*--------------------------------------------------------------------------------------------
Creates the players
--------------------------------------------------------------------------------------------*/
let player1 = new Player('Player 1', 100, 'player1', 1, 'arrowGun', 10, 'avatar');
let player2 = new Player('Player 2', 100, 'player2', 2, 'arrowGun', 10, 'avatar');
let player1Activity = new Activity('image/player1-active.png', 'image/player1-notactive.png', 'image/player1-attack.png', 'image/player1-win.png', 'image/player1-lost.png');
let player2Activity = new Activity('image/player2-active.png', 'image/player2-notactive.png', 'image/player2-attack.png', 'image/player2-win.png', 'image/player2-lost.png');

/*--------------------------------------------------------------------------------------------
Sets the player Data boxes
--------------------------------------------------------------------------------------------*/
function playerInfos(playerDiv, player, weapon) {
    $(playerDiv + ' .player-name').text(player.name);
    $(playerDiv + ' .score').text(player.score);
    $(playerDiv + ' .gun').removeClass().addClass('gun ' + player.weapon);
    $(playerDiv + ' .weapon-value').text(player.damage);
    player1ActivityDiv.css('backgroundImage', 'url(' + player1Activity.active + ')');
    player2ActivityDiv.css('backgroundImage', 'url(' + player2Activity.notActive + ')');
}
/*--------------------------------------------------------------------------------------------
Creates the alert Message
--------------------------------------------------------------------------------------------*/
function alertMessage(message){
    if(move){
        alert(message);
    }else{
        alert(alertAttackDefend);
    }
}
/*--------------------------------------------------------------------------------------------
on click check if new between old position and new position there is an obstacle
if there is return - dont let player move
check horizontal move between old position and new position to a max number
and check vertical move
if move is possible:
change old position to equal new position remove the player class and add to the square clicked
change players and get their position
check if pass over a weapon and if so leave old weapon and take new weapon
call fight function to see if they can fight
--------------------------------------------------------------------------------------------*/

function movePlayer() {
    //mouseover the square to see if you want to go there
    let boxClass = $('.box');
    boxClass.hover(
        function () {
            hover = true;
            let sqHovered = $(this).attr('boxID');
            newPos = getXYPosition(sqHovered);

            for (let i = Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++) {
                let num = getSquareValue(i, oldPos.y);
                let square = $('.box[boxID = ' + num + ']');
                if (square.hasClass('obstacle')) {
                    return;
                }
                if (player1Active) {
                    if (square.hasClass('player2')) {
                        return;
                    }
                } else {
                    if (square.hasClass('player1')) {
                        return;
                    }
                }
            }
            for (let i = Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++) {
                let num = getSquareValue(oldPos.x, i);
                let square = $('.box[boxID = ' + num + ']');
                if (square.hasClass('obstacle')) {
                    return;
                }
                if (player1Active) {
                    if (square.hasClass('player2')) {
                        return;
                    }
                } else {
                    if (square.hasClass('player1')) {
                        return;
                    }
                }
            }
            if (!attacked) {
                if (newPos.y === oldPos.y && newPos.x <= oldPos.x + maxMoves && newPos.x >= oldPos.x - maxMoves
                    || newPos.x === oldPos.x && newPos.y <= oldPos.y + maxMoves && newPos.y >= oldPos.y - maxMoves) {

                    if (player1Active) {
                        $(this).css('backgroundImage', 'url(' + player1Activity.active + ')');

                    } else {
                        $(this).css('backgroundImage', 'url(' + player2Activity.active + ')');
                       
                    }
                }

            }
        }, function () {
            hover = false;
            $(this).css('backgroundImage', '');
        }
    );

    boxClass.on('click', function () {
        hover = false;
        let sqClicked = $(this).attr('boxID');
        newPos = getXYPosition(sqClicked);

        for (let i = Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++) {
            let num = getSquareValue(i, oldPos.y);
            let square = $('.box[boxID = ' + num + ']');
            if (square.hasClass('obstacle')) {
                alertMessage(alertMove);
                return;
            }
            if (player1Active) {
                if (square.hasClass('player2')) {
                    alertMessage(alertPlayer);
                    return;
                }
            } else {
                if (square.hasClass('player1')) {
                    alertMessage(alertPlayer);
                    return;
                }
            }
        }
        for (let i = Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++) {
            let num = getSquareValue(oldPos.x, i);
            let square = $('.box[boxID = ' + num + ']');
            if (square.hasClass('obstacle')) {
                alertMessage(alertMove);
                return;
            }

            if (player1Active) {
                if (square.hasClass('player2')) {
                    alertMessage(alertPlayer);
                    return;
                }
            } else {
                if (square.hasClass('player1')) {
                    alertMessage(alertPlayer);
                    return;
                }
            }
        }
        if (player1Active) {
            if ($(this).hasClass('player1')){
                alertMessage(alertMustMove);
                return;
            }
        }else{
            if ($(this).hasClass('player2')){
                alertMessage(alertMustMove);
                return;
            }
        }


        if (move) {
            if (newPos.y === oldPos.y && newPos.x <= oldPos.x + maxMoves && newPos.x >= oldPos.x - maxMoves
                || newPos.x === oldPos.x && newPos.y <= oldPos.y + maxMoves && newPos.y >= oldPos.y - maxMoves) {
                for (let i = Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++) {
                    let num = getSquareValue(i, oldPos.y);
                    checkWeapon(num);
                }
                for (let i = Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++) {
                    let num = getSquareValue(oldPos.x, i);
                    checkWeapon(num);
                }
                whoIsActive();
                if (player1Active) {
                    playerPosition = getPosition('.player2');
                    oldPos = getXYPosition(playerPosition);
                    $('.player1').removeClass('player1').removeClass('active');
                    $(this).addClass("player1");
                    $('.player2').addClass('active');
                    fight(newPos, oldPos);
                    player1Active = false;

                }else if(computerPlay){
                    //call function for computers turn.
                    //while squreclaimed is false
                    //if square is not valid return
                    //while square is not claimed claim square
                    //once its claimed change player
                    //to calculate move - if square has weapon take square
                    //else randomly move 3 spaces
                    //set squareclaimed to true
                    player1Active = true;
                }else {
                    playerPosition = getPosition('.player1');
                    oldPos = getXYPosition(playerPosition);
                    $('.player2').removeClass('player2').removeClass('active');
                    $(this).addClass("player2");
                    $('.player1').addClass('active');
                    fight(newPos, oldPos);
                    player1Active = true;
                }
            }
        }
    });
}
/*--------------------------------------------------------------------------------------------
get the player that is active
--------------------------------------------------------------------------------------------*/
function GetPlayerActive(Active, NotActive, ActiveDiv, NotActiveDiv, activeActivity, notActiveActivity) {
    playerActive = Active;
    playerNotActive = NotActive;
    playerActiveDiv = ActiveDiv;
    playerNotActiveDiv = NotActiveDiv;
    $(NotActiveDiv + ' .player-activity').css('backgroundImage', 'url(' + activeActivity + ')');
    $(ActiveDiv + ' .player-activity').css('backgroundImage', 'url(' + notActiveActivity + ')');
}

/*--------------------------------------------------------------------------------------------
if player 1 is active set values else set player 2 values
--------------------------------------------------------------------------------------------*/
function whoIsActive() {
    if (player1Active) {
        GetPlayerActive(player1, player2, '#player-1', '#player-2', player2Activity.active, player1Activity.notActive);
    } else {
        GetPlayerActive(player2, player1, '#player-2', '#player-1', player1Activity.active, player2Activity.notActive);
    }
}