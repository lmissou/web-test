function log(str) {
  console.log(str);
  const logdom = document.getElementById('jslog-container');
  if (!logdom) {
    return;
  }
  logdom.innerText = str;
}

log('test2');
