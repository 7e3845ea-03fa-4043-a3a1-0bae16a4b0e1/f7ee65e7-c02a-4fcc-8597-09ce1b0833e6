let addons=[];
let currentCategory="すべて";

const addonList=document.getElementById("addonList");
const searchInput=document.getElementById("searchInput");
const count=document.getElementById("count");
const emptyState=document.getElementById("emptyState");
const clearSearch=document.getElementById("clearSearch");

async function loadAddons(){

try{

const response=await fetch("data/addons.json");

if(!response.ok){
throw new Error("addons.jsonを読み込めません");
}

addons=await response.json();

if(addonList){
renderAddons();
}

if(document.getElementById("addonDetail")){
renderDetail();
}

}catch(error){

console.error(error);

if(addonList){
addonList.innerHTML="";
emptyState.classList.add("show");
}

}

}

function renderAddons(){

if(!addonList){
return;
}

const keyword=searchInput
? searchInput.value.toLowerCase().trim()
: "";

const filtered=addons.filter(addon=>{

const categoryMatch=
currentCategory==="すべて" ||
addon.category===currentCategory;

const text=[
addon.name,
addon.author,
addon.description,
addon.category,
addon.minecraft
].join(" ").toLowerCase();

return categoryMatch&&text.includes(keyword);

});

count.textContent=filtered.length+"件";

if(filtered.length===0){

addonList.innerHTML="";
emptyState.classList.add("show");

return;

}

emptyState.classList.remove("show");

addonList.innerHTML=filtered.map(addon=>`

<a
class="addon-card"
href="addon.html?id=${encodeURIComponent(addon.id)}"
>

<div class="addon-image-wrap">

<img
class="addon-image"
src="${escapeHtml(addon.icon)}"
alt="${escapeHtml(addon.name)}"
loading="lazy"
>

<div class="addon-category">
${escapeHtml(addon.category)}
</div>

</div>

<div class="addon-body">

<h3 class="addon-title">
${escapeHtml(addon.name)}
</h3>

<p class="addon-description">
${escapeHtml(addon.description)}
</p>

<div class="addon-meta">

<div class="author">
by ${escapeHtml(addon.author)}
</div>

<div class="version">
v${escapeHtml(addon.version)}
</div>

</div>

</div>

</a>

`).join("");

}

function setCategory(category){

currentCategory=category;

document.querySelectorAll(".filter").forEach(button=>{

button.classList.toggle(
"active",
button.dataset.category===category
);

});

renderAddons();

}

document.querySelectorAll(".filter").forEach(button=>{

button.addEventListener("click",()=>{

setCategory(button.dataset.category);

});

});

document.querySelectorAll(".category").forEach(button=>{

button.addEventListener("click",()=>{

setCategory(button.dataset.category);

const section=document.getElementById("addons");

if(section){

section.scrollIntoView({
behavior:"smooth"
});

}

});

});

if(searchInput){

searchInput.addEventListener("input",()=>{

if(searchInput.value){

clearSearch.classList.add("show");

}else{

clearSearch.classList.remove("show");

}

renderAddons();

});

}

if(clearSearch){

clearSearch.addEventListener("click",()=>{

searchInput.value="";
clearSearch.classList.remove("show");

renderAddons();

searchInput.focus();

});

}

function renderDetail(){

const container=document.getElementById("addonDetail");

if(!container){
return;
}

const params=new URLSearchParams(location.search);
const id=params.get("id");

const addon=addons.find(item=>item.id===id);

if(!addon){

container.innerHTML=`

<div class="not-found">

<h2>アドオンが見つかりません</h2>

<p>
指定されたアドオンは存在しないか、
削除されています。
</p>

</div>

`;

return;

}

document.title=addon.name+" - HAC Addons";

container.innerHTML=`

<a class="detail-back" href="./">
← アドオン一覧に戻る
</a>

<div class="detail-card">

<div class="detail-top">

<img
class="detail-image"
src="${escapeHtml(addon.icon)}"
alt="${escapeHtml(addon.name)}"
>

<div class="detail-info">

<div class="detail-category">
${escapeHtml(addon.category)}
</div>

<h1 class="detail-title">
${escapeHtml(addon.name)}
</h1>

<div class="detail-author">
作者：${escapeHtml(addon.author)}
</div>

<p class="detail-description">
${escapeHtml(addon.description)}
</p>

<div class="detail-meta">

<div class="detail-tag">
Minecraft ${escapeHtml(addon.minecraft)}
</div>

<div class="detail-tag">
Version ${escapeHtml(addon.version)}
</div>

${addon.type?`

<div class="detail-tag">
${escapeHtml(addon.type)}
</div>

`:""}

</div>

<a
class="download-button"
href="${escapeHtml(addon.download)}"
target="_blank"
rel="noopener noreferrer"
>
ダウンロード
</a>

</div>

</div>

<div class="detail-bottom">

<div class="detail-note">
HAC Addons
</div>

<div class="detail-note">
v${escapeHtml(addon.version)}
</div>

</div>

</div>

`;

}

function escapeHtml(value){

return String(value)
.replaceAll("&","&amp;")
.replaceAll("<","&lt;")
.replaceAll(">","&gt;")
.replaceAll('"',"&quot;")
.replaceAll("'","&#039;");

}

const menuButton=document.getElementById("menuButton");
const mobileMenu=document.getElementById("mobileMenu");

if(menuButton){

menuButton.addEventListener("click",()=>{

mobileMenu.classList.toggle("active");

});

}

if(mobileMenu){

mobileMenu.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",()=>{

mobileMenu.classList.remove("active");

});

});

}

loadAddons();
