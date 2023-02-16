import * as winston from "winston"
import * as dotenv from "dotenv"
import {Client, ActivityType, GatewayIntentBits} from "discord.js";
import {JoinListener} from "./join-auto-roles/listener/join-listener";
import * as yaml from "js-yaml"
import * as fs from "fs"


export const log = winston.createLogger({
    format: winston.format.cli(),
    'transports': [
        new winston.transports.Console()
    ]
})
export const client = new Client({intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds]})
export const config: any = yaml.load(fs.readFileSync('config/honoka-config.yml', "utf-8"))

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
        log.info("Started up, ready to serve!")
    }
}

HonokaMaid.main().catch(reason => log.error(`Start up failed: ${reason}`))