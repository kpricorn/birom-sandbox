function uvw_to_xy(h, u, v, w) {
    var xu = Math.cos(Math.PI / 6) * u * h - h;
    var yu = Math.cos(Math.PI / 3) * u * h - h;
    var xv = 0;
    var yv = -1 * v * h;
    var xw = -1 * Math.cos(Math.PI / 6) * w * h - h;
    var yw = Math.cos(Math.PI / 3) * w * h - h;
    var x = xu + xv + xw;
    var y = yu + yv + yw;
    upright = (u + v + w) % 2 == 0;
    return [-1 * x, -1 * y];
}

window.onload = function () {
    var width = 800;
    var height = 600;
    var R = Raphael("paper", width, height);

    var sideLength = 20;
    var triangleHeight = Math.sqrt(3) * sideLength / 2;
    var xOffset = width / 2;
    var yOffset = height / 2;
    var totalCoordinates = 0;
    var validCoordinates = 0;
    var vertices = R.set();
    var coordinates = R.set();
    var faces = R.set();
    for (var u = -2; u <= 2; u++) {
        for (var v = -2; v <= 2; v++) {
            for (var w = -2; w <= 2; w++) {
                totalCoordinates++;
                // check sectors, not all combos are valid
                var valid = u == w - v || u + 1 == w - v;
                if (!valid) {
                    continue;
                }
                console.log("✓: " + u + "/" + v + "/" + w);
                validCoordinates++;
                var path;
                var coord = uvw_to_xy(triangleHeight, u, v, w);
                var x = coord[0] + xOffset;
                var y = coord[1] + yOffset;
                var c = R.circle(x, y, 1);
                c.attr({fill: 'red', stroke: 'none'});
                vertices.push(c);
                upright = (u + v + w) % 2 == 0;
                var apex;
                var color = "black";
                if (upright) {
                    path = [
                        "M", x, y - triangleHeight,
                        "L", x + sideLength / 2, y,
                        "L", x - sideLength / 2, y,
                        "Z"];
                    apex = Math.round(x) + "/" + Math.round(y + v * triangleHeight);
                } else {
                    path = [
                        "M", x, y,
                        "L", x + sideLength / 2, y - triangleHeight,
                        "L", x - sideLength / 2, y - triangleHeight,
                        "Z"];
                    apex = Math.round(x) + "/" + Math.round(y + v * triangleHeight + triangleHeight);
                    color = "white";
                }
                //var triangle = R.path(path);
                //faces.push(triangle);
                //triangle.attr({fill: color});
                var uvw = R.text(
                        x + 4, y, u + "/" + v + "/" + w);
                coordinates.push(uvw);
                //var xy = R.text(
                //        x,
                //        y + v * triangleHeight + triangleHeight * xyYOffset,
                //        apex);
                uvw.attr({fill: "black", 'font-size': 7, 'text-anchor': "start"});
                //xy.attr({fill: "white", 'font-size': sideLength / 8, 'text-anchor': "middle"});
            };
        };
    };
    console.log("✓ total: " + validCoordinates);
    faces.toBack();
};
