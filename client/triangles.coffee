
($ document).ready ->
  sideLength = 20
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
      # condition: u + v + w == 1 || u + v + w == 0
      for u in [ 1 - v - w, -v - w ]
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

        uSet = (uS[u] ?= paper.set())
        vSet = (vS[v] ?= paper.set())
        wSet = (wS[w] ?= paper.set())

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

