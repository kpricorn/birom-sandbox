function uvw_to_xy(h, u, v, w) {
    var xu = Math.cos(Math.PI / 6) * u * h;
    var yu = Math.cos(Math.PI / 3) * u * h;
    console.debug(xu + "/" + yu);
    var xv = 0;
    var yv = -1 * v * h;
    console.debug(xv + "/" + yv);
    var xw = -1 * Math.cos(Math.PI / 6) * w * h;
    var yw = Math.cos(Math.PI / 3) * w * h;
    console.debug(xw + "/" + yw);
    var x = xu + xv + xw;
    var y = yu + yv + yw;
    return [-1 * x, -1 * y];
}

window.onload = function () {
    var width = 800;
    var height = 600;
    var R = Raphael("paper", width, height);

    var sideLength = 10;
    var triangleHeight = Math.sqrt(3) * sideLength / 2;
    var xOffset = width / 2;
    var yOffset = height / 2;
    var upright = false;
    var totalCoordinates = 0;
    var validCoordinates = 0;
    for (var u = -9; u <= 9; u++) {
        for (var v = -9; v <= 9; v++) {
            for (var w = -9; w <= 9; w++) {
                totalCoordinates++;
                // check sectors, not all combos are valid
                if (
                        u > 0 && v > 0 && w > 0
                        || u < 0 && v < 0 && w < 0
                        || u < 0 && v < 0 
                        || u < 0 && w < 0
                        || v < 0 && w < 0
                        || u > 0 && v > 0 
                        || u > 0 && w > 0
                        || v > 0 && w > 0
                    ) {
                    continue;
                }
                validCoordinates++;
                console.debug("########################################");
                console.debug(u + "/" + v + "/" + w);
                var path;
                var coord = uvw_to_xy(triangleHeight, u, v, w);
                var x = coord[0] + xOffset;
                var y = coord[1] + yOffset;
                console.debug(x + "/" + y);
                var c = R.circle(x, y, 1);
                c.attr({fill: 'red', stroke: 'none'});
                upright = u + v + w % 2 == 0;
                var apex;
                if (upright) {
                    path = [
                        "M", x, y + v * triangleHeight,
                        "L", x + sideLength / 2, y + v * triangleHeight + triangleHeight,
                        "L", x - sideLength / 2, y + v * triangleHeight + triangleHeight,
                        "Z"];
                    apex = Math.round(x) + "/" + Math.round(y + v * triangleHeight);
                } else {
                    path = [
                        "M", x, y + v * triangleHeight + triangleHeight,
                        "L", x + sideLength / 2, y + v * triangleHeight,
                        "L", x - sideLength / 2, y + v * triangleHeight,
                        "Z"];
                    apex = Math.round(x) + "/" + Math.round(y + v * triangleHeight + triangleHeight);
                }
                //var triangle = R.path(path);
                var uvw = R.text(
                        x + 4, y, u + "/" + v + "/" + w);
                //var xy = R.text(
                //        x,
                //        y + v * triangleHeight + triangleHeight * xyYOffset,
                //        apex);
                uvw.attr({fill: "white", 'font-size': 3, 'text-anchor': "start"});
                //xy.attr({fill: "white", 'font-size': sideLength / 8, 'text-anchor': "middle"});
            };
        };
    };
    console.debug("Valid: " + validCoordinates + " of " + totalCoordinates);
};
