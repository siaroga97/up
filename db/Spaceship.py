from marsSunEarth import *


def d2x(x, y, xEarth, yEarth, xMars, yMars):
    z = defineSignX(x, xEarth) * defineAngleX(x, xEarth, y, yEarth) * forceOfGravity(MKA, MEARTH, x, xEarth, y, yEarth)
    v = defineSignX(x, xMars) * defineAngleX(x, xMars, y, yMars) * forceOfGravity(MKA, MMARS, x, xMars, y, yMars)
    c = defineSignX(x, 0) * defineAngleX(x, 0, y, 0) * forceOfGravity(MKA, MSUN, x, 0, y, 0)

    # print("d2x :{0},{1},{2},{3},{4},{5},dist ear-ka {6} ,dist mars-ka{7}".format(z, v, c,
    #                                                                              defineAngleX(x, xEarth, y, yEarth),
    #                                                                              defineAngleX(x, xMars, y, yMars),
    #                                                                              defineAngleX(x, 0, y, 0),
    #                                                                              distance(x, xEarth, y, yEarth),
    #                                                                              distance(x, xMars, y, yMars)))
    return (z + v + c) / MKA


def d2y(x, y, xEarth, yEarth, xMars, yMars):
    m = defineSignY(y, yEarth)
    n = defineAngleY(x, xEarth, y, yEarth)
    g = forceOfGravity(MKA, MEARTH, x, xEarth, y, yEarth)
    earth = m * n * g
    mars = defineSignY(y, yMars) * defineAngleY(x, xMars, y, yMars) * forceOfGravity(MKA, MMARS, x, xMars, y, yMars)
    sun = defineSignY(y, 0) * defineAngleY(x, 0, y, 0) * forceOfGravity(MKA, MSUN, x, 0, y, 0)
    # print("d2y :{0} , {1} , {2} , {3}".format(earth, mars, sun, n))
    return (earth + mars + sun) / MKA


# def rungeKutX(x, y, xEarth, yEarth, xMars, yMars, vX, vY):
#     h = 1
#     K1 = d2x(x, y, xEarth, yEarth, xMars, yMars)
#     # K2 = x + h * K1 / 2
#     # K3 = x + h * K2 / 2
#     # K4 = x + h * K3
#     # K2 = d2x(x + hx / 2, y + hx * K1 / 2, xEarth, yEarth, xMars, yMars)
#     # K3 = d2x(x + hx / 2, y + hx * K2 / 2, xEarth, yEarth, xMars, yMars)
#     # K4 = d2x(x + hx, y + hx * K3, xEarth, yEarth, xMars, yMars)
#     # return x + h / 6 * (K1 + 2 * K2 + 2 * K3 + K4)
#     return (K1 + (1 + (h ** 4 - 4 * h ** 3 + 12 * h ** 2 - 24 * h) / 24))


# def rungeKutY(x, y, xEarth, yEarth, xMars, yMars, vX, vY):
#     h = 1
#     # h = 1 / (rmars * 2)
#     K1 = d2y(x, y, xEarth, yEarth, xMars, yMars)
#     # K2 = d2x(x + hx / 2, y + hx * K1 / 2, xEarth, yEarth, xMars, yMars)
#     # K3 = d2x(x + hx / 2, y + hx * K2 / 2, xEarth, yEarth, xMars, yMars)
#     # K4 = d2x(x + hx, y + hx * K3, xEarth, yEarth, xMars, yMars)
#     return K1 + (1 + (h ** 4 - 4 * h ** 3 + 12 * h ** 2 - 24 * h) / 24)


def eilerX(x, y, xEarth, yEarth, xMars, yMars, vX,step):

    h = 1 / 1000000
    dv = d2x(x, y, xEarth, yEarth, xMars, yMars) * step
    # while abs(abs(dv) - abs(vX)) > 0.01:
    #     dv = d2x(x, y, xEarth, yEarth, xMars, yMars) * h
    #     h /= 10
    # print("d2x ={0} ".format(h * dv))
    return vX + dv


def eilerY(x, y, xEarth, yEarth, xMars, yMars, vY,step):

    h = 1 / 1000000
    d2yz = d2y(x, y, xEarth, yEarth, xMars, yMars) * h
    # while abs(abs(d2yz) - abs(vY)) > 0.01:
    #     print("eilerY h={0},d2yz={1}".format(h, d2yz))
    #     d2yz = d2y(x, y, xEarth, yEarth, xMars, yMars) * h
    #     h /= 10
    # print("d2y ={0}".format(h * d2yz))
    return vY + d2yz
