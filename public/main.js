const startButton=document.querySelector('.startbtn');
const info=document.querySelector('.info');
const heading=document.querySelector('h3');
const tileContainer=document.querySelectorAll('.colorcol');
let level=0;
let sequence=[];
let humanSequence=[];

const activateTile= (color) => {
    const tile=document.querySelector(`[data-tile='${color}']`);
    const sound=document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(()=>{
        tile.classList.remove('activated');
    },300);

};
const playRound = (nextSequence) => {
    nextSequence.forEach((color,index) => {
        setTimeout(()=>{
            activateTile(color)
        },(index+1)*600);
    });
};
const nextStep= () => {
    const tiles=['red','yellow','green','blue'];
    const random=tiles[Math.floor(Math.random()*4)];
    return random;
};
const resetGame= (text) => {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Simon Game';
    info.classList.add('hidden');
    for (let i = 0; i < tileContainer.length; i++) {
        tileContainer[i].classList.add('unclickable');
    }
};
const humanTurn= (level) => {
    for (let i = 0; i < tileContainer.length; i++) {
        tileContainer[i].classList.remove('unclickable');
    }
    info.textContent=`Your turn : ${level} Tap${level>1?'s':''}`;
};
const nextRound= () => {
    level+=1;

    for (let i = 0; i < tileContainer.length; i++) {
        tileContainer[i].classList.add('unclickable');
    }
    
    info.textContent='Wait for the Computer';
    heading.textContent=`Level ${level} of 20`;

    const nextSequence= [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence=[...nextSequence];
    setTimeout(()=>{
        humanTurn(level)
    },level*600+1000);
};
const handleClick = (tile) => {
    const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 20) {
        resetGame('Congrats! You completed all the levels');
        return
      }
    humanSequence = [];
    info.textContent = 'Success! Keep going!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
};
const startGame= () => {
    // console.log('hi');
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent="Wait for the Computer";
    nextRound();
}
for (let i = 0; i < tileContainer.length; i++) {
    tileContainer[i].addEventListener("click",event => {
        const { tile } = event.target.dataset;
       console.log(tile);
        if (tile) handleClick(tile);
    });
}
  
startButton.addEventListener('click',startGame);