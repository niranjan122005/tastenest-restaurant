"""Redraws the hand-drawn banner doodles (fried egg, drumstick), tomato/basil and the 404 art as crisp SVG.

    python3 -I tools/gen_decor.py public/images
"""
import math, os, random, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else "public/images"
INK = "#4a3a2a"


def smooth_closed(pts):
    """Catmull-Rom -> cubic Bezier path through pts (closed)."""
    n = len(pts)
    d = f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"
    for i in range(n):
        p0, p1, p2, p3 = pts[(i - 1) % n], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}"
    return d + "Z"


def blob(cx, cy, rx, ry, seed, wobble=.09, n=28):
    rnd = random.Random(seed)
    ph = [rnd.uniform(0, 6.28) for _ in range(4)]
    pts = []
    for i in range(n):
        a = i * math.tau / n
        k = 1 + wobble * math.sin(3 * a + ph[0]) + wobble * .7 * math.sin(5 * a + ph[1]) + wobble * .45 * math.sin(7 * a + ph[2]) + rnd.uniform(-.012, .012)
        pts.append((cx + rx * k * math.cos(a), cy + ry * k * math.sin(a)))
    return pts


def egg(cx, cy, s, seed=3):
    rnd = random.Random(seed)
    pts = blob(cx, cy, 330 * s, 262 * s, seed)
    d = smooth_closed(pts)
    out = (f'<path d="{d}" fill="#fffaf0" stroke="{INK}" stroke-width="{5*s:.1f}" stroke-linejoin="round"/>'
           f'<path d="{d}" fill="url(#eggshade)" />')
    # engraved hatching along the lower-left rim and a lighter inner rim
    hatch = ""
    for i in range(160):
        a = rnd.uniform(math.radians(95), math.radians(250))
        k = 1 + .09 * math.sin(3 * a + 0)  # approximate rim radius (hatches are decorative)
        rr = rnd.uniform(.78, .97)
        x1, y1 = cx + 330 * s * rr * math.cos(a), cy + 262 * s * rr * math.sin(a)
        L = rnd.uniform(14, 34) * s
        x2, y2 = x1 + L * math.cos(a + .25), y1 + L * math.sin(a + .25)
        hatch += f'<path d="M{x1:.1f} {y1:.1f} L{x2:.1f} {y2:.1f}" stroke="{INK}" stroke-width="{rnd.uniform(1.2, 2.4)*s:.1f}" opacity="{rnd.uniform(.35, .75):.2f}" stroke-linecap="round"/>'
    for i in range(70):
        a = rnd.uniform(math.radians(-70), math.radians(30))
        rr = rnd.uniform(.86, .96)
        x1, y1 = cx + 330 * s * rr * math.cos(a), cy + 262 * s * rr * math.sin(a)
        L = rnd.uniform(8, 20) * s
        hatch += f'<path d="M{x1:.1f} {y1:.1f} L{x1 - L*math.cos(a):.1f} {y1 - L*math.sin(a):.1f}" stroke="{INK}" stroke-width="{1.2*s:.1f}" opacity=".35" stroke-linecap="round"/>'
    dots = "".join(f'<circle cx="{cx + rnd.uniform(-240, 240)*s:.1f}" cy="{cy + rnd.uniform(-170, 190)*s:.1f}" r="{rnd.uniform(1.4, 2.6)*s:.1f}" fill="{INK}" opacity=".5"/>' for _ in range(26))
    # yolk
    yx, yy = cx + 20 * s, cy - 10 * s
    yolk = (f'<ellipse cx="{yx + 6*s:.1f}" cy="{yy + 10*s:.1f}" rx="{132*s:.1f}" ry="{108*s:.1f}" fill="#4a3a2a" opacity=".18"/>'
            f'<ellipse cx="{yx:.1f}" cy="{yy:.1f}" rx="{128*s:.1f}" ry="{104*s:.1f}" fill="url(#yolk)" stroke="#33384a" stroke-width="{6*s:.1f}"/>'
            f'<ellipse cx="{yx:.1f}" cy="{yy:.1f}" rx="{118*s:.1f}" ry="{94*s:.1f}" fill="none" stroke="#33384a" stroke-width="{2*s:.1f}" opacity=".6"/>'
            f'<ellipse cx="{yx - 40*s:.1f}" cy="{yy - 40*s:.1f}" rx="{46*s:.1f}" ry="{24*s:.1f}" fill="#fff" opacity=".7" transform="rotate(-28 {yx - 40*s:.1f} {yy - 40*s:.1f})"/>'
            f'<ellipse cx="{yx + 50*s:.1f}" cy="{yy - 52*s:.1f}" rx="{20*s:.1f}" ry="{9*s:.1f}" fill="#ffe08a" opacity=".9" transform="rotate(-28 {yx + 50*s:.1f} {yy - 52*s:.1f})"/>'
            + "".join(f'<circle cx="{yx + rnd.uniform(-95, 95)*s:.1f}" cy="{yy + rnd.uniform(-70, 75)*s:.1f}" r="{rnd.uniform(1.6, 2.8)*s:.1f}" fill="#8a5a00" opacity=".55"/>' for _ in range(22)))
    return out + hatch + dots + yolk


def drumstick(cx, cy, s, rot=-20, seed=7):
    rnd = random.Random(seed)
    g = (f'<g transform="translate({cx} {cy}) rotate({rot}) scale({s})">'
         # bone
         f'<path d="M-6 -150 C-12 -190 -44 -200 -58 -178 C-80 -186 -96 -158 -72 -140 C-60 -126 -30 -128 -6 -150Z" fill="#fffaf0" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>'
         f'<path d="M-20 -150 L-4 -96" stroke="{INK}" stroke-width="14" stroke-linecap="round"/><path d="M-20 -150 L-4 -96" stroke="#fffaf0" stroke-width="7" stroke-linecap="round"/>'
         # meat
         f'<path d="M-4 -110 C-60 -104 -96 -40 -92 30 C-88 110 -44 160 14 160 C74 160 104 100 96 30 C90 -36 52 -100 -4 -110Z" fill="url(#chicken)" stroke="{INK}" stroke-width="5.5" stroke-linejoin="round"/>'
         # skin flap
         f'<path d="M34 -84 C86 -50 120 10 118 70 C116 110 98 134 76 142 C92 100 88 40 54 -10 C44 -28 30 -50 18 -66Z" fill="#fbf4e4" stroke="{INK}" stroke-width="4.5" stroke-linejoin="round"/>'
         f'<path d="M62 -10 C92 30 100 70 88 118" stroke="{INK}" stroke-width="2" fill="none" opacity=".6"/>'
         f'<ellipse cx="52" cy="62" rx="40" ry="62" fill="#d9d2c4" stroke="{INK}" stroke-width="3.5" transform="rotate(-8 52 62)"/>'
         f'<ellipse cx="42" cy="50" rx="22" ry="40" fill="#efeadf" opacity=".9" transform="rotate(-8 42 50)"/>')
    for _ in range(40):
        x, y = rnd.uniform(-80, 20), rnd.uniform(-60, 140)
        g += f'<path d="M{x:.0f} {y:.0f} l{rnd.uniform(6, 16):.0f} {rnd.uniform(4, 14):.0f}" stroke="#a65d00" stroke-width="1.8" opacity=".5" stroke-linecap="round"/>'
    g += f'<ellipse cx="-44" cy="0" rx="14" ry="52" fill="#fff" opacity=".35" transform="rotate(6 -44 0)"/></g>'
    return g


def steam(x, y, s=1):
    return (f'<g transform="translate({x} {y}) scale({s})" fill="none" stroke="{INK}" stroke-width="3.5" stroke-linecap="round" opacity=".75">'
            '<path d="M0 60 C-20 40 20 30 10 8 C0 -14 -40 -6 -34 20 C-30 40 8 38 8 16"/>'
            '<path d="M24 100 C40 84 12 76 22 62"/></g>')


def defs():
    return ('<linearGradient id="eggshade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".65" stop-color="#e9dfc4" stop-opacity="0"/><stop offset="1" stop-color="#d8c9a0" stop-opacity=".55"/></linearGradient>'
            '<radialGradient id="yolk" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ffd25a"/><stop offset=".6" stop-color="#f7a900"/><stop offset="1" stop-color="#e08a00"/></radialGradient>'
            '<linearGradient id="chicken" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc247"/><stop offset=".55" stop-color="#f59a0a"/><stop offset="1" stop-color="#d9780a"/></linearGradient>')


def svg(w, h, body, d=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs>{defs()}{d}</defs>{body}</svg>'


def banner_egg():
    return svg(1000, 600, steam(395, 70, .9) + drumstick(190, 330, 1.0, -22) + egg(640, 300, .95))


def banner_wings():
    return svg(400, 400, drumstick(120, 215, .72, -28, 3) + drumstick(270, 200, .8, 22, 5))


def tomato_basil():
    d = ('<radialGradient id="tm" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ff6a52"/><stop offset=".7" stop-color="#d8301f"/><stop offset="1" stop-color="#a31a0e"/></radialGradient>'
         '<radialGradient id="lf" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7ccf55"/><stop offset="1" stop-color="#2f8a33"/></radialGradient>'
         '<filter id="bl"><feGaussianBlur stdDeviation="6"/></filter>')
    leaf = ('<g transform="translate(540 300) rotate(28) scale(3.3)"><path d="M0 40 C-46 20 -44 -34 0 -50 C44 -34 46 20 0 40Z" fill="url(#lf)" stroke="#1f6b2a" stroke-width="2"/>'
            '<path d="M0 38 L0 -42 M0 -4 L-22 -18 M0 -4 L22 -18 M0 18 L-18 6 M0 18 L18 6" stroke="#bfe5a0" stroke-width="2" fill="none" opacity=".85" stroke-linecap="round"/></g>')
    b = ('<circle cx="190" cy="372" r="140" fill="#000" opacity=".16" filter="url(#bl)"/><circle cx="180" cy="340" r="130" fill="url(#tm)" stroke="#8f160c" stroke-width="4"/>'
         '<ellipse cx="136" cy="286" rx="40" ry="18" fill="#fff" opacity=".45" transform="rotate(-30 136 286)"/>'
         '<path d="M180 214 l-34 -24 l28 8 l2 -32 l12 30 l32 -16 l-22 30 l26 14 l-30 0 l-2 18 l-14 -20 l-24 16 l6 -26Z" fill="#2f8a33" stroke="#1f6b2a" stroke-width="2.5"/>' + leaf)
    return svg(800, 600, b, d)


def basil_right():
    d = '<radialGradient id="lf" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7ccf55"/><stop offset="1" stop-color="#2f8a33"/></radialGradient>'
    one = lambda x, y, s, a: (f'<g transform="translate({x} {y}) rotate({a}) scale({s})"><path d="M0 40 C-46 20 -44 -34 0 -50 C44 -34 46 20 0 40Z" fill="url(#lf)" stroke="#1f6b2a" stroke-width="2"/>'
                              '<path d="M0 38 L0 -42 M0 -4 L-22 -18 M0 -4 L22 -18 M0 18 L-18 6 M0 18 L18 6" stroke="#bfe5a0" stroke-width="2" fill="none" opacity=".85" stroke-linecap="round"/></g>')
    return svg(800, 800, one(400, 430, 5.4, 0) + one(250, 400, 4, -50) + one(560, 400, 4, 50), d)


def avocado_404():
    d = ('<radialGradient id="av" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#9ccc4a"/><stop offset="1" stop-color="#4f8f2a"/></radialGradient>'
         '<radialGradient id="flesh" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#e9f08a"/><stop offset="1" stop-color="#bcd35a"/></radialGradient>'
         '<radialGradient id="pit" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#c66a3a"/><stop offset="1" stop-color="#7a3416"/></radialGradient>')
    g = "#2e8b57"
    four = lambda x: (f'<g transform="translate({x} 40)"><path d="M150 0 L40 190 L40 240 L150 240 L150 300 L210 300 L210 240 L250 240 L250 190 L210 190 L210 0Z M150 70 L150 190 L82 190Z" fill-rule="evenodd" fill="{g}" stroke="#1f6b41" stroke-width="5" stroke-linejoin="round"/></g>')
    body = four(0) + four(520)
    body += ('<ellipse cx="390" cy="360" rx="170" ry="30" fill="#000" opacity=".15"/>'
             '<path d="M390 40 C300 40 250 150 250 250 C250 330 310 380 390 380 C470 380 530 330 530 250 C530 150 480 40 390 40Z" fill="url(#av)" stroke="#2f5d1a" stroke-width="7"/>'
             '<path d="M390 78 C320 78 286 164 286 250 C286 316 332 348 390 348 C448 348 494 316 494 250 C494 164 460 78 390 78Z" fill="url(#flesh)"/>'
             '<ellipse cx="390" cy="262" rx="70" ry="76" fill="url(#pit)" stroke="#5a2410" stroke-width="5"/><ellipse cx="368" cy="236" rx="22" ry="14" fill="#fff" opacity=".35" transform="rotate(-30 368 236)"/>'
             '<circle cx="352" cy="190" r="22" fill="#fff" stroke="#2f2f2f" stroke-width="4"/><circle cx="428" cy="190" r="22" fill="#fff" stroke="#2f2f2f" stroke-width="4"/><circle cx="356" cy="196" r="9" fill="#222"/><circle cx="424" cy="196" r="9" fill="#222"/>'
             '<path d="M340 300 Q390 346 440 300 Q390 318 340 300Z" fill="#b3261e" stroke="#7a130e" stroke-width="4" stroke-linejoin="round"/>'
             '<path d="M300 400 L480 400 L440 470 L340 470Z" fill="#f4b73c" stroke="#b97a12" stroke-width="5" stroke-linejoin="round"/>'
             '<path d="M300 400 Q390 360 480 400" fill="#d83a22" stroke="#9a2412" stroke-width="5"/><circle cx="360" cy="415" r="14" fill="#c42a18"/><circle cx="420" cy="420" r="14" fill="#c42a18"/>')
    return svg(960, 520, body, d)


def write(rel, content):
    p = os.path.join(OUT, rel); os.makedirs(os.path.dirname(p), exist_ok=True); open(p, "w").write(content)


write("decor/banner-egg.svg", banner_egg())
write("decor/banner-wings.svg", banner_wings())
write("decor/tomato-basil.svg", tomato_basil())
write("decor/basil-right.svg", basil_right())
write("decor/avocado-404.svg", avocado_404())
print("done")
