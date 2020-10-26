import { Message, TextChannel } from "discord.js";

export default {
	name: "setsm",
	run: async (msg: Message, args: string[]) => {
		if (!(msg.channel instanceof TextChannel))
			return await msg.channel.send("This command can only be used in a TextChannel");

		if (!msg.channel.permissionsFor(msg.author)?.has("MANAGE_CHANNELS"))
			return await msg.channel.send(
				`You do not have the required permissions in this channel to run that command. (\`MANAGE_CHANNELS\`)`
			);

		const timeout = parseInt(args[0]);
		if ((!timeout && timeout !== 0) || timeout < 0)
			return await msg.channel.send(
				"Invalid timeout. Please make sure to provide a valid number above or equal to 0"
			);

		msg.channel
			.setRateLimitPerUser(timeout)
			.then(async (chan) => {
				await msg.channel.send(
					`Set the slowmode for this channel to \`${chan.rateLimitPerUser} seconds\` (please note Discord rounds the seconds off)`
				);
			})
			.catch(async (err) => {
				await msg.channel.send(`Failed to set the channel slowmode. Error: ${err}`);
			});
	},
};
