const makeTimer = () => {
	let elapsed = 0;

	const stopwatch = () => { console.log('i am first.') };
	const increase = () => {elapsed++;
		console.log(elapsed);};

	setInterval(increase, 1000);

	return stopwatch;
};

let timer = makeTimer();

timer();