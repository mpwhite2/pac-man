@namespace
class SpriteKind:
    Sfood = SpriteKind.create()
    Door = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    global Pellets
    otherSprite.destroy()
    info.change_score_by(1)
    Pellets += -1
sprites.on_overlap(SpriteKind.player, SpriteKind.Sfood, on_on_overlap)

def on_on_overlap2(sprite4, otherSprite4):
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

def on_on_overlap3(sprite2, otherSprite2):
    if otherSprite2 == mySprite:
        tiles.place_on_tile(Pac, tiles.get_tile_location(18, 9))
    else:
        tiles.place_on_tile(Pac, tiles.get_tile_location(1, 9))
sprites.on_overlap(SpriteKind.player, SpriteKind.Door, on_on_overlap3)

def EnemyMove(EnemySprite: Sprite):
    if EnemySprite.is_hitting_tile(CollisionDirection.LEFT) or EnemySprite.is_hitting_tile(CollisionDirection.TOP) or (EnemySprite.is_hitting_tile(CollisionDirection.RIGHT) or EnemySprite.is_hitting_tile(CollisionDirection.BOTTOM)):
        if Math.percent_chance(25):
            EnemySprite.vy = -100
        elif Math.percent_chance(33.333333):
            EnemySprite.vy = 100
        elif Math.percent_chance(50):
            EnemySprite.vx = -100
        else:
            EnemySprite.vx = 100
def StartGame():
    global _sfood
    for index in range(100):
        _sfood = sprites.create(img("""
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
            """),
            SpriteKind.Sfood)
        tiles.place_on_random_tile(_sfood, assets.tile("""
            transparency16
        """))

def on_on_overlap4(sprite3, otherSprite3):
    global _Food, Gamestate
    _Food = sprites.create(img("""
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
        """),
        SpriteKind.food)
    tiles.place_on_random_tile(_Food, assets.tile("""
        transparency16
    """))
    otherSprite3.destroy()
    info.change_score_by(100)
    Gamestate = 1
    
    def on_after():
        global Gamestate
        Gamestate = 0
    timer.after(10000, on_after)
    
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap4)

_sfood: Sprite = None
mySprite: Sprite = None
_Food: Sprite = None
Loc: tiles.Location = None
Gamestate = 0
Pac: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
"""))
Pac = sprites.create(assets.image("""
    PAC-man
"""), SpriteKind.player)
controller.move_sprite(Pac, 100, 100)
tiles.place_on_tile(Pac, tiles.get_tile_location(18, 9))
scene.camera_follow_sprite(Pac)
Foodspots = tiles.get_tiles_by_type(assets.tile("""
    transparency16
"""))
Gamestate = 0
info.set_score(0)
Pellets = 50
StartGame()
Enemy1 = sprites.create(img("""
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
    """),
    SpriteKind.enemy)
Enemy1.vx = 100
Enemy2 = sprites.create(img("""
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
    """),
    SpriteKind.enemy)
Enemy2.vx = -100
Enemy3 = sprites.create(img("""
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
    """),
    SpriteKind.enemy)
Enemy3.vy = 100
Enemy4 = sprites.create(img("""
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
    """),
    SpriteKind.enemy)
Enemy4.vy = -100
tiles.place_on_tile(Enemy1, tiles.get_tile_location(9, 9))
tiles.place_on_tile(Enemy2, tiles.get_tile_location(10, 9))
tiles.place_on_tile(Enemy3, tiles.get_tile_location(9, 10))
tiles.place_on_tile(Enemy4, tiles.get_tile_location(10, 10))
for index2 in range(3):
    Loc = Foodspots._pick_random()
    _Food = sprites.create(img("""
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
        """),
        SpriteKind.food)
    tiles.place_on_tile(_Food, Loc)
mySprite = sprites.create(img("""
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
    """),
    SpriteKind.Door)
tiles.place_on_tile(mySprite, tiles.get_tile_location(0, 9))
mySprite2 = sprites.create(img("""
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
    """),
    SpriteKind.Door)
tiles.place_on_tile(mySprite2, tiles.get_tile_location(19, 9))

def on_forever():
    global Pellets
    characterAnimations.loop_frames(Pac,
        [img("""
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
            """),
            img("""
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
            """)],
        250,
        characterAnimations.rule(Predicate.MOVING_RIGHT))
    characterAnimations.loop_frames(Pac,
        [img("""
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
            """),
            img("""
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
            """)],
        200,
        characterAnimations.rule(Predicate.MOVING_LEFT))
    characterAnimations.loop_frames(Pac,
        [img("""
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
            """),
            img("""
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
            """)],
        250,
        characterAnimations.rule(Predicate.MOVING_UP))
    characterAnimations.loop_frames(Pac,
        [img("""
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
            """),
            img("""
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
            """)],
        250,
        characterAnimations.rule(Predicate.MOVING_DOWN))
    if Pellets == 0:
        Pellets = 50
        StartGame()
    EnemyMove(Enemy1)
    EnemyMove(Enemy2)
    EnemyMove(Enemy3)
    EnemyMove(Enemy4)
forever(on_forever)
