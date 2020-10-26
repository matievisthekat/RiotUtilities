import { Message, MessageEmbed } from "discord.js";

export default {
	name: "deny",
	run: async (msg: Message, args: string[]) => {
		const target = msg.mentions.users.first() || msg.client.users.cache.get(args[0]);
		if (!target)
			return await msg.channel.send("Target not found. Make sure to provide a valid user mention or ID");

		const embed = new MessageEmbed()
			.setTitle("Your application was denied in Riot's Emoji Server")
			.setColor("RED")
			.setDescription(`\`Reason\`: ${args.slice(1).join(" ") || "(No reason given)"}`);

		target
			.send(embed)
			.then(async () => {
				await msg.channel.send("Message sent!");
			})
			.catch(async (err) => {
				await msg.channel.send(`Failed to send the message. Error: ${err}`);
			});
	},
};
