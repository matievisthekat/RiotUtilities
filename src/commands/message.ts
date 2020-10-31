import { Message, MessageEmbed } from "discord.js";

export default {
	name: "deny",
	run: async (msg: Message, args: string[]) => {
		if (!msg.member?.roles.cache.has("752254084999807247") && !msg.member?.roles.cache.has("769870496685752321"))
			return await msg.channel.send("You do not have the required role to use this");

		const target = msg.mentions.users.first() || msg.client.users.cache.get(args[0]);
		if (!target)
			return await msg.channel.send("Target not found. Make sure to provide a valid user mention or ID");

		const message = args.slice(1).join(" ");
		if (!message) return await msg.channel.send("Please provide a message to send");

		const embed = new MessageEmbed()
			.setTitle("You received a message from Riot's Emoji Server administrators")
			.setColor("BLUE")
			.setDescription(`\`Message\`: ${message}`);

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
