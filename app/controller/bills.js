'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class BillController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    ctx.body = await ctx.model.Bill.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Bill.findByPk(toInt(ctx.params.id));
  }

  // TODO: 将新添选项加到配置表里
  async create() {
    const ctx = this.ctx;
    const {
      bill,
      vessel,
      vesselCn,
      voyage,
      shippingSchedule,
      yard,
      arrival,
      measureDock,
      direction,
      assignTime,
      arrivalTime,
      vehicleNumber,
      vehicleDriver,
      vehicleOwner,
      clientName,
      containerSpec,
      memo,
      operator,
    } = ctx.request.body;
    await ctx.model.Bill.create({
      bill: bill.toUpperCase(),
      vessel,
      vesselCn,
      voyage,
      shippingSchedule,
      yard,
      arrival,
      measureDock,
      direction,
      assignTime,
      arrivalTime,
      vehicleNumber,
      vehicleDriver,
      vehicleOwner,
      clientName,
      containerSpec: containerSpec.toUpperCase(),
      memo,
      operator,
    });
    ctx.status = 201;
    ctx.body = await ctx.model.Bill.findAll();
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Bill = await ctx.model.Bill.findByPk(id);
    if (!Bill) {
      ctx.status = 404;
      return;
    }

    const { name, role } = ctx.request.body;
    await Bill.update({ name, role });
    ctx.body = Bill;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Bill = await ctx.model.Bill.findByPk(id);
    if (!Bill) {
      ctx.status = 404;
      return;
    }

    await Bill.destroy();
    ctx.status = 200;
  }
}

module.exports = BillController;
