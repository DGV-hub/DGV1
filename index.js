app.get("/auth/patreon/callback", async (req, res) => {
const { code } = req.query;

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

const userRes = await axios.get(
"https://www.patreon.com/api/oauth2/v2/identity?include=memberships",
{
headers: {
Authorization: `Bearer ${accessToken}`
}
}
);

const memberships = userRes.data.included || [];

const active = memberships.some(
m => m.attributes?.currently_entitled_amount_cents > 0
);

if (!active) {
return res.send("❌ You are not an active patron");
}

res.send("✅ Patreon verified! You can now be added to Telegram.");

} catch (err) {
console.error(err.response?.data || err.message);
res.send("Auth failed");
}
});