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
    for (var i = -1 * width / sideLength / 2; i < width / sideLength / 2; i++) {
        for (var j = -1 * Math.round(height / triangleHeight / 2); j < Math.round(height / triangleHeight / 2) ; j++) {
            console.debug(i + "/" + j);
            realX = i * sideLength + (j % 2 == 0 ? 0 : sideLength / 2) + xOffset;
            realY = j * triangleHeight + yOffset;
            vertex = R.circle(realX, realY, sideLength / 50).attr({stroke: "#666", fill: '#666'});
            var text = R.text(realX + 3, realY - 3, i + "/" + j);
            text.attr({fill: "#666", 'font-size': sideLength / 7, 'text-anchor': "start"});
            vertex.tX = i;
            vertex.tY = j;
            vertices.push(vertex);

            text = R.text(realX + sideLength / 2, realY - triangleHeight / 5, i + "/" + j);
            text.attr({fill: "#000", 'font-size': sideLength / 6});
            text = R.text(realX + sideLength / 2, realY + triangleHeight / 5, i + "/" + j);
            text.attr({fill: "#000", 'font-size': sideLength / 6});
            faces.push(R.path(["M", realX, realY, 
                        "L", realX + sideLength, realY, 
                        "L", realX + sideLength / 2, realY - triangleHeight, 
                        "L", realX, realY, 
                        "z"]));
            faces.push(R.path(["M", realX, realY, 
                        "L", realX + sideLength, realY, 
                        "L", realX + sideLength / 2, realY + triangleHeight, 
                        "L", realX, realY, 
                        "z"]));
        };
    };
    faces.attr({cursor: "pointer", stroke: "#666", 'stroke-opacity': .3, 'stroke-width': .3});
};
