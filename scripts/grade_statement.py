#!/usr/bin/env python3
"""
grade_statement.py — colour-grade a bright photo so it matches the dark, muted,
olive-green "scroll statement" backgrounds used on the service pages
(statement-aios / statement-localai / statement-appdesign).

It does a Reinhard colour transfer in CIE-LAB toward the pooled statistics of the
existing statement images, then darkens slightly and lays a soft radial vignette,
so a new photo drops into the exact same mood as the rest of the site.

Usage:
    python3 scripts/grade_statement.py <source> <out.webp> [--width 1200]

The reference images are the three statement-*.webp files in public/services.
"""
import sys
import numpy as np
from PIL import Image

REFS = [
    'public/services/statement-aios.webp',
    'public/services/statement-localai.webp',
    'public/services/statement-appdesign.webp',
]

# ---- sRGB <-> CIE-LAB (D65) --------------------------------------------------
_M = np.array([[0.4124564, 0.3575761, 0.1804375],
               [0.2126729, 0.7151522, 0.0721750],
               [0.0193339, 0.1191920, 0.9503041]], dtype=np.float64)
_Mi = np.linalg.inv(_M)
_WHITE = np.array([0.95047, 1.0, 1.08883])


def _srgb_to_lin(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def _lin_to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * (c ** (1 / 2.4)) - 0.055) * 255.0


def _f(t):
    d = 6 / 29
    return np.where(t > d ** 3, np.cbrt(t), t / (3 * d * d) + 4 / 29)


def _fi(t):
    d = 6 / 29
    return np.where(t > d, t ** 3, 3 * d * d * (t - 4 / 29))


def rgb_to_lab(rgb):
    lin = _srgb_to_lin(rgb.astype(np.float64))
    xyz = lin @ _M.T / _WHITE
    fx, fy, fz = _f(xyz[..., 0]), _f(xyz[..., 1]), _f(xyz[..., 2])
    L = 116 * fy - 16
    a = 500 * (fx - fy)
    b = 200 * (fy - fz)
    return np.stack([L, a, b], axis=-1)


def lab_to_rgb(lab):
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]
    fy = (L + 16) / 116
    fx = fy + a / 500
    fz = fy - b / 200
    xyz = np.stack([_fi(fx), _fi(fy), _fi(fz)], axis=-1) * _WHITE
    lin = xyz @ _Mi.T
    return _lin_to_srgb(lin)


def pooled_stats(paths):
    labs = []
    for p in paths:
        im = np.asarray(Image.open(p).convert('RGB'))
        labs.append(rgb_to_lab(im).reshape(-1, 3))
    allpx = np.concatenate(labs, 0)
    return allpx.mean(0), allpx.std(0)


def vignette(h, w, strength=0.42, radius=0.72):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
    cx, cy = (w - 1) / 2, (h - 1) / 2
    d = np.sqrt(((xx - cx) / (w / 2)) ** 2 + ((yy - cy) / (h / 2)) ** 2)
    v = np.clip((d - radius) / (np.sqrt(2) - radius), 0, 1)
    return 1.0 - v ** 1.7 * strength


def main():
    src, out = sys.argv[1], sys.argv[2]
    width = 1200
    if '--width' in sys.argv:
        width = int(sys.argv[sys.argv.index('--width') + 1])

    tmean, tstd = pooled_stats(REFS)

    im = Image.open(src).convert('RGB')
    if im.width != width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    rgb = np.asarray(im).astype(np.float64)
    lab = rgb_to_lab(rgb)

    smean = lab.reshape(-1, 3).mean(0)
    sstd = lab.reshape(-1, 3).std(0)

    # Reinhard transfer toward the statement look.
    graded = (lab - smean) * (tstd / np.maximum(sstd, 1e-6)) + tmean

    # Nudge a touch darker + a hair less chroma so it sits with the others,
    # and keep shadows from going muddy.
    graded[..., 0] *= 0.96
    graded[..., 1:] *= 0.94

    out_rgb = lab_to_rgb(graded)

    # Soft vignette to match the baked-in edge fall-off of the references.
    v = vignette(out_rgb.shape[0], out_rgb.shape[1])[..., None]
    out_rgb = out_rgb * v

    out_rgb = np.clip(out_rgb, 0, 255).astype(np.uint8)
    Image.fromarray(out_rgb).save(out, 'WEBP', quality=82, method=6)
    print(f"wrote {out}  ({out_rgb.shape[1]}x{out_rgb.shape[0]})")


if __name__ == '__main__':
    main()
