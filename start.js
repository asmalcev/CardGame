function openBlock(block) {
	document.querySelector(block).style['transform'] = 'translate(0)'
	cancelAnimationFrame(anime)
}
function closeBlock(block) {
	document.querySelector(block).style['transform'] = 'translate'+flipCoin('X','Y')+'(-100%)'
	anime = requestAnimationFrame(animate)
}
function flipCoin(a,b) {
	if (Math.floor(Math.random() * 2)) return a
	else return b
}
var currentTheme = localStorage.theme
if (localStorage.theme == null || localStorage.theme == undefined || localStorage.theme == 'undefined')
	currentTheme = 'light-theme.css'
changeTheme(currentTheme)
function changeTheme(theme) {
	currentTheme = theme
	localStorage.theme = theme
	document.querySelector('#link').setAttribute('href', theme)
	let b1 = document.querySelector('#flrB')
	let a1 = document.querySelector('#flrA')
	let b2 = document.querySelector('#slrB')
	let a2 = document.querySelector('#slrA')
	if (theme == 'light-theme.css') {
		b1.style['background-color'] = '#15E341'
		a1.style['left'] = '139px'
		b2.style['background-color'] = 'rgba(0,0,0,0.2)'
		a2.style['left'] = '103px'
	} else if (theme == 'dark-theme.css') {
		b2.style['background-color'] = '#15E341'
		a2.style['left'] = '139px'
		b1.style['background-color'] = 'rgba(240,240,240,0.5)'
		a1.style['left'] = '103px'
	}
	changeSize(localStorage.field)
}
if (localStorage.field == null || localStorage.field == undefined || localStorage.field == 'undefined')
	localStorage.field = 16
changeSize(localStorage.field)
function changeSize(count) {
	let color1,color2
	localStorage.field = count
	if (currentTheme == 'light-theme.css') {
		color1 = '#092109'
		color2 = '#777'
	} else if (currentTheme == 'dark-theme.css') {
		color1 = '#eee'
		color2 = '#aaa'
	}
	if (localStorage.field == 16) {
		document.querySelector(`.h${localStorage.field}`).style['color'] = color1
		document.querySelector(`.h${localStorage.field-1+21}`).style['color'] = color2
	} else if (localStorage.field == 36) {
		document.querySelector(`.h${localStorage.field}`).style['color'] = color1
		document.querySelector(`.h${localStorage.field-20}`).style['color'] = color2
	}
}
function generate() {
	document.querySelector('.gamefield').innerHTML = ''
	for (let i = 0;i<localStorage.field;i++)
		document.querySelector('.gamefield').innerHTML += '<div class="card" onclick="openCard(this)"><div class="front"></div><div class="back"></div></div>'
	document.querySelector('.container').style['transform'] = 'scale(1)'
	document.querySelector('.timer').style['display'] = 'block'
	if (localStorage.field == 36) {
		document.querySelectorAll('.card').forEach(c=>{
			if (window.innerWidth > 540) {
				c.style['width'] = '60px'
				c.style['height'] = '60px'
			} else if (window.innerWidth <= 540) {	
				c.style['width'] = '11vw'
				c.style['height'] = '11vw'
			}
		})
	} else if (localStorage.field == 16) {
		document.querySelectorAll('.card').forEach(c=>{
			if (window.innerWidth > 540) {
				c.style['width'] = '100px'
				c.style['height'] = '100px'
			} else if (window.innerWidth <= 540) {	
				c.style['width'] = '18vw'
				c.style['height'] = '18vw'
			}
		})
	}
	start()
	cancelAnimationFrame(anime)
}
function validate(l = false) {
	n = document.querySelector('#name')
	if (n.value == '')
		n.style['border'] = '1px #DE2B2B solid'
	else {
		document.querySelector('.restart').style['display'] = 'none'
		if (localStorage.field == "16" || localStorage.field == 16)
			addStat(timeNow, n.value)
			n.value = ''
			n.style['border'] = '1px #666 solid'
			if (l) openMenu()
			else generate()
	}
}
function addStat(time,name) {
	document.querySelector('#scores').style['cursor'] = 'pointer'
	document.querySelector('#scores').setAttribute('onclick',"openBlock('.container-scoreboard')")
	stats['at'+sizeSt] = [name,time]
	let log = true
	while (log) {
		log = false
		for (let i = 1;i < sizeSt;i++)
			if (stats['at'+i][1] > stats['at'+(i+1)][1]) {
				let k = stats['at'+(i+1)]
				stats['at'+(i+1)] = stats['at'+i]
	      stats['at'+i] = k
	      log = true
	  	}
	 }
	 sizeSt = 1
	 st.innerHTML = ''
	 while (stats['at'+sizeSt] != undefined) {
		st.innerHTML += `<li class="scorename">${stats['at'+sizeSt][0]}<span class="scoretime">${stats['at'+sizeSt][1]} seconds</span></li>`
		sizeSt++
	}
	let serial = JSON.stringify(stats)
	localStorage.stats = serial
}
let statsBool = true, stats = {}, st = document.querySelector('#scorestable'), sizeSt = 1
if (localStorage.stats == undefined) {
	statsBool = false
	document.querySelector('#scores').style['cursor'] = 'not-allowed'
	document.querySelector('#scores').setAttribute('onclick',"")
}
else {
	stats = JSON.parse(localStorage.stats)
	while (stats['at'+sizeSt] != undefined) {
		st.innerHTML += `<li class="scorename">${stats['at'+sizeSt][0]}<span class="scoretime">${stats['at'+sizeSt][1]} seconds</span></li>`
		sizeSt++
	}
}