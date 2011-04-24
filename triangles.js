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

function xy_to_uvw(s, x, y) {
    var r = Math.sqrt(3) * s / 6;
    var R = Math.sqrt(3) * s / 3;
    var h = Math.sqrt(3) * s / 2;

    var u = -1 * Math.floor((y + R) / h);

    var v = (y > 0 ? 1 : -1) * Math.floor((Math.cos(Math.PI / 3 - Math.atan(x/y)) * 
                Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + (y > 0 ? r : R)) / h);

    var w = (y > 0 ? 1 : -1) * Math.floor((Math.cos(2 * Math.PI / 3 - Math.atan(x/y)) *
                Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + (y > 0 ? R : r)) / h);

    return [u, v, w];
}

$(document).ready(function () {
    var sideLength = 20;
    var width = $('#paper').width();
    var height = $('#paper').height();
    var xOffset = width / 2;
    var yOffset = height / 2;
    var fieldSize = 10;
    var uS = [], vS = [], wS = [];
    $(document).mousemove(function(e){
        var x = e.pageX - xOffset;
        var y = e.pageY - yOffset;
        faces.attr({fill: 'none'});
        var c = xy_to_uvw(sideLength, x, y);
        var uSet = uS[c[0]];
        if (uSet != undefined) {
            uSet.attr({fill: 'red'});
        }
        var vSet = vS[c[1]];
        if (vSet != undefined) {
            vSet.attr({fill: 'blue'});
        }
        var wSet = wS[c[2]];
        if (wSet != undefined) {
            wSet.attr({fill: 'green'});
        }
        $('#xy').html(x +', '+ y);
        $('#uvw').html(c[0] + ', ' + c[1] + ', ' + c[2]);
    }); 

    var startTime = new Date();
    var paper = Raphael("paper", "100%", "100%");

    // radius of the circumscribed circle
    var r = Math.sqrt(3) * sideLength / 6;
    var R = Math.sqrt(3) * sideLength / 3;
    var h = Math.sqrt(3) * sideLength / 2;
    var totalCoordinates = 0;
    var validCoordinates = 0;
    var vertices = paper.set();
    var coordinates = paper.set();
    var faces = paper.set();
    for (var v = -1 * fieldSize; v <= fieldSize; v++) {
        for (var w = -1 * fieldSize; w <= fieldSize; w++) {
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
                uS[u] = uS[u] || paper.set();
                vS[v] = vS[v] || paper.set();
                wS[w] = wS[w] || paper.set();
                var uSet = uS[u];
                var vSet = vS[v];
                var wSet = wS[w];

                var triangle = paper.path(path);
                uSet.push(triangle);
                vSet.push(triangle);
                wSet.push(triangle);

                faces.push(triangle);
                var uvw = paper.text(
                        x, y + (upright?sideLength/6:-sideLength/6), u + "/" + v + "/" + w);
                coordinates.push(uvw);
                uvw.attr({fill: "white", 'font-size': sideLength / 6, 'text-anchor': "middle"});
            });
        };
    };
    faces.attr({'stroke-width': .3});
    faces.toBack();
    //faces.hide();
});
