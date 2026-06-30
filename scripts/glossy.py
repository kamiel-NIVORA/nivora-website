import numpy as np
from PIL import Image, ImageOps

def glossy_columns(src, out, target=(1200,900), n=72, reg=(0.10,0.10,0.90,0.95), seed=7, alpha=0.92, fmt="WEBP", quality=88):
    """Reusable 'glass slats' effect: slices a centred region into vertical glass
    blades that refract a vertically-streaked copy of the scene, with jagged
    (spiky) tops and a dripping bottom. Works on any photo."""
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
        dy=(0.16*rh)+(0.12*rh)*np.sin(2*np.pi*t*6+0.4)+(0.07*rh)*np.sin(2*np.pi*t*13+1.1)+(0.06*rh)*(rng.random()-0.5)
        scale=1.12+0.18*(0.5+0.5*np.sin(2*np.pi*t*5+0.7))
        src_y=(yy-cy)/scale+cy+dy
        syi=np.round(src_y).astype(int); valid=(syi>=0)&(syi<=rh-1)
        transformed=R[np.clip(syi,0,rh-1)][:,xa:xb,:]; orig=R[:,xa:xb,:]
        bl=orig*(1-alpha)+transformed*alpha; bl[~valid]=orig[~valid]
        top=(0.03+0.17*(0.5+0.5*np.sin(2*np.pi*t*8+0.9))+0.05*(rng.random()-0.5))*rh
        bot=(0.90+0.09*np.sin(2*np.pi*t*7+2.0)+0.04*(rng.random()-0.5))*rh
        outside=(yy<top)|(yy>bot); bl[outside]=orig[outside]
        bl=bl*(0.88+0.10*np.sin(2*np.pi*t*9+0.3))
        gx=np.linspace(-1,1,xb-xa); gloss=(1.0+0.18*np.exp(-(gx**2)/0.05))[None,:,None]
        bl=np.clip(bl*gloss,0,255); bl[:,0,:]*=0.45
        if xb-xa>2: bl[:,-1,:]=np.clip(bl[:,-1,:]*1.3,0,255)
        out_a[y0:y1,xa+x0:xb+x0,:]=bl
    Image.fromarray(np.clip(out_a,0,255).astype("uint8")).save(out, fmt, quality=quality, method=6)
    return out

if __name__ == "__main__":
    jobs = [
        ("public/IMG_0883.jpg","public/services/timeline-1.webp",3),
        ("public/IMG_0890.jpg","public/services/timeline-2.webp",11),
        ("public/IMG_0896.JPG","public/services/timeline-3.webp",19),
        ("public/IMG_0887.jpg","public/services/timeline-4.webp",27),
    ]
    import os
    for s,o,sd in jobs:
        glossy_columns(s,o,seed=sd); print("wrote",o,os.path.getsize(o),"bytes")
