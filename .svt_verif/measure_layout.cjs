const puppeteer=require('puppeteer');
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
(async()=>{
const b=await puppeteer.launch({headless:'new',executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-sandbox'],defaultViewport:{width:794,height:1123,deviceScaleFactor:1}});
const p=await b.newPage();
await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'});
await sleep(1200);
await p.evaluate(()=>{const btn=[...document.querySelectorAll('button')].find(x=>(x.textContent||'').includes('فتح التفاصيل'));if(btn)btn.click();});
await sleep(600);
await p.emulateMediaType('print');
await sleep(400);
const measure=async(maxw)=>{
 await p.evaluate((w)=>{
   let st=document.getElementById('__cap'); if(!st){st=document.createElement('style');st.id='__cap';document.head.appendChild(st);}
   st.textContent=`#sec-svt-essential svg.svt-schema-bilan{max-width:${w}px !important;width:100% !important;}`;
 },maxw);
 await sleep(200);
 return p.evaluate(()=>{
   const g=(sel)=>{const e=document.querySelector(sel);if(!e)return null;const r=e.getBoundingClientRect();return {h:+r.height.toFixed(1),w:+r.width.toFixed(1)};};
   const svg=document.querySelector('#sec-svt-essential svg.svt-schema-bilan');
   const sr=svg.getBoundingClientRect();
   return {
     essential:g('#sec-svt-essential'),
     svg:{w:+sr.width.toFixed(1),h:+sr.height.toFixed(1),scale:+(sr.width/820).toFixed(3)},
     header:g('#svt-course-header'),
     ex1:g('.application-enonce-group'),
     accordionHeader:g('#sec-svt-deepen-accordion > div'),
     discovery:g('#sec-svt-discovery'),
     docs:g('#sec-svt-01-docs'),
     rec:g('#sec-svt-01-recording'),
     mag:g('#sec-svt-01-magnitude-intensity'),
     synth:g('#sec-svt-synthesis-vocab'),
   };
 });
};
for(const w of [700,660,620,580]){console.log(w,JSON.stringify(await measure(w)));}
await b.close();})();
