import express from "express";
import axios from "axios";

const app = express(); 

// Home route (health check)
app.get("/", (req, res) => {
res.send("Patreon → Telegram Auth Server running");
});

// Start Patreon OAuth (Phase 1 · Step 3)
app.get("/auth/patreon", (req, res) => {
const tgId = req.query.tg_id;

if (!tgId) {
return res.send("❌ Telegram ID missing. Start the Telegram bot first.");
}

const patreonAuthUrl =
"https://www.patreon.com/oauth2/authorize" +
"?response_type=code" +
`&client_id=${process.env.PATREON_CLIENT_ID}` +
`&redirect_uri=${process.env.PATREON_REDIRECT_URI}` +
"&scope=identity identity.memberships" +
`&state=${tgId}`;

res.redirect(patreonAuthUrl);
});

// Patreon OAuth callback
app.get("/auth/patreon/callback", async (req, res) => {
const { code, state } = req.query;
const tgId = state;

if (!tgId) {
return res.send("❌ Telegram ID missing in callback");
}

try {
const tokenRes = await axios.post(
"https://www.patreon.com/api/oauth2/token",
null,
{
params: {
code,
grant_type: "authorization_code",
client_id: process.env.PATREON_CLIENT_ID,
client_secret: process.env.PATREON_CLIENT_SECRET,
redirect_uri: process.env.PATREON_REDIRECT_URI
}
}
);

const accessToken = tokenRes.data.access_token;

res.send(
`✅ Patreon verified successfully.<br>Telegram ID: ${tgId}`
);

} catch (err) {
console.error(err.response?.data || err.message);
res.send("❌ Patreon authentication failed");
}
});

// Start server (Render injects PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log("Server running on port", PORT);
});