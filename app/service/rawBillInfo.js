'use strict';

const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const Service = require('egg').Service;

class RawBillInfoService extends Service {
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
    const $ = cheerio.load(result.data);

    return $('#_ctl0_ContentPlaceHolder1_tbl').html();
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
    const $ = cheerio.load(result.data);

    return $('#_ctl0_ContentPlaceHolder1_tbl').html();
  }

  async zhongWaiYun(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      `http://www.sd.sinotrans.com/CntrYardQuery/QueryByBlnoWLY.aspx?Blno=${bill}`
    );
    const $ = cheerio.load(result.data);

    return $('table')
      .eq(2)
      .html();
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
    $('#wrap_bill')
      .find('tr')
      .eq(0)
      .remove();

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
    const $ = cheerio.load(result.data);
    $('form')
      .find('table')
      .eq(0)
      .remove();
    $('form')
      .find('table')
      .eq(0)
      .remove();

    return $('body').html();
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

    return $('#Maincontent_divform').html();
  }

  async gangLianJie(bill) {
    const ctx = this.ctx;
    const firstResult = await ctx.curl(
      'http://www.qdglj.cn:1027/querydata/billquerysearch.aspx',
      {
        timeout: 20000,
      }
    );
    const $r = cheerio.load(firstResult.data);
    const viewState = $r('#__VIEWSTATE').val();
    const result = await ctx.curl(
      'http://www.qdglj.cn:1027/querydata/billquerysearch.aspx',
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
    if (result && result.data) {
      const $ = cheerio.load(result.data);

      return $('#Maincontent_divform')
        .html()
        .replace(/display: none/g, '')
        .replace(/display:none/g, '')
        .replace(/&#x6682;&#x65E0;&#x76F8;&#x5173;&#x6570;&#x636E;/g, '');
    }
    return '';
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
    const optionXhdt = JSON.parse(JSON.stringify(optionJgxx));
    optionXhdt.data.flag = 'xhdt';
    // const optionZdxh = JSON.parse(JSON.stringify(optionJgxx));
    // optionZdxh.data.flag = 'zdxh';
    const optionSjzh = JSON.parse(JSON.stringify(optionJgxx));
    optionSjzh.data.flag = 'sjzh';
    const optionCzy = JSON.parse(JSON.stringify(optionJgxx));
    optionCzy.data.flag = 'czy';
    // const optionDcxx = JSON.parse(JSON.stringify(optionJgxx));
    // optionDcxx.data.flag = 'dcxx';
    const result = await Promise.all([
      ctx.curl(url, optionJgxx),
      ctx.curl(url, optionFpxx),
      ctx.curl(url, optionXhdt),
      ctx.curl(url, optionSjzh),
      ctx.curl(url, optionCzy),
      // ctx.curl(url, optionDcxx),
      // ctx.curl(url, optionZdxh),
    ]);

    const jgxx = JSON.parse(result[0].data.toString());
    const jgxxHtml = `<div>集港信息查询</div>
    <table id="example" cellspacing="0" border="1" width="100%">
    <thead>
      <tr>
        <th>序号</th>
        <th>船名(En)</th>
        <th>船名(CH)</th>
        <th>航次</th>
        <th>总单号</th>
        <th>箱型/箱量</th>
        <th>船公司</th>
        <th>目的港</th>
        <th>卸货港</th>
        <th>装船码头</th>
        <th>送货地址</th>
        <th>集港开始时间</th>
        <th>集港结束时间</th>
      </tr>
    </thead>
    <tbody id="jgxx">
    <tr class="odd">
    <td valign="top" class="dataTables_empty"></td>
    <td valign="top" class="dataTables_empty">${jgxx[0].YWCM}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].ZWCM}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].HC}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].XSTDH}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].YXYQ}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].CGSM}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].MDGM}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].XHGM}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].ZCMT}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].SHDZ}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].XYKBSJ}</td>
    <td valign="top" class="dataTables_empty">${jgxx[0].XYLBSJ}</td>
    </tr>
    <tr class="odd"><td valign="top" colspan="20" class="dataTables_empty">备注:</td></tr>
    </tbody>
  </table>`;

    const fpxx = JSON.parse(result[1].data.toString());
    const fpxxHtml = `<div>分票查询</div>
  <table id="example" border="1"  cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>提单号</th>
						<th>件数</th>
						<th>重量</th>
						<th>冷冻温度</th>
					</tr>
				</thead>
        <tbody id="fpxx">
        <tr class="odd">
        <td valign="top" class="dataTables_empty">${fpxx[0].TDH}</td>
        <td valign="top" class="dataTables_empty">${fpxx[0].JS}</td>
        <td valign="top" class="dataTables_empty">${fpxx[0].HZ}</td>
        <td valign="top" class="dataTables_empty">${fpxx[0].LDWD}</td>
        </tr></tbody>
      </table>`;
    const xhdt = JSON.parse(result[2].data.toString());
    const xhdtHtml = `<div>箱货动态</div>
    <table id="example" border="1" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>箱号</th>
						<th>尺寸</th>
						<th>箱型</th>
						<th>铅封号</th>
						<th>内点/外点</th>
						<th>提箱时间</th>
						<th>返场时间</th>
						<th>集港时间</th>
						<th>箱皮重</th>
						<th>车号</th>
					</tr>
				</thead>
        <tbody id="xhdt"><tr class="odd">
<td valign="top" class="dataTables_empty">${xhdt[0].XH}</td>
<td valign="top" class="dataTables_empty">${xhdt[0].CC}</td>
<td valign="top" class="dataTables_empty">${xhdt[0].XX}</td>
<td valign="top" class="dataTables_empty">${xhdt[0].QFH1}</td>
<td valign="top" class="dataTables_empty">${xhdt[0].NWDBZ}</td>
<td valign="top" class="dataTables_empty">${xhdt[0].TXSJ}</td>
<td valign="top" class="dataTables_empty">${xhdt[0].FCSJ}</td>
<td valign="top" class="dataTables_empty">${xhdt[0].JGSJ}</td>
<td valign="top" class="dataTables_empty"></td>
<td valign="top" class="dataTables_empty">${xhdt[0].KCPH}</td></tr></tbody>
			</table>
    `;

    const sjzh = JSON.parse(result[3].data.toString());
    const sjzhHtml = `<div>实际装货信息</div>
    <table id="example" border="1" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>分提单号</th>
						<th>箱号</th>
						<th>尺寸</th>
						<th>箱型</th>
						<th>铅封</th>
						<th>实装件数</th>
						<th>实装重量</th>
						<th>实装尺码</th>
						<th>VGM</th>
					</tr>
				</thead>
        <tbody id="sjzh"><tr class="odd">
<td valign="top" class="dataTables_empty">${sjzh[0].TDH}</td>
<td valign="top" class="dataTables_empty">${sjzh[0].XH}</td>
<td valign="top" class="dataTables_empty">${sjzh[0].CC}</td>
<td valign="top" class="dataTables_empty">${sjzh[0].XX}</td>
<td valign="top" class="dataTables_empty">${sjzh[0].QFH1}</td>
<td valign="top" class="dataTables_empty">${sjzh[0].JS}</td>
<td valign="top" class="dataTables_empty">${sjzh[0].HZ}</td>
<td valign="top" class="dataTables_empty">${sjzh[0].TJ}</td>
<td valign="top" class="dataTables_empty">${sjzh[0].VGM}</td>
</tr>
</tbody>
			</table>
    `;

    const czy = JSON.parse(result[4].data.toString());
    const czyHtml = `<div>操作员信息</div>
    <table id="example" border="1" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>操作员</th>
						<th>联系方式</th>
					</tr>
				</thead>
        <tbody id="czy"><tr class="odd">
        <td valign="top" class="dataTables_empty">${czy[0].XM}</td>
        <td valign="top" class="dataTables_empty">${czy[0].TELEPHONE}</td>
        </tr></tbody>
			</table>
    `;

    return czyHtml + jgxxHtml + fpxxHtml + xhdtHtml + sjzhHtml;
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
    const $ = cheerio.load(result.data);
    const contentTable = $('#mainContent')
      .find('table')
      .eq(20);
    return contentTable
      .html()
      .replace(
        /<img.*?src=[\'|\"](.*?(?:[\.gif|\.jpg|\.png]))[\'|\"].*?[\/]?>/gi,
        ''
      );
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
    const { RESULT } = JSON.parse(dyMsg5);
    const vesselInfo = RESULT.DATA.VESCD[0];
    const billInfo = RESULT.DATA.BILLINFO[0];
    const hgfxInfo = RESULT.DATA.HGFXINFO[0];
    const tdjhyxInfo = RESULT.DATA.TDJHYXINFO[0];
    const yzxInfo = RESULT.DATA.YZXINFO[0];
    const szxInfo = RESULT.DATA.SZXINFO[0];
    const fxInfo = RESULT.DATA.FXHINFO[0];

    // return RESULT;
    return `
    <div style="color: red">航名航次信息</div>
    <table border="1" width="100%" cellspacing="0">
      <tr style="background: grey">
        <td>航次</td>
        <td>中文船名</td>
        <td>英文船名</td>
        <td>装船码头</td>
        <td>装船时间</td>
        <td>计划集港开始</td>
        <td>计划集港结束</td>
      </tr>
      <tr>
        <td>${vesselInfo.VOYNO}</td>
        <td>${vesselInfo.VESCD}</td>
        <td>${vesselInfo.SPECEN}</td>
        <td>${vesselInfo.DOCK}</td>
        <td>${vesselInfo.LDDT}</td>
        <td>${vesselInfo.JGSTDT}</td>
        <td>${vesselInfo.INPODDT}</td>
      </tr>
    </table>
    <div style="color: red">提单信息</div>
    <table border="1" width="100%" cellspacing="0">
      <tr style="background: grey">
        <td>提单</td>
        <td>主提单</td>
        <td>中转港</td>
        <td>目的港</td>
        <td>操作员</td>
        <td>电话</td>
        <td>邮箱</td>
      </tr>
      <tr>
        <td>${billInfo.BILLNO}</td>
        <td>${billInfo.MBILLNO}</td>
        <td>${billInfo.TRORTC}</td>
        <td>${billInfo.LDPORT}</td>
        <td>${billInfo.NAME}</td>
        <td>${billInfo.TEL}</td>
        <td>${billInfo.EMAIL}</td>
      </tr>
    </table>
    <div style="color: red">海关放行信息</div>
    <table border="1" width="100%" cellspacing="0">
      <tr style="background: grey">
        <td>提单</td>
        <td>报关单号</td>
        <td>场站确认</td>
        <td>放行状态</td>
        <td>件数</td>
        <td>重量</td>
        <td>海关通知查验</td>
      </tr>
      <tr>
        <td>${hgfxInfo.BILLNO}</td>
        <td>${hgfxInfo.ENTRYID}</td>
        <td>${hgfxInfo.RDATE}</td>
        <td>${hgfxInfo.CFDT}</td>
        <td>${hgfxInfo.PKGS}</td>
        <td>${hgfxInfo.GROSWT}</td>
        <td>${hgfxInfo.TPORTC}</td>
      </tr>
    </table>
    <div style="color: red">提单计划用箱：定箱号的提箱地点以定箱号中的信息为准</div>
    <table border="1" width="100%" cellspacing="0">
      <tr style="background: grey">
        <td>箱经营人</td>
        <td>尺寸箱型</td>
        <td>箱分类</td>
        <td>计划箱数</td>
        <td>装箱性质</td>
        <td>划拨状态</td>
        <td>配载要求</td>
        <td>提箱场站</td>
        <td>温度</td>
        <td>湿度</td>
        <td>通风度</td>
        <td>食品箱</td>
        <td>法检箱</td>
      </tr>
      <tr>
        <td>${tdjhyxInfo.CTNOPE}</td>
        <td>${tdjhyxInfo.SZTP}</td>
        <td>${tdjhyxInfo.CONTYPE}</td>
        <td>${tdjhyxInfo.PLCTNS}</td>
        <td>${tdjhyxInfo.DISCTNID}</td>
        <td>${tdjhyxInfo.HUABO}</td>
        <td>${tdjhyxInfo.LDREQ}</td>
        <td>${tdjhyxInfo.TXYARD}</td>
        <td>${tdjhyxInfo.TMPSET}</td>
        <td>${tdjhyxInfo.WETSET}</td>
        <td>${tdjhyxInfo.VENTDEGR}</td>
        <td>${tdjhyxInfo.FDCTNCD}</td>
        <td>${tdjhyxInfo.FJX}</td>
      </tr>
    </table>
    <div style="color: red">
      预装箱信息
    </div>
    <table border="1" width="100%" cellspacing="0">
      <tr style="background: grey">
        <td>箱号</td>
        <td>箱经营人</td>
        <td>返回地点</td>
        <td>铅封号</td>
        <td>用箱时间</td>
        <td>返回时间</td>
        <td>车号</td>
        <td>箱皮重</td>
        <td>尺寸箱型</td>
      </tr>
      <tr>
        <td>${yzxInfo.CTNNO}</td>
        <td>${yzxInfo.CTNOPE}</td>
        <td>${yzxInfo.BKADRES}</td>
        <td>${yzxInfo.SEALNO}</td>
        <td>${yzxInfo.EMFUEDT}</td>
        <td>${yzxInfo.LDBKDT}</td>
        <td>${yzxInfo.TRKCD}</td>
        <td>${yzxInfo.ECTNWT}</td>
        <td>${yzxInfo.SZTP}</td>
      </tr>
    </table>
    <div style="color: red">实装箱信息</div>
    <table border="1" width="100%" cellspacing="0">
      <tr style="background: grey">
        <td>箱号</td>
        <td>箱经营人</td>
        <td>包装类型</td>
        <td>提单件数</td>
        <td>提单重量</td>
        <td>铅封号</td>
        <td>送港出场</td>
        <td>查验/放行</td>
        <td>箱总重</td>
        <td>箱皮重</td>
        <td>尺寸箱型</td>
        <td>提单体积</td>
        <td>放行状态</td>
      </tr>
      <tr>
        <td>${szxInfo.CTNNO}</td>
        <td>${szxInfo.CTNOPE}</td>
        <td>${szxInfo.PLANBAY}</td>
        <td>${szxInfo.EXPR1}</td>
        <td>${szxInfo.ALK}</td>
        <td>${szxInfo.SEALNO}</td>
        <td>${szxInfo.GPOYDT}</td>
        <td>${szxInfo.GATETIME}</td>
        <td>${szxInfo.NOTIGWT}</td>
        <td>${szxInfo.ECTNWT}</td>
        <td>${szxInfo.SZTP}</td>
        <td>${szxInfo.ALC}</td>
        <td></td>
      </tr>
    </table>
    <div style="color: red">放箱号</div>
    <table border="1" width="100%" cellspacing="0">
      <tr style="background: grey">
        <td>订舱指令</td>
        <td>箱经营人</td>
        <td>尺寸箱型</td>
        <td>主提单</td>
        <td>放箱标志</td>
        <td>放箱EIR号</td>
      </tr>
      <tr>
        <td>${fxInfo.EIRFLAG}</td>
        <td>${fxInfo.CTNOPE}</td>
        <td>${fxInfo.SZTP}</td>
        <td>${fxInfo.MBILLNO}</td>
        <td>${fxInfo.FXBZ}</td>
        <td>${fxInfo.EIRNO}</td>
      </tr>
    </table>
    <H2>未处理一单多箱情况，提供给我相关提单号来添加</H2>
    `;
  }

  async shiTengKeYun(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      `http://www.stx-keyun.com/query/search_bl_no.asp?BL_NO1=${bill}&submit1=%B2%E9%D1%AF`
    );
    const buf = iconv.decode(result.data, 'gb2312');
    const $ = cheerio.load(buf);
    $('form')
      .eq(0)
      .remove();
    return $('.content1').html();
  }

  async keYun(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      `http://www.sdsmart.cn/FindClass/YD_BLQueryGrid.aspx?blno=${bill}`
    );
    const $ = cheerio.load(result.data);
    $('#exptable > table tr')
      .eq(0)
      .remove();
    return $('#exptable > table').html();
  }

  async luHai(bill) {
    const ctx = this.ctx;
    const result = await ctx.curl(
      'http://221.215.96.158:8086/root/jsp/search/search0402.jsp',
      {
        method: 'POST',
        data: {
          BillNo: bill,
        },
        timeout: 5000,
      }
    );
    const buf = iconv.decode(result.data, 'gb2312');
    const $ = cheerio.load(buf);
    $('div')
      .eq(1)
      .remove();

    return $('body').html();
  }
}

module.exports = RawBillInfoService;
