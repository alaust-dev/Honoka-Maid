import {ActionRowBuilder, Events, SlashCommandBuilder, StringSelectMenuBuilder} from "discord.js";
import {client} from "../../index";

export class SendSelfRoleMessage {

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

            const row = new ActionRowBuilder()
                .addComponents(new StringSelectMenuBuilder()
                    .setCustomId("self-roles")
                    .setPlaceholder("Nothing selected")
                    .addOptions({label: "Game Room", description: "Game Room", value: "game-room", emoji: "😄"}))
            //@ts-ignore
            interaction.reply({content: "Select your role", components: [row]})
        })
    }
}