const db = [
    `Do you think you're living an ordinary life? You are so mistaken it's difficult to even explain. The mere fact that you exist makes you extraordinary. The odds of you existing are less than winning the lottery, but here you are. Are you going to let this extraordinary opportunity pass?`,
    `Was it a whisper or was it the wind? He wasn't quite sure. He thought he heard a voice but at this moment all he could hear was the wind rustling the leaves of the trees all around him. He stopped and listened more intently to see if he could hear the voice again.`,
    `Debbie knew she was being selfish and unreasonable. She understood why the others in the room were angry and frustrated with her and the way she was acting. In her eyes, it didn't really matter how they felt because she simply didn't care.`,
    `The headache wouldn't go away. She's taken medicine but even that didn't help. The monstrous throbbing in her head continued. She had this happen to her only once before in her life and she realized that only one thing could be happening.`,
    `He sat across from her trying to imagine it was the first time. It wasn't. Had it been a hundred? It quite possibly could have been. Two hundred? Probably not. His mind wandered until he caught himself and again tried to imagine it was the first time.`,
    `There are only three ways to make this work. The first is to let me take care of everything. The second is for you to take care of everything. The third is to split everything 50 / 50. I think the last option is the most preferable, but I'm certain it'll also mean the end of our marriage.`,
    `Don't be scared. The things out there that are unknown aren't scary in themselves. They are just unknown at the moment. Take the time to know them before you list them as scary. Then the world will be a much less scary place for you.`,
    `You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you're done. That way even after you're gone, you will still live on in the things you created.`
]

function setRandomLetterArray() {
    const prevText = speedText.innerHTML;
    if (speedText.innerHTML != '') {
        speedText.innerHTML = '';
    }

    db[Math.floor(Math.random() * db.length)].split('').forEach((letter, i) => {
        if (i === 0) {
        speedText.innerHTML += `<span data-index=${i} class='letter letter-active'>${letter}</span>`;
        } else {
        speedText.innerHTML += `<span data-index=${i} class='letter'>${letter}</span>`;
        }
    });
    if (prevText == speedText.innerHTML) {
        setRandomLetterArray()
    }
    }

function setSpeedAndAccuracy() {
if (!speed) {
    speedValue.innerHTML = '-';
}
if (!accuracy) {
    accuracyValue.innerHTML = '-';
}
}

function clearSpeedAndAccuracy() {
    speed = false;
    accuracy = false;
    speedValue.innerHTML = '-';
    accuracyValue.innerHTML = '-';
}

const speedText = document.querySelector('.speed__main'),
      speedValue = document.querySelector('.speed__value'),
      accuracyValue = document.querySelector('.accuracy__value'),
      retry = document.querySelector('.speed__retry');

let speed, accuracy;

setRandomLetterArray()

let deg = 0;
retry.addEventListener('click', () => {
    deg += 360;
    document.querySelector('.fa-repeat').style.transform = `rotate(${deg}deg)`;
    setRandomLetterArray()
    clearSpeedAndAccuracy()
    counter = 0;
    fails = 0;
    keyupValue = 0;
    letterIndex = 0;
    startTime = 0;
    finishTime = 0;
    speedValue.innerHMTL = '-';
    accuracyValue.innerHMTL = '-';
    letters = document.querySelectorAll('.letter');
    letters.forEach(letter => letter.classList.remove('letter-prev'))
    
})

clearSpeedAndAccuracy();

function start(e) {
    letterIndex = 0;
    letters.forEach((letter, i) => {
        if (letter.innerHTML === e.key && counter === i && i < letters.length - 1 && letterIndex === 0) {
            keyupValue++
            if (keyupValue == 1) {
                startTime = Date.now();
            }
            letter.classList.remove('letter-active');
            letter.classList.add('letter-prev');
            letters[+letter.getAttribute('data-index') + 1].classList.add('letter-active');
            counter++;
            letterIndex++;

            if ((100 - ((fails * 100) / counter)).toFixed(0) < 0) {
                accuracyValue.innerHTML = '0%'
            } else {
                accuracyValue.innerHTML = (100 - ((fails * 100) / counter)).toFixed(0) + '%';
            }
            finishTime = Date.now();
            if (!(counter / ((finishTime - startTime) / 1000 / 60)).toFixed(0)
                || (counter / ((finishTime - startTime) / 1000 / 60)).toFixed(0) == Infinity) {
                    speedValue.innerHTML = '-';
                } else {
                    speedValue.innerHTML = (counter / ((finishTime - startTime) / 1000 / 60)).toFixed(0) + ' с/м';
                }
        } else if (letter.innerHTML === e.key && counter === i && i >= letters.length - 1 && letterIndex === 0) {
            keyupValue++
            letter.classList.remove('letter-active');
            letter.classList.add('letter-prev');
            counter++;
            accuracyValue.innerHTML = (100 - ((fails * 100) / counter)).toFixed(0) + '%'

            finishTime = Date.now();
            speedValue.innerHTML = (counter / ((finishTime - startTime) / 1000 / 60)).toFixed(0) + ' с/м';
        } else if (letter.innerHTML !== e.key 
        && counter === i && i <= letters.length - 1 
        && letterIndex === 0 
        && e.key !== 'Shift' 
        && e.key !== 'Control'
        && e.key !== 'Alt') {
            fails++;
        } 
    })
}

let letters = document.querySelectorAll('.letter');
let startTime, finishTime;
let counter = 0;
let fails = 0;
let keyupValue = 0;
let letterIndex;

document.addEventListener('keyup', (e) => start(e))