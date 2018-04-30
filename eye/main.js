//This is a pen based off of Codewoofy's eyes follow mouse. It is just cleaned up, face removed, and then made to be a little more cartoony. https://codepen.io/Codewoofy/pen/VeBJEP
const move = document.getElementsByClassName('move');
const box = document.getElementById('box');
const eye = document.getElementsByClassName('eye')[0];
const one = document.getElementById('one');
const two = document.getElementById('two')
move[0].onmousemove = function (event) {
    const one = document.getElementById('one');
    const mouse = {
        x: event.clientX,
        y: event.clientY
    }
    const radius = {
        x: box.offsetLeft + 10,
        y: box.offsetTop - 10
    }
    console.log(radius.x)
    if (mouse.x > radius.x) {
        one.style.right = '1px';
        two.style.right = '1px';
    } else {
        one.style.right = '20px'
        two.style.right = '20px'
    }
    if (mouse.y > radius.y) {
        one.style.bottom = '2px';
        one.style.width = '13px';
        one.style.height = '13px';
        one.style.backgroundColor = '#000';
        two.style.bottom = '2px';
        two.style.width = '13px';
        two.style.height = '13px';
        two.style.backgroundColor = '#000';
    } else {
        one.style.bottom = '20px';
        one.style.width = '18px';
        one.style.height = '18px';
        one.style.backgroundColor = 'red';
        two.style.bottom = '20px';
        two.style.width = '18px';
        two.style.height = '18px';
        two.style.backgroundColor = 'red'
    }

}