var sideLength = 40;
var width = 600;
var height = 600;
var xOffset = width / 2;
var yOffset = height / 2;
var fieldSize = 5;

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
    var cos30 = Math.cos(Math.PI / 6);
    var sin30 = Math.sin(Math.PI / 6);
    var r = Math.sqrt(3) * s / 6;
    var R = Math.sqrt(3) * s / 3;
    var h = Math.sqrt(3) * s / 2;
    console.debug("r: " + r + ", R: " + R + ", h: " + h);

    var u = -1 * Math.floor((y + R) / h);
    var v = Math.floor((Math.cos(Math.PI / 6 - Math.atan(x/y)) * 
                Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + r) / h);
//    var w = x * (1 - sin30) / (R * sin30 * cos30);
    var w = 0;
    return [u, v, w];
}

jQuery(document).ready(function(){
   $(document).mousemove(function(e){
       var x = e.pageX - width / 2;
       var y = e.pageY - height / 2;
       var c = xy_to_uvw(sideLength, x, y);
      $('#tracker').html(x +', '+ y + ' [' + c[0] + ', ' + c[1] + ', ' + c[2] + ']');
   }); 
})

$(document).ready(function () {
    var startTime = new Date();
    var paper = Raphael("paper", width, height);

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
                var triangle = paper.path(path);
                faces.push(triangle);
                var uvw = paper.text(
                        x, y + (upright?sideLength/6:-sideLength/6), u + "/" + v + "/" + w);
                coordinates.push(uvw);
                uvw.attr({fill: "white", 'font-size': sideLength / 6, 'text-anchor': "middle"});
            });
        };
    };
    console.log("✓ total: " + validCoordinates);
    faces.attr({'stroke-width': .3});
    faces.toBack();
    //faces.hide();
    console.log("grid loaded");
});
