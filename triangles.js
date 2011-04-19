function uvw_to_xy(s, u, v, w) {
    var upright = (u + v + w) % 2 == 0;
    var h = Math.sqrt(3) * s / 2;

    var xu = 0;
    var y = u * h + (upright ? h / 3 : 2 * h / 3);
    var xv = Math.sin(5 * Math.PI / 6) * v * s;
    var xw = Math.sin(Math.PI / 6) * w * s;
    var x = xu + xv + xw;
    return [x, -1 * y];
}

window.onload = function () {
    var width = 800;
    var height = 600;
    var R = Raphael("paper", width, height);

    var sideLength = 40;
    var triangleHeight = Math.sqrt(3) * sideLength / 2;
    var xOffset = width / 2;
    var yOffset = height / 2;
    var totalCoordinates = 0;
    var validCoordinates = 0;
    var vertices = R.set();
    var coordinates = R.set();
    var faces = R.set();
    for (var u = -9; u <= 9; u++) {
        for (var v = -9; v <= 9; v++) {
            for (var w = -9; w <= 9; w++) {
                totalCoordinates++;
                // check sectors, not all combos are valid
                var valid = u == w - v || u + 1 == w - v;
                if (!valid) {
                    continue;
                }
                console.log("✓: " + u + "/" + v + "/" + w);
                validCoordinates++;
                var path;
                var coord = uvw_to_xy(sideLength, u, v, w);
                var x = coord[0] + xOffset;
                var y = coord[1] + yOffset;
                var c = R.circle(x, y, 1);
                c.attr({fill: 'red', stroke: 'none'});
                vertices.push(c);
                upright = (u + v + w) % 2 == 0;
                var apex;
                if (upright) {
                    path = [
                        "M", x, y - 2 * triangleHeight / 3,
                        "L", x + sideLength / 2, y + triangleHeight / 3,
                        "L", x - sideLength / 2, y + triangleHeight / 3,
                        "Z"];
                    apex = Math.round(x) + "/" + Math.round(y + v * triangleHeight);
                } else {
                    path = [
                        "M", x, y + 2 * triangleHeight / 3,
                        "L", x + sideLength / 2, y - triangleHeight / 3,
                        "L", x - sideLength / 2, y - triangleHeight / 3,
                        "Z"];
                    apex = Math.round(x) + "/" + Math.round(y + v * triangleHeight + triangleHeight);
                }
                var triangle = R.path(path);
                faces.push(triangle);
                var uvw = R.text(
                        x, y + (upright?5:-5), u + "/" + v + "/" + w);
                coordinates.push(uvw);
                //var xy = R.text(
                //        x,
                //        y + v * triangleHeight + triangleHeight * xyYOffset,
                //        apex);
                uvw.attr({fill: "white", 'font-size': 5, 'text-anchor': "middle"});
                //xy.attr({fill: "white", 'font-size': sideLength / 8, 'text-anchor': "middle"});
            };
        };
    };
    console.log("✓ total: " + validCoordinates);
    faces.attr({'stroke-width': .3});
    faces.toBack();
};
