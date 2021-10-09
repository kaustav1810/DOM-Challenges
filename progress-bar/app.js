        const loadBtn = document.getElementsByTagName('button')[0];
        const bar = document.getElementById('progress-bar');
        const runCount = document.getElementById('run-count');

        function ProgressBar(el,elCount,duration){

            let loadBar = document.createElement('div');
            
            loadBar.style.width = '0';
            loadBar.style.height = '100%';
            loadBar.style.background = 'blue';
            
            el.appendChild(loadBar);

            let startTime = null,count = 0,isLoading = false;

            function load(){
                count++;
                runCount.innerHTML = `${count}`;
                if(!isLoading){
                    isLoading = true;
                    fill();
                }
            }


        function fill(){
            if(startTime===null) startTime = Date.now();

            let elapsedTime = Date.now() - startTime;

            let width = (elapsedTime/duration)*100;

            loadBar.style.width = `${width}%`;

            if(elapsedTime>=duration){
                loadBar.style.width = 0;

                count--;

                runCount.innerHTML = `${count}`;
                
                startTime = null;
                
                if(count<=0){
                    isLoading = false;
                    runCount.innerHTML = '';

                return;
                }
            }

            setTimeout(fill,1000/60);
        }


        return {load};
    }
        const progress = ProgressBar(bar,runCount,8000);

        loadBtn.addEventListener('click',()=> progress.load())