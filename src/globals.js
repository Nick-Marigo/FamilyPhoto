function canvasX(fractX) {
    return game.config.width * (fractX ?? 1.0);
}

function canvasY(fractY) {
    return game.config.height * (fractY ?? 1.0);
}

function canvasPos(fractX, fractY) {
    if (fractY == null) {
        fractY = fractX;
    }

    return [canvasX(fractX), canvasY(fractY)]
}
