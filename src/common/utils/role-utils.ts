import {Guild, GuildMember, Role, User} from "discord.js";

export class RoleUtils {

    static getRoleFromGuildById(guild: Guild, id: string): Role | undefined {
        return guild.roles.cache.find((role: Role) =>  role.id === id)
    }
}