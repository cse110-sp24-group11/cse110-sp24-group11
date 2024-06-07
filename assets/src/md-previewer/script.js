import { marked } from './marked.esm.js';

const contents = document.getElementById('text-content');
const parsedContent = document.getElementById('md-parser');

marked.use({
    breaks: true,
    gfm: true,
});

document.addEventListener('DOMContentLoaded', () => {
    const text = localStorage.getItem('content');
    if (text) {
        parsedContent.innerHTML = marked.parse(text);
        contents.value = text;
    }
    updateGutter();
})

contents.addEventListener('input', () => {
    const text = contents.value.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '');
    parsedContent.innerHTML = marked.parse(text);
    localStorage.setItem('content', text);
});

// Dynamic Line Numbering
const input = document.querySelector('textarea');
const gutter = document.querySelector('.gutter');
let val = input.value;
let numOfLines = 1;

function updateGutter() {
	val = input.value;
	
	let lineBreaks = val.match(/\n/gi) || [];
	numOfLines = lineBreaks.length ? lineBreaks.length + 1 : 1;
	
	gutter.innerHTML = '';
	for(var i = 0; i < numOfLines; i++) {
		var span = document.createElement('span');
        span.classList.add('lineNum');
		span.innerHTML = i+1;
		gutter.appendChild(span);	
	}
}
// Event listener to update line number gutter
input.addEventListener('input', updateGutter);

// Event number to sync line number with textarea location
input.addEventListener('scroll', () => {
    gutter.scrollTop = input.scrollTop;
});