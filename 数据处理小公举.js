// 本脚本为站长在集成电路测试中针对本站长开发的一套利于站长测试的辅助脚本
// 无偿开放给行业内有需要的同行们，可进行二次开发，针对对应的数据格式，或者具体的需求
// 如果你的机制（技巧）可以分享出来，供后来者参考，感谢。
// https://ziyunchu.com/archives/1722

// (function () {

const bianhaoqianzhui = "    ";//查好用到的前缀用来区别于编号和数据
const bianhaohouzhui = "    ";//查好用到的后缀用来区别于编号和数据，只能是4个
// var i = [    //菜单，现弄五个
//   '单文件程式改号',  //1
//   '编号对号s',  //2
//   '编号对号g',  //3
//   '编号对号c',  //4
//   '编号对号f'  //5
// ];
var numfail = 0,
  fumulu_path = '',//父目录地址
  allMessage = '\n',
  xgmsg = '',  //记录单文件程式修改的修改情况
  filejson = { code: 1, data: {} };
var txtpath = UltraEdit.activeDocument.path;//返回指定文件的完整路径
var txtfilepath = UltraEdit.activeDocument.copyFilePath;

// tihuannum(kunge + "610.4" + kunge, kunge + "610.5" + kunge);

// UltraEdit.decryptFilePrompt();//目前解密文件对话框
// UltraEdit.encryptFilePrompt();//目前加密文件对话框
//UltraEdit.outputWindow.showStatus=true;//确定在输出窗口的所有状态信息的可见性

const dome$1 = {
  clipkon: function () { //查询剪贴板是否为空
    var clipkon_a = UltraEdit.clipboardContent;
    if (clipkon_a = '') {
      return false
    } else {
      return true
    }
  },
  guangbiaohang: function () {
    return UltraEdit.activeDocument.currentLineNum; //返回光标所在行
  },
  guangbiaolie: function () {
    return UltraEdit.activeDocument.currentColumnNum; //返回光标所在列
  },
  dkwjsliang: function () {
    return UltraEdit.document.length; //查询打开几个文件
  },
  cxyjgbianliang: function (cxyjgbianliang_a) {    //输入要查询的字符，在当前活动页查找，返回当前活动页中字符的数量
    var cxyjgbianliang_b = 2, //先假设有几个
      cxyjgbianliang_c = 0, //实际有几个
      cxyjgbianliang_i = 1;
    UltraEdit.activeDocument.top();
    UltraEdit.activeDocument.findReplace.regExp = false;
    for (cxyjgbianliang_i = 1; cxyjgbianliang_i <= cxyjgbianliang_b; cxyjgbianliang_i++) {
      if (UltraEdit.activeDocument.findReplace.find(cxyjgbianliang_a)) {
        cxyjgbianliang_b++;
        cxyjgbianliang_c++;
      }
    }
    return cxyjgbianliang_c;
  },
  fanhuidakaidewjmz: function () {    //返回当前打开的所有文档路径用来获取，对应温度的对应路径
    var fanhuidakaidewjmz_num = UltraEdit.document.length;
    var fanhuidakaidewjmz_index,
      fanhuidakaidewjmz_txtpath = [];
    for (fanhuidakaidewjmz_index = 0; fanhuidakaidewjmz_index < fanhuidakaidewjmz_num; fanhuidakaidewjmz_index++) {
      UltraEdit.document[fanhuidakaidewjmz_index].setActive();
      UltraEdit.document[fanhuidakaidewjmz_index].top();
      fanhuidakaidewjmz_txtpath[fanhuidakaidewjmz_index] = UltraEdit.activeDocument.path;//返回指定文件的完整路径
    }
    UltraEdit.document[0].setActive();
    UltraEdit.document[0].top();
    return fanhuidakaidewjmz_txtpath;
  },
  xzeyaoxiugaidewj: function (xzeyaoxiugaidewj_a) {    //如果打开文档不止一个，用户选择打开要改号的文件，输入文件路径数组
    if (xzeyaoxiugaidewj_a.length > 1) {
      var xzeyaoxiugaidewj_b = xzeyaoxiugaidewj_a.length;
      var xzeyaoxiugaidewj_d = '如果多文件,请输文件编号。\n目标文件选项：\n';
      for (var xzeyaoxiugaidewj_c = 0; xzeyaoxiugaidewj_c < xzeyaoxiugaidewj_b; xzeyaoxiugaidewj_c++) {
        xzeyaoxiugaidewj_d += '|【';
        xzeyaoxiugaidewj_d += xzeyaoxiugaidewj_c + 11 + '】-> ';
        xzeyaoxiugaidewj_d += String(xzeyaoxiugaidewj_a[xzeyaoxiugaidewj_c]).slice(-30);
        xzeyaoxiugaidewj_d += ' |\n';
      }
      UltraEdit.outputWindow.write(xzeyaoxiugaidewj_d + '请选择冒号之前的编号:');
      var xzeyaoxiugaidewj_u = UltraEdit.getValue("请按照提示输入。\n请输入" + (xzeyaoxiugaidewj_b) + "个选项的编号", 1);
      if (xzeyaoxiugaidewj_u >= 11 && xzeyaoxiugaidewj_b + 11 > xzeyaoxiugaidewj_u) {
        UltraEdit.document[xzeyaoxiugaidewj_u - 11].setActive();
        UltraEdit.document[xzeyaoxiugaidewj_u - 11].top();
        UltraEdit.outputWindow.write('选择的是：' + xzeyaoxiugaidewj_u + "\n");
        return true;
      } else {
        UltraEdit.outputWindow.write('选择错了：' + xzeyaoxiugaidewj_u + "\n");
        return false;
      }
    } else {
      UltraEdit.document[0].setActive();
      UltraEdit.document[0].top();
      return true;
    }
  },
  cc_to_newfeil: function (b) {    //将剪贴板字符粘贴到新文件
    var cc_to_newfeil_date = new Date();
    var cc_to_newfeil_a = '';
    cc_to_newfeil_a += cc_to_newfeil_date.getHours().toString();
    cc_to_newfeil_a += cc_to_newfeil_date.getMinutes().toString();
    cc_to_newfeil_a += cc_to_newfeil_date.getSeconds().toString();
    UltraEdit.newFile();
    UltraEdit.activeDocument.write("新粘入的程式如下:\n");
    UltraEdit.activeDocument.write(UltraEdit.clipboardContent + "\n");
    UltraEdit.saveAs(dome$1.srdzfhdzyzfddzhi(b) + "改号程式" + cc_to_newfeil_a);
    // var cc_to_newfeil_fumulu_path = UltraEdit.activeDocument.path.substring(0, UltraEdit.activeDocument.path.indexOf('改号程式' + cc_to_newfeil_a)); //获取父目录
    // UltraEdit.outputWindow.write('程式文件父目录:' + cc_to_newfeil_fumulu_path);
    return;
  },
  jianxichengshitoyijuhua: function (jianxichengshitoyijuhua_b) {    //简析程式到一行一句话，必须确认当前文件是程式
    var jianxichengshitoyijuhua_a = [];
    UltraEdit.activeDocument.top();
    UltraEdit.activeDocument.gotoLine(UltraEdit.activeDocument.currentLineNum, 1);
    UltraEdit.activeDocument.key("DOWN ARROW");  //光标向下,一定和上面一行连用
    for (var jianxichengshitoyijuhua_c = 0; jianxichengshitoyijuhua_c < jianxichengshitoyijuhua_b; jianxichengshitoyijuhua_c++) {
      UltraEdit.activeDocument.selectLine();
      var jianxichengshitoyijuhua_d = UltraEdit.activeDocument.selection;
      if (jianxichengshitoyijuhua_d != '') {
        jianxichengshitoyijuhua_a[jianxichengshitoyijuhua_c] = jianxichengshitoyijuhua_d.slice(0, jianxichengshitoyijuhua_d.length - 1);
        UltraEdit.activeDocument.gotoLine(UltraEdit.activeDocument.currentLineNum, 1);
        UltraEdit.activeDocument.key("DOWN ARROW");  //光标向下
      }
    }
    // UltraEdit.outputWindow.write('单句:' + jianxichengshitoyijuhua_a);
    return jianxichengshitoyijuhua_a;
  },
  jianxichengshitoone: function (itoone_a, itoone_c) {    //简析程式到一个基本，这里应该涉及到一个大的数组从放改号程式的基础语句
    var itoone_b = [],  //最终
      itoone_kd = [],  //空到
      itoone_dd = [],  //单到
      itoone_gg = [],  //单改
      msgall = '',
      itoone_bdjs = 0,  //b的计数
      itoone_ad = '';  //强制字符串的字符
    for (var itoone_d = 0; itoone_d < itoone_c; itoone_d++) {  //
      var itoone_hcdata1 = '',  //缓存第一个
        itoone_oneadi = [],  //
        itoone_oneadijs = 0,
        itoone_konadi = [],
        itoone_konadijs = 0,
        itoone_kononejs = 0;
      itoone_ad = String(itoone_a[itoone_d]);  //这一句下面可能会用到这一句的字符串类型
      itoone_kd[itoone_d] = dome$1.cxzfccxcshu(itoone_a[itoone_d], ' -');  //653 670 -673    有一个
      itoone_dd[itoone_d] = dome$1.cxzfccxcshu(itoone_a[itoone_d], '-');  //653 670 -673    有一个
      itoone_gg[itoone_d] = dome$1.cxzfccxcshu(itoone_a[itoone_d], '.');  //653 670 -673    有一个
      if (itoone_ad != 'undefined') {  //如果内容为空就不解析了,解析成数组里，后面添加排序
        for (var itoone_i = 0; itoone_i < itoone_a[itoone_d].length; itoone_i++) {  //单句内容逐字遍历
          switch (itoone_a[itoone_d][itoone_i]) {  //写到数组里
            case ' ':
              itoone_oneadi[itoone_oneadijs] = itoone_hcdata1;
              itoone_oneadijs++;
              itoone_oneadi[itoone_oneadijs] = ' ';
              itoone_oneadijs++;
              itoone_hcdata1 = '';
              break
            case '-':
              if (itoone_hcdata1 != '') {
                itoone_oneadi[itoone_oneadijs] = itoone_hcdata1;
                itoone_oneadijs++;
              }
              itoone_oneadi[itoone_oneadijs] = '-';
              itoone_oneadijs++;
              itoone_hcdata1 = '';
              break
            case '.':
              itoone_oneadi[itoone_oneadijs] = itoone_hcdata1;
              itoone_oneadijs++;
              itoone_oneadi[itoone_oneadijs] = '.';
              itoone_oneadijs++;
              itoone_hcdata1 = '';
              break
            default:
              itoone_hcdata1 += itoone_a[itoone_d][itoone_i];
              if (itoone_i + 1 == itoone_a[itoone_d].length) {
                if (itoone_hcdata1 != '') {
                  itoone_oneadi[itoone_oneadijs] = itoone_hcdata1;
                  itoone_oneadijs++;
                }
              }
          }
        }
        //数组内排序？
      }
      if (itoone_kd[itoone_d] > 0) {  //如果是'空到'类型，a b c d-e f -g
        for (var itoone_j = 0; itoone_j < itoone_oneadi.length / 2 - 1; itoone_j++) {  //算差的次数,寻找空的数值
          if (itoone_oneadi[itoone_j * 2 + 1] == ' ') {
            itoone_konadi[itoone_konadijs] = itoone_oneadi[itoone_j * 2];
            itoone_konadijs++;
          } else if (itoone_oneadi[itoone_j * 2 + 1] == '-') {
            for (var itoone_k = 0; itoone_k < itoone_oneadi[itoone_j * 2 + 2] - itoone_oneadi[itoone_j * 2]; itoone_k++) {
              itoone_konadi[itoone_konadijs] = Number(itoone_oneadi[itoone_j * 2]) + itoone_k;
              itoone_konadijs++;
            }
          }
        }
        for (var itoone_l = 0; itoone_l < itoone_oneadi[itoone_oneadi.length - 1] - itoone_oneadi[0] - 1; itoone_l++) {  //算差
          for (var itoone_m = 0; itoone_m < itoone_konadi.length; itoone_m++) {
            if (itoone_konadi[itoone_m] == Number(itoone_oneadi[0]) + itoone_kononejs + 1 + itoone_l)
              itoone_kononejs++;
          }
          if (Number(itoone_oneadi[0]) + itoone_kononejs + 1 + itoone_l < itoone_oneadi[itoone_oneadi.length - 1]) {  //最大要改超过最大，退出
            itoone_b[itoone_bdjs] = (Number(itoone_oneadi[0]) + Number(itoone_l)) + '.' + (Number(itoone_oneadi[0]) + itoone_kononejs + 1 + itoone_l);
            itoone_bdjs++;
          }
        }
      } else {  //如果是'改'类型
        if (itoone_oneadi.length == 3) {  //a.b
          itoone_b[itoone_bdjs] = itoone_oneadi[0] + '.' + itoone_oneadi[2];
          itoone_bdjs++;
        } else if (itoone_gg[itoone_d] > itoone_dd[itoone_d]) {  //a.b-c.d
          if (Math.abs(itoone_oneadi[4] - itoone_oneadi[0]) == Math.abs(itoone_oneadi[6] - itoone_oneadi[2])) {
            for (var itoone_n = 0; itoone_n < itoone_oneadi[4] - itoone_oneadi[0] + 1; itoone_n++) {  //算差
              itoone_b[itoone_bdjs] = (Number(itoone_oneadi[0]) + itoone_n) + '.' + (Number(itoone_oneadi[2]) + itoone_n);
              itoone_bdjs++;
            }
          } else {
            msgall += itoone_oneadi + ' 的程式内容不对，重新来过。';
          }
        } else if (itoone_dd[itoone_d] > itoone_gg[itoone_d]) {  //a-c.b-d
          if (Math.abs(itoone_oneadi[2] - itoone_oneadi[0]) == Math.abs(itoone_oneadi[6] - itoone_oneadi[4])) {
            for (var itoone_o = 0; itoone_o < itoone_oneadi[2] - itoone_oneadi[0] + 1; itoone_o++) {  //算差
              itoone_b[itoone_bdjs] = (Number(itoone_oneadi[0]) + itoone_o) + '.' + (Number(itoone_oneadi[4]) + itoone_o);
              itoone_bdjs++;
            }
          } else {
            msgall += itoone_oneadi + ' 的程式内容不对，重新来过。';
          }
        } else {
          if (itoone_oneadi != '') {
            msgall += itoone_oneadi + ' 程式格式不对，重新来过。';
          }
        }
      }
      // UltraEdit.outputWindow.write(':' + itoone_a + ':' + itoone_oneadi + ':');
    }
    if (msgall != '') {
      UltraEdit.messageBox(msgall, "程式半自动改号方案");
      return false;
    }
    return itoone_b;
  },
  fanhuichaxdwenbenzuobiaoshuzu: function (fanhuichaxdwenbenzuobiaoshuzu_a) {    //返回查询的字符串坐标数组
    var fanhuichaxdwenbenzuobiaoshuzu_b = 1, //先假设有几个
      fanhuichaxdwenbenzuobiaoshuzu_c = {}, //实际数组
      fanhuichaxdwenbenzuobiaoshuzu_i = 1;
    fanhuichaxdwenbenzuobiaoshuzu_c.number = 0;  //实际个数，还是传出去的好
    UltraEdit.activeDocument.top();
    // UltraEdit.activeDocument.cancelSelect();  //清楚选中相
    UltraEdit.activeDocument.findReplace.regExp = false;
    fanhuichaxdwenbenzuobiaoshuzu_c.data = {};
    for (fanhuichaxdwenbenzuobiaoshuzu_i = 1; fanhuichaxdwenbenzuobiaoshuzu_i <= fanhuichaxdwenbenzuobiaoshuzu_b; fanhuichaxdwenbenzuobiaoshuzu_i++) {
      if (UltraEdit.activeDocument.findReplace.find(fanhuichaxdwenbenzuobiaoshuzu_a)) {
        fanhuichaxdwenbenzuobiaoshuzu_b++;
        fanhuichaxdwenbenzuobiaoshuzu_c.number++;
        fanhuichaxdwenbenzuobiaoshuzu_c.data[fanhuichaxdwenbenzuobiaoshuzu_i] = {};
        fanhuichaxdwenbenzuobiaoshuzu_c.data[fanhuichaxdwenbenzuobiaoshuzu_i].lineNum = UltraEdit.activeDocument.currentLineNum;
        fanhuichaxdwenbenzuobiaoshuzu_c.data[fanhuichaxdwenbenzuobiaoshuzu_i].colNum = UltraEdit.activeDocument.currentColumnNum;
      }
    }
    // UltraEdit.outputWindow.write("173:" + JSON.stringify(fanhuichaxdwenbenzuobiaoshuzu_c));
    return fanhuichaxdwenbenzuobiaoshuzu_c;
  },
  jccssfwcs: function () {    //检查程式是否为程式，当前打开文件应该是程式文件，在粘贴程式后，检查第一行
    UltraEdit.activeDocument.top();
    UltraEdit.activeDocument.selectLine();
    var jccssfwcs_str = UltraEdit.activeDocument.selection;
    if (jccssfwcs_str === "新粘入的程式如下:\n") {
      return true;
    } else {
      return false;
    }
  },
  jcydshdqwjian_1: function () {    //检查有多少行当前文件
    UltraEdit.activeDocument.top();
    var jcydshdqwjian_a = 1,
      jcydshdqwjian_c = 2,
      jcydshdqwjian_d;
    jcydshdqwjian_d = UltraEdit.activeDocument.currentLineNum;
    UltraEdit.activeDocument.gotoLine(UltraEdit.activeDocument.currentLineNum, 1);
    UltraEdit.activeDocument.key("DOWN ARROW");  //光标向下
    for (var jcydshdqwjian_b = 0; jcydshdqwjian_b < jcydshdqwjian_c; jcydshdqwjian_b++) {
      var jcydshdqwjian_str = UltraEdit.activeDocument.currentLineNum;
      if (jcydshdqwjian_str != jcydshdqwjian_d) {
        UltraEdit.activeDocument.gotoLine(UltraEdit.activeDocument.currentLineNum, 1);
        UltraEdit.activeDocument.key("DOWN ARROW");  //光标向下
        jcydshdqwjian_c++;
        jcydshdqwjian_a++;
        jcydshdqwjian_d = jcydshdqwjian_str;
      }
    }
    return jcydshdqwjian_a;
  },
  cxzfccxcshu: function (cxzfccxcshu_str, cxzfccxcshu_target) {    //查询字符串出现次数
    if (typeof (cxzfccxcshu_str) != 'string') {
      cxzfccxcshu_str = String(cxzfccxcshu_str);
    }
    return cxzfccxcshu_str.split(cxzfccxcshu_target).length - 1;
  },
  tihuannum: function (tihuannum_a, tihuannum_b) {    //替换，前面替换后面
    var tihuannum_c,
      tihuannum_text_1,
      tihuannum_text_2,
      tihuannum_text_3,
      tihuannum_f,
      tihuannum_j,
      tihuannum_e = 0;
    tihuannum_f = dome$1.bqbhwsqhzhui(tihuannum_a, tihuannum_b);
    if (tihuannum_a == '__') {  //防止重复修改标志，的清理
      UltraEdit.outputWindow.write('清理‘__’中...');
      UltraEdit.activeDocument.top();
      UltraEdit.activeDocument.findReplace.replaceAll = true;
      // UltraEdit.activeDocument.findReplace.matchCase = true;
      UltraEdit.activeDocument.findReplace.replace(tihuannum_a, tihuannum_b);
    } else {
      tihuannum_a = tihuannum_f[0];  //加上前后缀，因为是右对齐，要考虑
      tihuannum_b = tihuannum_f[1];  //
      tihuannum_c = dome$1.fanhuichaxdwenbenzuobiaoshuzu(tihuannum_a);
      tihuannum_j = dome$1.cxyjgbianliang(tihuannum_a);
      if (tihuannum_j > 2) {
        UltraEdit.outputWindow.write('同一个编号的不同坐标:' + tihuannum_c + ':确认\n');
        //返回报错
        UltraEdit.outputWindow.write('相同编号出现超过俩次，请手动修改。\n');
      } else if (tihuannum_j == 2) {
        for (var tihuannum_d = 1; tihuannum_d <= dome$1.fhdxdsliang(tihuannum_c); tihuannum_d++) {  //机制如果有俩个值，单独输入的值默认是正确的，修改顺序的
          UltraEdit.activeDocument.gotoLine(tihuannum_c.data[tihuannum_d].lineNum - 2, 9);  //光标移动到某位置
          UltraEdit.activeDocument.gotoLineSelect(tihuannum_c.data[tihuannum_d].lineNum - 2, 20);  //光标到这里选住
          tihuannum_text_1 = UltraEdit.activeDocument.selection;  //选住文本到变量
          UltraEdit.activeDocument.gotoLine(tihuannum_c.data[tihuannum_d].lineNum, 9);  //光标移动到某位置
          UltraEdit.activeDocument.gotoLineSelect(tihuannum_c.data[tihuannum_d].lineNum, 20);  //光标到这里选住
          tihuannum_text_2 = UltraEdit.activeDocument.selection;  //选住文本到变量
          tihuannum_text_3 = Number(tihuannum_text_2) - Number(tihuannum_text_1);
          if (tihuannum_text_3 < 0) {  //绝对值方法不能用，将就一下
            tihuannum_text_3 = Number(tihuannum_text_1) - Number(tihuannum_text_2);
          }

          if (tihuannum_text_3 < 10) {
            UltraEdit.outputWindow.write('修改' + tihuannum_c.data[tihuannum_d].lineNum + '行:' + tihuannum_a + ':改:' + tihuannum_b + ':确认');
            UltraEdit.activeDocument.gotoLine(tihuannum_c.data[tihuannum_d].lineNum, 1);  //光标移动到某位置
            UltraEdit.activeDocument.gotoLineSelect(tihuannum_c.data[tihuannum_d].lineNum, 40);  //光标到这里选住
            // UltraEdit.activeDocument.findReplace.regExp = false;  //规则
            UltraEdit.activeDocument.findReplace.selectText = true;  //选择文本
            // UltraEdit.activeDocument.findReplace.replaceAll = false;  //全部替换
            UltraEdit.activeDocument.findReplace.replace(tihuannum_a, tihuannum_b);
            UltraEdit.activeDocument.findReplace.selectText = false;  //选择文本
            return true;
          } else {
            tihuannum_e++;
          }
        }
        if (tihuannum_e == 2) {
          xgmsg += '俩个编号需要手动修改:' + tihuannum_a + ':改:' + tihuannum_b + ':确认\n';
          return 'ato2';
        }
      } else if (tihuannum_j == 1) {
        // UltraEdit.outputWindow.write('修改:' + tihuannum_a + ':改:' + tihuannum_b + ':确认');
        xgmsg += '修改:' + tihuannum_a + ':改:' + tihuannum_b + ':确认\n';
        UltraEdit.activeDocument.top();
        // UltraEdit.activeDocument.findReplace.replaceAll = false;
        // UltraEdit.activeDocument.findReplace.matchCase = true;
        UltraEdit.activeDocument.findReplace.replace(tihuannum_a, tihuannum_b);
        return true;
      } else {
        // UltraEdit.outputWindow.write('没有发现:' + tihuannum_a + ':确认');
        xgmsg += '没有发现:' + tihuannum_a + ':确认\n';
        return 'nofind';
      }
    }
  },
  fhdxdsliang: function (fhdxdsliang_a) {    //返回对象的数量,find的返回自带number
    var fhdxdsliang_count = 0;
    for (var key in fhdxdsliang_a) {
      if (fhdxdsliang_a.hasOwnProperty(key)) {
        fhdxdsliang_count++;
      }
    }
    return fhdxdsliang_count;
  },
  bqbhwsqhzhui: function (bqbhwsqhzhui_a, bqbhwsqhzhui_b) {    //补齐编号前后缀,以及位数对其,格式化
    var bqbhwsqhzhui_c = [],  //c0,c1-a,b
      bqbhwsqhzhui_d;  //差几位
    bqbhwsqhzhui_a = Number(bqbhwsqhzhui_a);
    bqbhwsqhzhui_b = Number(bqbhwsqhzhui_b);
    bqbhwsqhzhui_d = String(bqbhwsqhzhui_a).length - String(bqbhwsqhzhui_b).length;
    if (bqbhwsqhzhui_d > 0) {
      for (var bqbhwsqhzhui_e = 0; bqbhwsqhzhui_e < bqbhwsqhzhui_d; bqbhwsqhzhui_e++) {
        bqbhwsqhzhui_b = ' ' + bqbhwsqhzhui_b;
      }
    } else if (bqbhwsqhzhui_d < 0) {
      for (var bqbhwsqhzhui_f = 0; bqbhwsqhzhui_f < -bqbhwsqhzhui_d; bqbhwsqhzhui_f++) {
        bqbhwsqhzhui_a = ' ' + bqbhwsqhzhui_a;
      }
    }
    bqbhwsqhzhui_c[0] = bianhaoqianzhui + bqbhwsqhzhui_a + bianhaohouzhui;  //加上前后缀，因为是右对齐，要考虑
    bqbhwsqhzhui_c[1] = bianhaoqianzhui + '__' + bqbhwsqhzhui_b + bianhaohouzhui;  //加上前后缀，因为是右对齐，要考虑,添加了前缀，表示这个值是以前改过的
    // UltraEdit.outputWindow.write('477输出:' + bqbhwsqhzhui_a + ':' + bqbhwsqhzhui_b + ':');
    return bqbhwsqhzhui_c;
  },
  jcydshdqwjian: function () {    //检查有多少行当前文件，最新的，不要用_1
    UltraEdit.activeDocument.top();
    var jcydshdqwjian_a = 1,
      jcydshdqwjian_c = 2,
      jcydshdqwjian_bc = 5000,  //缩短时间
      jcydshdqwjian_d = 0;
    jcydshdqwjian_d = UltraEdit.activeDocument.currentLineNum;
    for (var jcydshdqwjian_b = 0; jcydshdqwjian_b < (jcydshdqwjian_c + jcydshdqwjian_bc); jcydshdqwjian_b++) {
      UltraEdit.activeDocument.gotoLine(jcydshdqwjian_d + jcydshdqwjian_bc, 1);  //光标移动到某位置
      var jcydshdqwjian_str = UltraEdit.activeDocument.currentLineNum;
      // UltraEdit.outputWindow.write('513有:' + jcydshdqwjian_d + '个，确认\n');
      if (jcydshdqwjian_str >= (jcydshdqwjian_d + jcydshdqwjian_bc)) {
        jcydshdqwjian_c++;
        jcydshdqwjian_d = jcydshdqwjian_str;
      } else {
        jcydshdqwjian_a = jcydshdqwjian_str;
        jcydshdqwjian_bc = 0;
        return jcydshdqwjian_a;
      }
    }
    return jcydshdqwjian_a;
  },
  jq150hc: function (jq150hc_str) {    //字符串在150位处插入\n
    jq150hc_str = String(jq150hc_str);
    const jq150hc_b = parseInt(jq150hc_str.length / 150) + 1,
      jq150hc_ary = jq150hc_str.split('');		// 转化为数组
    for (var jq150hc_a = 0; jq150hc_a < jq150hc_b; jq150hc_a++) {
      jq150hc_ary.splice(150 * jq150hc_a, 0, '\n');	// 使用数组方法插入字符串
    }
    return jq150hc_ary.join('');				// 拼接成字符串后输出
  },
  srdzfhdzyzfddzhi: function (str) {    //输入文件地址，返回文件地址父目录
    if (!str) {
      str = UltraEdit.activeDocument.path;
    }
    str = str.substring(0, str.lastIndexOf('\\') + 1); //获取父目录
    return str;
  },
  tmltjqtwjfhqtwjml: function (tmltjqtwjfhqtwjml_a, tmltjqtwjfhqtwjml_b) {    //同目录输入动态文件路径返回其他文件路径，a是活动文件路径，b是添加的后缀名字
    tmltjqtwjfhqtwjml_a = tmltjqtwjfhqtwjml_a.substring(0, tmltjqtwjfhqtwjml_a.length - 4) + '-' + tmltjqtwjfhqtwjml_b + '.txt';
    return tmltjqtwjfhqtwjml_a;
  },
  srxxfhxxnron: function (srxxfhxxnron_a) {    //输入选项返回输入内容
    if (srxxfhxxnron_a.length > 1) {
      var srxxfhxxnron_b = srxxfhxxnron_a.length;
      var srxxfhxxnron_d = '目标选项：\n';
      for (var srxxfhxxnron_c = 0; srxxfhxxnron_c < srxxfhxxnron_b; srxxfhxxnron_c++) {
        srxxfhxxnron_d += '|【';
        srxxfhxxnron_d += srxxfhxxnron_c + 11 + '】-> ';
        srxxfhxxnron_d += srxxfhxxnron_a[srxxfhxxnron_c];
        srxxfhxxnron_d += ' |\n';
      }
      UltraEdit.outputWindow.write(srxxfhxxnron_d + '请选择括号中间的编号:');
      var srxxfhxxnron_u = UltraEdit.getValue("请按照输出窗口提示输入。\n请输入" + (srxxfhxxnron_b) + "个选项的编号", 1);
      if (srxxfhxxnron_u >= 11 && (srxxfhxxnron_b + 11) > srxxfhxxnron_u) {
        UltraEdit.outputWindow.write('选择的是：' + srxxfhxxnron_a[srxxfhxxnron_u - 11] + " ");
        return srxxfhxxnron_a[srxxfhxxnron_u - 11];
      } else {
        UltraEdit.outputWindow.write('听话，按照菜单来，不要乱选。\n');
        return false;
      }
    } else {
      return false;
    }
    return;
  },
  scsjjdjdzshu: function (minNum, maxNum) {    //生成随机m到n的整数
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  },
  shuzupaixu: function (shuzupaixu_arr, shuzupaixu_brr) {    //数组排序
    shuzupaixu_arr.sort(function (shuzupaixu_a, shuzupaixu_b) {
      return shuzupaixu_a - shuzupaixu_b;
    });
    if (shuzupaixu_brr == 'min') {
      return shuzupaixu_arr[0];
    } else if (shuzupaixu_brr == 'max') {
      return shuzupaixu_arr[shuzupaixu_arr.length - 1];
    } else {
      return shuzupaixu_arr;
    }
  },
  jcszzywzgysu: function (a, b) {    //检查数组中有没有这个元素
    for (var c = 0; c < a.length; c++) {
      if (a[c] == b) {
        return true;
      }
    }
    return false;
  },
  jcszzyjgzgysu: function (a, b) {    //检查数组中有几个这个元素
    var d = 0;
    for (var c = 0; c < a.length; c++) {
      if (a[c] == b) {
        d++;
      }
    }
    return d;
  },
  bcscckdpzwjian: function () {    //保存输出窗口的内容到脚本操作记录文件
    var a,
      c,
      b;
    UltraEdit.document[0].top();  //默认保存到第一个文件同目录下
    c = UltraEdit.activeDocument.path;  //执行之前确认，中间不改动,
    a = dome$1.srdzfhdzyzfddzhi(c) + "js_old_data.txt";
    try {
      UltraEdit.open(a);
      UltraEdit.save();
    } catch (message) {
      UltraEdit.newFile();
      UltraEdit.saveAs(a);
    }
    return;
  },
  dkwjslidang: function () {
    return;
  },
  dkwjslidang: function () {
    return;
  },
  dkwjslidang: function () {
    return;
  },
  dkwjslidang: function () {
    return;
  },
  dkwjslidang: function () {
    return;
  },
  dkwjslidang: function () {
    return;
  }
};

const dome$2 = {
  yyzzdcsghao: function () {    //应用之自动程式改号
    //将程式改号，打开一个数据文件
    //解析程式，从一个粘贴板解析到几句话，再几句话解析到，每句话翻译成最小单位点
    //将解析过的程式直接套改
    //核对所有数据编号
    //查询都有哪些文件被打开了，检查是一个温度的五个文件，是否
    var a = dome$1.fanhuidakaidewjmz(),    //发现打开的文件all
      b = a.length,
      d = '',
      k = [],

      n = 0,  //程式状态
      m;
    UltraEdit.messageBox("请ctrl+c复制好程式后，点击确认按钮。", "程式半自动改号方案");    //请打开输出窗口，确保可以看到输出窗口
    //粘贴粘贴板到新文件
    if (dome$1.clipkon()) {    //粘贴程式到新文件
      dome$1.cc_to_newfeil(a[0]);    //输入第一个文件的路径
    }
    //解析程式
    if (dome$1.jccssfwcs()) {
      var h = dome$1.jcydshdqwjian(),  //程式文件有几行
        i = dome$1.jianxichengshitoyijuhua(h);  //程式文件有几句
      k = dome$1.jianxichengshitoone(i, h);  //程式详情
      UltraEdit.outputWindow.write('有:' + h + '行，有:' + i.length + '句，确认未修改\n');
      //
      // for (var j = 0; j < k.length; j++) {
      //   UltraEdit.outputWindow.write(':' + k[j] + '');
      // }
    } else {
      UltraEdit.outputWindow.write('必须是程序自己生成的文件才可以...\n不能是手动粘贴到文件里\n确认不是程式');
    }
    if (k != false) {
      //打印出所有文件，以供选择，选择要改号的文件
      for (var c = 0; c < b; c++) {
        d += a[c] + '\n';
      }
      // UltraEdit.outputWindow.write('打印所有文件路径：\n' + d + '');
      if (dome$1.xzeyaoxiugaidewj(a)) {    //选择活动文档
        //正式改号
        UltraEdit.outputWindow.write('请注意:会卡住，请不要点击鼠标，等待修改完毕..........\n\n');
        for (var l = 0; l < k.length; l++) {
          m = k[l].split('.');
          dome$1.tihuannum(m[0], m[1]);  //输入单数字
        }
        //这里要把上面防止二次修改的标记消除掉
        dome$1.tihuannum('__', '');
        UltraEdit.outputWindow.write(xgmsg);
        UltraEdit.outputWindow.write('恭喜修改完毕，所有信息都会打印在上方，请在确认无误后自行保存');
      } else {
        UltraEdit.outputWindow.write('没选择活动文档......\n' + '');
      }
    }
    // UltraEdit.outputWindow.write('简析到详情:\n' + dome$1.jq150hc(k) + '\n:详情确认是程式\n');
    return;
  },
  xzecaidan: function (xzecaidan_a) {    //菜单的执行
    if (xzecaidan_a.length > 0) {
      var xzecaidan_b = xzecaidan_a.length;
      var xzecaidan_d = '菜单选项：\n';
      for (var xzecaidan_c = 0; xzecaidan_c < xzecaidan_b; xzecaidan_c++) {
        xzecaidan_d += '|功能【';
        xzecaidan_d += xzecaidan_c + 11 + '】-> ';
        xzecaidan_d += xzecaidan_a[xzecaidan_c];
        xzecaidan_d += ' |\n';
      }
      UltraEdit.outputWindow.write(xzecaidan_d + '请选择括号中间的编号');
      var xzecaidan_u = UltraEdit.getValue("请输菜单编号。\n请输入" + (xzecaidan_b) + "个菜单的编号", 1);
      // UltraEdit.outputWindow.write('选择的是：' + xzecaidan_u + "\n");
      return xzecaidan_u;
    } else {
      UltraEdit.outputWindow.write('菜单有问题：' + xzecaidan_a + "\n");
      return false;
    }
  },
  yyzzchsju: function () {    //应用之摘除坏数据
    //查询有多少坏数据
    //循环
    //查询false所在行数，复制改行到最下面
    //如果这个编号对应有true的数据则直接删除
    UltraEdit.activeDocument.top();
    var a,  //发现false坐标
      d,  //发现false数量
      e = dome$1.fanhuidakaidewjmz(),    //发现打开的文件all
      ea,
      f,
      g,  //同一个false的次数
      h,  //行对应的编号
      i = 0,  //删掉了几行
      k = '',
      l = 0,  //实际false计数
      m = '',
      n,  //临时行数
      p,  //很重要的一个东西
      b;

    if (dome$1.xzeyaoxiugaidewj(e)) {    //选择活动文档
      ea = UltraEdit.activeDocument.path;
      a = dome$1.fanhuichaxdwenbenzuobiaoshuzu('False');
      d = a.number;
      f = dome$1.jcydshdqwjian();  //文件有几行

      //挑false
      // UltraEdit.outputWindow.write('610日志:\n' + dome$1.jq150hc(JSON.stringify(a)) + '\n\n有:' + d + '句要改哦，确认\n');
      UltraEdit.activeDocument.gotoLine(f, 1);  //转到最后活动行
      UltraEdit.activeDocument.write('\n\n\n');
      UltraEdit.outputWindow.write('请注意:会卡住，请不要点击鼠标，不要复制东西，等待修改完毕..........');
      for (var c = 1; c <= a.number; c++) {
        //选中false前面的编号,传到下一行
        f = dome$1.jcydshdqwjian();
        UltraEdit.activeDocument.gotoLine(a.data[c].lineNum - i, 9);  //光标移动到某位置
        UltraEdit.activeDocument.gotoLineSelect(a.data[c].lineNum - i, 20);  //光标到这里选住
        UltraEdit.activeDocument.findReplace.selectText = true;  //选择文本
        h = UltraEdit.activeDocument.selection;  //选住文本到变量
        UltraEdit.activeDocument.findReplace.selectText = false;  //选择文本
        g = dome$1.cxyjgbianliang(dome$1.bqbhwsqhzhui(h, h)[0]);
        k += '658日志:有' + h + '这个，有:' + g + '句，确认\n';
        if (g == 1) {  //如果只有一个false，粘到最后
          // UltraEdit.activeDocument.cancelSelect();  //清楚选中相
          UltraEdit.activeDocument.gotoLine(a.data[c].lineNum - i, 1);  //转到活动行
          UltraEdit.activeDocument.selectLine();  //选择活动行
          UltraEdit.activeDocument.copy();
          UltraEdit.activeDocument.deleteText();
          UltraEdit.activeDocument.gotoLine(f, 1);  //转到最后活动行
          UltraEdit.activeDocument.write(UltraEdit.clipboardContent);
          l++;
        } else {  //如果还有其他，删除本行
          // UltraEdit.activeDocument.cancelSelect();  //清楚选中相
          UltraEdit.activeDocument.gotoLine(a.data[c].lineNum - i, 1);  //转到活动行
          UltraEdit.activeDocument.selectLine();  //选择活动行
          // UltraEdit.activeDocument.deleteLine();  //删除活动行,这个不太行，下面俩个都可以
          UltraEdit.activeDocument.deleteText();
          // UltraEdit.activeDocument.key("DEL");
        }
        i++;
      }
      UltraEdit.outputWindow.write(k);

      //删除头
      n = dome$1.fanhuichaxdwenbenzuobiaoshuzu('Program').data[1].lineNum;
      var o = 1;
      if (n != 1) {
        for (o; o < n; o++) {
          // UltraEdit.outputWindow.write('557:' + o + '有:' + n + '句哦，确认\n');
          UltraEdit.activeDocument.top();
          UltraEdit.activeDocument.selectLine();  //选择活动行
          UltraEdit.activeDocument.deleteText();  //删除
        }
      }
      UltraEdit.activeDocument.gotoLine(n - o - 1, 1);  //光标移动到某位置
      UltraEdit.activeDocument.selectLine();  //选择活动行
      UltraEdit.activeDocument.copy();
      n = dome$1.fanhuichaxdwenbenzuobiaoshuzu('SITE_NUM').data[1].lineNum;
      UltraEdit.activeDocument.gotoLine(1, 1);  //光标移动到某位置
      UltraEdit.activeDocument.gotoLineSelect(n - 1, 1);  //光标到这里选住
      UltraEdit.activeDocument.deleteText();  //删除到开头
      UltraEdit.activeDocument.write(UltraEdit.clipboardContent);

      //复制表头
      UltraEdit.activeDocument.top();
      n = dome$1.fanhuichaxdwenbenzuobiaoshuzu('LimitU').data[1].lineNum;
      UltraEdit.activeDocument.gotoLine(1, 1);  //光标移动到某位置
      UltraEdit.activeDocument.gotoLineSelect(n + 1, 1);  //光标到这里选住
      UltraEdit.activeDocument.copy();
      UltraEdit.activeDocument.gotoLine(f, 1);  //转到最后活动行
      UltraEdit.activeDocument.write(UltraEdit.clipboardContent);
      UltraEdit.activeDocument.top();

      //转移false
      p = dome$1.jcydshdqwjian() - l - 7;
      UltraEdit.activeDocument.gotoLine(p, 1);  //转到活动行,后面是之前的思路不好，现总行减诺下来的，减诺下来的头。。。。。。。。最开始的总行，减去移走（删掉的false）的，加上追加到最后的，减去头删掉的22，加上true和false中间的3行，加上最后站过来的8行，总归是固定的常数先用5。。。。。。
      UltraEdit.activeDocument.selectToBottom();  //从活动行选择到末尾
      UltraEdit.activeDocument.copy();  //复制
      UltraEdit.activeDocument.deleteText();  //删除
      UltraEdit.newFile();
      UltraEdit.activeDocument.write("false数据:\n\n");
      UltraEdit.activeDocument.write(UltraEdit.clipboardContent + "\n");

      //把头换上
      UltraEdit.activeDocument.gotoLine(dome$1.jcydshdqwjian() - 6, 1);
      UltraEdit.activeDocument.selectToBottom();  //从活动行选择到末尾
      UltraEdit.activeDocument.copy();  //复制
      UltraEdit.activeDocument.deleteText();  //删除
      UltraEdit.activeDocument.gotoLine(2, 1);
      UltraEdit.activeDocument.write(UltraEdit.clipboardContent);
      UltraEdit.saveAs(dome$1.tmltjqtwjfhqtwjml(ea, "false数据"));
    } else {
      UltraEdit.outputWindow.write('没选择活动文档......\n' + '');
    }
    UltraEdit.outputWindow.write('恭喜修改完毕，所有信息都会打印在上方，请在确认无误后自行保存');
    return;
  },
  swtlshi: function () {    //应用之三温随机提数据
    /*
    确认需要提数据的文件（如果不是退出程序重新打开需要提数据的文件）
    输入提数据模式，随机挑或者分随机几组每组顺序挑十个
    挑几个
    选择目标文件路径
    提数据是三温分别提到三个文件
    最新
    不管几个温度，打开的都提，不管目标地址自己挪
    获取文中编号
    随机如果存在
    */
    UltraEdit.activeDocument.top();
    var a = dome$1.fanhuidakaidewjmz(),    //发现打开的文件all
      b,  //打开文件数量
      d,  //选择多少只
      e,  //模式
      f,
      h,  //数据所有的编号
      aa = [],  //找出的合格的随机编号，下次用
      aabh = 0,
      ae = [],  //记录ac本身
      aebh = 0,
      ba,  //最大行
      bb,  //返回查询字符坐标
      bc,  //手动引入编号
      bn,  //表头位置
      c;
    b = UltraEdit.document.length;  //执行之前确认，中间不改动
    d = UltraEdit.getValue("请先选择提数据的数量：", 1);
    UltraEdit.outputWindow.write('选择要提数据的数量是：' + d);
    UltraEdit.outputWindow.write('如果自带数据请复制后再进行下一步。\n请选择提数据的模式：');
    e = dome$1.srxxfhxxnron(['随机提取', '每组10只连续 随机抽几组', '每组5只连续 随机抽几组', '剪贴板有样例']);
    bc = UltraEdit.clipboardContent.split('\n');
    if (d > 1 && e) {
      f = dome$1.fanhuichaxdwenbenzuobiaoshuzu('LimitU').data[1].lineNum;
      g = dome$1.jcydshdqwjian();
      UltraEdit.columnModeOn();
      UltraEdit.activeDocument.gotoLine(f + 2, 10);  //光标移动到某位置
      UltraEdit.activeDocument.gotoLineSelect(g - 1, 20);  //光标到这里选住
      UltraEdit.activeDocument.copy();
      h = UltraEdit.clipboardContent.split('\n');
      UltraEdit.columnModeOff();
      for (var ad = 0; ad < h.length; ad++) {  //强制number
        if (Number(h[ad]) != 0) {
          h[ad] = Number(h[ad]);
        }
      }

      if (e == '随机提取') {
        for (var ab = 0; ab < d; ab++) {  //循环找多少次
          var ac = dome$1.scsjjdjdzshu(0, h.length);  //找的是数组的第几个，这个数一定有，一定合格，唯一需要就是重复问题
          if (!dome$1.jcszzywzgysu(ae, ac)) {  //检查之前的避免重复，
            ae[aebh] = ac;
            aebh++;
            aa[aabh] = h[ac];
            aabh++;
          } else {
            ab--;
          }
        }
        UltraEdit.outputWindow.write('随机显示一个，随机数的是:' + dome$1.scsjjdjdzshu(50, 500));
      } else if (e == '每组10只连续 随机抽几组') {
        for (var ba = 0; ba < parseInt(d / 10) + 1; ba++) {  //循环找多少次
          var ac = dome$1.scsjjdjdzshu(0, h.length);
          var af = ac + 10;
          if (!dome$1.jcszzywzgysu(ae, ac) && !dome$1.jcszzywzgysu(ae, af)) {  //检查之前的避免重复，10?9
            for (ac; ac < af; ac++) {
              if (aabh >= d)  //超了，退出
                break;
              aa[aabh] = h[ac];
              aabh++;
              ae[aebh] = ac;
              aebh++;
            }
          } else {
            ab--;
          }
        }
      } else if (e == '每组5只连续 随机抽几组') {
        for (var ba = 0; ba < parseInt(d / 5) + 1; ba++) {  //循环找多少次
          var ac = dome$1.scsjjdjdzshu(0, h.length);
          var af = ac + 10;
          if (!dome$1.jcszzywzgysu(ae, ac) && !dome$1.jcszzywzgysu(ae, af)) {  //检查之前的避免重复，10?9
            for (ac; ac < af; ac++) {
              if (aabh >= d)  //超了，退出
                break;
              aa[aabh] = h[ac];
              aabh++;
              ae[aebh] = ac;
              aebh++;
            }
          } else {
            ab--;
          }
        }
      } else if (e == '剪贴板有样例') {
        for (var ad = 0; ad < bc.length; ad++) {  //强制number
          if (Number(bc[ad]) != 0) {
            aa[aabh] = Number(bc[ad]);
            aabh++;
          }
        }
      }
      UltraEdit.outputWindow.write('抽取到个数:' + aa.length + ':\n抽取到数组的编号:' + ae + ':\n抽取到实际编号:' + aa + ':\n如果是随机，显示随机的数量:' + ab + ':\n');
      for (c = 0; c < b; c++) {  //循环的文件

        UltraEdit.document[c].setActive();
        UltraEdit.document[c].top();
        /*
        提取编号
        随机数，判断随机数是否在编号里，是否为过去提取的，是否符合目标数量，如果有几组是否符合
        */
        UltraEdit.columnModeOff();
        ba = dome$1.jcydshdqwjian();  //返回最大行数
        UltraEdit.activeDocument.gotoLine(ba, 5000);  //转到最后活动行
        UltraEdit.activeDocument.write('\n\n\n');
        ba += 3;

        UltraEdit.activeDocument.top();
        bn = dome$1.fanhuichaxdwenbenzuobiaoshuzu('SITE_NUM').data[1].lineNum;
        UltraEdit.activeDocument.gotoLine(bn, 1);  //光标移动到某位置
        UltraEdit.activeDocument.gotoLineSelect(bn + 4, 1);  //光标到这里选住
        UltraEdit.activeDocument.copy();
        UltraEdit.activeDocument.gotoLine(ba, 1);  //转到最后活动行
        UltraEdit.activeDocument.write(UltraEdit.clipboardContent);
        UltraEdit.activeDocument.write('\n');
        ba += 5;

        for (var ag = 0; ag < aa.length; ag++) {  //循环文件内的每一个编号
          //选中编号,传到下一行
          // ba = dome$1.jcydshdqwjian();  //返回最大行数
          bb = dome$1.fanhuichaxdwenbenzuobiaoshuzu('    ' + aa[ag] + '     ');
          if (bb.number > 1) {
            //退出，并且警告搜索字符不唯一，鉴于此时数据都整理好了，不弄了
          } else if (bb.number == 1) {
            // UltraEdit.activeDocument.cancelSelect();  //清楚选中相
            UltraEdit.activeDocument.gotoLine(bb.data[1].lineNum, 1);  //转到活动行
            UltraEdit.activeDocument.selectLine();  //选择活动行
            UltraEdit.activeDocument.copy();
            UltraEdit.activeDocument.gotoLine(ba, 1);  //转到最后活动行
            UltraEdit.activeDocument.write(UltraEdit.clipboardContent);
            ba += 1;
          }
        }

        // UltraEdit.activeDocument.top();
        bc = dome$1.jcydshdqwjian() - aa.length - 5;
        UltraEdit.activeDocument.gotoLine(bc, 1);  //转到活动行,后面是之前的思路不好，现总行减诺下来的，减诺下来的头。。。。。。。。最开始的总行，减去移走（删掉的false）的，加上追加到最后的，减去头删掉的22，加上true和false中间的3行，加上最后站过来的8行，总归是固定的常数先用5。。。。。。
        UltraEdit.activeDocument.selectToBottom();  //从活动行选择到末尾
        UltraEdit.activeDocument.copy();  //复制
        UltraEdit.activeDocument.deleteText();  //删除

        UltraEdit.newFile();
        UltraEdit.activeDocument.write("\n");
        UltraEdit.activeDocument.write(UltraEdit.clipboardContent + "\n");
        // UltraEdit.saveAs(dome$1.srdzfhdzyzfddzhi(a[c]) + "提取的" + d + '个数据.txt');
        UltraEdit.saveAs(dome$1.tmltjqtwjfhqtwjml(a[c], "提取的" + d + '个数据'));


      }
    }

    UltraEdit.outputWindow.write('恭喜修改完毕，所有信息都会打印在上方，请在确认无误后自行保存');
    return a;
  },
  ncsjdhao: function () {    //应用之n次数据对号
    /*
    确认是所有数据，
    根据名字内包含AZLHC来判断对应文件和对应活动文档编号，
    默认给出A-Z,Z-L,L-H,H-C四组差距，用户自行确认
    */
    UltraEdit.activeDocument.top();
    var a = dome$1.fanhuidakaidewjmz(),
      b = UltraEdit.document.length,  //执行之前确认，中间不改动,
      f,
      g,
      h = [[], [], [], [], [], []],
      hdbh = 0,
      l = [[], [], [], [], []],
      ldbh = [0, 0, 0, 0, 0, 0],
      i = 0,  //编号最大量
      c;

    for (c = 0; c < b; c++) {  //循环的文件，提编号环
      hdbh = 0;
      UltraEdit.document[c].setActive();
      UltraEdit.document[c].top();
      f = dome$1.fanhuichaxdwenbenzuobiaoshuzu('LimitU').data[1].lineNum;
      g = dome$1.jcydshdqwjian();
      UltraEdit.columnModeOn();
      UltraEdit.activeDocument.gotoLine(f, 10);  //光标移动到某位置
      UltraEdit.activeDocument.gotoLineSelect(g - 1, 20);  //光标到这里选住
      UltraEdit.activeDocument.copy();
      h[5] = UltraEdit.clipboardContent.split('\n');
      UltraEdit.columnModeOff();
      for (var ad = 0; ad < h[5].length; ad++) {  //强制number
        if (Number(h[5][ad]) != 0) {
          h[c][hdbh] = Number(h[5][ad]);
          hdbh++;
        }
      }
      /*
      */
      h[c] = dome$1.shuzupaixu(h[c]);  //排序
      if (h[c].length > i) {
        i = h[c].length;
      }
    }
    UltraEdit.outputWindow.write(' 第一页编号量:' + h[0].length + '  第二页编号量:' + h[1].length + '  第三页编号量:' + h[2].length + '  第四页编号量:' + h[3].length + '  第五页编号量:' + h[4].length);
    // UltraEdit.outputWindow.write('第一页编号:' + h[0] + '\n第二页编号:' + h[1] + '第三页编号:' + h[2] + '第四页编号:' + h[3] + '第五页编号:' + h[4]);

    for (var aa = 0; aa < 2; aa++) {
      for (var k = 0; k < (b - 1); k++) {  //插入环
        for (var j = 0; j < i; j++) {
          //
          if ((h[k][j] - h[k + 1][j]) < 0) {
            h[k + 1].splice(j, 0, 0);  //第二个位置插入元素
            i++;
            // UltraEdit.outputWindow.write('943第一页编号:' + h[k][j] + '\n943第二页编号:' + h[k + 1][j]);
          } else if ((h[k][j] - h[k + 1][j]) > 0) {
            h[k].splice(j, 0, 0);  //第二个位置插入元素
            i++;
            // UltraEdit.outputWindow.write('943第一页编号:' + h[k][j] + '\n943第二页编号:' + h[k + 1][j]);
          }
        }
      }
    }
    UltraEdit.outputWindow.write('第一页编号:' + h[0] + '\n第二页编号:' + h[1] + '\n第三页编号:' + h[2] + '\n第四页编号:' + h[3] + '\n第五页编号:' + h[4]);

    for (var k = 0; k < (b - 1); k++) {  //记录环
      for (var j = 0; j < i + 50; j++) {
        //
        if ((h[k][j] - h[k + 1][j]) < 0) {
          // 不找太麻烦
          // if (dome$1.jcszzyjgzgysu(h[k], h[k + 1][j]) == 0) {
          //   l[k][ldbh[k]] = '?改->' + h[k + 1][j];
          //   ldbh[k]++;
          // } else if (dome$1.jcszzyjgzgysu(h[k + 1], h[k + 1][j]) >= 2) {
          //   l[k + 1][ldbh[k]] = h[k + 1][j] + '->改?';
          //   ldbh[k]++;
          // }
          l[k][ldbh[k]] = '缺:' + h[k + 1][j];
          // ldbh[k]++;
          l[k + 1][ldbh[k]] = h[k + 1][j] + ':多';
          ldbh[k]++;
        } else if ((h[k][j] - h[k + 1][j]) > 0) {
          // 同上
          // if (dome$1.jcszzyjgzgysu(h[k + 1], h[k][j]) == 0) {
          //   l[k + 1][ldbh[k]] = '?改->' + h[k][j];
          //   ldbh[k]++;
          // } else if (dome$1.jcszzyjgzgysu(h[k], h[k][j]) >= 2) {
          //   l[k][ldbh[k]] = h[k][j] + '->改?';
          //   ldbh[k]++;
          // }
          l[k + 1][ldbh[k]] = '缺:' + h[k][j];
          // ldbh[k]++;
          l[k][ldbh[k]] = h[k][j] + ':多';
          ldbh[k]++;
        }
        if (ldbh[k] > ldbh[5]) {
          ldbh[5] = ldbh[k];
        }
      }
    }

    UltraEdit.outputWindow.write('\n有问题的地方，仅供参考:');
    for (var k = 0; k < ldbh[5]; k++) {  //显示环
      UltraEdit.outputWindow.write('        ' + (l[0][k] ? l[0][k] : '         ') + '            ' + (l[1][k] ? l[1][k] : '         ') + '            ' + (l[2][k] ? l[2][k] : '         ') + '            ' + (l[3][k] ? l[3][k] : '         ') + '            ' + (l[4][k] ? l[4][k] : '         ') + '        ');
    }
    UltraEdit.outputWindow.write('仅供参考\n');
    // h[0].splice(2, 0, "three");  //第二个位置插入元素

    UltraEdit.outputWindow.write('恭喜修改完毕，所有信息都会打印在上方，请在确认无误后自行保存');
    return a;
  },
  gggnsysmjs: function () {    //各个功能使用说明介绍
    UltraEdit.outputWindow.clear();
    var a = '';
    a += '\n\n';
    a += '                            ####  数据处理小公举说明书  ####';
    a += '\n\n';
    a += '1.使用前请关闭UE软件的‘设置’-‘脚本’-‘显示取消对话框’功能（取消选择）。\n';
    a += '2.使用时各个功能由于UE软件本身问题，均会卡顿，请一定要耐心等待脚本执行结束，期间可以先做其他事情。\n';
    a += '3.使用本脚本，请不要错过输出窗口的输出内容。\n';
    a += '4.输出窗口的内容可以另外单独保存留做脚本的使用记录。\n';
    a += '5.本脚本立志为处理提供方便，主要给开发者使用，其他人员请在熟读注意事项后使用，由操作不当引起的意外，使用者负责。\n';
    a += '6.本脚本不会对数据有破坏性的改动，不对结果负责，结果好坏由使用者自己负责。\n';
    a += '\n\n';
    a += '                                 ## 功能:之程式改号 ##';
    a += '\n\n';
    a += '1.注意xxx\n';
    a += '2.注意xxx\n';
    a += '3.注意xxx\n';
    a += '\n\n';
    a += '                                  ## 功能:之提数据 ##';
    a += '\n\n';
    a += '1.注意xxx\n';
    a += '2.注意xxx\n';
    a += '3.注意xxx\n';
    a += '\n\n';
    a += '                                ## 功能:关于二次开发 ##';
    a += '\n\n';
    a += '1.本脚本默认为STS8205数据格式，开发其他格式的功能，在新功能后添加其他数据格式的标志。\n';
    a += '2.注意xxx\n';
    a += '3.注意xxx\n';
    a += '\n\n';
    a += '                              @ziyunchu.com||by：baivbai\n';
    a += '                请认真阅读上面，本脚本不对结果负责，最终解释权归本脚本所有。';
    a += '\n\n';
    UltraEdit.outputWindow.write(a);
    UltraEdit.newFile();
    UltraEdit.activeDocument.write(a);
    return a;
  },
  append: function (a, b) {    //应用之替换数据，用一个（先不做，保留，感觉没用）
    return a;
  },
  append: function (a, b) {    //应用之根据编号列出数据有无，
    return a;
  },
  sjwjgshua: function () {    //数据文件格式化，每个文件第一行添加路径信息（路径里有批次）
    var c = UltraEdit.document.length,  //执行之前确认，中间不改动,
      a,
      n,
      b;
    UltraEdit.columnModeOff();
    for (a = 0; a < c; a++) {
      UltraEdit.document[a].top();
      //删除头
      n = dome$1.fanhuichaxdwenbenzuobiaoshuzu('Program').data[1].lineNum;
      var o = 1;
      if (n != 1) {
        for (o; o < n; o++) {
          // UltraEdit.outputWindow.write('557:' + o + '有:' + n + '句哦，确认\n');
          UltraEdit.activeDocument.top();
          UltraEdit.activeDocument.selectLine();  //选择活动行
          UltraEdit.activeDocument.deleteText();  //删除
        }
      }
      UltraEdit.activeDocument.gotoLine(n - o, 1);  //光标移动到某位置
      UltraEdit.activeDocument.selectLine();  //选择活动行
      UltraEdit.activeDocument.copy();
      n = dome$1.fanhuichaxdwenbenzuobiaoshuzu('SITE_NUM').data[1].lineNum;
      UltraEdit.activeDocument.gotoLine(1, 1);  //光标移动到某位置
      UltraEdit.activeDocument.gotoLineSelect(n - 1, 1);  //光标到这里选住
      UltraEdit.activeDocument.deleteText();  //删除到开头
      UltraEdit.activeDocument.write(UltraEdit.clipboardContent);
      UltraEdit.activeDocument.top();
      UltraEdit.activeDocument.write(UltraEdit.activeDocument.path + '\n\n');
      UltraEdit.outputWindow.write('第' + a + '个文件，清理头部成功，补文件路径成功\n' + UltraEdit.activeDocument.path);
    }
    UltraEdit.outputWindow.write('添加路径，删除头成功\n');
    return;
  },
  remove: function (selector) {
    const targetDOM = document.querySelector(selector);
    targetDOM && targetDOM.remove();
  }
};





(function () {    //自动执行方法
  var e = '',    //打算存放数据文件父目录
    // j = [],    //程式
    i,    //菜单
    f = '';    //打算存放程式文件父目录
  var i = [    //菜单，现弄五个,只能在这里
    '单文件程式改号',  //11
    '三温随机提数据',  //12
    '摘出坏数据',  //13
    'n次数据对号',  //14
    '使用说明',  //15
    '数据文件格式化'  //16
  ];
  UltraEdit.messageBox("执行程序之前，请确保熟读项目文档。\n\n本程序只做辅助修改，不对结果负责。", "数据处理小公举");    //请打开输出窗口，确保可以看到输出窗口
  // var u = UltraEdit.getValue("Approximately how many lines to add to the file?",1);    //显示完弹框后，输出窗口打印英文'执行失败'，说明不正常执行，设置中搜索'脚本'，取消勾选'显示取消对话框'
  UltraEdit.outputWindow.write("欢迎使用：数据处理小公举！");
  UltraEdit.outputWindow.showOutput = true;    //输出数据可见性
  UltraEdit.outputWindow.showStatus = true;    //输出状态信息可见性
  UltraEdit.outputWindow.showWindow(true);    //输出窗口的可见性

  switch (dome$2.xzecaidan(i)) {
    case 11:
      UltraEdit.outputWindow.write('选择功能:' + i[0] + '\n');
      dome$2.yyzzdcsghao();
      break
    case 12:
      UltraEdit.outputWindow.write('选择功能:' + i[1] + '\n');
      UltraEdit.outputWindow.write('保证只打开了需要提数据的文件，即将开始...\n');
      dome$2.swtlshi();
      break
    case 13:
      UltraEdit.outputWindow.write('选择功能:' + i[2] + '\n');
      dome$2.yyzzchsju();
      break
    case 14:
      UltraEdit.outputWindow.write('选择功能:' + i[3] + '\n');
      dome$2.ncsjdhao();
      break
    case 15:
      UltraEdit.outputWindow.write('选择功能:' + i[4] + '\n');
      dome$2.gggnsysmjs();
      break
    case 161:
      UltraEdit.outputWindow.write('选择功能: 临时测试\n');
      var a = [123, 156, 15, 65, 857, 564, 1];
      // UltraEdit.outputWindow.write(dome$1.srxxfhxxnron(['选项1', '选项2', '选项3']));    //临时测试
      UltraEdit.outputWindow.write('随机数的是:' + dome$1.scsjjdjdzshu(50, 500));
      UltraEdit.outputWindow.write('可以:' + dome$1.jcszzywzgysu(a, 157));
      dome$1.bcscckdpzwjian();
      // a.splice(2, 0, "three");
      // UltraEdit.outputWindow.write('可以:' + dome$1.shuzupaixu(a));
      break
    case 16:
      UltraEdit.outputWindow.write('选择功能:' + i[5] + '\n');
      dome$2.sjwjgshua();
      break
    case 18:
      UltraEdit.outputWindow.write('选择功能未开发:err\n');
      break
    case 19:
      UltraEdit.outputWindow.write('选择功能未开发:err\n');
      break
    default:
      UltraEdit.outputWindow.write('听话，按照菜单来，不要乱选。\n');
  }

})();
// })();










