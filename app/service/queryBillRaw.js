'use strict';

const cheerio = require('cheerio');
const Service = require('egg').Service;

class QueryBillRawService extends Service {
  async jieFeng(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      `http://www.sdsmartlogistics.com/FindClass/YD_BLQueryGrid.aspx?blno=${bill}`
    );
    const $ = cheerio.load(result.data);
    $('#exptable > table tr')
      .eq(0)
      .remove();
    return $('#exptable > table').html();
  }

  async zhongChuang(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      'http://www.cmlog.com.cn/zcxt/query/ExportUsual.aspx',
      {
        method: 'POST',
        data: {
          __EVENTTARGET: '',
          __EVENTARGUMENT: '',
          '_ctl0:ContentPlaceHolder1:TextBox1': bill,
          '_ctl0:ContentPlaceHolder1:btnQuery': '%E6%9F%A5+%E8%AF%A2',
        },
        timeout: 5000,
      }
    );

    return result.data;
  }

  async gangLianXin(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      'http://www.cmlog.com.cn/zcxt/GLX/ExportUsual.aspx',
      {
        method: 'POST',
        data: {
          __EVENTTARGET: '',
          __EVENTARGUMENT: '',
          '_ctl0:ContentPlaceHolder1:TextBox1': bill,
          '_ctl0:ContentPlaceHolder1:btnQuery': '%E6%9F%A5+%E8%AF%A2',
        },
        timeout: 5000,
      }
    );

    return result.data;
  }

  async zhongWaiYun(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      `http://www.sd.sinotrans.com/CntrYardQuery/QueryByBlnoWLY.aspx?Blno=${bill}`
    );
    const $ = cheerio.load(result.data);
    $('#exptable > table tr')
      .eq(0)
      .remove();

    return result.data;
  }

  async shenZhou(bill) {
    const ctx = this.ctx;
    const firstResult = await ctx.curl(
      'http://www.szx.net.cn/querydata/BillquerySearchOld.aspx'
    );
    const $r = cheerio.load(firstResult.data);
    const viewState = $r('#__VIEWSTATE').val();
    const __EVENTVALIDATION = $r('#__EVENTVALIDATION').val();
    const result = await ctx.curl(
      'http://www.szx.net.cn/querydata/BillquerySearchOld.aspx',
      {
        method: 'POST',
        data: {
          __VIEWSTATE: viewState,
          __EVENTVALIDATION,
          ctl00$Maincontent$txtBillNo: bill,
          ctl00$Maincontent$btnSearch: '%E6%9F%A5%E8%AF%A2',
        },
        timeout: 20000,
      }
    );
    const $ = cheerio.load(result.data);

    return $('#Maincontent_divform').html();
  }

  async gangLianHai(bill) {
    const ctx = this.ctx;
    const firstResult = await ctx.curl(
      'http://www.qdglhwl.com/querydata/BillquerySearchOld.aspx'
    );
    const $r = cheerio.load(firstResult.data);
    const viewState = $r('#__VIEWSTATE').val();
    const __EVENTVALIDATION = $r('#__EVENTVALIDATION').val();
    const result = await ctx.curl(
      'http://www.qdglhwl.com/querydata/BillquerySearchOld.aspx',
      {
        method: 'POST',
        data: {
          __VIEWSTATE: viewState,
          __EVENTVALIDATION,
          ctl00$Maincontent$txtBillNo: bill,
          ctl00$Maincontent$btnSearch: '%E6%9F%A5%E8%AF%A2',
        },
        timeout: 20000,
      }
    );
    const $ = cheerio.load(result.data);

    return $('#wrap_bill').html();
  }

  async shengShi(bill) {
    const ctx = this.ctx;
    const firstResult = await ctx.curl('http://www.ssqd.cn/Scfs.aspx', {
      timeout: 200000,
    });
    const $r = cheerio.load(firstResult.data);
    const viewState = $r('#__VIEWSTATE').val();
    const result = await ctx.curl('http://www.ssqd.cn/Scfs.aspx', {
      method: 'POST',
      data: {
        __VIEWSTATE: viewState,
        TextBox1: bill,
        Button1: '%E6%9F%A5%E8%AF%A2',
      },
      timeout: 200000,
    });

    return result.data;
  }

  async gangLu(bill) {
    const ctx = this.ctx;
    const firstResult = await ctx.curl(
      'http://www.medlog.com.cn/querydata/billquerysearch.aspx',
      {
        timeout: 20000,
      }
    );
    const $r = cheerio.load(firstResult.data);
    const viewState = $r('#__VIEWSTATE').val();
    const result = await ctx.curl(
      'http://www.medlog.com.cn/querydata/billquerysearch.aspx',
      {
        method: 'POST',
        data: {
          __VIEWSTATE: viewState,
          ctl00$Maincontent$txtBillNo: bill,
          ctl00$Maincontent$btnSearch: '%E6%9F%A5%E8%AF%A2',
        },
        timeout: 20000,
      }
    );
    const $ = cheerio.load(result.data);

    return $('#wrap_bill').html();
  }

  async changRong(bill) {
    const ctx = this.ctx;
    const url = 'http://qect.qingdao-port.com/data.jspx';
    const optionJgxx = {
      method: 'POST',
      data: {
        pageNo: 1,
        tdh: bill,
        flag: 'jgxx',
        pageSize: 10,
      },
      timeout: 20000,
    };
    const optionFpxx = JSON.parse(JSON.stringify(optionJgxx));
    optionFpxx.data.flag = 'fpxx';
    const result = await Promise.all([
      ctx.curl(url, optionJgxx),
      ctx.curl(url, optionFpxx),
    ]);

    return result[0].data + result[1].data;
  }

  async gangLianHua(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      'http://58.56.168.6:8123/search/searchBillCase!findByBillNo',
      {
        method: 'POST',
        data: {
          tidan: bill,
          search1: '%E6%9F%A5+%E8%AF%A2',
        },
        timeout: 5000,
      }
    );

    return result.data;
  }

  async daYa(bill) {
    const ctx = this.ctx;
    const firstResult = await ctx.curl(
      `http://www.yydy.com/GacoscoMobileService/GacoscoWebService.asmx/ExportUsual?MethodName=ExportUsualByBill&Param=%5B%7B%27BILLNO%27%3A%27${bill}%27%2C%27CORPNAT%27%3A%27%E7%AE%A1%E7%90%86%27%2C%27CORPID%27%3A%27CARGO%27%7D%5D&jsoncallback=NORMA`,
      {
        timeout: 20000,
        dataType: 'text',
      }
    );
    const dyMsg1 = firstResult.data.split('NORMA(').join('');
    const dyMsg2 = dyMsg1.split(')').join('');
    const id = JSON.parse(dyMsg2).RESULT.MSG;
    const result = await ctx.curl(
      `http://www.yydy.com/GacoscoMobileService/GacoscoWebService.asmx/ExportUsual?MethodName=ExDetailByBill&Param=%5B%7B%27EXBILREF%27%3A%27${id}%27%7D%5D`,
      {
        timeout: 20000,
        dataType: 'text',
      }
    );
    const dyMsg3 = result.data
      .split('<string xmlns="http://GacoscoWebService.org/">')
      .join('');
    const dyMsg4 = dyMsg3.split('</string>').join('');
    const dyMsg5 = dyMsg4
      .split('<?xml version="1.0" encoding="utf-8"?>')
      .join('');
    const data = JSON.parse(dyMsg5);

    return data;
  }
}

module.exports = QueryBillRawService;
