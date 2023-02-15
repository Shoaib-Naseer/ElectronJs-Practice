console.log('Running');
const incrementbtn = document.getElementById('incrementbtn');
const decrementbtn = document.getElementById('decrementbtn');
const h3 = document.getElementById('click-counter');

let cnt = 0;

incrementbtn.addEventListener('click', function () {
  h3.innerHTML = cnt;
  cnt++;
});

decrementbtn.addEventListener('click', function () {
  cnt--;
  h3.innerHTML = cnt;
});
