export function moduleSpecifiers(text){return [...text.matchAll(/^\s*(?:import|export)\s+(?:[^'";]*?\s+from\s*)?['"]([^'"]+)['"]/gm)].map(m=>m[1]);}
export function insidePackage(specifier,current,base){
 if(specifier==='three')return null;
 const url=specifier.startsWith('three/addons/')?new URL('examples/jsm/'+specifier.slice(13),base):specifier.startsWith('.')?new URL(specifier,current):null;
 if(!url||!url.href.startsWith(base)||url.search||url.hash)throw Error('Unsupported or out-of-package import: '+specifier);return url;
}
