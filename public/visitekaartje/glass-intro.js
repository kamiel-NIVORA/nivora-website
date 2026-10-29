(()=>{var H={tileSize:256,logoScale:.7,finalScale:.69,logoOffset:[0,0],iconPlate:!1,keepPlate:!1,originalColors:!1,opticalDepth:1.1,dispersion:1.7,colorBleed:1.25,doubleBevel:1,bevelWidth:.14,corner:4.8,cornerPull:2.1,cornerWidth:2.2,cornerFocus:.58,edgeSmear:2.85,stretch:0,tilt:.35,bulge:1,specular:1,halo:0,shadow:1,ripple:1,bounce:0,response:.42,startSize:.2,startZoom:2.6,glide:2.3,present:2.4,drift:.12,swell:.5,focus:1,sheen:1,lightTurn:.9,hold:1,background:"#e9e9eb",plateColor:"#ffffff",logoColor:"#0e1428"},j={light:H,dark:{...H,logoScale:.72,finalScale:1,iconPlate:!0,halo:1,shadow:0,ripple:.5,startZoom:1.6,drift:.05,opticalDepth:.75,bevelWidth:.22,dispersion:.9,colorBleed:.45,corner:5,cornerPull:1.4,edgeSmear:1.2,tilt:0,cornerWidth:1.2,cornerFocus:.4,background:"#000000",plateColor:"#05070b",logoColor:"#ffffff"}},u=1024,Q=.75;function se(t){return new Promise((e,a)=>{let o=new Image;t.startsWith("data:")||(o.crossOrigin="anonymous"),o.onload=()=>e(o),o.onerror=()=>a(new Error("GlassIconReveal: the logo could not be loaded")),o.src=t})}function ie(t){return t.trimStart().startsWith("<")}function ue(t){let e=new DOMParser().parseFromString(t,"image/svg+xml").documentElement;if(!e||e.nodeName.toLowerCase()!=="svg")throw new Error("GlassIconReveal: the SVG could not be read");let a=parseFloat(e.getAttribute("width")||""),o=parseFloat(e.getAttribute("height")||""),n=(e.getAttribute("viewBox")||"").split(/[\s,]+/).map(Number);n.length===4&&n[2]>0&&n[3]>0&&([a,o]=[n[2],n[3]]),a>0&&o>0||(a=o=100);let r=u/Math.max(a,o);e.setAttribute("width",String(Math.round(a*r))),e.setAttribute("height",String(Math.round(o*r)));let f=new XMLSerializer().serializeToString(e).replace(/currentColor/g,"#ffffff");return"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(f)}var ce=t=>ie(t)?ue(t):t;function fe(t,e,a){let o=document.createElement("canvas");o.width=o.height=u;let n=o.getContext("2d",{willReadFrequently:!0}),r=Math.min(u/e,u/a),f=(u-e*r)/2,i=(u-a*r)/2;n.drawImage(t,f,i,e*r,a*r);let s=n.getImageData(0,0,u,u).data,m=!0;for(let c=3;c<s.length;c+=4*97)if(s[c]<250){m=!1;break}let l=[s[0],s[1],s[2]],g=(c,x,v)=>Math.min(1,Math.max(0,(Math.hypot(c-l[0],x-l[1],v-l[2])/441-.08)/.2)),p=u,b=u,d=-1,w=-1;for(let c=0;c<u;c++)for(let x=0;x<u;x++){let v=(c*u+x)*4;(m?g(s[v],s[v+1],s[v+2])*255:s[v+3])>8&&(x<p&&(p=x),x>d&&(d=x),c<b&&(b=c),c>w&&(w=c))}if(d<0)throw new Error("GlassIconReveal: the logo is empty");let h=d-p+1,E=w-b+1,L=u*Q/Math.max(h,E),y=document.createElement("canvas");y.width=y.height=u;let A=y.getContext("2d",{willReadFrequently:!0});if(A.imageSmoothingQuality="high",A.drawImage(t,u/2-(p+h/2-f)*L,u/2-(b+E/2-i)*L,e*r*L,a*r*L),m){let c=A.getImageData(0,0,u,u),x=c.data;for(let v=0;v<x.length;v+=4)x[v+3]=Math.round(x[v+3]*g(x[v],x[v+1],x[v+2]));A.putImageData(c,0,0)}return y}function me(t){let e=u*u,a=t.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,u,u).data,o=1e20,n=new Float64Array(e),r=new Float64Array(e);for(let l=0;l<e;l++){let g=a[l*4+3]/255;if(g>=1)n[l]=0,r[l]=o;else if(g<=0)n[l]=o,r[l]=0;else{let p=.5-g;n[l]=p>0?p*p:0,r[l]=p<0?p*p:0}}let f=new Float64Array(u),i=new Float64Array(u+1),s=new Uint16Array(u);X(n,f,s,i,o),X(r,f,s,i,o);let m=new Float32Array(e);for(let l=0;l<e;l++)m[l]=(Math.sqrt(n[l])-Math.sqrt(r[l]))/u;return m}function X(t,e,a,o,n){for(let r=0;r<u;r++)K(t,r,u,e,a,o,n);for(let r=0;r<u;r++)K(t,r*u,1,e,a,o,n)}function K(t,e,a,o,n,r,f){n[0]=0,r[0]=-f,r[1]=f,o[0]=t[e];for(let i=1,s=0,m=0;i<u;i++){o[i]=t[e+i*a];let l=i*i;do{let g=n[s];m=(o[i]-o[g]+l-g*g)/(i-g)/2}while(m<=r[s]&&--s>-1);s++,n[s]=i,r[s]=m,r[s+1]=f}for(let i=0,s=0;i<u;i++){for(;r[s+1]<i;)s++;let m=n[s],l=i-m;t[e+i*a]=o[m]+l*l}}var P=new Map;function J(t){let e=P.get(t);return e||(e=se(ce(t)).then(a=>{let o=fe(a,a.naturalWidth||u,a.naturalHeight||u);return{canvas:o,sdf:me(o)}}),P.set(t,e),e.catch(()=>P.delete(t))),e}var de=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,he=`#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uCenter;      // device px, GL coords
uniform float uTile;       // tile size, device px
uniform sampler2D uSdf;    // signed distance, texture units, + outside
uniform sampler2D uCol;    // premultiplied colour, mipmapped
uniform float uTexSize;
uniform float uBoxFrac;

uniform float uPlateScale; // plate size relative to the tile
uniform float uShapeN;     // superellipse exponent: 2 = circle
uniform float uCornerN;    // final exponent, used by the ghost
uniform float uOptics;     // 1 = full refraction, 0 = flat
uniform float uPlateAlpha; // 1 = glass shown, 0 = bare logo
uniform float uLogoHalf;   // logo half size in plate units (zoom included)
uniform vec2 uLogoOff;     // logo centre, plate units
uniform float uBold;       // stroke swell, in logo half-size units
uniform float uBlur;       // edge softness, plate units
uniform float uFrost;      // milky lift inside a young bubble
uniform float uDome;       // lens bulge height
uniform float uDrop;       // 1 while the glass is a round droplet, 0 once it has spread into the tile
uniform float uPinch;      // the face's stretch toward its corners, at the rim
uniform float uTilt;       // extra stretch of the rising diagonal's corners (0\u20131)
uniform float uRim;
uniform float uHalo;
uniform float uShadow;
uniform float uGhost;
uniform float uRipR;       // ripple radius, plate sizes
uniform float uRipA;
uniform float uBare;       // 1 once the logo may show without glass (the ending)
uniform float uReach;      // the rim band's full width, plate units
uniform float uCornerPull; // how much harder the corners pull than the sides
uniform float uStreak;     // how far a corner smears content along the rim, in band widths
uniform float uWiden;      // how much wider the folding band grows toward the corners
uniform float uSlab;       // how far the slab stands above the logo, plate units
uniform float uEtaSpread;  // index spread across the spectrum (red highest)
uniform float uFocus;      // how far in along the diagonal a corner focuses, plate units
uniform float uFocusK;     // how quickly the view slides back from the focus across the band
uniform float uFocusSplit; // how much further in red meets than violet, plate units
uniform float uRimLine;    // how far across the band the sight line takes to turn in to the focus
uniform float uCornerOn;   // 0 while the glass is round, 1 once it has spread into the tile
uniform float uDissolve;   // 0 \u2192 1 as the glass lets go of the logo
uniform float uGlow;       // colour bleed in the rim, plate units on screen
uniform float uFaceDisp;   // lateral colour across the face
uniform float uVivid;      // chroma lift of the dispersed light

uniform float uDisp;
uniform float uDouble;
uniform float uBevelW;
uniform float uSpec;
uniform float uIconPlate;
uniform float uUseColor;
uniform float uLightScene; // 1 = light backdrop, 0 = dark
uniform float uLightGlass; // the same for what the glass sits on (the plate, when there is one)
uniform float uKeep;       // 1 = the glass settles into a flat plate instead of letting go of it
uniform float uSheen;      // strength of the light band crossing the face
uniform float uSweep;      // where that band is, plate sizes along its diagonal
uniform float uLightAng;   // how far the rim light has turned, radians

uniform vec3 uBg;
uniform vec3 uPlateCol;
uniform vec3 uLogoCol;

float px; // one device pixel in plate units

vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }

// aa: footprint of one screen pixel at q, plate units.
vec4 logoAt(vec2 q, float blur, float aa) {
  float L = uLogoHalf;
  float k = 0.5 * uBoxFrac / L;
  vec2 uv = vec2(0.5 + (q.x - uLogoOff.x) * k, 0.5 - (q.y - uLogoOff.y) * k);
  float d = texture(uSdf, uv).r / k;
  float w = 0.75 * aa + blur;
  float a = 1.0 - smoothstep(-w, w, d - uBold * L);
  vec3 c = uLogoCol;
  if (uUseColor > 0.5) {
    float lod = log2(max(1.0, w * k * uTexSize));
    vec4 c0 = textureLod(uCol, uv, lod);
    vec4 c1 = textureLod(uCol, uv, lod + 3.0);
    vec4 c2 = textureLod(uCol, uv, 7.0);
    c = c2.rgb / max(c2.a, 1e-4);
    c = mix(c, c1.rgb / max(c1.a, 1e-4), smoothstep(0.0, 0.06, c1.a));
    c = mix(c, c0.rgb / max(c0.a, 1e-4), smoothstep(0.02, 0.3, c0.a));
  }
  return vec4(c, a);
}

// Superellipse field. Returns signed distance (plate units, \u2212 inside); g = 1 on the rim.
float shape(vec2 p, float scale, float n, out vec2 nOut, out float g, out vec2 dg) {
  vec2 pp = p / scale;
  vec2 a = max(abs(pp), vec2(1e-6));
  g = pow(pow(a.x, n) + pow(a.y, n), 1.0 / n);
  dg = sign(pp) * pow(a, vec2(n - 1.0)) * pow(max(g, 1e-6), 1.0 - n);
  float dgl = max(length(dg), 1e-6);
  nOut = dg / dgl;
  return (g - 1.0) / dgl * scale;
}

// Curvature radius (plate units) of the shape's contour through p.
float contourRadius(vec2 p, float scale, float n) {
  vec2 a = max(abs(p / scale), vec2(1e-4));
  vec2 a1 = pow(a, vec2(n - 1.0));
  vec2 a2 = pow(a, vec2(n - 2.0));
  float k = (n - 1.0) * (a2.x * a1.y * a1.y + a2.y * a1.x * a1.x) / pow(max(dot(a1, a1), 1e-30), 1.5);
  return scale / max(k, 1e-3);
}

// Where the glass at x = s / bwF across its rounded edge looks: a slab uSlab above the logo with a
// quarter-round edge of radius bwF. A straight-down sight line bends inward by Snell's law, so the
// outer rim looks deepest and the view eases back to the face across the edge.
vec2 refractSample(float x, float bwF, float eta, float R, vec2 dirOut, vec2 p, float dome, float offMul) {
  float u = clamp(1.0 - x, 0.0, 0.995);
  float th = asin(u), thr = asin(u / eta);
  float z = uSlab + bwF * sqrt(1.0 - u * u);
  float off = offMul * z * tan(th - thr);
  off = off / (1.0 + off / (6.0 * R));
  return p - (dirOut * off + p * dome) * uOptics;
}

float gauss(float x, float c, float w) { float d = (x - c) / w; return exp(-0.5 * d * d); }
float band(float x, float a, float b, float w) { return smoothstep(a - w, a, x) * (1.0 - smoothstep(b, b + w, x)); }

// Visible spectrum, red (0) to violet (1).
float bump(float x, float c, float w) { float d = (x - c) / w; return exp(-0.5 * d * d); }
vec3 spectrum(float x) {
  return vec3(bump(x, 0.34, 0.2) + 0.08 * bump(x, 0.93, 0.05), bump(x, 0.58, 0.1), bump(x, 0.8, 0.11));
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  px = 2.0 / uTile;
  vec2 p = (gl_FragCoord.xy - uCenter) * px;

  vec4 lg = logoAt(p, uBlur, px);
  vec3 plain = mix(uBg, lg.rgb, lg.a * uBare);

  vec2 nOut, dg; float g;
  float sd = shape(p, uPlateScale, uShapeN, nOut, g, dg);
  float s = -sd;
  float bw = max(uBevelW, 0.004) * uPlateScale;
  float x = clamp(s / bw, 0.0, 1.0);
  float R = contourRadius(p, uPlateScale, uShapeN);
  vec2 pq = p * p;
  float diag = 4.0 * pq.x * pq.y / max((pq.x + pq.y) * (pq.x + pq.y), 1e-6);
  float tilt = mix(1.0 - uTilt, 1.0, smoothstep(-0.02, 0.02, p.x * p.y));
  float pinchPart = uPinch * min(g * g, 1.0) * diag * diag * tilt;
  float dome = uDome * (1.0 - min(g * g, 1.0)) + pinchPart;
  vec2 dirOut = normalize(mix(nOut, p / max(length(p), 1e-4), 0.2));
  // Rounded corners curve both ways, so they draw content in from deeper than the sides.
  float cornerness = max(smoothstep(0.1, 0.9, 4.0 * nOut.x * nOut.x * nOut.y * nOut.y), smoothstep(0.15, 0.75, diag));
  float offMul = 1.0 + 0.4 * max(uCornerPull - 1.0, 0.0) * tilt * cornerness * uCornerOn;
  // Around a corner every sight line meets at one focus a little way in along the diagonal.
  vec2 focus = sign(p) * (pow(0.5, 1.0 / uShapeN) - uFocus * 0.70710678) * uPlateScale;
  float focusW = tilt * cornerness * uOptics * uCornerOn;
  float bwF = max(uReach, 0.004) * (1.0 + uWiden * tilt * cornerness * uCornerOn);
  float xf = clamp(s / bwF, 0.0, 1.0);
  // Footprint of one pixel after refraction, measured in uniform control flow.
  vec2 qc = refractSample(xf, bwF, 1.5, R, dirOut, p, dome, offMul);
  float foot = max(max(length(dFdx(qc)), length(dFdy(qc))), 0.25 * px);

  // Backdrop: anticipation ghost, ripple, soft lift shadow and glow.
  vec3 bg = uBg;
  vec3 lift = mix(uBg + vec3(0.06), mix(uBg, vec3(1.0), 0.55), uLightScene);
  if (uGhost > 0.001) {
    vec2 gn, gdg; float gg;
    float gsd = shape(p, 1.0, uCornerN, gn, gg, gdg);
    bg = mix(bg, lift, uGhost * 0.12 * (1.0 - smoothstep(-0.16, 0.14, gsd)));
    bg *= 1.0 - uGhost * 0.03 * uLightScene * exp(-max(gsd, 0.0) / 0.12) * step(0.0, gsd);
  }
  float outside = max(sd, 0.0);
  if (uRipA > 0.001) {
    float d0 = (uRipR - 1.0) * uPlateScale;
    float rx = (sd - d0) / 0.022;
    float ring = exp(-rx * rx);
    bg += uRipA * ring * (0.04 * (0.55 + 0.45 * dot(nOut, normalize(vec2(-0.5, 0.8))))) * mix(0.5, 1.0, uLightScene);
    bg -= uRipA * 0.016 * uLightScene * exp(-(rx - 1.6) * (rx - 1.6));
  }
  float shadowFall = max(sd, 0.0) / (0.9 * uPlateScale);
  bg *= 1.0 - uShadow * 0.03 * exp(-shadowFall * shadowFall) * step(0.0, sd);
  vec3 haloCol = mix(vec3(0.62, 0.69, 0.80), vec3(1.0), uLightScene);
  bg = mix(bg, haloCol, clamp(uHalo * (0.30 * exp(-outside / (0.025 * uPlateScale)) + 0.07 * exp(-outside / (0.12 * uPlateScale))), 0.0, 1.0) * step(0.0, sd));

  vec3 col = bg;
  float soft = px + uBlur * 0.8 + 0.06 * uDissolve * (1.0 - uKeep) * uPlateScale;
  if (sd < soft) {
    // Lighting surface: a superellipse quarter, flat toward the face and steep at the rim.
    float y1 = 1.0 - x;
    const float K = 2.6;
    float base1 = max(1.0 - pow(y1, K), 1e-4);
    float db = min(pow(y1, K - 1.0) * pow(base1, 1.0 / K - 1.0), 25.0);
    // A second, lower step just inside the first draws the faint inner line.
    float s1 = bw * 0.62;
    float w2 = bw * 0.22;
    float t2 = clamp((s - s1) / w2, -1.0, 1.0);
    float dh2 = uDouble * bw * 0.16;
    float dd = dh2 * 0.5 * cos(t2 * 1.5707963) * 1.5707963 / w2 * step(abs(t2), 0.999);
    vec2 gDome = -uDome * 2.0 * g * dg * step(g, 1.0);
    vec2 grad = -(db + dd) * nOut + gDome;

    vec3 back = mix(uBg, uPlateCol, uIconPlate);
    vec3 liftG = mix(back + vec3(0.06), mix(back, vec3(1.0), 0.55), uLightGlass);
    float rblur = uBlur + 0.05 * length(qc - p) + min(uGlow * uOptics * (1.0 - xf) * foot / px, 0.04);

    // Each wavelength refracts by its own index, so everything the edge draws in fans into colour
    // while the face stays crisp. Around a corner the samples also smear along the rim.
    float cornerW = smoothstep(0.1, 0.9, 4.0 * nOut.x * nOut.x * nOut.y * nOut.y);
    float streak = 0.35 * uStreak * bw * mix(0.15, 1.0, cornerW) * pow(1.0 - xf, 1.5) * uOptics;
    vec2 tangent = vec2(-nOut.y, nOut.x);
    vec3 acc = vec3(0.0), wsum = vec3(0.0);
    for (int i = 0; i < 20; i++) {
      float lam = (float(i) + 0.5) / 20.0;
      float c = uDisp * (1.0 - 2.0 * lam);
      vec2 along = tangent * (streak * 2.0 * (fract(float(i) * 0.618034 + 0.31) - 0.5));
      float cf = uDisp * (1.0 - 2.0 * lam) * (lam > 0.5 ? 1.0 : 0.5);
      vec2 sp = refractSample(xf, bwF, 1.5 + uEtaSpread * c, R, dirOut, p + along,
                              dome + pinchPart * 0.3 * c, offMul);
      vec2 focusL = focus - sign(p) * (0.70710678 * uFocusSplit * c * uPlateScale);
      float wFocus = pow(1.0 - xf, uFocusK) * smoothstep(0.0, uRimLine * (1.0 + 0.6 * c), xf);
      sp = mix(sp, mix(p + along, focusL, wFocus), focusW);
      float faceOnly = smoothstep(0.7, 1.0, xf) * uOptics;
      sp *= 1.0 + uFaceDisp * cf * faceOnly;
      vec4 l = logoAt(sp, rblur + 0.12 * streak + uFaceDisp * 0.5 * max(c, 0.0) * faceOnly, foot);
      vec3 w = spectrum(lam);
      acc += mix(back, l.rgb, l.a) * w;
      wsum += w;
    }
    vec3 trans = acc / wsum;
    float tl = dot(trans, vec3(0.2126, 0.7152, 0.0722));
    trans = clamp(tl + (trans - tl) * (1.0 + uVivid * uOptics), 0.0, 1.0);
    // A young droplet is milky; the haze only ever lightens.
    float hazeLum = dot(trans, vec3(0.2126, 0.7152, 0.0722));
    float hazeGate = mix(1.0 - smoothstep(0.25, 0.75, hazeLum), smoothstep(0.25, 0.75, hazeLum), uLightGlass);
    trans = mix(trans, liftG, uFrost * 0.45 * hazeGate);

    float glassAmt = pow(1.0 - uDissolve, 1.5);
    float lit = uSpec * glassAmt;
    vec3 rimCol = mix(vec3(0.80, 0.87, 0.97), vec3(1.0), uLightGlass);

    // Light backdrop: the thick edge glows softly white over a clear face, with a hairline that is
    // bright along the top and right and a thin dark silhouette down the left and bottom.
    float sc = uPlateScale;
    float tLum = dot(trans, vec3(0.2126, 0.7152, 0.0722));
    float lightOnly = smoothstep(0.35, 0.85, tLum);
    float hw = smoothstep(-0.85, 0.5, dot(nOut, rot(vec2(0.5, 0.866), uLightAng)));
    float tileBand = band(s, 0.016 * sc, 0.075 * sc, 0.022 * sc);
    float dropBand = (1.0 - smoothstep(0.06 * sc, 0.13 * sc, s)) * smoothstep(0.0, 0.004 * sc, s);
    float glow = mix(0.32 * tileBand, 0.75 * dropBand, uDrop) * lightOnly;
    float edgeLine = gauss(s, 0.005 * sc, 0.0045 * sc);
    float lip = gauss(s, 0.15 * sc, 0.007 * sc) * uDouble * (1.0 - uDrop);
    vec3 lightGlass = mix(trans, vec3(1.0), glow * glassAmt);
    lightGlass += (0.075 * hw * edgeLine + 0.06 * (0.4 + 0.6 * hw) * lip) * lit;
    lightGlass *= 1.0 - 0.05 * (1.0 - hw) * edgeLine * glassAmt * (1.0 - uDrop);
    lightGlass = mix(lightGlass, vec3(1.0), 0.55 * uDrop * glassAmt * edgeLine);

    // Dark backdrop: a cool rim light that grows toward the steep edge, and a small key highlight.
    vec3 Nl = normalize(vec3(-grad, 1.0));
    float edge = 1.0 - Nl.z;
    vec2 ldir = rot(normalize(vec2(-0.62, 0.78)), uLightAng);
    float side = dot(nOut, ldir);
    float fres = pow(edge, 1.5);
    vec3 rim = rimCol * fres * (0.35 + 0.65 * max(side, -side * 0.8)) * uRim * 0.65;
    vec3 Hv = normalize(normalize(vec3(-0.45, 0.6, 0.66)) + vec3(0.0, 0.0, 1.0));
    float spc = pow(max(dot(Nl, Hv), 0.0), 140.0) * 0.8 * smoothstep(0.0, 0.25, y1);
    vec3 darkGlass = trans * (1.0 - 0.25 * fres) + (rim + vec3(spc)) * lit;
    darkGlass = mix(darkGlass, rimCol, uDrop * 0.4 * uSpec * (1.0 - smoothstep(0.0, 0.1 * uPlateScale, s)));
    vec3 glass = mix(darkGlass, lightGlass, uLightGlass);

    // While the glass holds the logo a soft band of light crosses the face, brightest near the rim.
    float sweepD = dot(p / uPlateScale, normalize(vec2(0.8, 0.6))) - uSweep;
    float sheen = uSheen * glassAmt * exp(-sweepD * sweepD / 0.03) * (0.55 + 0.45 * (1.0 - x));
    glass = mix(glass, vec3(1.0), sheen * mix(0.22, 0.42, uLightGlass));

    float cov = clamp(0.5 - sd / soft, 0.0, 1.0);
    col = mix(bg, glass, cov);
  }

  vec3 outc = mix(plain, col, uPlateAlpha);
  outc += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  outColor = vec4(outc, 1.0);
}`;function V(t){let e=t.getContext("webgl2",{antialias:!1,premultipliedAlpha:!1});if(!e)return null;let a=(d,w)=>{let h=e.createShader(d);if(e.shaderSource(h,w),e.compileShader(h),!e.getShaderParameter(h,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(h)||"shader");return h},o=e.createProgram();if(e.attachShader(o,a(e.VERTEX_SHADER,de)),e.attachShader(o,a(e.FRAGMENT_SHADER,he)),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(o)||"program");e.useProgram(o),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let n=e.getAttribLocation(o,"aPos");e.enableVertexAttribArray(n),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0);let r={},f=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let d=0;d<f;d++){let w=e.getActiveUniform(o,d);r[w.name]=e.getUniformLocation(o,w.name)}let i=e.createTexture(),s=e.createTexture();e.uniform1i(r.uSdf,0),e.uniform1i(r.uCol,1);let m=!1,l=d=>{e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,d),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)};function g(d){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.R16F,u,u,0,e.RED,e.FLOAT,d.sdf),l(e.LINEAR),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,s),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,d.canvas),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.generateMipmap(e.TEXTURE_2D),l(e.LINEAR_MIPMAP_LINEAR),m=!0}function p(d,w,h,E){if(m){e.viewport(0,0,w,h),e.uniform2f(r.uCenter,w/2,h/2),e.uniform1f(r.uTile,E),e.uniform1f(r.uTexSize,u),e.uniform1f(r.uBoxFrac,Q);for(let L in d){let y=d[L];typeof y=="number"&&r[L]&&e.uniform1f(r[L],y)}e.uniform3fv(r.uBg,d.uBg),e.uniform3fv(r.uPlateCol,d.uPlateCol),e.uniform3fv(r.uLogoCol,d.uLogoCol),e.uniform2fv(r.uLogoOff,d.uLogoOff),e.drawArrays(e.TRIANGLES,0,3)}}function b(){e.getExtension("WEBGL_lose_context")?.loseContext()}return{setLogo:g,render:p,dispose:b}}var ge=1.1,I=.5,q=t=>t.present+ge,k=t=>t<0?0:t>1?1:t,F=(t,e,a)=>t+(e-t)*a,S=(t,e,a)=>{let o=k((a-t)/(e-t));return o*o*(3-2*o)},U=(t,e,a)=>{let o=k((a-t)/(e-t));return o*o*o*(o*(o*6-15)+10)};function O(t){let e=t.replace("#","");e.length===3&&(e=e.replace(/./g,"$&$&"));let a=parseInt(e.slice(0,6),16)||0;return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]}var Y=([t,e,a])=>.2126*t+.7152*e+.0722*a;function R(t,e,a){if(t<=0)return 0;let o=2*Math.PI/e;if(a>=1)return 1-Math.exp(-o*t)*(1+o*t);let n=o*Math.sqrt(1-a*a);return 1-Math.exp(-a*o*t)*(Math.cos(n*t)+a*o/n*Math.sin(n*t))}var $=new Map;function Z(t,e,a){let o=`${t}/${e}/${a}`,n=$.get(o);if(n===void 0){let r=0,f=3;for(let i=0;i<40;i++){let s=(r+f)/2;R(s,e,a)<t?r=s:f=s}$.set(o,n=f)}return n}function pe(t,e,a=0){let o=e.present,n=e.keepPlate?1:0,r=1-e.bounce,f=R(t+.01,e.response,r),i=Z(.85,e.response,r)-.01,s=Z(.92,e.response,r)-.01,m=R(t-s,.4,1),l=1-S(.05,1,m),g=S(0,.08,t),p=e.drift*R(t-.3,2.2,1),b=.25*R(t,.7,1)+.75*U(0,e.glide,t),d=R(t-.5,2.4,1),w=R(t-o,.95,1),h=R(t-o-.05,.65,1),E=.15*e.bulge*(1-S(.4,.95,f)),L=(1+(e.startZoom-1)*(1-b))*(1-.045*d)*F(1,e.finalScale,w)*(1-.06*a),y=F(e.bevelWidth,Math.max(e.bevelWidth,.4),l),A=F(e.startSize,1,f)*(1+p)*(1+.14*h*(1-n))*(1-n*(.03*h+.06*a)),c=O(e.background);return{uPlateScale:A,uShapeN:F(2,e.corner,m),uCornerN:e.corner,uOptics:1-S(.55,1,h),uPlateAlpha:n?g*(1-a):g*(1-S(.45,1,h)),uLogoHalf:e.logoScale*L,uLogoOff:[e.logoOffset[0]*L,e.logoOffset[1]*L],uKeep:n,uSheen:e.sheen,uSweep:F(-1.6,1.6,U(.9,o-.1,t)),uLightAng:e.lightTurn*U(.4,o+.4,t),uBold:e.swell*.03*(1-b),uBlur:e.focus*.05*(1-S(.3,.95,f))+.03*a,uFrost:e.focus*(1-S(.5,.95,f)),uPinch:.38*e.stretch*S(.1,.9,m)*S(.75,.97,b),uTilt:e.tilt,uDome:E,uDrop:l,uRim:1+.8*l,uHalo:e.halo*(.5+.5*l)*(1-n*h),uShadow:Math.max(e.shadow*S(.45,.8,f)*(1-S(0,.6,m)),.8*e.shadow*n*h),uGhost:S(0,.03,t)*(1-S(.04,.08,t)),uRipR:1+.9*Math.max(0,t-i),uRipA:e.ripple*S(i,i+.06,t)*Math.exp(-Math.max(0,t-i)/.6),uBare:(1-n)*S(o-.25,o,t)*(1-a),uReach:y*A,uCornerPull:e.cornerPull,uStreak:e.edgeSmear,uWiden:e.cornerWidth,uSlab:.3*e.opticalDepth,uEtaSpread:.06,uFocus:e.cornerFocus,uFocusK:1,uFocusSplit:.056*e.colorBleed,uRimLine:.09,uCornerOn:S(.35,1,m),uGlow:.012*e.colorBleed,uFaceDisp:.012*e.dispersion,uVivid:.85,uDissolve:h,uDisp:e.dispersion,uDouble:e.doubleBevel,uBevelW:y*(1-h),uSpec:e.specular,uIconPlate:e.iconPlate?1:0,uUseColor:e.originalColors?1:0,uLightScene:Y(c)>.5?1:0,uLightGlass:Y(e.iconPlate?O(e.plateColor):c)>.5?1:0,uBg:c,uPlateCol:O(e.plateColor),uLogoCol:O(e.logoColor)}}function ee(t,e){let a=document.createElement("canvas");a.setAttribute("aria-hidden","true"),a.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block",t.appendChild(a);let o=null;try{o=V(a)}catch(c){console.error(c)}if(!o)return a.remove(),null;let n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=null,f=n?1.4:0,i=!n,s=0,m=0,l=!0,g=!1,p=!1,b=0,d=0;function w(c){b=0;let x=Math.min(.1,(c-d)/1e3);d=c;let{settings:v,loop:W,speed:ne,time:G}=e.current,D=q(v);if(G!==void 0)i=!1,f=G,m=k((G-D-Math.max(.05,v.hold))/I);else if(i&&r)if(s>0){s-=x;let C=m;m=k(1-s/I),s<=0&&(s=0,m=0,f=0),(m!==C||f===0)&&(l=!0)}else f+=x*ne,f>=D&&(f=D,W?s=Math.max(.05,v.hold)+I:i=!1),l=!0;if(l&&r&&o&&!p){let C=Math.min(window.devicePixelRatio||1,2),z=a.clientWidth,N=a.clientHeight,B=Math.max(1,Math.round(z*C)),_=Math.max(1,Math.round(N*C));(a.width!==B||a.height!==_)&&(a.width=B,a.height=_);let le=Math.min(v.tileSize,Math.min(z,N)/1.75);o.render(pe(Math.min(f,D),v,m),B,_,le*C),l=!1}g&&i&&r&&!p&&(b=requestAnimationFrame(w))}function h(){b||!g||p||(d=performance.now(),b=requestAnimationFrame(w))}let E=new IntersectionObserver(([c])=>{g=c.isIntersecting,g?h():b&&(cancelAnimationFrame(b),b=0)});E.observe(t);let L=new ResizeObserver(()=>{l=!0,h()});L.observe(t);let y=c=>{c.preventDefault(),p=!0},A=()=>{p=!1;try{o=V(a),o&&r&&o.setLogo(r)}catch(c){console.error(c)}l=!0,h()};return a.addEventListener("webglcontextlost",y),a.addEventListener("webglcontextrestored",A),{setLogo(c){r=c,o?.setLogo(c),n||(f=0,i=!0,s=0,m=0),l=!0,h()},replay(){f=0,i=!0,s=0,m=0,l=!0,h()},invalidate(){l=!0,h()},dispose(){b&&cancelAnimationFrame(b),E.disconnect(),L.disconnect(),a.removeEventListener("webglcontextlost",y),a.removeEventListener("webglcontextrestored",A),o?.dispose(),a.remove()}}}var be=1.5,te=1.2,oe="#060606",ve="/visitekaartje/nivora-merkteken-wit.svg",re=document.documentElement,T=document.querySelector("[data-intro]"),ae=T?.querySelector("[data-stage]");function M(t){!T||T.dataset.done||(T.dataset.done="1",re.classList.remove("intro"),document.dispatchEvent(new Event("introend")),T.classList.add("out"),setTimeout(()=>{t?.dispose(),T.remove()},600))}if(T&&ae&&re.classList.contains("intro")){let t={...j.dark,background:oe,plateColor:oe,originalColors:!0,tileSize:168,present:be,glide:1.4},e=ee(ae,{current:{settings:t,loop:!1,speed:te}});e?(J(ve).then(a=>e.setLogo(a),()=>M(e)),setTimeout(()=>M(e),q(t)/te*1e3+300),T.addEventListener("click",()=>M(e))):M()}})();
