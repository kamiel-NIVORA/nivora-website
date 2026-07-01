import numpy as np
from PIL import Image, ImageOps

def glossy_columns(src, out, target=(1200,900), n=40, reg=(0.11,0.13,0.87,0.90), seed=7, alpha=0.62, fmt="WEBP", quality=90):
    """Reusable 'sheared glass slats' effect matching the reference photo: a clean
    semi-transparent glass pane over the image, sliced into vertical slats. Each
    slat vertically SHEARS the scene (a linear ramp of vertical offset across the
    slat width, tooth height ~ slat width) so horizontal edges become a fine ~45deg
    sawtooth comb, not spikes. Bright glass seams between slats."""
    im = ImageOps.fit(Image.open(src).convert("RGB"), target, method=Image.LANCZOS, centering=(0.5,0.5))
    a = np.asarray(im).astype(np.float32); W,H = im.size
    x0,y0,x1,y1 = int(reg[0]*W),int(reg[1]*H),int(reg[2]*W),int(reg[3]*H)
    rw,rh = x1-x0,y1-y0; cy = rh/2; sw = rw/n
    R = a[y0:y1,x0:x1].copy(); out_a = a.copy()
    rng = np.random.default_rng(seed); yy = np.arange(rh).astype(np.float32)
    for i in range(n):
        xa=int(round(i*sw)); xb=int(round((i+1)*sw)); w=xb-xa
        if w<=0: continue
        base=(0.02*rh)+(0.02*rh)*np.sin(2*np.pi*(i/n)*3+0.3)+(0.01*rh)*(rng.random()-0.5)
        ramp=w*(1.4+0.4*(rng.random()-0.5))
        xf=(np.arange(w)+0.5)/w-0.5
        off=base+ramp*xf
        src_y=yy[:,None]+off[None,:]
        syi=np.clip(np.round(src_y).astype(int),0,rh-1); cols=np.arange(xa,xb)
        transformed=R[syi,cols[None,:],:]; orig=R[:,xa:xb,:]
        bl=orig*(1-alpha)+transformed*alpha
        bl[:,-1,:]=np.clip(bl[:,-1,:]*1.24,0,255)
        out_a[y0:y1,xa+x0:xb+x0,:]=bl
    pane=out_a[y0:y1,x0:x1,:]; out_a[y0:y1,x0:x1,:]=np.clip(pane*(1.0+0.03*np.linspace(1,-1,rh)[:,None,None])+4,0,255)
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
