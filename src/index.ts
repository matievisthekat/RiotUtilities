import { Client, Collection, Message } from "discord.js";
import fs from "fs/promises";
import { join } from "path";

// <---------- Change these values (between the quotes) ---------->
const prefix = "res!";
const token = "NzY5ODQ1OTg0ODQ2MjgyNzYz.X5U88Q.Xwog4dPsibvykCa8O1bY10U1dVM";
// <---------- Change these values (between the quotes) ---------->

const client = new Client({
	presence: {
		activity: {
			name: "RES Chat",
			type: "WATCHING",
		},
	},
});
const commands = new Collection<string, Command>();

client.on("ready", () => console.log(`Logged in as ${client.user?.tag}`));
client.on("message", async (msg) => {
	if (!msg.guild || msg.author.bot || msg.webhookID || !msg.content.startsWith(prefix)) return;

	const [cmdString, ...args] = msg.content.slice(prefix.length).trim().split(/ +/gi);

	const command = commands.get(cmdString);
	if (!command) return;

	await command.run(msg, args);
});

fs.readdir(join(__dirname, "commands")).then((files: string[]) => {
	files = files.map((f) => join(__dirname, "commands", f));

	for (const file of files) {
		const cmd: Command = require(file).default;
		if (!cmd) continue;

		commands.set(cmd.name, cmd);
	}
});

client.login(token);

interface Command {
	name: string;
	run(msg: Message, args: string[]): Promise<unknown>;
}
