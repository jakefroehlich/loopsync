let timerID=null;
let interval=100;
let CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  './Metronome.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(currentCacheName).then(function(cache) {
          console.log("opened cache")
        return cache.addAll(arrayOfFilesToCache);
      })
    );
  });

self.onmessage = (e) => {
	if (e.data=="start") {
        console.log("Worker starting!")
		timerID=setInterval(() => {postMessage("tick");},interval)
	}
	else if (e.data.interval) {
		interval=e.data.interval;
		if (timerID) {
			clearInterval(timerID);
			timerID=setInterval(() => {postMessage("tick");},interval)
		}
	}
	else if (e.data=="stop") {
        console.log("Worker stopping!")
		clearInterval(timerID);
		timerID=null;
	}
};

postMessage('test');