window.onload = function () {
    var width = 800;
    var height = 600;
    var R = Raphael("paper", width, height);

    colorhue = .6 || Math.random(),
    color = "hsb(" + [colorhue, .5, 1] + ")",

    var current = null;
    var sideLength = 40;
    var triangleHeight = Math.sqrt(3) * sideLength / 2;
    var vertices = R.set();
    var faces = R.set();
    for (var i = 0; i < width / sideLength; i++) {
        for (var j = 0; j < height / triangleHeight ; j++) {
            realX = i * sideLength + (j % 2 == 0 ? 0 : sideLength / 2);
            realY = j * triangleHeight;
            vertex = R.circle(realX, realY, sideLength / 50).attr({stroke: "#666", fill: color});
            var text = R.text(realX + 3, realY - 3, i + "/" + j);
            text.attr({fill: "#666", 'font-size': sideLength / 7, 'text-anchor': "start"});
            vertex.tX = i;
            vertex.tY = j;
            vertices.push(vertex);
            var x1 = realX, 
                y1 = realY, 
                x2 = realX + sideLength / 2, 
                y2 = realY + triangleHeight, 
                x3 = realX - sideLength / 2, 
                y3 = realY + triangleHeight,
                x4 = realX + sideLength, 
                y4 = realY;
            text = R.text(realX, realY + triangleHeight / 2 + triangleHeight / 5, i + "/" + j);
            text.attr({fill: "#000", 'font-size': sideLength / 6});
            text = R.text(x2, realY + triangleHeight / 2 - triangleHeight / 5, i + "/" + j);
            text.attr({fill: "#000", 'font-size': sideLength / 6});
            faces.push(R.path(["M", x1, y1, "L", x2, y2, "L", x3, y3, "L", x1, y1, "z"]));
            faces.push(R.path(["M", x1, y1, "L", x4, y4, "L", x2, y2, "L", x1, y1, "z"]));
        };
    };
    faces.attr({cursor: "pointer", stroke: "#666", 'stroke-opacity': .3, 'stroke-width': .3});

    vertices.hover(function() {
        var self = this;
        var x = self.getBBox().x;
        var y = self.getBBox().y;
        var side = "right";
        if (x + frame.getBBox().width > width) {
            side = "left";
        }

        label[0].attr({text: "Triangular Grid Coordinates: " + self.tX + "/" + self.tY }).translate(ppp.dx, ppp.dy);
        label[1].attr({text: "Real Grid Coordinates: " + x + "/" + y}).translate(ppp.dx, ppp.dy);
        self.attr("r", 5);
    }, function () {
        var self = this;
        self.attr("r", 2);
    });
};
