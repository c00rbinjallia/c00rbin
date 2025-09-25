// Snowfall script - lightweight procedural snow using DOM
// Creates a number of snowflake elements and animates them via CSS variables
var SnowModule = (function(){
    var snowContainer = document.getElementById('snow');
    if(!snowContainer) return { start: function(){}, stop: function(){} };

    var flakes = 40; // default number of particles
    // particle size in px
    var maxSizePx = 10;
    var minSizePx = 2;

    // Adjust based on viewport width for performance
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if(vw < 480) flakes = 18;
    else if(vw < 1024) flakes = 30;

    function rand(min, max){ return Math.random() * (max - min) + min; }

    var created = [];

    function createFlake(){
        var flake = document.createElement('div');
        flake.className = 'snowflake';

    // particle size
    var sizePx = Math.round(rand(minSizePx, maxSizePx));
    flake.style.setProperty('--particle-size', sizePx + 'px');

    var left = rand(0, 100);
    flake.style.left = left + '%';

        // random durations and delays for each animation instance
    // make flakes start soon and have varied durations
    var fallDuration = rand(8, 16); // seconds
    var fallDelay = rand(0, 4); // start within first 4s
    var drift = rand(-60, 60); // horizontal drift in px

    flake.style.setProperty('--fall-duration', fallDuration + 's');
    flake.style.setProperty('--fall-delay', fallDelay + 's');
    flake.style.setProperty('--drift', drift + 'px');

    // slight horizontal offset so they don't all fall straight down
    flake.style.transform = 'translateX(' + rand(-20,20) + 'px)';

        snowContainer.appendChild(flake);
        created.push(flake);

        // remove & recreate the flake after it finishes to randomize again
        (function(f){
            var total = (parseFloat(fallDuration) + parseFloat(fallDelay)) * 1000 + 800;
            setTimeout(function(){
                if(f.parentNode) f.parentNode.removeChild(f);
                var newFlake = f.cloneNode(true);
                var newSizePx = Math.round(rand(minSizePx, maxSizePx));
                newFlake.style.setProperty('--particle-size', newSizePx + 'px');
                newFlake.style.left = rand(0,100) + '%';
                var newFallDuration = rand(8,16);
                var newFallDelay = rand(0,4);
                var newDrift = rand(-60,60);
                newFlake.style.setProperty('--fall-duration', newFallDuration + 's');
                newFlake.style.setProperty('--fall-delay', newFallDelay + 's');
                newFlake.style.setProperty('--drift', newDrift + 'px');
                newFlake.style.transform = 'translateX(' + rand(-20,20) + 'px)';
                snowContainer.appendChild(newFlake);
                created.push(newFlake);
            }, total);
        })(flake);
    }

    var running = false;

    function start(){
        if(running) return;
        running = true;
        // create initial burst
        for(var i=0;i<flakes;i++) createFlake();
    }

    function stop(){
        running = false;
        // remove created flakes
        created.forEach(function(el){ if(el.parentNode) el.parentNode.removeChild(el); });
        created = [];
    }

    // Auto-start based on stored preference (default on)
    try{
        var pref = localStorage.getItem('theme_snow');
        if(pref === null || pref === 'on') start();
    }catch(e){}

    return { start: start, stop: stop };
})();
