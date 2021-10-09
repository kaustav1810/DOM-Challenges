const board = document.querySelector('#board');


function generateBoard(el,rows,cols) {

    let h = 100/rows;
    let w = 100/cols;

    for(let i=0;i<rows;i++){
        const rowBox = document.createElement('div');
        rowBox.style.display = 'flex';
        rowBox.style.flexGrow = '1';
        rowBox.style.height = `${w}%`;

        for(let j=0;j<cols;j++){
            const colBox = document.createElement('div');
            colBox.style.display = 'flex';
            colBox.style.flexGrow = '1';

            if( (i%2==0 && j%2!=0) || (i%2!=0 && j%2==0) )
            colBox.style.background = 'black';
            
            colBox.style.width = `${w}%`;

            colBox.setAttribute('data-cell',`${i}:${j}`);

            colBox.addEventListener('click',(e)=>paintBoard(e));

            rowBox.appendChild(colBox);

        }
        el.appendChild(rowBox);
    }
}


function paintBoard(el){
    
    let position = el.target.getAttribute('data-cell');
    
    let row = position.split(':')[0];
    let col = position.split(':')[1];
    
    
    return paintCell(row,col);
    
}


function paintCell(i,j) {
    // if(i<0 || j<0 || i>7 || j>7) return;
    
    let row = i;
    let col = j;

    while(row<7 && col<7){
    let box = document.querySelector(`[data-cell='${row}:${col}']`);

    box.style.background = 'red';

    row++;
    col++;
    }

    row = row;
    col = j;
    while(row<7 && col>0){
    let box = document.querySelector(`[data-cell='${row}:${col}']`);

    box.style.background = 'red';

    row++;
    col--;
    }

    row = i;
    col = j;
    while(row>0 && col<7){
    let box = document.querySelector(`[data-cell='${row}:${col}']`);

    box.style.background = 'red';

    row--;
    col++;
    }

    row = i;
    col = j;
    while(row>0 && col>0){
    let box = document.querySelector(`[data-cell='${row}:${col}']`);

    box.style.background = 'red';

    row--;
    col--;
    }

    // paintCell(i+1,j+1);
    // paintCell(i+1,j-1);
    // paintCell(i-1,j+1);
    // paintCell(i-1,j-1);
}


generateBoard(board,8,8);