(function(){
'use strict';
window.GLOBE_ENABLED = true;
var P={r:232,g:103,b:42},V={r:244,g:166,b:58},B={r:255,g:140,b:66},W={r:255,g:220,b:180},pals=[P,V,B];
function rgba(c,a){return'rgba('+c.r+','+c.g+','+c.b+','+a+')';}

// Continent data (compact: lat,lon pairs flattened)
var CD={
na:[60,-140,65,-168,72,-168,71,-155,60,-140,55,-130,50,-127,48,-124,45,-124,42,-124,40,-124,37,-122,35,-120,33,-117,31,-115,28,-114,25,-110,22,-106,20,-105,18,-97,17,-92,18,-88,20,-87,22,-84,25,-80,27,-80,30,-82,28,-80,25,-78,27,-76,30,-75,33,-76,35,-75,38,-74,40,-74,42,-70,44,-66,46,-62,47,-60,48,-56,50,-55,52,-56,53,-58,55,-60,57,-62,58,-65,60,-65,62,-75,64,-80,65,-85,67,-90,68,-95,70,-100,68,-110,66,-118,65,-125,63,-135,62,-140,60,-140],
sa:[12,-70,10,-75,8,-77,5,-77,2,-80,-1,-80,-5,-81,-6,-77,-5,-73,-4,-70,-6,-65,-8,-60,-10,-55,-8,-50,-5,-45,-3,-42,-5,-38,-7,-35,-10,-37,-13,-38,-15,-39,-18,-40,-20,-40,-23,-42,-25,-45,-28,-48,-30,-50,-33,-52,-35,-57,-38,-60,-40,-62,-43,-65,-48,-68,-52,-70,-55,-68,-55,-65,-52,-65,-48,-68,-45,-72,-42,-72,-38,-72,-35,-72,-33,-72,-30,-70,-25,-68,-20,-65,-18,-70,-15,-75,-12,-77,-10,-77,-7,-80,-4,-80,0,-78,3,-75,5,-72,8,-68,10,-70,12,-70],
eu:[36,-5,36,-2,37,0,38,1,40,0,41,1,42,3,43,5,43,7,44,8,43,10,42,12,41,14,40,15,39,18,38,20,37,22,36,24,35,25,36,27,38,28,40,26,41,28,42,29,44,30,45,30,46,30,48,25,49,22,50,20,51,17,52,15,53,12,54,10,55,8,55,10,56,12,57,14,58,15,59,12,60,10,61,8,62,5,63,8,64,10,65,12,67,14,68,15,70,18,70,22,71,25,70,28,68,28,66,26,64,25,62,25,60,25,58,28,56,28,55,24,53,22,51,18,49,15,47,14,45,14,43,13,41,12,40,8,39,5,38,2,37,0,36,-5],
af:[35,-5,36,-2,37,5,37,10,35,12,33,12,31,10,30,10,28,15,25,20,23,25,22,28,20,33,18,35,16,38,14,40,12,44,10,45,10,42,8,42,5,42,3,40,1,42,0,42,-2,40,-5,40,-7,38,-10,40,-12,40,-15,35,-17,33,-20,35,-22,34,-25,33,-27,30,-30,30,-33,27,-34,25,-35,22,-35,20,-34,18,-32,16,-28,15,-24,14,-20,12,-16,12,-12,14,-10,14,-8,12,-5,10,-3,8,-2,5,0,3,0,5,2,5,4,8,0,10,-5,10,-10,10,-15,12,-17,15,-17,18,-17,20,-17,22,-16,25,-15,28,-12,30,-10,33,-8,35,-5],
as:[42,28,43,35,42,40,40,45,38,48,35,50,32,48,30,48,28,52,25,55,22,58,20,60,18,63,15,65,12,68,10,72,8,75,5,78,2,80,0,82,-2,85,-5,95,-8,100,-6,105,-2,105,0,105,3,107,5,108,8,110,10,112,12,110,15,108,18,108,20,110,22,110,25,108,28,106,30,105,32,108,35,110,37,112,38,115,40,118,42,125,44,130,46,135,48,140,50,143,52,142,55,135,58,132,60,130,62,138,63,145,64,155,65,168,68,178,70,180,72,178,74,160,75,140,74,125,72,110,70,100,68,88,66,78,65,70,62,62,60,60,58,55,55,50,52,45,50,42,48,38,45,35,42,28],
au:[-12,130,-14,128,-16,125,-18,122,-20,118,-22,116,-25,115,-28,115,-30,115,-32,116,-33,118,-35,120,-36,125,-37,135,-38,142,-38,145,-37,148,-36,150,-35,151,-33,152,-30,153,-28,154,-25,152,-23,150,-21,149,-20,148,-18,146,-16,145,-14,143,-12,140,-11,138,-12,133,-12,130]
};

var CITIES=[[40.7,-74,3.5],[51.5,0,3.5],[35.7,139.7,3.5],[-33.9,151.2,2.8],[22.3,114.2,2.8],[1.3,103.8,2.8],[48.9,2.3,2.8],[37.8,-122.4,3],[55.8,37.6,2.5],[28.6,77.2,2.5],[-23.5,-46.6,2.5],[19.4,-99.1,2.5],[39.9,116.4,3],[31.2,121.5,2.8],[25.2,55.3,2.2],[-1.3,36.8,1.8],[34.1,-118.2,2.5],[41.9,12.5,2],[52.5,13.4,2],[59.3,18.1,1.8],[-4.3,15.3,1.5],[30,31,2],[35.7,51.4,1.8],[13.8,100.5,1.8],[-6.2,106.8,1.8],[33.9,-84.4,2],[45.5,-73.6,2],[43.7,-79.4,2],[47.6,-122.3,2],[29.8,-95.4,2],[25.8,-80.2,2]];
var CONNS=[[0,1],[0,4],[1,2],[2,3],[1,5],[0,7],[6,9],[4,5],[2,12],[8,1],[9,5],[11,0],[10,0],[3,2],[6,8],[7,11],[13,4],[14,5],[0,6],[1,9],[7,16],[0,26],[12,13],[8,6],[15,9],[3,24],[17,21],[28,2],[29,0],[30,10]];

function parsePts(arr){var r=[];for(var i=0;i<arr.length;i+=2)r.push([arr[i],arr[i+1]]);return r;}

function initGlobe(){
var container=document.getElementById('globe-container');
var canvas=document.getElementById('globe-canvas');
if(!container||!canvas)return;
var ctx=canvas.getContext('2d');
var dpr=Math.min(window.devicePixelRatio||1,2);
var w,h,cx,cy,R;
function resize(){
  w=container.offsetWidth||550;h=container.offsetHeight||550;
  canvas.width=w*dpr;canvas.height=h*dpr;
  canvas.style.width=w+'px';canvas.style.height=h+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  cx=w/2;cy=h/2;R=Math.min(w,h)*0.4;
}
resize();window.addEventListener('resize',resize);

// Parse continent data
var continents={};
for(var k in CD)continents[k]=parsePts(CD[k]);

// Starfield
var stars=[];
for(var i=0;i<180;i++)stars.push({x:Math.random(),y:Math.random(),s:0.3+Math.random()*1.2,ph:Math.random()*6.28,sp:0.5+Math.random()*2});

// Background dots on sphere
var bgDots=[];
for(var i=0;i<800;i++){
  var t=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1);
  bgDots.push({lat:90-p*180/Math.PI,lon:t*180/Math.PI-180,s:0.2+Math.random()*0.7,c:pals[~~(Math.random()*3)],ph:Math.random()*6.28,sp:0.3+Math.random()});
}

// Hex grid points on sphere
var hexPts=[];
for(var lat=-80;lat<=80;lat+=8){
  var offset=(Math.abs(lat/8)%2)*6;
  for(var lon=-180;lon<180;lon+=12){
    hexPts.push({lat:lat,lon:lon+offset});
  }
}

// Pulses & particles
var pulses=[],particles=[];
function spawnPulse(){var ci=~~(Math.random()*CITIES.length),c=CITIES[ci];pulses.push({lat:c[0],lon:c[1],age:0,max:2+Math.random()*2,c:pals[~~(Math.random()*3)]});setTimeout(spawnPulse,600+Math.random()*1200);}
function spawnParticle(){var i=~~(Math.random()*CONNS.length);particles.push({ci:i,p:0,sp:0.25+Math.random()*0.35,c:pals[~~(Math.random()*3)]});setTimeout(spawnParticle,200+Math.random()*500);}
spawnPulse();spawnParticle();

function proj(lat,lon,rotY,r){
  var phi=(90-lat)*Math.PI/180,th=(lon+180)*Math.PI/180;
  var x=-r*Math.sin(phi)*Math.cos(th),y=r*Math.cos(phi),z=r*Math.sin(phi)*Math.sin(th);
  var cr=Math.cos(rotY),sr=Math.sin(rotY);
  return{x:cx+x*cr-z*sr,y:cy-y,z:x*sr+z*cr};
}
function dep(p){return Math.max(0,p.z/R*0.6+0.4);}

function drawStars(t){
  for(var i=0;i<stars.length;i++){
    var s=stars[i],a=0.15+0.15*Math.sin(t*s.sp+s.ph);
    ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.s,0,Math.PI*2);
    ctx.fillStyle=rgba(V,a);ctx.fill();
  }
}

function drawAtmo(){
  var g=ctx.createRadialGradient(cx,cy,R*0.8,cx,cy,R*1.6);
  g.addColorStop(0,rgba(P,0.1));g.addColorStop(0.3,rgba(P,0.05));
  g.addColorStop(0.6,rgba(B,0.02));g.addColorStop(1,rgba(P,0));
  ctx.beginPath();ctx.arc(cx,cy,R*1.6,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
  // Surface
  var g2=ctx.createRadialGradient(cx-R*0.3,cy-R*0.3,0,cx,cy,R);
  g2.addColorStop(0,'rgba(16,16,38,0.97)');g2.addColorStop(0.5,'rgba(10,10,26,0.98)');g2.addColorStop(1,'rgba(5,5,16,1)');
  ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fillStyle=g2;ctx.fill();
  // Rim light
  var g3=ctx.createRadialGradient(cx-R*0.45,cy-R*0.45,R*0.05,cx,cy,R);
  g3.addColorStop(0,rgba(V,0.12));g3.addColorStop(0.3,rgba(P,0.05));g3.addColorStop(1,'rgba(0,0,0,0)');
  ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fillStyle=g3;ctx.fill();
  // Fresnel edge glow
  var g4=ctx.createRadialGradient(cx,cy,R*0.85,cx,cy,R*1.02);
  g4.addColorStop(0,'rgba(0,0,0,0)');g4.addColorStop(0.7,rgba(P,0.08));g4.addColorStop(1,rgba(V,0.15));
  ctx.beginPath();ctx.arc(cx,cy,R*1.02,0,Math.PI*2);ctx.fillStyle=g4;ctx.fill();
}

function drawGrid(rY){
  ctx.lineWidth=0.4;
  for(var lat=-75;lat<=75;lat+=10){
    ctx.beginPath();var st=true;
    for(var i=0;i<=150;i++){
      var lon=i/150*360-180,pp=proj(lat,lon,rY,R),d=dep(pp);
      if(d<0.08){st=true;continue;}
      ctx.strokeStyle=rgba(V,d*(lat===0?0.2:0.04));
      if(st){ctx.moveTo(pp.x,pp.y);st=false;}else ctx.lineTo(pp.x,pp.y);
    }ctx.stroke();
  }
  for(var lon=-180;lon<180;lon+=10){
    ctx.beginPath();var st=true;
    for(var j=0;j<=100;j++){
      var lat2=j/100*180-90,pp=proj(lat2,lon,rY,R),d=dep(pp);
      if(d<0.08){st=true;continue;}
      ctx.strokeStyle=rgba(P,d*0.03);
      if(st){ctx.moveTo(pp.x,pp.y);st=false;}else ctx.lineTo(pp.x,pp.y);
    }ctx.stroke();
  }
}

function drawHexGrid(rY){
  for(var i=0;i<hexPts.length;i++){
    var hp=hexPts[i],pp=proj(hp.lat,hp.lon,rY,R*0.999),d=dep(pp);
    if(d<0.15)continue;
    // Draw tiny hex
    ctx.beginPath();
    var sz=2.5*d;
    for(var a=0;a<6;a++){
      var angle=a*Math.PI/3,hx=pp.x+sz*Math.cos(angle),hy=pp.y+sz*Math.sin(angle);
      if(a===0)ctx.moveTo(hx,hy);else ctx.lineTo(hx,hy);
    }
    ctx.closePath();ctx.lineWidth=0.3;ctx.strokeStyle=rgba(P,d*0.06);ctx.stroke();
  }
}

function drawContinents(rY){
  var names=Object.keys(continents);
  for(var n=0;n<names.length;n++){
    var pts=continents[names[n]];
    // Filled shape
    ctx.beginPath();var any=false;
    for(var i=0;i<pts.length;i++){
      var pp=proj(pts[i][0],pts[i][1],rY,R*1.002);
      if(pp.z<-R*0.05)continue;any=true;
      if(i===0)ctx.moveTo(pp.x,pp.y);else ctx.lineTo(pp.x,pp.y);
    }
    if(!any)continue;
    ctx.closePath();ctx.fillStyle=rgba(P,0.07);ctx.fill();
    // Outline
    ctx.beginPath();var st=false;
    for(var i=0;i<pts.length;i++){
      var pp=proj(pts[i][0],pts[i][1],rY,R*1.003),d=dep(pp);
      if(d<0.1){st=false;continue;}
      if(!st){ctx.moveTo(pp.x,pp.y);st=true;}else ctx.lineTo(pp.x,pp.y);
    }
    ctx.lineWidth=1.2;ctx.strokeStyle=rgba(V,0.35);ctx.stroke();
    // Inner detail line (second pass slightly offset for thickness feel)
    ctx.beginPath();st=false;
    for(var i=0;i<pts.length;i++){
      var pp=proj(pts[i][0],pts[i][1],rY,R*1.006),d=dep(pp);
      if(d<0.12){st=false;continue;}
      if(!st){ctx.moveTo(pp.x,pp.y);st=true;}else ctx.lineTo(pp.x,pp.y);
    }
    ctx.lineWidth=0.4;ctx.strokeStyle=rgba(B,0.15);ctx.stroke();
  }
}

function drawBgDots(rY,t){
  for(var i=0;i<bgDots.length;i++){
    var d=bgDots[i],pp=proj(d.lat,d.lon,rY,R*0.998);
    if(pp.z<0)continue;
    var dp=dep(pp),pulse=0.4+0.6*Math.sin(t*d.sp+d.ph),a=dp*pulse*0.3;
    ctx.beginPath();ctx.arc(pp.x,pp.y,d.s*dp,0,Math.PI*2);
    ctx.fillStyle=rgba(d.c,a);ctx.fill();
  }
}

function drawCities(rY,t){
  for(var i=0;i<CITIES.length;i++){
    var c=CITIES[i],pp=proj(c[0],c[1],rY,R*1.005);
    if(pp.z<0)continue;
    var d=dep(pp),pulse=0.7+0.3*Math.sin(t*2+i),sz=c[2]*d;
    // Outer haze
    ctx.beginPath();ctx.arc(pp.x,pp.y,sz*5,0,Math.PI*2);
    ctx.fillStyle=rgba(P,d*0.04*pulse);ctx.fill();
    // Mid glow
    ctx.beginPath();ctx.arc(pp.x,pp.y,sz*2.5,0,Math.PI*2);
    ctx.fillStyle=rgba(V,d*0.12*pulse);ctx.fill();
    // Core
    ctx.beginPath();ctx.arc(pp.x,pp.y,sz,0,Math.PI*2);
    ctx.fillStyle=rgba(V,d*0.85);ctx.fill();
    // White center
    ctx.beginPath();ctx.arc(pp.x,pp.y,sz*0.35,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,'+(d*0.7)+')';ctx.fill();
  }
}

function drawArcs(rY){
  for(var i=0;i<CONNS.length;i++){
    var cn=CONNS[i],fr=CITIES[cn[0]],to=CITIES[cn[1]];
    ctx.beginPath();var st=false,steps=60;
    for(var s=0;s<=steps;s++){
      var f=s/steps,lat=fr[0]+(to[0]-fr[0])*f,lon=fr[1]+(to[1]-fr[1])*f;
      var lift=1+0.18*Math.sin(f*Math.PI);
      var pp=proj(lat,lon,rY,R*lift);
      if(pp.z<-R*0.1){st=false;continue;}
      var d=dep(pp);
      if(!st){ctx.moveTo(pp.x,pp.y);st=true;}else ctx.lineTo(pp.x,pp.y);
    }
    ctx.lineWidth=0.7;ctx.strokeStyle=rgba(pals[i%3],0.14);ctx.stroke();
  }
}

function drawParticles(rY,dt){
  for(var i=particles.length-1;i>=0;i--){
    var p=particles[i];p.p+=dt*p.sp;
    if(p.p>=1){particles.splice(i,1);continue;}
    var cn=CONNS[p.ci],fr=CITIES[cn[0]],to=CITIES[cn[1]];
    var lat=fr[0]+(to[0]-fr[0])*p.p,lon=fr[1]+(to[1]-fr[1])*p.p;
    var lift=1+0.18*Math.sin(p.p*Math.PI);
    var pp=proj(lat,lon,rY,R*lift);
    if(pp.z<0)continue;var d=dep(pp);
    // Trail
    for(var tr=1;tr<=3;tr++){
      var tp=Math.max(0,p.p-tr*0.03);
      var tlat=fr[0]+(to[0]-fr[0])*tp,tlon=fr[1]+(to[1]-fr[1])*tp;
      var tlift=1+0.18*Math.sin(tp*Math.PI);
      var tpp=proj(tlat,tlon,rY,R*tlift);
      if(tpp.z<0)continue;
      ctx.beginPath();ctx.arc(tpp.x,tpp.y,(1.5-tr*0.3)*d,0,Math.PI*2);
      ctx.fillStyle=rgba(p.c,(0.3-tr*0.08)*d);ctx.fill();
    }
    // Main particle
    ctx.beginPath();ctx.arc(pp.x,pp.y,2*d,0,Math.PI*2);
    ctx.fillStyle=rgba(p.c,0.9*d);ctx.fill();
    ctx.beginPath();ctx.arc(pp.x,pp.y,0.8*d,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,'+(0.8*d)+')';ctx.fill();
  }
}

function drawPulses(rY,dt){
  for(var i=pulses.length-1;i>=0;i--){
    var p=pulses[i];p.age+=dt;
    if(p.age>p.max){pulses.splice(i,1);continue;}
    var pp=proj(p.lat,p.lon,rY,R*1.005);
    if(pp.z<0)continue;
    var d=dep(pp),prog=p.age/p.max,a=(1-prog)*0.35*d;
    // Double ring
    ctx.beginPath();ctx.arc(pp.x,pp.y,3+prog*25,0,Math.PI*2);
    ctx.lineWidth=1;ctx.strokeStyle=rgba(p.c,a);ctx.stroke();
    ctx.beginPath();ctx.arc(pp.x,pp.y,3+prog*18,0,Math.PI*2);
    ctx.lineWidth=0.5;ctx.strokeStyle=rgba(p.c,a*0.5);ctx.stroke();
  }
}

function drawScanBeam(rY,t){
  // Rotating scan line across globe
  var angle=t*0.4;
  var scanLon=(angle*180/Math.PI)%360-180;
  ctx.beginPath();var st=false;
  for(var j=0;j<=100;j++){
    var lat2=j/100*180-90;
    var pp=proj(lat2,scanLon,rY,R*1.001),d=dep(pp);
    if(d<0.1){st=false;continue;}
    if(!st){ctx.moveTo(pp.x,pp.y);st=true;}else ctx.lineTo(pp.x,pp.y);
  }
  ctx.lineWidth=1.5;ctx.strokeStyle=rgba(B,0.12);ctx.stroke();
  // Second scan offset
  ctx.beginPath();st=false;
  for(var j=0;j<=100;j++){
    var lat2=j/100*180-90;
    var pp=proj(lat2,scanLon+5,rY,R*1.001),d=dep(pp);
    if(d<0.1){st=false;continue;}
    if(!st){ctx.moveTo(pp.x,pp.y);st=true;}else ctx.lineTo(pp.x,pp.y);
  }
  ctx.lineWidth=0.5;ctx.strokeStyle=rgba(B,0.06);ctx.stroke();
}

function drawEdge(t){
  var pa=0.16+0.06*Math.sin(t*0.8);
  ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.lineWidth=1.2;ctx.strokeStyle=rgba(P,pa);ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cy,R*1.05,0,Math.PI*2);ctx.lineWidth=0.6;ctx.strokeStyle=rgba(P,pa*0.35);ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cy,R*1.1,0,Math.PI*2);ctx.lineWidth=0.3;ctx.strokeStyle=rgba(B,pa*0.15);ctx.stroke();
  // Rotating arc segments on outer ring
  for(var i=0;i<3;i++){
    var sa=t*0.3+i*Math.PI*2/3,ea=sa+0.8;
    ctx.beginPath();ctx.arc(cx,cy,R*1.15,sa,ea);ctx.lineWidth=0.8;ctx.strokeStyle=rgba(V,0.08+0.04*Math.sin(t+i));ctx.stroke();
  }
}

// Orbital dots
var orbDots=[];
for(var i=0;i<20;i++)orbDots.push({angle:Math.random()*Math.PI*2,sp:0.1+Math.random()*0.15,r:R*1.2+Math.random()*R*0.15,s:0.5+Math.random(),c:pals[~~(Math.random()*3)]});

function drawOrbital(t){
  for(var i=0;i<orbDots.length;i++){
    var o=orbDots[i],a=o.angle+t*o.sp;
    var ox=cx+o.r*Math.cos(a),oy=cy+o.r*Math.sin(a)*0.35;
    ctx.beginPath();ctx.arc(ox,oy,o.s,0,Math.PI*2);
    ctx.fillStyle=rgba(o.c,0.25+0.15*Math.sin(t*2+i));ctx.fill();
  }
}

var rotY=0,lastT=Date.now();
function animate(){
  requestAnimationFrame(animate);
  if(!window.GLOBE_ENABLED) return;
  var now=Date.now(),dt=Math.min((now-lastT)/1000,0.1);lastT=now;
  var t=now/1000;rotY+=dt*0.12;
  var br=1+Math.sin(t*0.5)*0.005;
  ctx.clearRect(0,0,w,h);

  drawStars(t);

  ctx.save();
  ctx.translate(cx,cy);ctx.scale(br,br);ctx.translate(-cx,-cy);

  drawOrbital(t);
  drawAtmo();
  drawHexGrid(rotY);
  drawGrid(rotY);
  drawContinents(rotY);
  drawBgDots(rotY,t);
  drawScanBeam(rotY,t);
  drawArcs(rotY);
  drawParticles(rotY,dt);
  drawCities(rotY,t);
  drawPulses(rotY,dt);
  drawEdge(t);

  ctx.restore();
}
animate();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initGlobe);
else initGlobe();
})();
