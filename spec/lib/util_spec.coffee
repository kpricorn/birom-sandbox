{Util} = require '../../lib/util'

describe 'Utility code', ->
  s = ( Math.sqrt 3 ) * 6
  r = (Math.sqrt 3) * s / 6
  R = (Math.sqrt 3) * s / 3
  h = (Math.sqrt 3) * s / 2
  f = .0001

  describe 'Successful tests', ->
    it 'return the correct x/y coordinates', ->
      (expect(uvw_to_xy 0, 0, 0, 0)).toEqual([0, 0])
      # row 1
      (expect(uvw_to_xy s, -1, 1, 0)).toEqual([-s/2, -h])
      (expect(uvw_to_xy s, -1, 1, 1)).toEqual([0, -2*R])
      (expect(uvw_to_xy s, -1, 0, 1)).toEqual([s/2, -h])
      #  # row 2
      (expect(uvw_to_xy s, 0, 1, -1)).toEqual([-s, 0])
      (expect(uvw_to_xy s, 0, 1, 0)).toEqual([-s/2, -2.9999999999999996])
      (expect(uvw_to_xy s, 0, 0, 0)).toEqual([0, 0])
      (expect(uvw_to_xy s, 0, 0, 1)).toEqual([s/2, -2.9999999999999996])
      (expect(uvw_to_xy s, 0, -1, 1)).toEqual([s, 0])
      #  # row 3
      (expect(uvw_to_xy s, 1, 1, -1)).toEqual([-10.392304845413264, R])
      (expect(uvw_to_xy s, 1, 0, -1)).toEqual([-5.196152422706632, h])
      (expect(uvw_to_xy s, 1, 0, 0)).toEqual([0, R])
      (expect(uvw_to_xy s, 1, -1, 0)).toEqual([5.196152422706632, h])
      (expect(uvw_to_xy s, 1, -1, 1)).toEqual([s, R])
    it 'return the correct u/v/w coordinates', ->
      #       x
      #   +--->      A
      #   |          o  0,-R
      #   |         / \
      #   V y      /   \
      #         K o 0,0 o L
      #        I o   x   o J
      #  -s/2,r o----o----o s/2,r
      #         B    H    C

      # center x
      (expect(xy_to_uvw 0, 0, 0)).toEqual([0, 0, 0])
      # A
      [u, v, w] = (xy_to_uvw s, 0, - R + f)
      expect(u).toEqual 0
      [u, v, w] = xy_to_uvw s, 0, - R
      expect(u).toEqual 0
      [u, v, w] = xy_to_uvw s, 0, - R - f
      expect(u).toEqual -1
      [u, v, w] = xy_to_uvw s, 0, - R - h
      expect(u).toEqual -1
      [u, v, w] = xy_to_uvw s, 0, - R - h - f
      expect(u).toEqual -2
      [u, v, w] = xy_to_uvw s, 0, r - f
      expect(u).toEqual 0
      [u, v, w] = xy_to_uvw s, 0, r
      expect(u).toEqual 1
      [u, v, w] = xy_to_uvw s, 0, r + f
      expect(u).toEqual 1
      [u, v, w] = xy_to_uvw s, 0, r + h - f
      expect(u).toEqual 1
      [u, v, w] = xy_to_uvw s, 0, r + h
      expect(u).toEqual 2

      ## H
      #(expect(xy_to_uvw s, 0, r - f)).toEqual([0, 0, 0])
      ## K
      #(expect(xy_to_uvw s, -r * Math.cos(Math.PI/6) + f, - Math.cos(Math.PI/3) + f)).toEqual([0, 0, 0])
      ## K
      #(expect(xy_to_uvw s, - Math.cos(Math.PI/6) * r + f, - Math.cos(Math.PI/3) * r + f)).toEqual([0, 0, 0])
      ## L
      #(expect(xy_to_uvw s, Math.cos(Math.PI/6) * r - f, - Math.cos(Math.PI/3) * r + f)).toEqual([0, 0, 0])
      ## H
      #(expect(xy_to_uvw s, 0, r - f)).toEqual([0, 0, 0])
      ## I
      ## (expect(xy_to_uvw s, -R / Math.tan(Math.PI/6) + f, 0)).toEqual([0, 0, 0])

