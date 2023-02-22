import {Events} from "discord.js";
import {client} from "../../index";

export class SelectSelfRoleListener {

    static register() {
        client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isStringSelectMenu()) {
                return
            }

        })
    }
}