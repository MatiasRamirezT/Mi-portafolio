(() => {
  const canvas = document.querySelector('.signal-graphic');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const source = [
    [0,.55],[.12,.55],[.17,.53],[.2,.57],[.235,.19],
    [.265,.82],[.295,.53],[.39,.53]
  ];
  const trend = [
    [.34,.69],[.44,.69],[.5,.73],[.57,.48],[.64,.61],
    [.72,.57],[.79,.32],[.89,.39],[.98,.16]
  ];
  const count = 88;
  const seeds = Array.from({length:count},(_,i)=>{
    const point = trend[i % trend.length];
    return {x:point[0]+((i*37)%17-8)*.002,y:point[1]+((i*19)%13-6)*.008,seed:i*2.399};
  });
  let width=0,height=0,frame=0,start=0,finished=false;

  function resize(){
    const box=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);
    width=box.width;height=box.height;
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    if(finished||reduced.matches)drawFinal();
  }
  function grid(){
    ctx.strokeStyle='rgba(255,255,255,.055)';ctx.lineWidth=1;
    for(let row=1;row<5;row++){let y=height*row/5;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke();}
  }
  function line(points,progress,color,widthPx,glow=0){
    if(progress<=0)return;
    const full=points.length-1,steps=full*progress;
    ctx.beginPath();ctx.moveTo(points[0][0]*width,points[0][1]*height);
    const whole=Math.floor(steps);
    for(let i=1;i<=whole;i++)ctx.lineTo(points[i][0]*width,points[i][1]*height);
    if(whole<full){const f=steps-whole,a=points[whole],b=points[whole+1];ctx.lineTo((a[0]+(b[0]-a[0])*f)*width,(a[1]+(b[1]-a[1])*f)*height);}
    ctx.strokeStyle=color;ctx.lineWidth=widthPx;ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor=color;ctx.shadowBlur=glow;ctx.stroke();ctx.shadowBlur=0;
  }
  function drawFinal(){
    if(!width||!height)return;
    ctx.clearRect(0,0,width,height);grid();line(trend,1,'#f05a66',2.2,8);
    for(const p of seeds){ctx.beginPath();ctx.arc(p.x*width,p.y*height,2,0,Math.PI*2);ctx.fillStyle='#ff9a8a';ctx.shadowColor='#ff3545';ctx.shadowBlur=7;ctx.fill();}
    ctx.shadowBlur=0;
  }
  function ease(t){return 1-Math.pow(1-t,3);}
  function draw(now){
    frame=0;if(!start)start=now;
    const t=Math.min((now-start)/2350,1),sourceProgress=Math.min(t/.34,1),morph=ease(Math.max(0,Math.min((t-.28)/.58,1)));
    ctx.clearRect(0,0,width,height);grid();
    line(source,sourceProgress,'#ff4655',2.4,10);
    if(t>.27){
      const dissolve=Math.max(0,1-morph);
      seeds.forEach((p,i)=>{
        const fromX=.255+Math.sin(p.seed)*.018,fromY=.5+Math.cos(p.seed*1.7)*.035;
        const drift=Math.sin(t*12+p.seed)*.025*dissolve;
        const x=fromX+(p.x-fromX)*morph+drift;
        const y=fromY+(p.y-fromY)*morph+Math.cos(t*10+p.seed)*.035*dissolve;
        const alpha=Math.min(1,Math.max(.18,morph*1.4));
        ctx.beginPath();ctx.arc(x*width,y*height,(1.1+Math.sin(p.seed)*.35)*Math.min(1,morph+.25),0,Math.PI*2);
        ctx.fillStyle=`rgba(255, ${Math.round(93+70*morph)}, 112, ${alpha})`;
        ctx.shadowColor='#ff3545';ctx.shadowBlur=10*dissolve;ctx.fill();
      });
    }
    if(t>.58)line(trend,Math.min((t-.58)/.35,1),'#f05a66',2,7);
    if(t<1&&!reduced.matches&&!document.hidden){frame=requestAnimationFrame(draw);}else{finished=true;drawFinal();}
  }
  function begin(){if(frame||finished||reduced.matches||document.hidden)return;frame=requestAnimationFrame(draw);}
  function motionChange(){if(reduced.matches){cancelAnimationFrame(frame);frame=0;finished=true;drawFinal();}else if(finished){finished=false;start=0;begin();}}
  new ResizeObserver(resize).observe(canvas);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)begin();});
  reduced.addEventListener('change',motionChange);
  resize();
  if(reduced.matches){finished=true;drawFinal();}else begin();
})();
