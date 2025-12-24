const { 
  Client, 
  GatewayIntentBits, 
  Events 
} = require("discord.js");

const express = require("express");

// ---- Dummy web server (for Render) ----
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("RDC bot is running!");
});

app.listen(PORT, () => {
  console.log(`🌐 Web server listening on port ${PORT}`);
});
// --------------------------------------

// Discord bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`✅ RDC bot is online as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong! RDC bot is alive.");
  }
});

client.login(process.env.TOKEN); 