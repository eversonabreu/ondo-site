const script = document.createElement("script");
script.async = true;
script.src = "https://www.googletagmanager.com/gtag/js?id=G-VFVWJLJ1HZ";
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
window.gtag = function () {
    dataLayer.push(arguments);
};

gtag("js", new Date());
gtag("config", "G-VFVWJLJ1HZ");