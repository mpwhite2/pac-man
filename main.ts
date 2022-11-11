namespace SpriteKind {
    export const Sfood = SpriteKind.create()
    export const Door = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Sfood, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    Pellets += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite4, otherSprite4) {
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(otherSprite4, assets.tile`transparency16`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Door, function (sprite2, otherSprite2) {
    if (otherSprite2 == mySprite) {
        tiles.placeOnTile(Pac, tiles.getTileLocation(18, 9))
    } else {
        tiles.placeOnTile(Pac, tiles.getTileLocation(1, 9))
    }
})
info.onLifeZero(function () {
    game.over(false)
})
function EnemyMove (EnemySprite: Sprite) {
    if (EnemySprite.isHittingTile(CollisionDirection.Left) || EnemySprite.isHittingTile(CollisionDirection.Top) || (EnemySprite.isHittingTile(CollisionDirection.Right) || EnemySprite.isHittingTile(CollisionDirection.Bottom))) {
        if (Math.percentChance(25)) {
            EnemySprite.vy = -100
        } else if (Math.percentChance(33.333333)) {
            EnemySprite.vy = 100
        } else if (Math.percentChance(50)) {
            EnemySprite.vx = -100
        } else {
            EnemySprite.vx = 100
        }
    }
}
function StartGame () {
    for (let index = 0; index < 15; index++) {
        _sfood = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Sfood)
        tiles.placeOnRandomTile(_sfood, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite3, otherSprite3) {
    _Food = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . 3 3 3 3 . . . . . . 
        . . . . . . 3 3 3 3 . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnRandomTile(_Food, assets.tile`transparency16`)
    otherSprite3.destroy()
    info.changeScoreBy(100)
    Gamestate = 1
    timer.after(10000, function () {
        Gamestate = 0
    })
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.setVelocity(0 - sprite.vx / 10, 0 - sprite.vy / 10)
})
let projectile4: Sprite = null
let projectile3: Sprite = null
let projectile2: Sprite = null
let projectile: Sprite = null
let _sfood: Sprite = null
let mySprite: Sprite = null
let _Food: Sprite = null
let Loc: tiles.Location = null
let Gamestate = 0
let Pac: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
Pac = sprites.create(assets.image`PAC-man`, SpriteKind.Player)
controller.moveSprite(Pac, 100, 100)
tiles.placeOnTile(Pac, tiles.getTileLocation(18, 9))
scene.cameraFollowSprite(Pac)
let Foodspots = tiles.getTilesByType(assets.tile`transparency16`)
Gamestate = 0
info.setScore(0)
let Pellets = 50
StartGame()
let Enemy1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 3 3 3 3 . . . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . 3 3 3 3 3 3 3 3 . . . . 
    . . . 3 1 1 3 3 3 1 1 3 3 . . . 
    . . . 3 f 1 3 3 3 f 1 3 3 . . . 
    . . . 3 3 3 3 3 3 3 3 3 3 . . . 
    . . . 3 3 3 3 3 3 3 3 3 3 . . . 
    . . . 3 3 3 3 3 3 3 3 3 3 . . . 
    . . . 3 3 3 3 3 3 3 3 3 3 . . . 
    . . . 3 3 3 3 3 3 3 3 3 3 . . . 
    . . . 3 3 3 3 3 3 3 3 3 3 . . . 
    . . . 3 3 3 3 3 3 3 3 3 3 . . . 
    . . . 3 3 3 3 3 3 3 3 3 3 . . . 
    . . . . 3 . 3 . 3 . 3 . 3 . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy)
Enemy1.vx = 100
let Enemy2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 9 9 9 9 . . . . . . 
    . . . . . 9 9 9 9 9 9 . . . . . 
    . . . . 9 9 9 9 9 9 9 9 . . . . 
    . . . 9 9 1 1 9 9 9 1 1 9 . . . 
    . . . 9 9 1 f 9 9 9 1 f 9 . . . 
    . . . 9 9 9 9 9 9 9 9 9 9 . . . 
    . . . 9 9 9 9 9 9 9 9 9 9 . . . 
    . . . 9 9 9 9 9 9 9 9 9 9 . . . 
    . . . 9 9 9 9 9 9 9 9 9 9 . . . 
    . . . 9 9 9 9 9 9 9 9 9 9 . . . 
    . . . 9 9 9 9 9 9 9 9 9 9 . . . 
    . . . 9 9 9 9 9 9 9 9 9 9 . . . 
    . . . 9 9 9 9 9 9 9 9 9 9 . . . 
    . . . . 9 . 9 . 9 . 9 . 9 . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy)
Enemy2.vx = -100
let Enemy3 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . . 4 4 4 4 4 4 . . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . 4 1 1 4 4 4 1 1 4 4 . . . 
    . . . 4 f 1 4 4 4 f 1 4 4 . . . 
    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
    . . . . 4 . 4 . 4 . 4 . 4 . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy)
Enemy3.vy = 100
let Enemy4 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 2 1 1 2 2 2 1 1 2 . . . 
    . . . 2 2 1 f 2 2 2 1 f 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . . 2 . 2 . 2 . 2 . 2 . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy)
Enemy4.vy = -100
tiles.placeOnTile(Enemy1, tiles.getTileLocation(9, 9))
tiles.placeOnTile(Enemy2, tiles.getTileLocation(10, 9))
tiles.placeOnTile(Enemy3, tiles.getTileLocation(9, 10))
tiles.placeOnTile(Enemy4, tiles.getTileLocation(10, 10))
for (let index = 0; index < 3; index++) {
    Loc = Foodspots._pickRandom()
    _Food = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . 3 3 3 3 . . . . . . 
        . . . . . . 3 3 3 3 . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnTile(_Food, Loc)
}
mySprite = sprites.create(img`
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f 5 5 f f f f f f f 
    f f f f f 5 5 5 5 f f f f f f f 
    f f f 5 5 5 5 5 5 5 5 5 5 5 5 5 
    f f f 5 5 5 5 5 5 5 5 5 5 5 5 5 
    f f f f f 5 5 5 5 f f f f f f f 
    f f f f f f f 5 5 f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    `, SpriteKind.Door)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 9))
let mySprite2 = sprites.create(img`
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f 5 5 f f f f f f f 
    f f f f f f f 5 5 5 5 f f f f f 
    5 5 5 5 5 5 5 5 5 5 5 5 5 f f f 
    5 5 5 5 5 5 5 5 5 5 5 5 5 f f f 
    f f f f f f f 5 5 5 5 f f f f f 
    f f f f f f f 5 5 f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    `, SpriteKind.Door)
tiles.placeOnTile(mySprite2, tiles.getTileLocation(19, 9))
info.setLife(3)
game.onUpdateInterval(10, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Pac, 0, 1000)
    projectile.setFlag(SpriteFlag.Invisible, true)
    projectile.setFlag(SpriteFlag.DestroyOnWall, true)
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Pac, 0, -1000)
    projectile2.setFlag(SpriteFlag.Invisible, true)
    projectile2.setFlag(SpriteFlag.DestroyOnWall, true)
    projectile3 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Pac, 1000, 0)
    projectile3.setFlag(SpriteFlag.Invisible, true)
    projectile3.setFlag(SpriteFlag.DestroyOnWall, true)
    projectile4 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Pac, -1000, 0)
    projectile4.setFlag(SpriteFlag.Invisible, true)
    projectile4.setFlag(SpriteFlag.DestroyOnWall, true)
})
forever(function () {
    characterAnimations.loopFrames(
    Pac,
    [img`
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
        5 5 5 5 5 5 5 5 5 . . . . . . . 
        5 5 5 5 5 5 5 5 5 . . . . . . . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        `,img`
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 . . . . 
        5 5 5 5 5 5 5 5 5 5 5 5 . . . . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        `],
    250,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Pac,
    [img`
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . . . 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . . . . . . . 5 5 5 5 5 5 5 5 5 
        . . . . . . . 5 5 5 5 5 5 5 5 5 
        . . . 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        `,img`
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . . . . 5 5 5 5 5 5 5 5 5 5 5 5 
        . . . . 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Pac,
    [img`
        . . . . . 5 . . . . 5 . . . . . 
        . . . 5 5 5 . . . . 5 5 5 . . . 
        . . 5 5 5 5 . . . . 5 5 5 5 . . 
        . 5 5 5 5 5 5 . . 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 . . 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 . . 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 . . 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        `,img`
        . . . . . 5 5 . . 5 5 . . . . . 
        . . . 5 5 5 5 . . 5 5 5 5 . . . 
        . . 5 5 5 5 5 . . 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 . . 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        `],
    250,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Pac,
    [img`
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 . . 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 . . 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 . . 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 . . 5 5 5 5 5 5 . 
        . . 5 5 5 5 . . . . 5 5 5 5 . . 
        . . . 5 5 5 . . . . 5 5 5 . . . 
        . . . . . 5 . . . . 5 . . . . . 
        `,img`
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 . . 5 5 5 5 5 5 . 
        . . 5 5 5 5 5 . . 5 5 5 5 5 . . 
        . . . 5 5 5 5 . . 5 5 5 5 . . . 
        . . . . . 5 5 . . 5 5 . . . . . 
        `],
    250,
    characterAnimations.rule(Predicate.MovingDown)
    )
    if (Pellets == 0) {
        Pellets = 50
        StartGame()
    }
    EnemyMove(Enemy1)
    EnemyMove(Enemy2)
    EnemyMove(Enemy3)
    EnemyMove(Enemy4)
})
