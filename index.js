const {
  Client,
  GatewayIntentBits,
  Events
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

//when bot is ready
client.once(Events.ClientReady, () => {
  console.log(`✅ RDC bot is online as ${client.user.tag}`);
});

//Slash command handling
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  if (interaction.commandName === "ping") { await interaction.reply( "🏓Pong! RDC bot is alive.");
  }
});

//login (token comes from environment, not hardcoded)
client.login(process.env.TOKEN);