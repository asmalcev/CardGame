let cards = {f: undefined, s: undefined}
let ch1,ch2
let timeNow = 0
let t
const unColors = [
 'C',
 'C',
 'O',
 'O',
 'P',
 'P',
 'Q',
 'Q',
 'S',
 'S',
 'T',
 'T',
 'W',
 'W',
 'Z',
 'Z',

 '#d50000',
 '#d50000',
 '#18FFFF',
 '#18FFFF',
 '#757575',
 '#757575',
 '#F5F5F5',
 '#F5F5F5',
 '#76FF03',
 '#76FF03',
 '#BA68C8',
 '#BA68C8',
 '#5D4037',
 '#5D4037',
 '#4FC3F7',
 '#4FC3F7',
 '#2E7D32',
 '#2E7D32',
 '#827717',
 '#827717'
]
let colors = []
function openCard(card) {
	if (cards.f == undefined) {
		cards.f = card
		ch1 = card.children
		ch1[0].style['transform'] = 'rotateY(180deg)'
		ch1[1].style['transform'] = 'rotateY(360deg)'
	} else if (cards.s == undefined && card != cards.f) {
		cards.s = card
		ch2 = card.children
		ch2[0].style['transform'] = 'rotateY(180deg)'
		ch2[1].style['transform'] = 'rotateY(360deg)'
		isCorrect()
	}
}
function randomColor() {
	let backs = document.querySelectorAll('.back')
	backs.forEach( b => {
		let i = Math.floor(Math.random() * colors.length)
		b.style['background-image'] = `url(pictures/${colors[i]}.svg)`
		colors.splice(i,1)
	})
}
function isCorrect() {
	if (ch1[1].style['background-image'] == ch2[1].style['background-image']) {
		cards.f.setAttribute('onclick', '')
		cards.s.setAttribute('onclick', '')
		cards = {f: undefined, s: undefined}
		isEnd()
	}
	else {
		setTimeout(() => {ch1[0].style['transform'] = 'rotateY(0deg)'
			ch1[1].style['transform'] = 'rotateY(180deg)'
			ch2[0].style['transform'] = 'rotateY(0deg)'
			ch2[1].style['transform'] = 'rotateY(180deg)'
			cards = {f: undefined, s: undefined}}, 500)
	}
}
function isEnd() {
	let c = document.querySelectorAll('.card')
	let end = true
	c.forEach(f => {
		if (f.getAttribute('onclick') != '')
			end = false
	})
	if (end) {
		setTimeout(() => {
			clearInterval(t)
			document.querySelector('.restart').style['display'] = 'flex'
      document.querySelector('#name').focus()
		}, 100)
	}
}
function countTimer() {
		t = setInterval(() => {
			timeNow++
			let time = document.querySelector('.timer span')
			let s = timeNow % 60
			let m = Math.floor(timeNow / 60)
			if (s > 9 && m > 9) {
				time.innerHTML = `${m}:${s}`
			} else if (s < 9 && m > 9) {
				time.innerHTML = `${m}:0${s}`
			} else if (s > 9 && m < 9) {
				time.innerHTML = `0${m}:${s}`
			} else
				time.innerHTML = `0${m}:0${s}`
		}, 1000)
}
function start() {
	for (let j = 0;j < localStorage.field;j++)
		colors[j] = unColors[j]
	timeNow = 0
	document.querySelectorAll('.front').forEach(fr => {
		fr.style['transform'] = 'rotateY(0deg)'
	})
	document.querySelectorAll('.back').forEach(bk => {
		bk.style['transform'] = 'rotateY(180deg)'
	})
	document.querySelectorAll('.card').forEach(cd => {
		cd.setAttribute('onclick', 'openCard(this)')
	})
	cards = {f: undefined, s: undefined}
	countTimer()
	randomColor()
}
function closeModal() {
	document.querySelector('#restart').style['display'] = 'none'
}
function openMenu() {
	document.querySelector('.container').style['transform'] = 'scale(0)'
	document.querySelector('.timer').style['display'] = 'none'
	document.querySelector('.gamefield').innerHTML = ''
	document.querySelector('.timer span').innerHTML = '00:00'
	clearInterval(t)
	anime = requestAnimationFrame(animate)
}
