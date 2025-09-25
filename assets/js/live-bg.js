// live-bg.js
// Simple toggler to switch between static background (CSS image) and a live video background.
(function(){
    'use strict';

    // Configuration: relative path to local video (mp4) in images/ or external URL.
    var config = {
        videoSrc: 'images/pg.mp4', // place a video named pg.mp4 in the images folder, or change this to a URL
        autoplay: true,
        loop: true,
        muted: true,
        playsInline: true
    };

    function createLiveContainer() {
        var container = document.createElement('div');
        container.className = 'live-bg-container';

        var video = document.createElement('video');
        video.setAttribute('aria-hidden', 'true');
        if (config.autoplay) video.autoplay = true;
        if (config.loop) video.loop = true;
        if (config.muted) video.muted = true;
        if (config.playsInline) video.playsInline = true;
        video.src = config.videoSrc;
        video.className = 'live-bg-video';
        video.preload = 'auto';

        // Fallback poster uses existing bg image if present
        video.poster = 'images/bg.jpg';

        container.appendChild(video);
        document.body.appendChild(container);

        // Return video element for control
        return {container: container, video: video};
    }

    // init
    document.addEventListener('DOMContentLoaded', function(){
        // Determine initial state: prefer saved preference, otherwise default to enabled
        var saved = null;
        try { saved = localStorage.getItem('liveBgEnabled'); } catch(e) { /* ignore */ }
        var enabled = saved === null ? true : (saved === 'true');

        var live = createLiveContainer();

        // Start visible/playing if enabled
        if (enabled) {
            live.container.style.display = '';
            document.documentElement.setAttribute('data-live-bg', 'true');
            live.video.play().catch(function(e){ console.log('Video play prevented:', e); });
        } else {
            live.container.style.display = 'none';
            document.documentElement.removeAttribute('data-live-bg');
        }

        // If there is a toggle element in the themes page, bind to it
        var themeToggle = document.getElementById('theme-live-toggle');
        if (themeToggle) {
            // set checkbox state
            try { themeToggle.checked = enabled; } catch(e){}

            themeToggle.addEventListener('change', function(){
                enabled = !!this.checked;
                if (enabled) {
                    live.container.style.display = '';
                    document.documentElement.setAttribute('data-live-bg', 'true');
                    live.video.play().catch(function(e){ console.log('Video play prevented:', e); });
                } else {
                    live.container.style.display = 'none';
                    document.documentElement.removeAttribute('data-live-bg');
                    try { live.video.pause(); } catch(e){}
                }
                try { localStorage.setItem('liveBgEnabled', enabled ? 'true' : 'false'); } catch(e){}
            });
        } else {
            // No external toggle present; persist the default state anyway
            try { localStorage.setItem('liveBgEnabled', enabled ? 'true' : 'false'); } catch(e){}
        }

        // If video fails to load, hide live container and clear saved preference
        live.video.addEventListener('error', function(){
            live.container.style.display = 'none';
            try { localStorage.setItem('liveBgEnabled', 'false'); } catch(e){}
        });
    });

})();
