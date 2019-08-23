'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class VehicleController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Vehicle.findAll();
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Vehicle.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const {
      vehicleNumber,
      driverName,
      vehicleOwner,
      driverMobile,
    } = ctx.request.body;
    await ctx.model.Vehicle.create({
      vehicleNumber,
      driverName,
      vehicleOwner,
      driverMobile,
    });
    ctx.status = 201;
    ctx.body = await ctx.model.Vehicle.findAll();
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Vehicle = await ctx.model.Vehicle.findByPk(id);
    if (!Vehicle) {
      ctx.status = 404;
      return;
    }

    const {
      vehicleNumber,
      driverName,
      vehicleOwner,
      driverMobile,
    } = ctx.request.body;
    await Vehicle.update({
      vehicleNumber,
      driverName,
      vehicleOwner,
      driverMobile,
    });
    ctx.body = await ctx.model.Vehicle.findAll();
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Vehicle = await ctx.model.Vehicle.findByPk(id);
    if (!Vehicle) {
      ctx.status = 404;
      return;
    }

    await Vehicle.destroy();
    ctx.body = await ctx.model.Vehicle.findAll();
    ctx.status = 200;
  }
}

module.exports = VehicleController;
