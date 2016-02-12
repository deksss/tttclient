export function getDocHeight () {
   var D = document;
   return Math.max(
     Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
     Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
     Math.max(D.body.clientHeight, D.documentElement.clientHeight)
  );
}

//not used
export function getArrowPostfix () {
  const maxSize = '';
  const midSize = '120';
  const minSize = '80';
  const docHeight = getDocHeight();	
  if (docHeight < 699 ) { 
    return minSize;
  } else if (docHeight < 999) {
    return midSize;
  } else {
  	return maxSize;
  }
}

export function getArrowCss (player, active) {
  if (name === 'P1') {
  	return 'assets/';
  }
}