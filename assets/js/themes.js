// themes.js - manage UI toggles for wave and snow and persist settings
(function(){
    function $(s){ return document.querySelector(s); }

    function applySettings(){
        var wave = localStorage.getItem('theme_wave');
        var snow = localStorage.getItem('theme_snow');

        // wave default on
        if(wave === 'off') document.getElementById('wave-wrap').style.display = 'none';
        else document.getElementById('wave-wrap').style.display = '';

        // snow module
        if(typeof SnowModule !== 'undefined'){
            try{
                if(snow === 'off') SnowModule.stop();
                else SnowModule.start();
            }catch(e){}
        }
    }

    // initialize controls on pages that have them
    document.addEventListener('DOMContentLoaded', function(){
        // wire up toggles if present
        var waveToggle = $('#theme-wave-toggle');
        var snowToggle = $('#theme-snow-toggle');

        if(waveToggle){
            var val = localStorage.getItem('theme_wave');
            waveToggle.checked = (val !== 'off');
            waveToggle.addEventListener('change', function(){
                localStorage.setItem('theme_wave', waveToggle.checked ? 'on' : 'off');
                applySettings();
            });
        }

        if(snowToggle){
            var val2 = localStorage.getItem('theme_snow');
            snowToggle.checked = (val2 !== 'off');
            snowToggle.addEventListener('change', function(){
                localStorage.setItem('theme_snow', snowToggle.checked ? 'on' : 'off');
                applySettings();
            });
        }

        // Apply on load
        applySettings();
    });
})();
