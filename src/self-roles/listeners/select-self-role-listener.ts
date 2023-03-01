import {Events, GuildMemberRoleManager} from "discord.js";
import {client, config, log} from "../../index";
import {RoleUtils} from "../../common/utils/role-utils";

export class SelectSelfRoleListener {

    static register() {
        client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isStringSelectMenu()) {
                return
            }

            const guildMember = interaction.member

            for (const role of config.selfRoles) {
                const guildRole = RoleUtils.getRoleFromGuildById(interaction.guild, role.roleId)
                if (!interaction.values.includes(role.value)) {
                    await (guildMember.roles as GuildMemberRoleManager).remove(guildRole)
                    log.debug(`Role[${guildRole.name}] was removed from ${interaction.user.username}`)
                    continue
                }
                log.debug(`Role[${guildRole.name}] was given to ${interaction.user.username}`)
                await (guildMember.roles as GuildMemberRoleManager).add(guildRole)
            }

            interaction.reply({ephemeral: true,
                content: "It is my honor to announce that your roles have been change."})
        })
    }
}