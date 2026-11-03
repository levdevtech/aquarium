const $=id=>document.getElementById(id);let ready=false,failed=false;
function fail(message){failed=true;const l=$('loader');l.style.display='flex';l.style.opacity='1';$('loadingText').textContent=String(message||'Ошибка загрузки');l.querySelector('.loadline').hidden=true;$('startupActions').hidden=false;$('startupStatus').textContent='Сцена не запущена';}
window.aquariumFail=fail;
$('retry').addEventListener('click',()=>location.reload());$('retryLow').addEventListener('click',()=>{const u=new URL(location.href);u.searchParams.set('quality','low');location.assign(u);});
window.addEventListener('nacre:ready',()=>{ready=true;failed=false;clearTimeout(window.loadTimer);$('startupStatus').textContent='Сцена загружена';});
window.addEventListener('error',e=>{if(!ready)fail('Ошибка запуска: '+(e.message||'ресурс недоступен'));});
window.addEventListener('unhandledrejection',e=>{console.error(e.reason);if(!ready)fail('Ошибка запуска: '+String(e.reason?.message||e.reason));});
window.loadTimer=setTimeout(()=>{if(!ready)fail('Загрузка заняла слишком много времени. Проверьте доступ к библиотекам.');},25000);
if(location.protocol==='file:'){clearTimeout(window.loadTimer);fail('Откройте сайт через HTTP-сервер или GitHub Pages.');}
else{try{await import("./aquarium.b0fa24ccb54a.mjs");if(!window.aquariumReady&&!failed)fail('Сцена не сообщила о готовности.');}catch(error){clearTimeout(window.loadTimer);console.error(error);fail('Не удалось загрузить 3D. Проверьте WebGL 2 и доступ к Three.js; повторите запуск в экономичном режиме.');}}
