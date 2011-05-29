(function() {
  global.uvw_to_xy = function(s, u, v, w) {
    var R, h, r, x, xu, xv, xw, y, yu, yv, yw;
    r = (Math.sqrt(3)) * s / 6;
    R = (Math.sqrt(3)) * s / 3;
    h = (Math.sqrt(3)) * s / 2;
    xu = 0;
    yu = u * R;
    xv = v * (Math.cos(Math.PI / 6)) * R;
    yv = -v * (Math.sin(Math.PI / 6)) * R;
    xw = w * (Math.cos(Math.PI / 6)) * R;
    yw = w * (Math.sin(Math.PI / 6)) * R;
    x = xu + xv + xw;
    y = yu + yv + yw;
    return [x, -y];
  };
  global.xy_to_uvw = function(s, x, y) {
    var R, factor, h, offset, r, u, v, w;
    if (x === 0 && y === 0) {
      return [0, 0, 0];
    }
    r = (Math.sqrt(3)) * s / 6;
    R = (Math.sqrt(3)) * s / 3;
    h = (Math.sqrt(3)) * s / 2;
    u = -(Math.floor((y + R) / h));
    if (y > 0) {
      factor = 1;
      offset = r;
    } else {
      factor = -1;
      offset = R;
    }
    v = factor * (Math.floor((Math.cos(Math.PI / 3 - (Math.atan(x / y))) * Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + offset) / h));
    w = factor * (Math.floor((Math.cos(2 * Math.PI / 3, -(Math.atan(x / y)))) * Math.sqrt(Math.pow(x, 2, +Math.pow(y, 2)) + offset) / h));
    return [u, v, w];
  };
}).call(this);
