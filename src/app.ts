import { Context, Markup, Telegraf, Telegram } from 'telegraf';
import { Update } from 'typegram';
import endpoint from './endpoints.config';
import axios from 'axios';

const token: string = endpoint.BOT_TOKEN;
const openaiApiKey: string = endpoint.OPENAI_API_KEY;

const telegram: Telegram = new Telegram(token);
const bot = new Telegraf(token);

telegram.setMyCommands([
    {command: "start", description: "receive the greeting"},
    {command: "chat", description: "start interact with ChatGPT"},
]);

bot.start((ctx) => {
  ctx.reply('Hello ' + ctx.from.first_name + '!');
  ctx.sendSticker('https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp')
});

bot.command('chat', (ctx) => {
    ctx.reply('Please send me your question.');

    bot.use(async (ctx: any, next) => {
        const question = ctx.update?.message?.text;
        try {
            const request = {
                prompt: question,
                max_tokens: 300
              }
            const url = 'https://api.openai.com/v1/engines/davinci/completions';
            const response = await axios.post(url, request, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`
                }
            });
            const answer = response.data.choices[0].text;
            ctx.reply(answer);
        } catch (error) {
            console.error(error)
        }
    })
});

bot.help((ctx) => {
  ctx.reply('Send /start to receive a greeting');
  ctx.reply('Send /keyboard to receive a message with a keyboard');
  ctx.reply('Send /quit to stop the bot');
});


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));