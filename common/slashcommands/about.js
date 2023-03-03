const { Models: { SlashCommand } } = require('frame');

class Command extends SlashCommand {
	#bot;
	#stores;

	constructor(bot, stores) {
		super({
			name: "about",
			description: "Info about the bot",
			usage: [
				"- Gives info about the bot"
			],
			ephemeral: true
		})
		this.#bot = bot;
		this.#stores = stores;
	}

	async execute(ctx) {
		return {embeds: [{
			title: '**About**',
			description: "Eee! I'm Furry Castle Applications! I help Furry Castle admins set up forms and responses!",
			fields:[
				{name: "Creators", value: "[Callum](https://github.com/CallumCat) | Callum#0003"},
				{name: "Stats", value: `Guilds: ${this.#bot.guilds.cache.size} | Users: ${this.#bot.users.cache.size}`}
			]
		}]}
	}
}

module.exports = (bot, stores) => new Command(bot, stores);