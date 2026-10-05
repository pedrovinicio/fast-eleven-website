import sys, json
from PIL import Image, ImageDraw, ImageFont, ImageFilter
W,H=1080,1350
ASSETS='/home/claude/fast-eleven/assets/images/'
F='/usr/share/fonts/opentype/inter/'
def font(w,s): return ImageFont.truetype(F+f'Inter-{w}.otf',s)
def wrap(d,text,f,maxw):
    lines=[];cur=''
    for w in text.split():
        t=(cur+' '+w).strip()
        if d.textlength(t,font=f)<=maxw: cur=t
        else: lines.append(cur);cur=w
    lines.append(cur);return lines
def make(spec,out):
    bg=Image.open(ASSETS+spec.get('bg','pitch-bg.png')).convert('RGB')
    s=max(W/bg.width,H/bg.height); bg=bg.resize((int(bg.width*s)+1,int(bg.height*s)+1))
    ox=(bg.width-W)//2; oy=int((bg.height-H)*spec.get('bg_y',0.5)); im=bg.crop((ox,oy,ox+W,oy+H))
    ov=Image.new('L',(1,H))
    for y in range(H): ov.putpixel((0,y),int(235*max(0,(y/H-0.35)/0.65)**0.9))
    black=Image.new('RGB',(W,H),(13,17,23)); im=Image.composite(black,im,ov.resize((W,H)))
    d=ImageDraw.Draw(im); M=80
    ic=Image.open(ASSETS+'icon.png').convert('RGBA').resize((110,110))
    mask=Image.new('L',(110,110),0); ImageDraw.Draw(mask).rounded_rectangle((0,0,110,110),26,fill=255)
    im.paste(ic,(M,M),mask)
    d.text((M+134,M+20),'FAST ELEVEN',font=font('Black',40),fill='#FFFFFF')
    d.text((M+134,M+68),spec.get('kicker','').upper(),font=font('SemiBold',24),fill='#FFD600')
    hf=font('Black',spec.get('hsize',96)); sf=font('Medium',40)
    hl=wrap(d,spec['headline'],hf,W-2*M); sl=wrap(d,spec.get('sub',''),sf,W-2*M) if spec.get('sub') else []
    lh=int(hf.size*1.05); sh=int(sf.size*1.35)
    y=H-M-len(sl)*sh-(30 if sl else 0)-len(hl)*lh
    d.rectangle((M,y-36,M+90,y-26),fill='#FFD600')
    for i,l in enumerate(hl):
        hi=spec.get('highlight','')
        d.text((M,y),l,font=hf,fill='#FFD600' if hi and hi.lower() in l.lower() else '#FFFFFF'); y+=lh
    y+=30
    for l in sl: d.text((M,y),l,font=sf,fill='#CDD5DE'); y+=sh
    im.save(out,quality=92)
if __name__=='__main__': make(json.loads(sys.argv[1]),sys.argv[2])
