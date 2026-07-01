import numpy as np
from PIL import Image, ImageOps, ImageFilter

def _vblur(a,k):
    if k<1: return a
    h=a.shape[0]; pad=np.pad(a,((k,k),(0,0),(0,0)),mode="edge")
    cs=np.cumsum(pad,axis=0); cs=np.pad(cs,((1,0),(0,0),(0,0))); win=2*k+1
    return (cs[win:win+h]-cs[0:h])/win

def glossy_columns(src, out, target=(1200,900), n=40, reg=(0.11,0.13,0.87,0.90), seed=7,
                   alpha=0.62, vblur=16, gblur=2.4, fmt="WEBP", quality=90):
    """Reusable soft 'sheared glass slats' effect matching the reference photo: a
    semi-transparent glass pane, sliced into vertical slats each vertically SHEARED
    (offset ramps across the slat width, tooth height ~ slat width) so edges become
    a fine ~45deg sawtooth comb (not spikes). A strong VERTICAL motion blur makes
    the fine vertical streaks and a gaussian blur gives the dreamy soft shimmer."""
    im = ImageOps.fit(Image.open(src).convert("RGB"), target, method=Image.LANCZOS, centering=(0.5,0.5))
    a = np.asarray(im).astype(np.float32); W,H = im.size
    x0,y0,x1,y1 = int(reg[0]*W),int(reg[1]*H),int(reg[2]*W),int(reg[3]*H)
    rw,rh = x1-x0,y1-y0; sw = rw/n
    R = a[y0:y1,x0:x1].copy(); out_a = a.copy()
    rng = np.random.default_rng(seed); yy = np.arange(rh).astype(np.float32)
    for i in range(n):
        xa=int(round(i*sw)); xb=int(round((i+1)*sw)); w=xb-xa
        if w<=0: continue
        base=(0.02*rh)+(0.02*rh)*np.sin(2*np.pi*(i/n)*3+0.3)+(0.01*rh)*(rng.random()-0.5)
        ramp=w*(1.4+0.4*(rng.random()-0.5)); xf=(np.arange(w)+0.5)/w-0.5; off=base+ramp*xf
        syi=np.clip(np.round(yy[:,None]+off[None,:]).astype(int),0,rh-1); cols=np.arange(xa,xb)
        bl=R[:,xa:xb,:]*(1-alpha)+R[syi,cols[None,:],:]*alpha
        bl[:,-1,:]=np.clip(bl[:,-1,:]*1.24,0,255)
        out_a[y0:y1,xa+x0:xb+x0,:]=bl
    pane=_vblur(out_a[y0:y1,x0:x1,:], vblur)
    pane=np.asarray(Image.fromarray(np.clip(pane,0,255).astype("uint8")).filter(ImageFilter.GaussianBlur(gblur))).astype(np.float32)
    out_a[y0:y1,x0:x1,:]=np.clip(pane*(1.0+0.03*np.linspace(1,-1,rh)[:,None,None])+4,0,255)
    for xe in (x0,x1-1): out_a[y0:y1,xe,:]=np.clip(out_a[y0:y1,xe,:]*1.3,0,255)
    for ye in (y0,y1-1): out_a[ye,x0:x1,:]=np.clip(out_a[ye,x0:x1,:]*1.3,0,255)
    Image.fromarray(np.clip(out_a,0,255).astype("uint8")).save(out, fmt, quality=quality, method=6)
    return out

if __name__ == "__main__":
    import os
    for s,o,sd in [("public/IMG_0883.jpg","public/services/timeline-1.webp",3),
                   ("public/IMG_0890.jpg","public/services/timeline-2.webp",11),
                   ("public/IMG_0896.JPG","public/services/timeline-3.webp",19),
                   ("public/IMG_0887.jpg","public/services/timeline-4.webp",27)]:
        glossy_columns(s,o,seed=sd); print("wrote",o,os.path.getsize(o))
