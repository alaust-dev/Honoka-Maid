import {client, config, log} from "../../index";
import {Events, GuildMember} from "discord.js";
import {RoleUtils} from "../../common/utils/role-utils";

export class JoinListener {

    static register() {
        client.once(Events.GuildMemberAdd, (member: GuildMember) => {
            const role = RoleUtils.getRoleFromGuildById(member.guild, config.joinRoleId)
            member.roles.add(role).then(value => {
                log.info(`Modified role on user: ${value.displayName} [+ ${role.name} | ${role.id}]`)
            })
        })
    }
}