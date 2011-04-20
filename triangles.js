function uvw_to_xy(s, u, v, w) {
    var r = Math.sqrt(3) * s / 6;
    var R = Math.sqrt(3) * s / 3;
    var h = Math.sqrt(3) * s / 2;
    var xu = 0;
    var yu = u * R;
    var xv = v * Math.cos(Math.PI / 6) * R;
    var yv = -1 * v * Math.sin(Math.PI / 6) * R;
    var xw = w * Math.cos(Math.PI / 6) * R;
    var yw = w * Math.sin(Math.PI / 6) * R;
    var x = xu + xv + xw;
    var y = yu + yv + yw;
    return [x, -1 * y];
}

function xy_to_uvw(s, u, v, w) {
    var upright = (u + v + w) % 2 == 0;
    var h = Math.sqrt(3) * s / 2;

    var xu = 0;
    var y = u * h + (upright ? h / 3 : 2 * h / 3);
    var xv = Math.sin(5 * Math.PI / 6) * v * s;
    var xw = Math.sin(Math.PI / 6) * w * s;
    var x = xu + xv + xw;
    return [x, -1 * y];
}

$(document).ready(function () {
    var startTime = new Date();
    var width = 400;
    var height = 400;
    var paper = Raphael("paper", width, height);

    var sideLength = 40;
    // radius of the circumscribed circle
    var r = Math.sqrt(3) * sideLength / 6;
    var R = Math.sqrt(3) * sideLength / 3;
    var h = Math.sqrt(3) * sideLength / 2;
    var xOffset = width / 2;
    var yOffset = height / 2;
    var totalCoordinates = 0;
    var validCoordinates = 0;
    var vertices = paper.set();
    var coordinates = paper.set();
    var faces = paper.set();
    for (var v = -9; v <= 9; v++) {
        for (var w = -9; w <= 9; w++) {
            $.each([w - v, w - v - 1], function() {
                var u = this;
                totalCoordinates++;
                // check sectors, not all combos are valid
                console.log("✓: " + u + "/" + v + "/" + w);
                validCoordinates++;
                var path;
                var coord = uvw_to_xy(sideLength, u, v, w);
                var x = coord[0] + xOffset;
                var y = coord[1] + yOffset;
                var c = paper.circle(x, y, 1);
                c.attr({fill: 'red', stroke: 'none'});
                vertices.push(c);
                upright = (u + v + w) % 2 == 0;
                var apex;
                if (upright) {
                    path = [
                        "M", x, y - R,
                        "L", x + sideLength / 2, y + r,
                        "L", x - sideLength / 2, y + r,
                        "Z"];
                    apex = Math.round(x) + "/" + Math.round(y + v * r);
                } else {
                    path = [
                        "M", x, y + R,
                        "L", x + sideLength / 2, y - r,
                        "L", x - sideLength / 2, y - r,
                        "Z"];
                    apex = Math.round(x) + "/" + Math.round(y + v * r + r);
                }
                var triangle = paper.path(path);
                faces.push(triangle);
                var uvw = paper.text(
                        x, y + (upright?5:-5), u + "/" + v + "/" + w);
                coordinates.push(uvw);
                uvw.attr({fill: "white", 'font-size': 5, 'text-anchor': "middle"});
            });
        };
    };
    console.log("✓ total: " + validCoordinates);
    faces.attr({'stroke-width': .3});
    faces.toBack();
    //faces.hide();
    console.log("grid loaded");
});
