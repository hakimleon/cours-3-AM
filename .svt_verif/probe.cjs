const puppeteer=require('puppeteer');
(async()=>{
const b=await puppeteer.launch({headless:'new',executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-sandbox']});
const p=await b.newPage();await p.setViewport({width:1440,height:1100});
await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,1200));
const info=await p.evaluate(()=>({
  app: document.querySelectorAll('.application-enonce-group').length,
  ex: !!document.querySelector('#sec-svt-exercises'),
  html: document.querySelector('#sec-svt-exercises')?.innerHTML.slice(0,300),
  classes: Array.from(document.querySelectorAll('#sec-svt-exercises > *')).map(e=>e.className)
}));
console.log(JSON.stringify(info,null,1));
await b.close();})();
