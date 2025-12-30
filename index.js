mport express from "express";

const app = express();

app.get("/", (req, res) => {
res.send("Patreon → Telegram Auth Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log("Server running on port", PORT);
<<<<<<< HEAD
});
=======
});
>>>>>>> 01e811f13da3c48b4a97cfc11548cdddaa9200e0
