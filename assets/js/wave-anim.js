// Register the MorphSVGPlugin
gsap.registerPlugin(MorphSVGPlugin);

// Create the animation timeline
const waveTimeline = gsap.timeline({
    repeat: -1,
    yoyo: true, // Animates back and forth
    ease: "power1.inOut" // Provides a smooth, fluid feel
});

// Animate the path through the different shapes
waveTimeline
    .to("#wave-anim-path", { duration: 6, morphSVG: "#wave-shape-2" })
    .to("#wave-anim-path", { duration: 6, morphSVG: "#wave-shape-3" })
    .to("#wave-anim-path", { duration: 6, morphSVG: "#wave-shape-1" });