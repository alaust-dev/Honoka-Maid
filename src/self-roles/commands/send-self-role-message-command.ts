import {ActionRowBuilder, EmbedBuilder, Events, SlashCommandBuilder, StringSelectMenuBuilder} from "discord.js";
import {client, config} from "../../index";
import {RoleUtils} from "../../common/utils/role-utils";

export class SendSelfRoleMessageCommand {

    static command() {
        return new SlashCommandBuilder()
            .setName("self-roles")
            .setDescription("Sends a message in this channel containing the options to assign self roles.")
    }

    static register() {
        client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isChatInputCommand()) {
                return
            }
            if (interaction.commandName !== "self-roles") {
                return
            }

            const embed = new EmbedBuilder()
                .setTitle("𝘚𝘦𝘭𝘦𝘤𝘵 𝘵𝘩𝘦 𝘳𝘰𝘭𝘦𝘴 𝘺𝘰𝘶 𝘸𝘪𝘴𝘩 𝘧𝘰𝘳")
                .setColor("Purple")
                .setDescription("As a humble maid serving this noble household, I present to you a list of the esteemed Discord roles on this server.\n\n" +
                    "-> " + RoleUtils.getRoleFromGuildById(interaction.guild, "1069602135936864258").toString())
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId("self-roles")
                .setPlaceholder("Nothing selected.")

            for (const role of config.selfRoles) {
                selectMenu.addOptions({
                    label: role.label,
                    description: role.description,
                    emoji: role.emoji,
                    value: role.value
                })
            }

            const row = new ActionRowBuilder()
                .addComponents(selectMenu)

            //@ts-ignore
            interaction.channel.send({embeds: [embed], components: [row]})
            interaction.reply({ephemeral: true, content: "Message sent."})
        })
    }
}