const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const warningsPath = path.join(
  __dirname,
  "../../database/warnings.json"
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to warn")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("reason")
        .setDescription("Reason for warning")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ModerateMembers
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";

    const warningsData = JSON.parse(
      fs.readFileSync(warningsPath, "utf8")
    );

    if (!warningsData[user.id]) {
      warningsData[user.id] = [];
    }

    warningsData[user.id].push({
      reason: reason,
      moderator: interaction.user.tag,
      date: new Date().toISOString()
    });

    fs.writeFileSync(
      warningsPath,
      JSON.stringify(warningsData, null, 2)
    );

    await interaction.reply({
      content: `⚠️ **${user.tag}** has been warned.\nReason: **${reason}**`
    });
  }
};