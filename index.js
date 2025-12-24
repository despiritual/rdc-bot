const { 
  Client, 
  GatewayIntentBits, 
  Events, 
  Collection 
} = require("discord.js");

const fs = require("fs");
const path = require("path");
const express = require("express");

// --------------------
// Express server (Render needs a port)
// --------------------
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("RDC bot is running");
});

app.listen(PORT, () => {
  console.log(`🌐 Web server listening on port ${PORT}`);
});

// --------------------
// Discord client
// --------------------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// --------------------
// Load commands
// --------------------
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands", "moderation");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
  }
}

// --------------------
// Bot ready
// --------------------
client.once(Events.ClientReady, () => {
  console.log(`✅ RDC bot is online as ${client.user.tag}`);
});

// --------------------
// Interaction handler
// --------------------
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "❌ There was an error executing this command.",
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: "❌ There was an error executing this command.",
        ephemeral: true
      });
    }
  }
});

// --------------------
client.login(process.env.TOKEN);