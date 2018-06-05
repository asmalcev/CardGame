var cards = {f: undefined, s: undefined};
var ch1,ch2;
var timeNow = 0;
var t;
const unColors = [
 '#7986CB',
 '#FFC107',
 '#e53935',
 '#4CAF50',
 '#FF5722',
 '#1A237E',
 '#E91E63',
 '#FFC107',
 '#7986CB',
 '#212121',
 '#FF5722',
 '#e53935',
 '#E91E63',
 '#4CAF50',
 '#212121',
 '#1A237E'
]
var colors = [
 '#7986CB',
 '#FFC107',
 '#e53935',
 '#4CAF50',
 '#FF5722',
 '#1A237E',
 '#E91E63',
 '#FFC107',
 '#7986CB',
 '#212121',
 '#FF5722',
 '#e53935',
 '#E91E63',
 '#4CAF50',
 '#212121',
 '#1A237E'
]

function openCard(card) {
	if (cards.f == undefined) {
		cards.f = card;
		ch1 = card.children;
		ch1[0].style['transform'] = 'rotateY(180deg)';
		ch1[1].style['transform'] = 'rotateY(360deg)';
	} else if (cards.s == undefined && card != cards.f) {
		cards.s = card;
		ch2 = card.children;
		ch2[0].style['transform'] = 'rotateY(180deg)';
		ch2[1].style['transform'] = 'rotateY(360deg)';
		isCorrect();
	}
}

function randomColor() {
	let backs = document.querySelectorAll('.back');
	backs.forEach( b => {
		let i = Math.floor(Math.random() * colors.length);
		b.style['background-color'] = colors[i];
		colors.splice(i,1);
	})
}

function isCorrect() {
	if (ch1[1].style['background-color'] == ch2[1].style['background-color']) {
		cards.f.setAttribute('onclick', '');
		cards.s.setAttribute('onclick', '');
		cards = {f: undefined, s: undefined};
		isEnd();
	}
	else {
		setTimeout(() => {ch1[0].style['transform'] = 'rotateY(0deg)';
			ch1[1].style['transform'] = 'rotateY(180deg)';
			ch2[0].style['transform'] = 'rotateY(0deg)';
			ch2[1].style['transform'] = 'rotateY(180deg)';
			cards = {f: undefined, s: undefined};}, 500);
	}
}

function isEnd() {
	let c = document.querySelectorAll('.card');
	let end = true;
	c.forEach(f => {
		if (f.getAttribute('onclick') != '') {
			end = false;
		}
	})
	if (end) {
		setTimeout(() => {
			alert('Congratulate!');
			clearInterval(t);
			if (confirm('Do you want to restart?')) {
				start();
			}
		}, 100)
	}
}
function countTimer() {
		t = setInterval(() => {
		timeNow++;
		let time = document.querySelector('.timer span');
		let s = timeNow % 60;
		let m = Math.floor(timeNow / 60);
		if (s > 9 && m > 9) {
			time.innerHTML = `${m}:${s}`;
		} else if (s < 9 && m > 9) {
			time.innerHTML = `${m}:0${s}`;
		} else if (s > 9 && m < 9) {
			time.innerHTML = `0${m}:${s}`;
		} else 
			time.innerHTML = `0${m}:0${s}`;
	}, 1000)
}

function start() {
	for (let j = 0; j < 16; j++) {
		colors[j] = unColors[j];
	}
	timeNow = 0;
	document.querySelectorAll('.front').forEach(fr => {
		fr.style['transform'] = 'rotateY(0deg)';
	})
	document.querySelectorAll('.back').forEach(bk => {
		bk.style['transform'] = 'rotateY(180deg)';
	})
	document.querySelectorAll('.card').forEach(cd => {
		cd.setAttribute('onclick', 'openCard(this)');
	})
	cards = {f: undefined, s: undefined};

	countTimer();
	randomColor();
}

start();