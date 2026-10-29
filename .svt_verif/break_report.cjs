const puppeteer=require('puppeteer');
const fs=require('fs');
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
(async()=>{
const b=await puppeteer.launch({headless:'new',executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-sandbox'],defaultViewport:{width:1440,height:1100}});
const p=await b.newPage();
await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'});
await sleep(1200);
await p.evaluate(()=>{const btn=[...document.querySelectorAll('button')].find(x=>(x.textContent||'').includes('فتح التفاصيل'));if(btn)btn.click();});
await sleep(500);
const client=await p.createCDPSession();
await client.send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:require('path').resolve('.svt_verif/downloads2')});
fs.mkdirSync('.svt_verif/downloads2',{recursive:true});
await p.evaluate(()=>{const btn=[...document.querySelectorAll('button')].find(x=>(x.textContent||'').includes('حفظ كملف PDF'));if(btn)btn.click();});
for(let i=0;i<80;i++){await sleep(1000);const r=await p.evaluate(()=>window.__pdfBreakReport||null);if(r){console.log(r);break;}}
await b.close();})();
