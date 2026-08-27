(function () {
  try {
    var script = document.currentScript;
    if (!script) return;

    var widgetId = script.getAttribute("data-id");
    if (!widgetId) {
      console.log("[Syntra: Missing widget id]");
      return;
    }

    fetch("https://syntra-dev.duckdns.org/api/widget/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "omit",
      body: JSON.stringify({
        widget_id: widgetId,
      }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Session request failed");
        return res.json();
      })
      .then(function (data) {
        if (!data || !data.token) {
          throw new Error("Invalid session response");
        }

        var iframe = document.createElement("iframe");
        iframe.src =
          "https://syntra-one.vercel.app/embed?token=" +
          encodeURIComponent(data.token); // <-- fixed typo (locahost)

        iframe.setAttribute("title", "Support Chat");
        iframe.style.position = "fixed";
        iframe.style.bottom = "20px";
        iframe.style.right = "20px";
        iframe.style.width = "100px";
        iframe.style.height = "100px";
        iframe.style.border = "none";
        iframe.style.zIndex = "999999";
        iframe.style.borderRadius = "30px";
        iframe.style.background = "transparent";
        iframe.style.transition = "all 0.3s ease";
        iframe.style.overflow = "hidden";

        document.body.appendChild(iframe);

        window.addEventListener("message", (event) => {
          if (event.data?.type === "resize") {
            const data = event.data;

            iframe.style.width = data.width;
            iframe.style.height = data.height;
            iframe.style.borderRadius = data.borderRadius || "12px";
            if (data.maxWidth) iframe.style.maxWidth = data.maxWidth;
            if (data.maxHeight) iframe.style.maxHeight = data.maxHeight;
            if (data.bottom) iframe.style.bottom = data.bottom;
            if (data.right) iframe.style.right = data.right;
          }
        });
      })
      .catch(function (err) {
        console.error("[Syntra: Failed to load widget]", err);
      });
  } catch (error) {
    console.log("[Syntra: Widget error]", error);
  }
})();