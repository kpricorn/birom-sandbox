{Util} = require '../common/Util'

describe 'Utility code', ->

  describe 'Successful tests', ->
    it 'return the correct x/y coordinates', ->
      (expect(uvw_to_xy 0, 0, 0, 0)).toEqual([0, 0])
      (expect(uvw_to_xy 10, 0, 0, 0)).toEqual([0, 0])
      (expect(uvw_to_xy 10, 1, 0, 0)).toEqual([0, -5.773502691896257])
      (expect(uvw_to_xy 10, -1, 0, 0)).toEqual([0, 5.773502691896257])
      (expect(uvw_to_xy 10, -1, 1, 0)).toEqual([5, 8.660254037844386])
      (expect(uvw_to_xy 10, -1, -1, 0)).toEqual([-5, 2.886751345948129])
      (expect(uvw_to_xy 10, -1, 1, 1)).toEqual([10, 5.773502691896257])
      (expect(uvw_to_xy 10, -1, -1, -1)).toEqual([-10, 5.773502691896257])
    it 'return the correct u/v/w coordinates', ->
      (expect(xy_to_uvw 0, 0, 0)).toEqual([0, 0, 0])
      (expect(xy_to_uvw 10, 0, 0)).toEqual([0, 0, 0])
      (expect(xy_to_uvw 10, 1, 0)).toEqual([0, 0, 0])
      (expect(xy_to_uvw 10, 10, 0)).toEqual([0, -1, -1])
