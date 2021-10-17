function MemoryGame(grid,start,score,highScore) {
    
    const gridEl = document.querySelector(grid);
    const startBtn = document.querySelector(start);
    const scoreEl = document.querySelector(score);
    const highScoreEl = document.querySelector(highScore);

    let level = 0,
    randomTiles = [],
    count = 5,
    highScoreValue = localStorage.getItem('highScore') || 0,
    canPlay = false,
    animationDelay = 500;

    init();

    function init() {
        
        setScore(0);
        setHighScore(highScoreValue);

        let div = document.createElement('div');
        div.classList.add('tile');

        let frag = document.createDocumentFragment();

        for(let i = 0;i<count;i++){
            let node = div.cloneNode();

            node.dataset.cell = i;

            frag.appendChild(node);

        }

        gridEl.appendChild(frag);

        startBtn.addEventListener('click',()=>play());

        gridEl.addEventListener('click',(e)=>onClickHandler(e))
    }

    async function play() {

        startBtn.setAttribute('disabled',true);

        canPlay = false;

        randomTiles = [...new Array(level+1)].map(()=>{
             return Math.floor(Math.random()*count);
        })

        for(let value of randomTiles){
        await flash(gridEl.children[value],'active');
        }

        canPlay = true;
    }


    async function onClickHandler(el) {

        if(!canPlay) return;

        [first,...randomTiles] = randomTiles;

        let clicked = el.target.dataset.cell;

        if(first!=clicked){
            gridEl.classList.toggle('shake');
            el.target.classList.toggle('wrong');

            setTimeout(()=>{
                gridEl.classList.toggle('shake');
            el.target.classList.toggle('wrong');

            },animationDelay);

            setScore(0);

            canPlay = false;

            startBtn.removeAttribute('disabled');

            return;
        }

        
        if(randomTiles.length==0){
            // canPlay = false;
            level++;
            setScore(level);
            setTimeout(play,1000);
        }
        
         await flash(el.target,'green');
    }

    async function flash(el,className) {
        
        el.classList.add(className);
        
        await new Promise(resolve => {

            return setTimeout(resolve,animationDelay);

        })
        
        el.classList.remove(className);
        
        await new Promise(resolve => {
            return setTimeout(resolve,animationDelay);

        })
    }

    function setScore(score) {
        scoreEl.innerText = `Score: ${score}`;

        if(score>highScoreValue) setHighScore(score)
    }

    function setHighScore(score) {
        highScoreEl.innerText = `HighScore: ${score}`;

        highScoreValue = score;

        localStorage.setItem('highScore',score);
    }
}

MemoryGame('#box','#startGame','#score','#high-score')