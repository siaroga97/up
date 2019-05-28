import pygame, math
from Spaceship import *
from pygame import *
from math import *

WIN_WIDTH = 800
WIN_HEIGHT = 800
PLANET_WIDTH = 20
PLANET_HEIGHT = 20
DISPLAY = (WIN_WIDTH, WIN_HEIGHT)
SPACE_COLOR = "#000022"
SUN_COLOR = "yellow"
EARTH_COLOR = "blue"
MARS_COLOR = "orange"
KA_COLOR = "green"

# Sun position
X0 = WIN_WIDTH // 2
Y0 = WIN_HEIGHT // 2

MKA = 10000
MSUN = 1.989 * (10 ** 30)
MEARTH = 5.972 * (10 ** 24)
MMARS = 6.39 * (10 ** 23)
G = 6.67408 * (10 ** -11)
DELTA_T = 60
r = 150000000.0
rmars = 227900000.0


def defineSignX(x1, x2):
    if x2 == 0 and x1 > 0:
        return -1
    elif x2 == 0 and x1 < 0:
        return 1
    elif x1 > 0 and 0 < x1 < x2:
        return 1
    elif x1 > 0 and 0 < x2 < x1:
        return -1
    elif x1 < 0 and x2 < 0 and abs(x1) < abs(x2):
        return -1
    elif x1 < 0 and x2 < 0 and abs(x1) > abs(x2):
        return 1
    elif (x1 < 0 and x2 > 0) or (x1 > 0 and x2 < 0):
        return x2 / abs(x2)
    elif x1 == x2:
        return 0


def defineSignY(y1, y2):
    if y2 == 0 and y1 > 0:
        return -1
    elif y2 == 0 and y1 < 0:
        return 1
    elif y1 > 0 and 0 < y1 < y2:
        return 1
    elif y1 > 0 and 0 < y2 < y1:
        return -1
    elif y1 < 0 and y2 < 0 and abs(y1) < abs(y2):
        return -1
    elif y1 < 0 and y2 < 0 and abs(y1) > abs(y2):
        return 1
    elif (y1 < 0 and y2 > 0) or (y1 > 0 and y2 < 0):
        return y2 / abs(y2)
    elif y1 == y2:
        return 0


def defineAngleX(x1, x2, y1, y2):
    hypotenuse = distance(x1, x2, y1, y2)
    if (x1 > 0 and x2 < 0) or (x1 < 0 and x2 > 0):
        delta = abs(x1) + abs(x2)
    else:
        delta = abs(x1 - x2)
    return abs((delta / hypotenuse))


def defineAngleY(x1, x2, y1, y2):
    hypotenuse = distance(x1, x2, y1, y2)
    if (y1 > 0 and y2 < 0) or (y1 < 0 and y2 > 0):
        delta = abs(y1) + abs(y2)
    else:
        delta = abs(y1 - y2)
    return abs((delta / hypotenuse))


def forceOfGravity(m1, m2, x1, x2, y1, y2):
    return G * m1 * m2 / distance(x1, x2, y1, y2) ** 2


def distance(x1, x2, y1, y2):
    return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)


def speed(vX, vY):
    return sqrt(vX ** 2 + vY ** 2)


def main():
    # PyGame init
    pygame.init()
    screen = pygame.display.set_mode(DISPLAY)
    pygame.display.set_caption("Solar Mechanics v0.1")

    # Space init
    bg = Surface((WIN_WIDTH, WIN_HEIGHT))
    bg.fill(Color(SPACE_COLOR))
    draw.circle(bg, Color(SUN_COLOR), (X0, Y0), 10)

    # Timer init
    timer = pygame.time.Clock()

    # EARTH init
    earthPlanet = Surface((PLANET_WIDTH, PLANET_HEIGHT))
    earthPlanet.fill(Color(SPACE_COLOR))
    draw.circle(earthPlanet,
                Color(EARTH_COLOR),
                (PLANET_WIDTH // 2, PLANET_HEIGHT // 2),
                5)
    # Mars init
    marsPlanet = Surface((PLANET_WIDTH, PLANET_HEIGHT))
    marsPlanet.fill(Color(SPACE_COLOR))
    draw.circle(marsPlanet,
                Color(MARS_COLOR),
                (PLANET_WIDTH // 2, PLANET_HEIGHT // 2),
                5)
    # KA init
    kaSpaceship = Surface((12, 12))
    kaSpaceship.fill(Color(SPACE_COLOR))
    draw.circle(kaSpaceship,
                Color(KA_COLOR),
                (PLANET_WIDTH // 2, PLANET_HEIGHT // 2),
                3)

    # Planet to Sun distance
    r = 150000000.0
    rMars = 227900000.0
    # Initial planet pos, speed and accel
    xEarth = 0.0
    yEarth = 0.0
    xMars = 0.0
    yMars = 0.0
    t = 0
    v = 29.783
    vmars = 24.13
    vKA = v + 13
    vKAX = -0.001
    vKAY = vKA
    xKA = r * cos(-v * t / r) + 10
    yKA = r * sin(-v * t / r) + 100000
    deltaT = 100
    d2x = 0
    d2y = 0
    k = 1.003
    anotherSpeedX = 0
    anotherSpeedY = 0
    stepX = 0
    stepY = 0
    done = False
    while not done:
        for e in pygame.event.get():
            if e.type == QUIT:
                done = True
                break

        xEarth = r * cos(v * t / r) + 1
        yEarth = r * sin(v * t / r) + 1
        xMars = rMars * cos(vmars * (t + 11664000) / rMars)
        yMars = rMars * sin(vmars * (t + 11664000) / rMars)
        if anotherSpeedX != 0:
            stepX = anotherSpeedX - vKAX
            stepY = anotherSpeedY - vKAY
        deltaT *= k
        tempXKA = xKA + vKAX * deltaT
        tempYKA = yKA + vKAY * deltaT
        anotherSpeedX = eilerX(tempXKA, tempYKA, xEarth, yEarth, xMars, yMars, vKAX, stepX)
        anotherSpeedY = eilerY(tempXKA, tempYKA, xEarth, yEarth, xMars, yMars, vKAY, stepY)

        while abs(speed(anotherSpeedX, anotherSpeedY) - speed(vKAX, vKAY)) > 10 ** -4:
            print(deltaT)
            deltaT /= 2
            tempXKA = xKA + vKAX * deltaT
            tempYKA = yKA + vKAY * deltaT
            anotherSpeedX = eilerX(tempXKA, tempYKA, xEarth, yEarth, xMars, yMars, vKAX, stepX)
            anotherSpeedY = eilerY(tempXKA, tempYKA, xEarth, yEarth, xMars, yMars, vKAY, stepY)

        # print("vX= {0},vY= {1}".format(vKAX, vKAY))
        # print(t / 86400)
        xKA += anotherSpeedX * deltaT
        yKA += anotherSpeedY * deltaT
        vKAX = anotherSpeedX
        vKAY = anotherSpeedY

        screen.blit(bg, (0, 0))
        screen.blit(earthPlanet, (X0 + int(xEarth) / 1000000, Y0 + int(-yEarth) / 1000000))
        screen.blit(marsPlanet, (X0 + int(xMars) / 1000000, Y0 + int(-yMars) / 1000000))
        screen.blit(kaSpaceship, (X0 + int(xKA) / 1000000, Y0 + int(-yKA) / 1000000))
        pygame.display.update()
        t += (deltaT)
        if distance(xKA, 0, yKA, 0) > rmars:
            done = True


if __name__ == "__main__":
    main()
