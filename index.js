import express from "express";
import axios from "axios";

const app = express();

app.get("/", (req, res) => {
res.send("Patreon → Telegram Auth Server running");
});

app.get("/auth/patreon", (req, res) => {
const url =
`https://www.patreon.com/oauth2/authorize` +
`?response_type=code` +
`&client_id=${process.env.PATREON_CLIENT_ID}` +
`&redirect_uri=${process.env.PATREON_REDIRECT_URI}` +
`&scope=identity identity.memberships`;

res.redirect(url);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on", PORT));