import * as winston from "winston"
import * as dotenv from "dotenv"
import {ActivityType, Client, Events, GatewayIntentBits, REST, Routes} from "discord.js";
import {JoinListener} from "./join-auto-roles/listener/join-listener";
import * as yaml from "js-yaml"
import * as fs from "fs"
import {SendSelfRoleMessageCommand} from "./self-roles/commands/send-self-role-message-command";
import {HonokaConfig} from "./common/config/honoka-config";


export const log = winston.createLogger({
    format: winston.format.cli(),
    'transports': [
        new winston.transports.Console()
    ]
})
export const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildIntegrations]
})
export const config: HonokaConfig = yaml.load(fs.readFileSync('config/honoka-config.yml', "utf-8")) as HonokaConfig

export class HonokaMaid {

    static async main() {
        dotenv.config()
        if (!process.env.DISCORD_TOKEN) {
            throw new Error("DISCORD_TOKEN env var is missing!")
        }

        await client.login(process.env.DISCORD_TOKEN)
        client.user.setPresence({
            activities: [{name: "your needs", type: ActivityType.Listening}]
        })
        JoinListener.register()
        SendSelfRoleMessageCommand.register()
        client.on(Events.ClientReady, () => {
            const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN)
            rest.put(Routes.applicationGuildCommands(client.user.id, "1069569167272980560"), {body: [SendSelfRoleMessageCommand.command()]})
        })
        log.info("Started up, ready to serve!")
    }
}

HonokaMaid.main().catch(reason => log.error(`Start up failed: ${reason}`))