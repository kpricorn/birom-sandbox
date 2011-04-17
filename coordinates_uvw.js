window.onload = function () {
    var width = 800;
    var height = 600;
    var R = Raphael("paper", width, height);

    var current = null;
    var sideLength = 40;
    var triangleHeight = Math.sqrt(3) * sideLength / 2;
    var vertices = R.set();
    var faces = R.set();
    var xOffset = width / 2;
    var yOffset = height / 2;

    // --> v
    for (var i = -10; i < 10; i++) {
        var path;
        var uvwYOffset = i % 2 == 0 ? .8 : .2;
        var xyYOffset = i % 2 == 0 ? 1/3 : 2/3;
        var apex;
        if (i % 2 == 0) {
            path = [
                "M", xOffset, yOffset + i * triangleHeight,
                "L", xOffset + sideLength / 2, yOffset + i * triangleHeight + triangleHeight,
                "L", xOffset - sideLength / 2, yOffset + i * triangleHeight + triangleHeight,
                "Z"];
            apex = Math.round(xOffset) + "/" + Math.round(yOffset + i * triangleHeight);
        } else {
            path = [
                "M", xOffset, yOffset + i * triangleHeight + triangleHeight,
                "L", xOffset + sideLength / 2, yOffset + i * triangleHeight,
                "L", xOffset - sideLength / 2, yOffset + i * triangleHeight,
                "Z"];
            apex = Math.round(xOffset) + "/" + Math.round(yOffset + i * triangleHeight + triangleHeight);
        }
        var triangle = R.path(path);
        var uvw = R.text(
                xOffset,
                yOffset + triangleHeight * uvwYOffset + i * triangleHeight,
                "0/" + i + "/0");
        var xy = R.text(
                xOffset,
                yOffset + i * triangleHeight + triangleHeight * xyYOffset,
                apex);
        uvw.attr({fill: "white", 'font-size': sideLength / 4, 'text-anchor': "middle"});
        xy.attr({fill: "white", 'font-size': sideLength / 8, 'text-anchor': "middle"});
    };
};
