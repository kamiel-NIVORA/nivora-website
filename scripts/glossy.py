import numpy as np
from PIL import Image, ImageOps

def glossy_columns(src, out, target=(1200,940), n=130, reg=(0.11,0.12,0.87,0.92), seed=7, alpha=0.60, fmt="WEBP", quality=90):
    """Reusable semi-transparent 'fluted glass' effect: a clean rectangular glass
    pane over the photo, sliced into many thin vertical flutes that each refract a
    vertically-stretched, upward-shifted copy of the scene. Internal horizontal
    edges (ridge lines, horizons) become fine sawtooth spikes; the pane stays
    see-through. Matches the reference glass-slat photo."""
    im = ImageOps.fit(Image.open(src).convert("RGB"), target, method=Image.LANCZOS, centering=(0.5,0.5))
    a = np.asarray(im).astype(np.float32); W,H = im.size
    x0,y0,x1,y1 = int(reg[0]*W),int(reg[1]*H),int(reg[2]*W),int(reg[3]*H)
    rw,rh = x1-x0,y1-y0; cy = rh/2
    R = a[y0:y1,x0:x1].copy(); out_a = a.copy()
    rng = np.random.default_rng(seed); sw = rw/n; yy = np.arange(rh).astype(np.float32)
    for i in range(n):
        xa=int(round(i*sw)); xb=int(round((i+1)*sw))
        if xb<=xa: continue
        t=i/n
        dy=(0.11*rh)+(0.10*rh)*np.sin(2*np.pi*t*5+0.4)+(0.07*rh)*np.sin(2*np.pi*t*11+1.1)+(0.06*rh)*(rng.random()-0.5)
        scale=1.16+0.14*(0.5+0.5*np.sin(2*np.pi*t*7+0.7))
        src_y=(yy-cy)/scale+cy+dy
        syi=np.round(src_y).astype(int); over=(syi>rh-1)
        transformed=R[np.clip(syi,0,rh-1)][:,xa:xb,:]; orig=R[:,xa:xb,:]
        bl=orig*(1-alpha)+transformed*alpha; bl[over]=orig[over]
        bl[:,0,:]*=0.72
        if xb-xa>1: bl[:,-1,:]=np.clip(bl[:,-1,:]*1.12,0,255)
        out_a[y0:y1,xa+x0:xb+x0,:]=bl
    pane=out_a[y0:y1,x0:x1,:]
    sheen=1.0+0.05*np.linspace(1,-1,rh)[:,None,None]
    out_a[y0:y1,x0:x1,:]=np.clip(pane*sheen+6,0,255)
    for xe in (x0,x1-1): out_a[y0:y1,xe,:]=np.clip(out_a[y0:y1,xe,:]*1.4,0,255)
    for ye in (y0,y1-1): out_a[ye,x0:x1,:]=np.clip(out_a[ye,x0:x1,:]*1.4,0,255)
    Image.fromarray(np.clip(out_a,0,255).astype("uint8")).save(out, fmt, quality=quality, method=6)
    return out

if __name__ == "__main__":
    import os
    for s,o,sd in [("public/IMG_0883.jpg","public/services/timeline-1.webp",3),
                   ("public/IMG_0890.jpg","public/services/timeline-2.webp",11),
                   ("public/IMG_0896.JPG","public/services/timeline-3.webp",19),
                   ("public/IMG_0887.jpg","public/services/timeline-4.webp",27)]:
        glossy_columns(s,o,seed=sd); print("wrote",o,os.path.getsize(o))
