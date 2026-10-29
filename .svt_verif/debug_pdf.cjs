const puppeteer=require('puppeteer');
(async()=>{
const b=await puppeteer.launch({headless:'new',executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-sandbox']});
const p=await b.newPage();
p.on('console',m=>console.log('CONSOLE',m.type(),m.text()));
p.on('pageerror',e=>console.log('PAGEERROR',e.message));
p.on('requestfailed',r=>console.log('REQFAIL',r.url(),r.failure()&&r.failure().errorText));
const r=await p.goto('http://localhost:4173/.pdfrender/index.html?file=%2Fverification_captures%2Flesson01_gabarit%2Fcours_svt_01_export_application.pdf&page=1&scale=1.6',{waitUntil:'networkidle0',timeout:60000});
console.log('status',r.status());
await new Promise(x=>setTimeout(x,4000));
console.log('state',await p.evaluate(()=>({s:window.__status,p:window.__pages}))); 
await b.close();})();
