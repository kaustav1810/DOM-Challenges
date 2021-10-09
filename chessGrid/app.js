function Board(el, rows, cols) {
	this.el = document.querySelector(el);
	this.rows = rows;
	this.cols = cols;
	this.activeCell = '';
	this.color = 'red';
	this.generateBoard();
	this.bindEvents();
}

Board.prototype.generateBoard = function() {
	const fragment = document.createDocumentFragment();
	for (var i = 0; i < this.rows; i++) {
		const row = document.createElement('div');
		row.classList.add('row');
		for (var j = 0; j < this.cols; j++) {
			const col = document.createElement('div');
			col.classList.add('col');
			col.dataset['cell'] = i + ':' + j;
			((i+j))%2==0?col.classList.add('white'):col.classList.add('black');
			row.appendChild(col);
		}
		fragment.appendChild(row);
	}
	this.el.appendChild(fragment);
};

Board.prototype.bindEvents = function() {
	this.el.addEventListener('click', (e) => {
		this.activeCell && this.diagonals(this.activeCell, null);

		let cell = e.target.dataset['cell'];

		this.activeCell = cell;

		cell && this.diagonals(this.activeCell, this.color);

		// e.stopPropagation();
	});

	document.addEventListener('click', (e) => {
		this.activeCell && this.diagonals(this.activeCell, null);
	});
};

Board.prototype.diagonals = function(cell, color){
	let [ row, col ] = cell.split(':');

	let left = col;
	let right = col;

	this.fill(cell, color);

	for (let i = row - 1; i >= 0; i--) {
		left--;
		right++;

		if (left >= 0) this.fill(i + ':' + left, color);

		if (right < 8) this.fill(i + ':' + right, color);
	}
	left = col;
	right = col;

	for (let i = +row + 1; i < 8; i++) {
		left--;
		right++;

		if (left >= 0) this.fill(i + ':' + left, color);

		if (right < 8) this.fill(i + ':' + right, color);
	}
};

Board.prototype.fill = function(cell, color) {
	const temp = document.querySelector(`[data-cell='${cell}']`);

	temp.style.background = color;
};

new Board('#board', 8, 8);
