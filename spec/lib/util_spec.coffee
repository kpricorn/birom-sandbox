{Util} = require '../../lib/util'

describe 'Utility code', ->
  s = (Math.sqrt 3) * 6000
  r = (Math.sqrt 3) * s / 6
  R = (Math.sqrt 3) * s / 3
  h = (Math.sqrt 3) * s / 2
  f = .01

  beforeEach ->
    this.addMatchers
      toMatchFuzzily: (expected) ->
        rlength = 10
        return false unless expected.length is @actual.length
        for element, i in @actual
          x = parseFloat Math.round(element*Math.pow(rlength,2))/Math.pow(rlength,2)
          y = parseFloat Math.round(expected[i]*Math.pow(rlength,2))/Math.pow(rlength,2)
          return false unless x is y
        true

  describe 'Successful tests', ->
    it 'return the correct x/y coordinates', ->

      (expect(uvw_to_xy 0, 0, 0, 0)).toEqual([0, 0])
      # row 1
      (expect(uvw_to_xy s, -1, 1, 0)).toEqual([-s/2, -h])
      (expect(uvw_to_xy s, -1, 1, 1)).toEqual([0, -2*R])
      (expect(uvw_to_xy s, -1, 0, 1)).toEqual([s/2, -h])
      #  # row 2
      (expect(uvw_to_xy s, 0, 1, -1)).toEqual([-s, 0])
      (expect(uvw_to_xy s, 0, 1, 0)).toMatchFuzzily([-s/2, -r])
      (expect(uvw_to_xy s, 0, 0, 0)).toEqual([0, 0])
      (expect(uvw_to_xy s, 0, 0, 1)).toMatchFuzzily([s/2, -r])
      (expect(uvw_to_xy s, 0, -1, 1)).toEqual([s, 0])
      #  # row 3
      (expect(uvw_to_xy s, 1, 1, -1)).toMatchFuzzily([-s, R])
      (expect(uvw_to_xy s, 1, 0, -1)).toEqual([-s/2, h])
      (expect(uvw_to_xy s, 1, 0, 0)).toEqual([0, R])
      (expect(uvw_to_xy s, 1, -1, 0)).toEqual([s/2, h])
      (expect(uvw_to_xy s, 1, -1, 1)).toEqual([s, R])
    describe 'return the correct u/v/w coordinates', ->
      # center x
      (expect(xy_to_uvw 0, 0, 0)).toEqual([0, 0, 0])
      # u
      it 'tests return value of u', ->
        [u, v, w] = (xy_to_uvw s, 0, - R + f)
        expect([u, v, w]).toEqual [0, 0, 0]
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

      # v
      it 'tests return value of v', ->
        [u, v, w] = (xy_to_uvw s, 0, - R + f)
        expect([u, v, w]).toEqual [0, 0, 0]
        [u, v, w] = xy_to_uvw s, -s/2, -r
        expect(v).toEqual 1
        [u, v, w] = xy_to_uvw s, s, R
        expect(v).toEqual -1

        [u, v, w] = xy_to_uvw s, -1.5 * s, -h
        expect(v).toEqual 2
        [u, v, w] = xy_to_uvw s, 1.5 * s, h
        expect(v).toEqual -2

        [u, v, w] = xy_to_uvw s, -3 * s, -2 * h
        expect(v).toEqual 4
        [u, v, w] = xy_to_uvw s, 3 * s, 2 * h
        expect(v).toEqual -4

      # w
      it 'tests return value of w', ->
        [u, v, w] = (xy_to_uvw s, 0, - R + f)
        expect([u, v, w]).toEqual [0, 0, 0]
        [u, v, w] = xy_to_uvw s, s/2, -r
        expect(w).toEqual 1
        [u, v, w] = xy_to_uvw s, -s, R
        expect(w).toEqual -1

        [u, v, w] = xy_to_uvw s, 1.5 * s, -h
        expect(w).toEqual 2
        [u, v, w] = xy_to_uvw s, -1.5 * s, h
        expect(w).toEqual -2

        [u, v, w] = xy_to_uvw s, 3 * s, -2 * h
        expect(w).toEqual 4
        [u, v, w] = xy_to_uvw s, -3 * s, 2 * h
        expect(w).toEqual -4

      it 'sample tests of u/v/w', ->
        [u, v, w] = (xy_to_uvw s, 3 * s, -2 * h)
        expect([u, v, w]).toEqual [-2, -2, 4]
        [u, v, w] = (xy_to_uvw s, -s, -4 * h)
        expect([u, v, w]).toEqual [-4, 3, 1]

