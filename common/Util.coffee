global.uvw_to_xy = (s, u, v, w) ->
  r = (Math.sqrt 3) * s / 6
  R = (Math.sqrt 3) * s / 3
  h = (Math.sqrt 3) * s / 2
  xu = 0
  yu = u * R
  xv = v * (Math.cos Math.PI / 6) * R
  yv = -v * (Math.sin Math.PI / 6) * R
  xw = w * (Math.cos Math.PI / 6) * R
  yw = w * (Math.sin Math.PI / 6) * R
  x = xu + xv + xw
  y = yu + yv + yw
  [x, -y]

global.xy_to_uvw = (s, x, y) ->
  r = (Math.sqrt 3) * s / 6
  R = (Math.sqrt 3) * s / 3
  h = (Math.sqrt 3) * s / 2

  u = -(Math.floor (y + R) / h)
  if y > 0
    factor = 1
    offset = r
  else
    factor = -1
    offset = R
  v = factor * (Math.floor (Math.cos(Math.PI / 3 - 
    (Math.atan x/y)) * Math.sqrt(Math.pow(x, 2) + 
    Math.pow(y, 2)) + offset) / h)
  w = factor * (Math.floor (Math.cos(2 * Math.PI / 3 
    - (Math.atan x/y)) * Math.sqrt(Math.pow(x, 2) 
    + Math.pow(y, 2)) + offset) / h)
  [u, v, w]

