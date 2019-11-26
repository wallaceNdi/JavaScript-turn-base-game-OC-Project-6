/*--------------------------------------------------------------------------------------------
loads everything needed to make the game
--------------------------------------------------------------------------------------------*/
function loadGame() {
    game.createBoard();
    for (let i = 0; i < numObstacles; i += 1) {
        game.obstacles('obstacle');
    }

    shortKnife.add();
    longGun.add();
    pistleGun.add();
    shortGun.add();
    handBoom.add();
    player1.add();
    player2.add();
    combat1.add();
    combat2.add();
    combat3.add();
    combat4.add();
    shield.add();
    setPlayerData('#player-1', player1);
    setPlayerData('#player-2', player2);
    $('.player1').addClass('active');
}