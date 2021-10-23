function Board(el, size = 4) {
	this.el = document.querySelector(el);
	this.size = size;
	this.activeCell = '';
	this.color;
	this.oddColor;
	this.generateColor();
	this.generateBoard();
	this.fill();
	this.bindEvents();
}

// fn. for generating random colors
const getRandomColors = function() {
	var ratio = 0.618033988749895;

	var hue = (Math.random() + ratio) % 1;
	var saturation = Math.round(Math.random() * 100) % 85;
	var lightness = Math.round(Math.random() * 100) % 85;

	var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
	var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

	return {
		color,
		oddColor
	};
};

// fn. for getting colors from getRandomColors()
Board.prototype.generateColor = function() {
	let { color, oddColor } = getRandomColors();
	this.color = color;
	this.oddColor = oddColor;
};

// fn. for generating Board
Board.prototype.generateBoard = function() {
	const fragment = document.createDocumentFragment();

	for (var i = 0; i < this.size; i++) {
		const row = document.createElement('div');
		row.classList.add('row');
		for (var j = 0; j < this.size; j++) {
			const col = document.createElement('div');
			col.classList.add('col');
			col.dataset['cell'] = i + ':' + j;
			col.style.background = this.color;
			row.appendChild(col);
		}
		fragment.appendChild(row);
	}
	this.el.innerHTML = '';
	this.el.appendChild(fragment);
};

let i = 0;

// fn. for evaluating result of each input
Board.prototype.bindEvents = function() {
	this.el.addEventListener('click', (e) => {
		const score = document.querySelector('span');

		// console.log('clicked',e.target);
		// console.log('ans',this.activeCell);

		if (e.target == this.activeCell) {
			score.innerText = ++i;
			new Board('#board', ++this.size);

		} else {
			this.el.classList.add('shake');
			setTimeout(() => this.el.classList.remove('shake'), 800);
		}

		e.stopPropagation();
	});
};

// fn. for coloring the odd cell
Board.prototype.fill = function() {
	let row = Math.floor(Math.random() * this.size);
	let col = Math.floor(Math.random() * this.size);

	this.activeCell = document.querySelector(`[data-cell="${row}:${col}"]`);

	console.log(this.activeCell);

	this.activeCell.style.background = this.oddColor;
};

// generating new Board
new Board('#board', 6);
