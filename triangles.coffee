uvw_to_xy = (s, u, v, w) ->
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
  [x, -1 * y]

xy_to_uvw = (s, x, y) ->
  r = (Math.sqrt 3) * s / 6
  R = (Math.sqrt 3) * s / 3
  h = (Math.sqrt 3) * s / 2

  u = -(Math.floor (y + R) / h)
  if y > 0
    factor = 1
    offset = R
  else
    factor = -1
    offset = r
  v = factor * (Math.floor (Math.cos(Math.PI / 3 - (Math.atan x/y)) * Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + offset) / h)
  w = factor * (Math.floor (Math.cos(2 * Math.PI / 3 - (Math.atan x/y)) * Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + offset) / h)
  [u, v, w]

($ document).ready ->
  sideLength = 80
  width = ($ '#paper').width()
  height = ($ '#paper').height()
  xOffset = width / 2
  yOffset = height / 2
  fieldSize = 4
  uS = []
  vS = []
  wS = []
  ($ document).mousemove (e) ->
    x = e.pageX - xOffset
    y = e.pageY - yOffset
    faces.attr fill: 'none'
    [u, v, w] = xy_to_uvw sideLength, x, y

    uSet = uS[u]
    uSet.attr fill: 'red' if uSet?
    vSet = vS[v]
    vSet.attr fill: 'blue' if vSet?
    wSet = wS[w]
    wSet.attr fill: 'green' if wSet?

    ($ '#xy').html "#{x}, #{y}"
    ($ '#uvw').html "#{u} , #{v}, #{w}"

  paper = Raphael "paper", "100%", "100%"

  r = (Math.sqrt 3) * sideLength / 6
  R = (Math.sqrt 3) * sideLength / 3
  h = (Math.sqrt 3) * sideLength / 2
  totalCoordinates = 0
  validCoordinates = 0
  coordinates = paper.set()
  faces = paper.set()
  for v in [-fieldSize..fieldSize]
    for w in [-fieldSize..fieldSize]
      for u in [w - v, w - v - 1]
        totalCoordinates++
        # check sectors, not all combos are valid
        console.log "✓: #{u}/#{v}/#{w}"
        validCoordinates++
        [x, y] = uvw_to_xy sideLength, u, v, w
        x += xOffset
        y += yOffset
        c = paper.circle x, y, 1
        c.attr
          fill: 'red'
          stroke: 'none'
        upright = (u + v + w) % 2 == 0
        if upright
          path = [
            "M", x, y - R,
            "L", x + sideLength / 2, y + r,
            "L", x - sideLength / 2, y + r,
            "Z"]
          apex = Math.round(x) + "/" + Math.round(y + v * r)
        else
          path = [
            "M", x, y + R,
            "L", x + sideLength / 2, y - r,
            "L", x - sideLength / 2, y - r,
            "Z"]
          apex = Math.round(x) + "/" + Math.round(y + v * r + r)

        uS[u] ?= paper.set()
        vS[v] ?= paper.set()
        wS[w] ?= paper.set()

        uSet = uS[u]
        vSet = vS[v]
        wSet = wS[w]

        triangle = paper.path path
        uSet.push triangle
        vSet.push triangle
        wSet.push triangle

        faces.push triangle
        offset = if upright then sideLength/6 else -sideLength/6
        uvw = paper.text x, y + offset, "#{u}/#{v}/#{w}"
        coordinates.push uvw
        uvw.attr
          fill: "white"
          'font-size': sideLength / 6
          'text-anchor': "middle"

  faces.attr 'stroke-width': .3
  faces.toBack

