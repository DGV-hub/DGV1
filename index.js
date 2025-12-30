const tgId = req.query.state;
app.get("/auth/patreon", (req, res) => {
// 1. Read Telegram ID from URL
const tgId = req.query.tg_id;

// 2. Block access if Telegram ID is missing
if (!tgId) {
return res.send("❌ Telegram ID missing. Please start the Telegram bot first.");
}

// 3. Build Patreon OAuth URL with state = Telegram ID
const patreonAuthUrl =
"https://www.patreon.com/oauth2/authorize" +
"?response_type=code" +
`&client_id=${process.env.PATREON_CLIENT_ID}` +
`&redirect_uri=${process.env.PATREON_REDIRECT_URI}` +
"&scope=identity identity.memberships" +
`&state=${tgId}`;

// 4. Redirect user to Patreon login
res.redirect(patreonAuthUrl);
});