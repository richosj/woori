gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
function initTextAnimations() {
  const section = document.querySelector(".section-1");
  const lines = section.querySelectorAll(".text-line");
  gsap.fromTo(
    lines[0].querySelector(".text-fill"),
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      ease: "none",
      scrollTrigger: {
        trigger: lines[0],
        start: "top 80%",
        end: "top 30%",
        scrub: true
      }
    }
  );
  gsap.fromTo(
    lines[1].querySelector(".text-fill"),
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      ease: "none",
      scrollTrigger: {
        trigger: lines[0],
        start: "top 30%",
        end: "top 0%",
        scrub: true
      }
    }
  );
}
initTextAnimations();
gsap.to(".main-visual-background", {
  scale: 1,
  opacity: 1,
  duration: 3.5,
  ease: "power2.out"
});
document.querySelectorAll(".split-text").forEach((el) => {
  const text = el.textContent;
  el.innerHTML = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    el.appendChild(span);
  });
  gsap.to(el.querySelectorAll("span"), {
    opacity: 1,
    y: 0,
    stagger: 0.04,
    duration: 0.8,
    ease: "power2.out",
    delay: 1
  });
});
ScrollTrigger.create({
  trigger: ".biz-section",
  start: "top top",
  //end: () => "+=" + document.querySelector(".biz-right").scrollHeight,
  pin: ".biz-left",
  pinSpacing: true
});
gsap.utils.toArray(".biz-card").forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});
gsap.to(".service-title", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".service-section",
    start: "top 80%"
  }
});
gsap.to(".service-item", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".service-list",
    start: "top 85%"
  }
});
