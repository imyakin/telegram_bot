"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var endpoints_config_1 = __importDefault(require("./endpoints.config"));
var token = endpoints_config_1.default.BOT_TOKEN;
var telegram = new telegraf_1.Telegram(token);
var bot = new telegraf_1.Telegraf(token);
var chatId = process.env.CHAT_ID;
bot.start(function (ctx) {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
});
bot.help(function (ctx) {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});
// bot.command('quit', (ctx) => {
//   // Explicit usage
//   ctx.telegram.leaveChat(ctx.message.chat.id);
//   // Context shortcut
//   ctx.leaveChat();
// });
// bot.command('keyboard', (ctx) => {
//   ctx.reply(
//     'Keyboard',
//     Markup.inlineKeyboard([
//       Markup.button.callback('First option', 'first'),
//       Markup.button.callback('Second option', 'second'),
//     ])
//   );
// });
// bot.on('text', (ctx) => {
//   ctx.reply(
//     'You choose the ' +
//       (ctx.message.text === 'first' ? 'First' : 'Second') +
//       ' Option!'
//   );
//   if (chatId) {
//     telegram.sendMessage(
//       chatId,
//       'This message was sent without your interaction!'
//     );
//   }
// });
bot.launch();
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
