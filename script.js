let addons=[];
let currentCategory="すべて";

const API_BASE="https://hac-addons-api.hac-addons.workers.dev";

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
if(emptyState){
emptyState.classList.add("show");
}
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

if(count){
count.textContent=filtered.length+"件";
}

if(filtered.length===0){

addonList.innerHTML="";

if(emptyState){
emptyState.classList.add("show");
}

return;

}

if(emptyState){
emptyState.classList.remove("show");
}

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

if(clearSearch){

if(searchInput.value){
clearSearch.classList.add("show");
}else{
clearSearch.classList.remove("show");
}

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

return String(value ?? "")
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

if(mobileMenu){
mobileMenu.classList.toggle("active");
}

});

}

if(mobileMenu){

mobileMenu.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",()=>{

mobileMenu.classList.remove("active");

});

});

}

const accountButton=document.getElementById("accountButton");
const mobileAccountButton=document.getElementById("mobileAccountButton");

const accountModal=document.getElementById("accountModal");
const accountOverlay=document.getElementById("accountOverlay");
const accountClose=document.getElementById("accountClose");

const registerForm=document.getElementById("registerForm");
const accountMessage=document.getElementById("accountMessage");

const loginForm=document.getElementById("loginForm");
const loginMessage=document.getElementById("loginMessage");

const accountLoginView=document.getElementById("accountLoginView");
const accountRegisterView=document.getElementById("accountRegisterView");
const accountLoggedInView=document.getElementById("accountLoggedInView");
const accountProfileView=document.getElementById("accountProfileView");

const showRegisterButton=document.getElementById("showRegisterButton");
const showLoginButton=document.getElementById("showLoginButton");

const logoutButton=document.getElementById("logoutButton");

const accountDisplayName=document.getElementById("accountDisplayName");
const accountUsername=document.getElementById("accountUsername");

const loggedInMessage=document.getElementById("loggedInMessage");

const openProfileButton=document.getElementById("openProfileButton");
const backAccountButton=document.getElementById("backAccountButton");

const displayNameForm=document.getElementById("displayNameForm");
const profileDisplayNameInput=document.getElementById("profileDisplayNameInput");
const profileMessage=document.getElementById("profileMessage");

function getToken(){

return localStorage.getItem("hac_account_token") || "";

}

function setToken(token){

if(token){

localStorage.setItem(
"hac_account_token",
token
);

}else{

localStorage.removeItem(
"hac_account_token"
);

}

}

function setAccountButtonText(text){

if(accountButton){
accountButton.textContent=text;
}

if(mobileAccountButton){
mobileAccountButton.textContent=text;
}

}

function showAccountView(view){

if(accountLoginView){

accountLoginView.style.display=
view==="login"
?"block"
:"none";

}

if(accountRegisterView){

accountRegisterView.style.display=
view==="register"
?"block"
:"none";

}

if(accountLoggedInView){

accountLoggedInView.style.display=
view==="loggedin"
?"block"
:"none";

}

if(accountProfileView){

accountProfileView.style.display=
view==="profile"
?"block"
:"none";

}

}

function openAccountModal(){

if(!accountModal){
return;
}

accountModal.classList.add("active");

document.body.style.overflow="hidden";

clearMessages();

checkLoginState();

}

function closeAccountModal(){

if(!accountModal){
return;
}

accountModal.classList.remove("active");

document.body.style.overflow="";

}

function showAccountMessage(message){

if(!accountMessage){
return;
}

accountMessage.textContent=message;

accountMessage.classList.add("show");

}

function showLoginMessage(message){

if(!loginMessage){
return;
}

loginMessage.textContent=message;

loginMessage.classList.add("show");

}

function showLoggedInMessage(message){

if(!loggedInMessage){
return;
}

loggedInMessage.textContent=message;

loggedInMessage.classList.add("show");

}

function showProfileMessage(message){

if(!profileMessage){
return;
}

profileMessage.textContent=message;

profileMessage.classList.add("show");

}

function clearMessages(){

if(accountMessage){

accountMessage.textContent="";
accountMessage.classList.remove("show");

}

if(loginMessage){

loginMessage.textContent="";
loginMessage.classList.remove("show");

}

if(loggedInMessage){

loggedInMessage.textContent="";
loggedInMessage.classList.remove("show");

}

if(profileMessage){

profileMessage.textContent="";
profileMessage.classList.remove("show");

}

}

function updateLoggedInUser(user){

if(!user){
return;
}

const displayName=
user.display_name ||
user.username ||
"マイページ";

if(accountDisplayName){
accountDisplayName.textContent=displayName;
}

if(accountUsername){
accountUsername.textContent=user.username || "";
}

if(profileDisplayNameInput){
profileDisplayNameInput.value=displayName;
}

setAccountButtonText(displayName);

showAccountView("loggedin");

}

function updateLoggedOutUser(){

setAccountButtonText("マイページ");

showAccountView("login");

}

async function checkLoginState(){

const token=getToken();

if(!token){

updateLoggedOutUser();

return;

}

try{

const response=await fetch(
API_BASE+"/api/me",
{
method:"GET",
headers:{
"Authorization":"Bearer "+token
}
}
);

const data=await response.json();

if(!response.ok){

setToken("");

updateLoggedOutUser();

return;

}

if(data.user){

updateLoggedInUser(data.user);

}else{

setToken("");

updateLoggedOutUser();

}

}catch(error){

console.error(error);

}

}

function openMyPage(){

if(mobileMenu){

mobileMenu.classList.remove("active");

}

if(!accountModal){
return;
}

accountModal.classList.add("active");

document.body.style.overflow="hidden";

clearMessages();

const token=getToken();

if(token){

checkLoginState();

}else{

showAccountView("login");

}

}

if(accountButton){

accountButton.addEventListener(
"click",
openMyPage
);

}

if(mobileAccountButton){

mobileAccountButton.addEventListener(
"click",
openMyPage
);

}

if(accountOverlay){

accountOverlay.addEventListener(
"click",
closeAccountModal
);

}

if(accountClose){

accountClose.addEventListener(
"click",
closeAccountModal
);

}

if(showRegisterButton){

showRegisterButton.addEventListener(
"click",
()=>{

clearMessages();

showAccountView("register");

}
);

}

if(showLoginButton){

showLoginButton.addEventListener(
"click",
()=>{

clearMessages();

showAccountView("login");

}
);

}

if(openProfileButton){

openProfileButton.addEventListener(
"click",
async ()=>{

clearMessages();

showAccountView("profile");

await checkLoginState();

}
);

}

if(backAccountButton){

backAccountButton.addEventListener(
"click",
()=>{

clearMessages();

showAccountView("loggedin");

}
);

}

if(registerForm){

registerForm.addEventListener(
"submit",
async event=>{

event.preventDefault();

const username=
document.getElementById(
"registerUsername"
).value.trim();

const displayName=
document.getElementById(
"registerDisplayName"
).value.trim();

const password=
document.getElementById(
"registerPassword"
).value;

const passwordConfirm=
document.getElementById(
"registerPasswordConfirm"
).value;

const submitButton=
registerForm.querySelector(
"button[type='submit']"
);

if(!/^[A-Za-z0-9_]{3,20}$/.test(username)){

showAccountMessage(
"ユーザーネームは3〜20文字の英数字と_のみ使用できます。"
);

return;

}

if(!displayName){

showAccountMessage(
"表示名を入力してください。"
);

return;

}

if(password.length<8){

showAccountMessage(
"パスワードは8文字以上にしてください。"
);

return;

}

if(password.length>128){

showAccountMessage(
"パスワードは128文字以内にしてください。"
);

return;

}

if(password!==passwordConfirm){

showAccountMessage(
"パスワードが一致していません。"
);

return;

}

submitButton.disabled=true;

submitButton.textContent="作成中...";

showAccountMessage(
"アカウントを作成しています..."
);

try{

const response=await fetch(
API_BASE+"/api/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
display_name:displayName,
password
})
}
);

const data=await response.json();

if(!response.ok){

throw new Error(
data.error ||
"アカウントを作成できませんでした。"
);

}

showAccountMessage(
"アカウントを作成しました！"
);

registerForm.reset();

setTimeout(
()=>{

showAccountView("login");

clearMessages();

},
1200
);

}catch(error){

showAccountMessage(
error.message ||
"通信エラーが発生しました。"
);

}finally{

submitButton.disabled=false;

submitButton.textContent=
"アカウントを作成";

}

}
);

}

if(loginForm){

loginForm.addEventListener(
"submit",
async event=>{

event.preventDefault();

const username=
document.getElementById(
"loginUsername"
).value.trim();

const password=
document.getElementById(
"loginPassword"
).value;

const submitButton=
loginForm.querySelector(
"button[type='submit']"
);

if(!username){

showLoginMessage(
"ユーザーネームを入力してください。"
);

return;

}

if(!password){

showLoginMessage(
"パスワードを入力してください。"
);

return;

}

submitButton.disabled=true;

submitButton.textContent=
"ログイン中...";

showLoginMessage(
"ログインしています..."
);

try{

const response=await fetch(
API_BASE+"/api/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
password
})
}
);

const data=await response.json();

if(!response.ok){

throw new Error(
data.error ||
"ログインできませんでした。"
);

}

if(!data.token){

throw new Error(
"ログイン情報を取得できませんでした。"
);

}

setToken(data.token);

loginForm.reset();

if(data.user){

updateLoggedInUser(data.user);

showLoggedInMessage(
"ログインしました！"
);

}else{

await checkLoginState();

}

}catch(error){

showLoginMessage(
error.message ||
"通信エラーが発生しました。"
);

}finally{

submitButton.disabled=false;

submitButton.textContent=
"ログイン";

}

}
);

}

if(displayNameForm){

displayNameForm.addEventListener(
"submit",
async event=>{

event.preventDefault();

const token=getToken();

if(!token){

showProfileMessage(
"ログインしてください。"
);

return;

}

const displayName=
profileDisplayNameInput
? profileDisplayNameInput.value.trim()
: "";

const submitButton=
displayNameForm.querySelector(
"button[type='submit']"
);

if(!displayName){

showProfileMessage(
"表示名を入力してください。"
);

return;

}

if(displayName.length>30){

showProfileMessage(
"表示名は30文字以内にしてください。"
);

return;

}

submitButton.disabled=true;

submitButton.textContent=
"保存中...";

showProfileMessage(
"保存しています..."
);

try{

const response=await fetch(
API_BASE+"/api/profile",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+token
},
body:JSON.stringify({
display_name:displayName
})
}
);

const data=await response.json();

if(!response.ok){

throw new Error(
data.error ||
"表示名を保存できませんでした。"
);

}

if(data.user){

updateLoggedInUser(data.user);

}

showProfileMessage(
"保存しました！"
);

}catch(error){

showProfileMessage(
error.message ||
"通信エラーが発生しました。"
);

}finally{

submitButton.disabled=false;

submitButton.textContent=
"保存";

}

}
);

}

if(logoutButton){

logoutButton.addEventListener(
"click",
async ()=>{

const token=getToken();

logoutButton.disabled=true;

logoutButton.textContent=
"ログアウト中...";

try{

if(token){

await fetch(
API_BASE+"/api/logout",
{
method:"POST",
headers:{
"Authorization":"Bearer "+token
}
}
);

}

}catch(error){

console.error(error);

}finally{

setToken("");

updateLoggedOutUser();

clearMessages();

logoutButton.disabled=false;

logoutButton.textContent=
"ログアウト";

}

}
);

}

document.addEventListener(
"keydown",
event=>{

if(
event.key==="Escape" &&
accountModal &&
accountModal.classList.contains("active")
){

closeAccountModal();

}

}
);

loadAddons();

checkLoginState();
