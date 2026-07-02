#!/usr/bin/env python3
"""
Genereert de volledige favicon-set voor Nivora Works.

Waarom dit script bestaat
--------------------------
De oude favicon was (1) een vooraf-gebakken CIRKEL met transparante hoeken en
(2) een blurry logo. Gevolg:
  - Browser-tab toonde een ronde icon (met transparante hoeken) i.p.v. vierkant.
  - Google zet zelf al een RONDE mask op de favicon in de zoekresultaten; op een
    icon die zelf al rond is gaf dat een vage rand / inconsistente witte cirkel.
  - Op 16-48px was het logo onleesbaar wazig.

De fix
------
1 bron-mark, scherp gemaakt (de-blur via threshold uit de 1024px app-icon),
gecentreerd op een VIERKANTE full-bleed donkere tegel met ruime marge.
  - Vierkant + full-bleed  -> browser-tab toont een strak VIERKANT.
  - Ruime marge            -> Google's ronde crop knipt het logo nooit af en
                              toont een schone donkere schijf met wit logo.
  - Scherp gemaakte mark   -> leesbaar tot op 16px.

Draai:  python3 scripts/generate-favicons.py
"""

from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
# Exact dezelfde bron als het Nivora dev app-icon (build/icon.png), in de repo
# gekopieerd zodat dit script reproduceerbaar is. Bewust NIET in public/, zodat
# Google deze bron niet crawlt.
SRC = ROOT / "scripts" / "nivora-icon-source.png"

# --- huisstijl-kleuren, exact overgenomen uit het Nivora dev-icon ---------
TOP = (16, 16, 16)      # #101010  (donker bovenaan)
BOTTOM = (54, 54, 54)   # #363636  (iets lichter onderaan)
MARK = (255, 255, 255)  # wit logo, maximaal contrast tot op 16px

MASTER = 1024           # op hoge resolutie bouwen, daarna netjes downscalen
MARK_WIDTH_FRAC = 0.608  # exact de mark-breedte van het Nivora dev-icon
MARK_CENTER_Y = 0.468    # mark iets boven het midden, net als het dev-icon
CORNER_FRAC = 0.235      # afgeronde hoeken (squircle), net als het dev app-icon


def extract_mark_alpha() -> Image.Image:
    """Haal een scherp wit-silhouet van de mark uit de (wazige) app-icon."""
    src = Image.open(SRC).convert("RGBA")
    r, g, b, a = src.split()
    lum = np.asarray(src.convert("L"), dtype=np.float32)
    alpha = np.asarray(a, dtype=np.float32) / 255.0
    mark = lum * alpha                      # helder waar opaak, donker op de bg
    # Zachte ramp rond 140..180 -> scherpe rand met een vleugje antialiasing.
    m = np.clip((mark - 140.0) / 40.0, 0.0, 1.0)
    sil = Image.fromarray((m * 255).astype("uint8"))
    return sil.crop(sil.getbbox())          # strak bijsnijden op de mark


def gradient_tile(size: int, rounded: int = 0) -> Image.Image:
    """Vierkante donkere tegel met subtiele verticale gradient."""
    top = np.array(TOP, dtype=np.float32)
    bot = np.array(BOTTOM, dtype=np.float32)
    t = np.linspace(0.0, 1.0, size)[:, None]           # 0 boven -> 1 onder
    row = top[None, :] * (1 - t) + bot[None, :] * t     # (size,3)
    grad = np.repeat(row[:, None, :], size, axis=1).astype("uint8")
    tile = Image.fromarray(grad, "RGB").convert("RGBA")
    if rounded > 0:                                     # optionele ronde hoeken
        from PIL import ImageDraw
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], rounded, fill=255)
        tile.putalpha(mask)
    return tile


def compose(mark_width_frac: float, corner_frac: float = 0.0) -> Image.Image:
    """Bouw het master-icon (MASTER x MASTER): donkere tegel + witte mark.

    corner_frac > 0 geeft afgeronde hoeken (squircle) met transparante hoeken,
    net als het Nivora dev app-icon. 0 = full-bleed vierkant.
    """
    tile = gradient_tile(MASTER, rounded=int(corner_frac * MASTER))
    sil = extract_mark_alpha()
    mw = int(MASTER * mark_width_frac)
    mh = int(sil.height * mw / sil.width)
    sil_r = sil.resize((mw, mh), Image.LANCZOS)
    white = Image.new("RGBA", (mw, mh), MARK + (0,))
    white.putalpha(sil_r)
    x = (MASTER - mw) // 2
    y = int(MASTER * MARK_CENTER_Y - mh / 2)           # iets boven het midden
    tile.alpha_composite(white, (x, y))
    return tile


def flatten(img: Image.Image) -> Image.Image:
    """Voor apple/maskable: geen transparantie -> volle vierkante tegel."""
    bg = Image.new("RGBA", img.size, TOP + (255,))
    bg.alpha_composite(img)
    return bg.convert("RGB")


def down(master: Image.Image, size: int) -> Image.Image:
    return master.resize((size, size), Image.LANCZOS)


def main():
    # Afgeronde squircle (transparante hoeken) -> identiek aan het Nivora dev icon.
    rounded = compose(MARK_WIDTH_FRAC, corner_frac=CORNER_FRAC)
    # Full-bleed vierkant -> voor apple-touch & maskable (die worden OS-gemaskt).
    square = compose(MARK_WIDTH_FRAC)

    # PNG-favicons (afgeronde hoeken, transparant -> browser-tab toont squircle)
    for s in (16, 32, 48, 512):
        name = "favicon.png" if s == 512 else f"favicon-{s}.png"
        down(rounded, s).save(PUB / name)
        print("wrote", name, f"{s}x{s}")

    # Multi-res .ico (16/32/48) met transparante hoeken (ICO ondersteunt alpha)
    rounded.save(PUB / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("wrote favicon.ico (16/32/48)")

    # PWA / Android manifest-icons "any": zelfde afgeronde look
    for s in (192, 512):
        down(rounded, s).save(PUB / f"icon-{s}.png")
        print("wrote", f"icon-{s}.png", f"{s}x{s}")

    # Apple touch icon: full-bleed vierkant, iOS rondt zelf af. 180px.
    flatten(down(square, 180)).save(PUB / "apple-touch-icon.png")
    print("wrote apple-touch-icon.png 180x180")

    # Maskable icon: full-bleed vierkant met extra marge zodat Android nooit knipt.
    maskable = compose(MARK_WIDTH_FRAC * 0.78)
    flatten(down(maskable, 512)).save(PUB / "icon-512-maskable.png")
    print("wrote icon-512-maskable.png 512x512")


if __name__ == "__main__":
    main()
