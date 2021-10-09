function Board(el, rows, cols) {
	this.el = document.querySelector(el);
	this.rows = rows;
	this.cols = cols;
	this.activeColor = 'black';
	this.draw = false;
	this.generateBoard();
	this.addColorPicker();
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
			row.appendChild(col);
		}
		fragment.appendChild(row);
	}
	this.el.appendChild(fragment);
};

Board.prototype.addColorPicker = function() {
	const row = document.createElement('div');
	row.classList.add('row');
	for (var j = 0; j < this.cols; j++) {
		const color = getRandomColor();
		const col = document.createElement('div');
		col.classList.add('col');
		col.dataset['color'] = color;
		col.style.background = color;
		row.appendChild(col);
	}
	this.el.appendChild(row);
};

Board.prototype.bindEvents = function() {
	this.el.addEventListener('mousedown', (e) => {
		this.draw = true;
		this.fill(e);
	});
	this.el.addEventListener('mouseup', (e) => {
		this.draw = false;
	});
	this.el.addEventListener('mouseover', (e) => {
		this.draw && this.fill(e);
	});
};

Board.prototype.fill = function(e) {
	const cell = e.target.dataset['cell'];
	const color = e.target.dataset['color'];
	color && (this.activeColor = color);
	cell && (e.target.style.background = this.activeColor);
};

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}



new Board('#board', 10,10);
