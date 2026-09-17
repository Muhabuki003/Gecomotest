// GECOMO footer newsletter capture -> gecomo-subscribe Worker
(function () {
  var ENDPOINT = "https://gecomo-subscribe.adrienmuhabukibusiness.workers.dev/subscribe?src=footer";

  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form.classList || !form.classList.contains("news-form")) return;
    e.preventDefault();

    var input = form.querySelector('input[type="email"]');
    var btn = form.querySelector("button");
    var email = (input.value || "").trim();
    if (!email) return;

    btn.disabled = true;
    btn.textContent = "…";

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.ok) {
          btn.textContent = "Done ✓";
          input.value = "";
        } else {
          btn.disabled = false;
          btn.textContent = data.error || "Try again";
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = "Try again";
      });
  });
})();
