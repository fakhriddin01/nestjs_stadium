import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { Telegraf, Context, Markup } from 'telegraf';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot, 
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>){}


  async start(ctx: Context) {    
    const userId = ctx.from.id;
    const user = await this.botRepo.findOne({
      where: {user_id: userId}
    });
    if(!user){
      await this.botRepo.create({
        user_id: userId,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
      });
      await ctx.reply(
        `Iltimos, <b> "Telefon raqamni yuborish"</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
          .oneTime()
          .resize(),
        }
      );
    } else if (!user.dataValues.status){
      await ctx.reply(
        `Iltimos, <b> "Telefon raqamni yuborish"</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
          .oneTime()
          .resize(),
        }
      );
    }else {
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(
        "Bu bot orqali Stadion dasturi bilan muloqot o'rnatildi",
        {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        },
      );
    }
  }

  async onContact(ctx: Context){
    if('contact' in ctx.message){
      const userId = ctx.from.id;
      const user = await this.botRepo.findOne({
        where: {user_id: userId}
      })

      if(!user){
        ctx.reply(`Iltimos, <b>Start</b> tugmasini boising`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            ['/start'],
          ])
          .oneTime()
          .resize(),
        }
      )
      }else if (ctx.message.contact.user_id != userId){
        ctx.reply(`Iltimos, <b>Start</b> tugmasini boising`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
          .oneTime()
          .resize(),
        })
      }else {
        let phone: string;
        ctx.message.contact.phone_number[0]=='+'
          ? (phone= ctx.message.contact.phone_number)
          : (phone= "+"+ctx.message.contact.phone_number);
          await this.botRepo.update({
            phone_number: phone,
            status: true,
          }, {where: {user_id: userId}})
          await ctx.reply('Tabriklayman siz ro`yxatdan utdingiz', {
            parse_mode: 'HTML',
            ...Markup.removeKeyboard()
          });
      }
    }
  }

  async sendOTP(phoneNumber: string, OTP: string): Promise<boolean>{
    const user = await this.botRepo.findOne({
      where: {phone_number: phoneNumber},
    });
    if(!user || !user.status){
      return false;
    }
    await this.bot.telegram.sendChatAction(user.user_id, 'typing');
    await this.bot.telegram.sendMessage(user.user_id, 'Verify code: ' +OTP);
    return true;
    
  }



}
