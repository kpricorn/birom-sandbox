#                    o---------o---------o
#                   / \-2/2/1 / \-2/1/2 / \
#                  /   \     /   \     /   \
#                 /     \   /     \   /     \
#                /-2/2/0 \ / -2/1/1\ /-2/0/2 \
#               o---------o---------o---------o
#              / \-1/2/0 / \-1/1/1 / \-1/0/2 / \
#             /   \     /   \     /   \     /   \
#            /     \   /     \   /     \   /     \
#           /-1/2/-1\ /-1/1/0 \ /-1/0/1 \ /-1/-1/2\
#          o---------o---------o---------o---------o
#         / \ 0/2/-1/ \ 0/1/0 / \ 0/0/1 / \ 0/-1/2/ \
#        /   \     /   \     /   \     /   \     /   \
#       /     \   /     \   /0/0/0\   /     \   /     \
#      / 0/2/-2\ /0/1/-1 \ /   x   \ /0/-1/1 \ / 0/-2/2\
#     o---------o---------o---------o---------o---------o
#      \ 1/2/-2/ \1/1/-1 / \ 1/0/0 / \1/-1/1 / \ 1/-2/2/
#       \     /   \     /   \     /   \     /   \     /
#        \   /     \   /     \   /     \   /     \   /
#         \ /1/1/-2 \ /1/0/-1 \ /1/-1/0 \ / 1/-2/1\ /
#          o---------o---------o---------o---------o
#           \2/1/-2 / \2/0/-1 / \2/-1/0 / \2/-2/1 /
#            \     /   \     /   \     /   \     /
#             \   /     \   /     \   /     \   /
#              \ / 2/0/-2\ /2/-1/-1\ /2/-2/0 \ /
#               o---------o---------o---------o
#
#
#                  x
#   v\ /w      +--->
#     o        |
#     |u       |
#              V y
#
#
root = global ? window

SR3 = Math.sqrt 3
PI30 = Math.PI / 6
PI60 = Math.PI / 3
SIN30 = Math.sin PI30
COS30 = Math.cos PI30
SIN60 = Math.sin PI60
COS60 = Math.cos PI60
root.uvw_to_xy = (s, u, v, w) ->
  r = SR3 * s / 6
  R = SR3 * s / 3
  h = SR3 * s / 2

  xu = 0
  yu = u * R

  xv = -v * COS30 * R
  yv = -v * SIN30 * R

  xw = w * COS30 * R
  yw = -w * SIN30 * R

  x = xu + xv + xw
  y = yu + yv + yw
  [x, y]

root.xy_to_uvw = (s, x, y) ->
  return [0, 0, 0] if x is 0 and y is 0
  r = SR3 * s / 6
  R = SR3 * s / 3
  h = SR3 * s / 2

  u = (Math.floor (R + y) / h)
  if y > 0
    factor = -1
    offset = r
  else
    factor = 1
    offset = R
  v = factor * (Math.floor (Math.cos(PI60 - (Math.atan x/y)) * Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + offset) / h)

  if y > 0
    factor = 1
    offset = R
  else
    factor = -1
    offset = r
  w = factor * (Math.floor (Math.cos(2 * PI60 - (Math.atan x/y)) * Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + offset) / h)
  [u, v, w]

