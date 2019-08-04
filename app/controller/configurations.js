'use strict';

const Controller = require('egg').Controller;

class ConfigurationController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Configuration.findAll();
  }

  // async show() {
  //   const ctx = this.ctx;
  //   ctx.body = await ctx.model.Configuration.findByPk(toInt(ctx.params.id));
  // }

  // async create() {
  //   const ctx = this.ctx;
  //   const { type, content } = ctx.request.body;
  //   const Configuration = await ctx.model.Configuration.create({
  //     type,
  //     content,
  //   });
  //   ctx.status = 201;
  //   ctx.body = Configuration;
  // }

  async update() {
    const ctx = this.ctx;
    const { type, content } = ctx.request.body;
    const Configuration = await ctx.model.Configuration.findOne({
      where: { type },
    });
    if (!Configuration) {
      ctx.status = 404;
      return;
    }

    await Configuration.update({ type, content });
    ctx.body = Configuration;
  }

  // async destroy() {
  //   const ctx = this.ctx;
  //   const id = toInt(ctx.params.id);
  //   const Configuration = await ctx.model.Configuration.findByPk(id);
  //   if (!Configuration) {
  //     ctx.status = 404;
  //     return;
  //   }

  //   await Configuration.destroy();
  //   ctx.status = 200;
  // }
}

module.exports = ConfigurationController;
