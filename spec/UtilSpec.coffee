{Util} = require '../common/Util'

describe 'Utility code', ->

  describe 'Successful tests', ->
    it 'return the correct x/y coordinates', ->
      (expect(uvw_to_xy 0, 0, 0, 0)).toEqual([0, 0])
    it 'return the correct u/v/w coordinates', ->
      (expect(uvw_to_xy 0, 0, 0, 10)).toEqual([0, 0])
    it 'return the correct u/v/w coordinates', ->
      (expect(uvw_to_xy 1, 0, 0, 10)).toEqual([0, 0])

