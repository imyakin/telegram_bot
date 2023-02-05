import * as dotenv from 'dotenv';
dotenv.config();

export default {
    BOT_TOKEN: process.env.BOT_TOKEN ?? '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
}