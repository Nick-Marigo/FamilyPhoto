'use strict';

const buttonDefaults = {
    buttonColor: '#999999',
    buttonColorOver: '#cccccc',
}

// Inspired by "Extension functions" from Kotlin; this file adds functions to object prototypes without modifying the prototype's original js code
Phaser.Scene.prototype.createButton = function createButton(text, posX, posY, style, onDown) {
    const buttonTextObj = this.add.text(posX, posY, text, style);

    buttonTextObj.setOrigin(0.5);
    buttonTextObj.setStroke('#FFF', 4);
    buttonTextObj.setInteractive();
    buttonTextObj.setBackgroundColor(buttonDefaults.buttonColor);

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        buttonTextObj.setBackgroundColor(buttonDefaults.buttonColorOver);
    });

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        buttonTextObj.setBackgroundColor(buttonDefaults.buttonColor);
    });

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, onDown, this);

    return buttonTextObj;
};

// Thank you Nathan https://github.com/nathanaltice/Mappy/blob/7714624b30aa1a21b257e6f1508d1b5b8b140ba5/src/Scenes/TiledPlatform.js#L40-L46
Phaser.Scene.prototype.addLayerDebugGraphics = function addLayerDebugGraphics(tiledLayer, tileStyleConfig) {
    // define a render debug so we can see the tilemap's collision bounds
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    tiledLayer.renderDebug(debugGraphics, {
        // color of non-colliding tiles
        tileColor: null,
        // color of colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        // color of colliding face edges
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        // See Phaser.Types.Tilemaps.StyleConfig
        ...tileStyleConfig
    });
};

function flattenTileLayerColumn(x, y, collidableTileLayerArray) {
    for (const layer of collidableTileLayerArray) {
        const tile = layer.getTileAt(x, y);
        if (tile && tile.index > 0) {
            return tile.index;
        }
    }

    return 0;
}

Phaser.Scene.prototype.initializeFinder = function initializeFinder(map, tileset, collidableTileLayerArray) {
    // Adapted from https://www.dynetisgames.com/2018/03/06/pathfinding-easystar-phaser-3/
    var grid = [];
    for (var y = 0; y < map.height; y++) {
        var col = [];
        for (var x = 0; x < map.width; x++) {
            // In each cell we store the ID of the tile, which corresponds
            // to its index in the tileset of the map ("ID" field in Tiled)
            col.push(flattenTileLayerColumn(x, y, collidableTileLayerArray));
        }
        grid.push(col);
    }

    finder.setGrid(grid);

    // Setup finder rules
    const acceptableTiles = [ 0 ]; // 0 is "null" tile

    for (let index = tileset.firstgid; index <= tileset.total; index++) {
        const tile = tileset.getTileProperties(index);
        // console.log(index, tile);
        if (!tile.collides) {
            acceptableTiles.push(index);
        }
    }
    // console.log(acceptableTiles);
    finder.setAcceptableTiles(acceptableTiles);
};
