(()=>{var e={454:()=>{var e=document.querySelector("#contact-form"),r=document.querySelector("form button.button"),t=document.querySelector(".form-message"),n="Your message has been sent. Thank you!",o="There was an error sending your message. Please try again.";if(e)e.addEventListener("submit",(function(r){r.preventDefault();var t=new FormData(e).entries(),n=Object.fromEntries(t);s(n)}));var s=function(s){r.innerHTML="Sending...",r.disabled=!0,fetch("send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}).then((function(s){s.ok&&200===s.status?(t.innerHTML=n,t.classList.remove("hidden"),t.classList.add("success"),e.reset()):(t.innerHTML=o,t.classList.remove("hidden"),t.classList.add("error")),r.innerHTML="Send",r.disabled=!1}))}},808:()=>{var e=(new Date).getFullYear();document.querySelector(".year").innerHTML="2014-".concat(e)}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var s=r[n]={exports:{}};return e[n](s,s.exports,t),s.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";t(454),t(808)})()})();