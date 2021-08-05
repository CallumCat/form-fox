module.exports = {
	name: 'post',
	description: 'Posts a form in the given channel',
	options: [
		{
			name: 'form_id',
			description: 'The form\'s ID',
			type: 3,
			required: true
		},
		{
			name: 'channel',
			description: 'The channel to post in',
			type: 7,
			required: true
		}
	],
	async execute(ctx) {
		var id = ctx.options.get('form_id').value.toLowerCase();
		var chan = ctx.options.getChannel('channel');
		var form = await ctx.client.stores.forms.get(ctx.guildId, id);
		if(!form) return 'Form not found!';

		var responses = await ctx.client.stores.responses.getByForm(ctx.guildId, form.hid);
		try {
			var message = await chan.send({embeds: [{
				title: form.name,
				description: form.description,
				color: parseInt(!form.open ? 'aa5555' : form.color || '55aa55', 16),
				fields: [{name: 'Response Count', value: responses?.length.toString() || '0'}],
				footer: {
					text: `Form ID: ${form.hid} | ` +
						  (!form.open ?
						  'this form is not accepting responses right now!' :
						  'react below to apply to this form!')
				}
			}]});
			message.react(form.emoji || '📝');
			await ctx.client.stores.formPosts.create(message.guild.id, chan.id, message.id, {
				form: form.hid
			});
		} catch(e) {
			return 'ERR! '+(e.message || e);
		}
		return 'Posted!';
	},
	perms: ['MANAGE_MESSAGES'],
	guildOnly: true
}