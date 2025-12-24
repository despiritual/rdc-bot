const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if the bot is alive"),

  new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user")
    .addUserOption(option =>
      option.setName("user").setDescription("User").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("Reason").setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("View a user's warnings")
    .addUserOption(option =>
      option.setName("user").setDescription("User").setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete messages")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Number of messages (1–100)")
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔁 Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash commands registered successfully.");
  } catch (error) {
    console.error("❌ Error registering commands:", error);
  }
})();