
let difficulty='Easy';
let mode='pvp';
let current='X';
let cells=[];

const wins=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

function setDifficulty(d){
difficulty=d;
document.getElementById('difficulty').style.display='none';
document.getElementById('mode').style.display='block';
}

function startGame(m){
mode=m;
document.getElementById('mode').style.display='none';

const cd=document.getElementById('countdown');
const txt=document.getElementById('countText');

cd.style.display='flex';

let count=3;
txt.innerText='3';

const timer=setInterval(()=>{
count--;

if(count>0) txt.innerText=count;
else if(count===0) txt.innerText='START!';
else{
clearInterval(timer);
cd.style.display='none';
document.getElementById('game').style.display='block';
createBoard();
}
},1000);
}

function createBoard(){
board.innerHTML='';
cells=Array(9).fill('');
current='X';

info.innerText='Difficulty: '+difficulty;

for(let i=0;i<9;i++){
const c=document.createElement('div');
c.className='cell';
c.onclick=()=>move(i,c);
board.appendChild(c);
}
}

function move(i,c){
if(cells[i]) return;

cells[i]=current;
c.innerText=current;

if(checkWinner()){
if(mode==='ai'){
showPopup(current==='X' ? '🏆 YOU WON!' : '💀 YOU LOST!');
}else{
showPopup('🏆 Player '+current+' Wins!');
}
return;
}

if(!cells.includes('')){
showPopup('🤝 DRAW MATCH');
return;
}

current=current==='X'?'O':'X';

if(mode==='ai' && current==='O'){
info.innerText='🤖 Computer Thinking...';
setTimeout(aiMove,800);
}
}

function aiMove(){

let move=findBestMove('O');
if(move!==-1){
document.querySelectorAll('.cell')[move].click();
return;
}

move=findBestMove('X');
if(move!==-1){
document.querySelectorAll('.cell')[move].click();
return;
}

if(cells[4]===''){
document.querySelectorAll('.cell')[4].click();
return;
}

const corners=[0,2,6,8].filter(i=>cells[i]==='');
if(corners.length){
const r=corners[Math.floor(Math.random()*corners.length)];
document.querySelectorAll('.cell')[r].click();
return;
}

const free=[];
for(let i=0;i<9;i++){
if(cells[i]==='') free.push(i);
}

const r=free[Math.floor(Math.random()*free.length)];
document.querySelectorAll('.cell')[r].click();
}

function findBestMove(player){

for(let combo of wins){

const values=combo.map(i=>cells[i]);

const playerCount=values.filter(v=>v===player).length;
const emptyCount=values.filter(v=>v==='').length;

if(playerCount===2 && emptyCount===1){
for(let index of combo){
if(cells[index]==='') return index;
}
}
}

return -1;
}

function checkWinner(){
return wins.some(w=>w.every(i=>cells[i]===current));
}

function resetBoard(){
createBoard();
}

function showPopup(msg){
const p=document.createElement('div');
p.className='popup';

p.innerHTML=`
<div class="popup-card">
<h1>${msg}</h1>
<button onclick="location.reload()">Main Menu</button>
</div>`;

document.body.appendChild(p);
}
