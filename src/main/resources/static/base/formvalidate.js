/**
* formvalidate 表单验证
*  属性说明：
* tag         ——控件标签：影响提示内容
* name        ——控件Id，命名：自定义 或 数据库字段名
* expression  ——内容格式控制
*                 string：字符串验证，后面有冒号，后面的值以“,”隔开，表示字符串的长度范围
*                 email：电子邮件验证，后面有冒号，后面的值以“,”隔开，表示字符串的长度范围
*                 int：整型数值验证
*                 float：支持小数的数值格式验证，后面有冒号，后面的值代表小数点后可保留几位小数，但本身允许整数通过验证
*                 date：短日期格式验证
*                 datetime：带日期的时间格式验证
*                 num：数量验证，主要用于复选框，验证选中值的个数
*                 select：下拉框验证
*                 
*                 ajax：ajax后台验证，后面有冒号，后面的值表示验证路径——未测试
*                 password：密码格式验证
*                 mobile：手机格式验证
*                 phone：固定电话格式验证
*                 contact：手机格式，固定电话格式同时支持的验证
*                 idcard：身份证格式验证
*                 qq：qq号格式验证，后面有冒号，后面的值以“,”隔开，表示qq号的长度范围
*                 url：网址格式验证，后面有冒号，后面的值以“,”隔开，表示网址的长度范围
*                 ip：ip地址格式验证
*                 chinese：中文格式验证，后面有冒号，后面的值以“,”隔开，表示字符串的长度范围，其中每个中文占2个字符
*                 english：英文格式验证，后面有冒号，后面的值以“,”隔开，表示字符串的长度范围，其中每个英文占1个字符
*                 postcode：邮政编码格式验证
*   
* empty       ——内容允许空设置，false-必须输入内容，true-可以不输入内容，一旦输入，必须符合格式、取值验证
* comparetype ——值比较类型，默认值value（即为空时）-表示进行值得验证，control-表示与同表单内的其他控件值比较
* compare     ——取值范围，“,”隔开取值的上下限值，可以写值得大小，也可以写同表单内的控件ID，但此时comparetype需为control
*/

const validateItem = (rule, value, callback) => {

    name = rule.field;

    for (var i = 0; i < formItemsCheck.length; i++) {
        if (formItemsCheck[i].Name === rule.field) {

            let item = formItemsCheck[i];

            // 获取验证项
            let tag = item.Tag; // 控件标签
            let isEmpty = item.Empty; // 允许空

            let result = "";

            if (item.Expression === "select") {

                // 允许空验证
                if (isEmpty === "1" && (value === null || value === "")) {
                    //正确
                    result = "1";
                }
                else if (isEmpty === "0" && (value === null || value === "")) {
                    //返回正确
                    result = "请选择" + tag;
                }
                else {
                    //result = valueCheck(tag, value + "", expression, compare, comparetype);
                    result = valueCheck(item, value + "");
                }

                if (result === "1")
                    callback();
                else {
                    callback(new Error(result));
                }
            }
            // 复选框验证初始化
            else if (item.Expression === "num") {

                // 允许空验证
                if (isEmpty === "1" && (value === null || value === "")) {
                    //返回正确
                    result = "1";
                }
                else if (isEmpty === "0" && (value === null || value === "")) {
                    //返回正确
                    result = "请选择" + tag;
                }
                else {
                    //result = valueCheck(tag, value, expression, compare, comparetype);
                    result = valueCheck(item, value + "");
                }

                if (result === "1")
                    callback();
                else {
                    callback(new Error(result));
                }
            }
            // 日期选择器初始化
            else if (item.Expression === "datetime" || item.Expression === "date") {

                // 允许空验证
                if (isEmpty === "1" && (value === null || value === "")) {
                    //返回正确
                    result = "1";
                }
                else if (isEmpty === "0" && (value === null || value === "")) {
                    //返回正确
                    result = "请选择" + tag;
                }
                else {
                    //result = valueCheck(tag, value, expression, compare, comparetype);
                    result = valueCheck(item, value + "");
                }

                if (result === "1")
                    callback();
                else {
                    callback(new Error(result));
                }
            }
            //文本控件初始化
            else {

                // 允许空验证
                if (isEmpty === "1" && (value === null || value === "")) {
                    //返回正确
                    result = "1";
                }
                else if (isEmpty === "0" && (value === null || value === "")) {
                    //返回正确
                    result = "请输入" + tag;
                }
                else {
                    result = valueCheck(item, value + "");
                }

                if (result === "1")
                    callback();
                else {
                    callback(new Error(result));
                }
            }

            break;
        }
    }
};

var formItemsCheck = [
    { Name: "user_name", Tag: "用户名", Empty: "1", Expression: "string", ExpStart: "1", ExpEnd: "20", Comparetype: "value", CompareStart: "", CompareEnd: "" },
    { Name: "user_fullname", Tag: "姓名", Empty: "1", Expression: "string", ExpStart: "1", ExpEnd: "20", Comparetype: "value", CompareStart: "", CompareEnd: "" },
    { Name: "user_age", Tag: "年龄", Empty: "1", Expression: "string", ExpStart: "1", ExpEnd: "20", Comparetype: "value", CompareStart: "", CompareEnd: "" },
    { Name: "user_address", Tag: "住址", Empty: "1", Expression: "string", ExpStart: "1", ExpEnd: "20", Comparetype: "value", CompareStart: "", CompareEnd: "" },
    { Name: "user_birthday", Tag: "出生日期", Empty: "1", Expression: "string", ExpStart: "1", ExpEnd: "20", Comparetype: "value", CompareStart: "", CompareEnd: "" }
];

function initFormRule() {

    let rules = {};

    for (let i = 0; i < formItemsCheck.length; i++) {

        if (formItemsCheck[i].Expression === "date"
            || formItemsCheck[i].Expression === "datetime"
            || formItemsCheck[i].Expression === "select"
            || formItemsCheck[i].Expression === "num") {
            rules[formItemsCheck[i].Name] = [
                { validator: validateItem, required: formItemsCheck[i].Empty !== "1", trigger: 'change' }
            ];
        }
        if (formItemsCheck[i].Expression !== "") {
            rules[formItemsCheck[i].Name] = [
                { validator: validateItem, required: formItemsCheck[i].Empty !== "1", trigger: 'blur' }
            ];
        }
    }

    return rules;
}

function valueCheck(item, value) {

    if (item.Comparetype === "control") {

        let min = null;
        let max = null;
        let itemStart = null;
        let itemEnd = null;

        if (item.CompareStart !== "") {
            min = vObject.formItem[item.CompareStart];
            for (let i = 0; i < formItemsCheck.length; i++) {
                if (formItemsCheck[i].Name === item.CompareStart) {
                    itemStart = formItemsCheck[i];
                    break;
                }
            }
        }
        if (item.CompareEnd !== "") {
            max = vObject.formItem[item.CompareEnd];
            for (let i = 0; i < formItemsCheck.length; i++) {
                if (formItemsCheck[i].Name === item.CompareEnd) {
                    itemEnd = formItemsCheck[i];
                    break;
                }
            }
        }

        return controlCompareCheck(item, itemStart, itemEnd, value, min, max);
    }
    else {
        return valueCompareCheck(item, value);
    }
}

function controlCompareCheck(item, itemStart, itemEnd, value, min, max) {
    if (item.Expression.indexOf("int") === 0) {
        return intCompareCheck(item, itemStart, itemEnd, value, min, max);
    }
    else if (item.Expression.indexOf("float") === 0) {
        return floatCompareCheck(item, itemStart, itemEnd, value, min, max);
    }
    else if (item.Expression.indexOf("datetime") === 0) {
        return dateTimeCompareCheck(item, itemStart, itemEnd, value, min, max);
    }
    else if (item.Expression.indexOf("date") === 0) {
        return dateCompareCheck(item, itemStart, itemEnd, value, min, max);
    }
    else {
        return stringCompareCheck(item, itemStart, itemEnd, value, min, max);
    }
}

function valueCompareCheck(item, value) {

    if (item.Expression.indexOf("int") === 0) {
        return intCheck(item, value, item.CompareStart === "" ? null : item.CompareStart, item.CompareEnd === "" ? null : item.CompareEnd);
    }
    else if (item.Expression.indexOf("float") === 0) {
        return floatCheck(item, value, item.CompareStart === "" ? null : item.CompareStart, item.CompareEnd === "" ? null : item.CompareEnd);
    }
    else if (item.Expression.indexOf("datetime") === 0) {
        return dateTimeCheck(item, value, item.CompareStart === "" ? null : item.CompareStart, item.CompareEnd === "" ? null : item.CompareEnd);
    }
    else if (item.Expression.indexOf("date") === 0) {
        return dateCheck(item, value, item.CompareStart === "" ? null : item.CompareStart, item.CompareEnd === "" ? null : item.CompareEnd);
    }
    else if (item.Expression.indexOf("num") === 0) {
        return selectNumCheck(item, value, item.CompareStart === "" ? null : item.CompareStart, item.CompareEnd === "" ? null : item.CompareEnd);
    }
    else if (item.Expression.indexOf("ajax") === 0) {
        return ajaxCheck(item, value);
    }
    else if (item.Expression.indexOf("select") === 0) {
        return selectCheck(item, value);
    }
    else if (item.Expression.indexOf("email") === 0) {
        return emailCheck(item, value);
    }
    else if (item.Expression.indexOf("password") === 0) {
        return passwordCheck(item, value);
    }
    else if (item.Expression.indexOf("phone") === 0) {
        return phoneCheck(item, value);
    }
    else if (item.Expression.indexOf("mobile") === 0) {
        return mobileCheck(item, value);
    }
    else if (item.Expression.indexOf("contact") === 0) {
        return contactCheck(item, value);
    }
    else if (item.Expression.indexOf("postcode") === 0) {
        return postCodeCheck(item, value);
    }
    else if (item.Expression.indexOf("idcard") === 0) {
        return idcardCheck(item, value);
    }
    else if (item.Expression.indexOf("qq") === 0) {
        return qqCheck(item, value);
    }
    else if (item.Expression.indexOf("url") === 0) {
        return urlCheck(item, value);
    }
    else if (item.Expression.indexOf("ip") === 0) {
        return ipCheck(item, value);
    }
    else if (item.Expression.indexOf("chinese") === 0) {
        return chineseCheck(item, value);
    }
    else if (item.Expression.indexOf("english") === 0) {
        return englishCheck(item, value);
    }
    else {
        return stringCheck(item, value);
    }
}

/// <summary> 时间验证 </summary>
/// <param name="date">待验证的字符串</param>
/// <param name="min">取值范围上限</param>
/// <param name="max">取值范围下限</param>
function dateTimeCompareCheck(item, itemStart, itemEnd, value, min, max) {

    try {

        let data = formatDate(value, "yyyy-MM-dd hh:mm:ss");
        let result = data.match(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (result === null) {
            return "选择的" + item.Tag + "格式不正确，例:1900-12-31 22:32:21";
        }

        let dt = new Date(result[1], result[3] - 1, result[5], result[6], result[7], result[8]);
        dt = data;
        //if (dt.getFullYear() !== result[1] || dt.getMonth() !== result[3] - 1 || dt.getDate() !== result[5] || dt.getHours() !== result[6] || dt.getMinutes() !== result[7] || dt.getSeconds() !== result[8]) {
        //    return "选择的" + item.Tag + "格式不正确，例:1900-12-31 22:32:21";
        //}

        let dateTimeStart = min;//new Date(min.replace(/-/g, "/"));
        let dateTimeEnd = max;//new Date(max.replace(/-/g, "/"));

        if (min !== null && max !== null) {
            return dateTimeStart <= dt && dt <= dateTimeEnd ? "1" : "选择的" + item.Tag + "必须介于" + itemStart.Tag + "和" + itemEnd.Tag + "之间";
        }
        else if (min === null && max !== null) {
            return dt <= dateTimeEnd ? "1" : "选择的" + item.Tag + "必须小等于" + itemEnd.Tag + "的值";
        }
        else if (min !== null && max === null) {
            return dt >= dateTimeStart ? "1" : "选择的" + item.Tag + "必须大等于" + itemStart.Tag + "的值";
        }
        else {
            return "1";
        }
    } catch (e) {
        return "选择的" + item.Tag + "格式不正确，例:1900-12-31 22:32:21";
    }
}
function dateTimeCheck(item, dateTime, min, max) {

    try {

        var data = formatDate(dateTime, "yyyy-MM-dd hh:mm:ss");
        var result = data.match(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (result === null) {
            return "选择的" + item.Tag + "格式不正确，例:1900-12-31 22:32:21";
        }

        var dt = new Date(result[1], result[3] - 1, result[5], result[6], result[7], result[8]);

        //if (dt.getFullYear() !== result[1] || dt.getMonth() !== result[3] - 1 || dt.getDate() !== result[5] || dt.getHours() !== result[6] || dt.getMinutes() !== result[7] || dt.getSeconds() !== result[8]) {
        //    return "选择的" + item.Tag + "格式不正确，例:1900-12-31 22:32:21";
        //}

        var dateTimeStart = formatDate(min, "yyyy-MM-dd hh:mm:ss");//new Date(min.replace(/-/g, "/"));
        var dateTimeEnd = formatDate(max, "yyyy-MM-dd hh:mm:ss");//new Date(max.replace(/-/g, "/"));

        if (min !== null && max !== null) {
            return dateTimeStart <= dt && dt <= dateTimeEnd ? "1" : "选择的" + item.Tag + "必须介于" + min + "和" + max + "之间";
        }
        else if (min === null && max !== null) {
            return dt <= dateTimeEnd ? "1" : "选择的" + item.Tag + "必须小等于" + max;
        }
        else if (min !== null && max === null) {
            return dt >= dateTimeStart ? "1" : "选择的" + item.Tag + "必须大等于" + min;
        }
        else {
            return "1";
        }
    } catch (e) {
        return "选择的" + item.Tag + "格式不正确，例:1900-12-31 22:32:21";
    }
}
function dateTimeInfo(item, min, max) {
    if (min !== "" && max !== "") {
        return "请输入" + item.Tag + ",必须介于" + min + "和" + max + "之间";
    }
    else if (min === "" && max !== "") {
        return "请输入" + item.Tag + ",必须小等于" + max;
    }
    else if (min !== "" && max === "") {
        return "请输入" + item.Tag + ",必须大等于" + min;
    } else {
        return "请输入" + item.Tag;
    }
}

/// <summary> 日期验证 </summary>
/// <param name="date">待验证的字符串</param>
/// <param name="min">取值范围上限</param>
/// <param name="max">取值范围下限</param>
function dateCompareCheck(item, itemStart, itemEnd, value, min, max) {

    try {

        let data = formatDate(value, "yyyy-MM-dd");
        let result = data.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (result === null) {
            return "选择的" + item.Tag + "格式不正确，例:1900-12-31";
        }

        //var d = new Date(result[1], result[3] - 1, result[4]);
        //if (d.getFullYear() !== result[1] || (d.getMonth() + 1) !== result[3] || d.getDate() !== result[4]) {
        //    return "选择的" + item.Tag + "格式不正确，例:1900-12-31";
        //}

        let dateStart = formatDate(min, "yyyy-MM-dd");// === null ? null : new Date(min.replace(/-/g, "/"));
        let dateEnd = formatDate(max, "yyyy-MM-dd");// === null ? null : new Date(max.replace(/-/g, "/"));
        let date_ = data; // new Date(data.replace(/-/g, "/"));

        if (min !== null && max !== null) {
            return dateStart <= date_ && date_ <= dateEnd ? "1" : "选择的" + item.Tag + "必须介于" + itemStart.Tag + "和" + itemEnd.Tag + "之间";
        }
        else if (min === null && max !== null) {
            return date_ <= dateEnd ? "1" : "选择的" + item.Tag + "必须小等于" + itemEnd.Tag + "的值";
        }
        else if (min !== null && max === null) {
            return date_ >= dateStart ? "1" : "选择的" + item.Tag + "必须大等于" + itemStart.Tag + "的值";
        }
        else {
            return "1";
        }

    } catch (e) {
        return "选择的" + item.Tag + "格式不正确，例:1900-12-31";
    }
}
function dateCheck(item, date, min, max) {

    try {

        var data = formatDate(date, "yyyy-MM-dd");
        var result = data.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (result === null) {
            return "选择的" + item.Tag + "格式不正确，例:1900-12-31";
        }

        //var d = new Date(result[1], result[3] - 1, result[4]);
        //if (d.getFullYear() !== result[1] || (d.getMonth() + 1) !== result[3] || d.getDate() !== result[4]) {
        //    return "选择的" + item.Tag + "格式不正确，例:1900-12-31";
        //}

        var dateStart = min;//=== null ? null : new Date(min.replace(/-/g, "/"));
        var dateEnd = max;// === null ? null : new Date(max.replace(/-/g, "/"));
        var date_ = new Date(data.replace(/-/g, "/"));

        if (min !== null && max !== null) {
            return dateStart <= date_ && date_ <= dateEnd ? "1" : "选择的" + item.Tag + "必须介于" + min + "和" + max + "之间";
        }
        else if (min === null && max !== null) {
            return date_ <= dateEnd ? "1" : "选择的" + item.Tag + "必须小等于" + max;
        }
        else if (min !== null && max === null) {
            return date_ >= dateStart ? "1" : "选择的" + item.Tag + "必须大等于" + min;
        }
        else {
            return "1";
        }

    } catch (e) {
        return "选择的" + item.Tag + "格式不正确，例:1900-12-31";
    }
}
function dateInfo(item, min, max) {
    if (min !== "" && max !== "") {
        return "请选择" + item.Tag + ",必须介于" + min + "和" + max + "之间";
    }
    else if (min === "" && max !== "") {
        return "请选择" + item.Tag + ",必须小等于" + max;
    }
    else if (min !== "" && max === "") {
        return "请选择" + item.Tag + ",必须大等于" + min;
    } else {
        return "请选择" + item.Tag;
    }
}

var reg_int = /^-?\d+$/;
/// <summary> 整型数字验证 </summary>
/// <param name="value">待验证的字符串</param>
/// <param name="min">取值范围上限</param>
/// <param name="max">取值范围下限</param>
function intCompareCheck(item, itemStart, itemEnd, value, min, max) {

    if (reg_int.test(value)) {
        if (min !== null && max !== null) {
            return parseInt(min) <= parseInt(value) && parseInt(value) <= parseInt(max) ? "1" : "输入的" + item.Tag + "必须介于" + itemStart.Tag + "和" + itemEnd.Tag + "之间";
        }
        else if (min === null && max !== null) {
            return parseInt(value) <= parseInt(max) ? "1" : "输入的" + item.Tag + "必须小等于" + itemEnd.Tag + "的值";
        }
        else if (min !== null && max === null) {
            return parseInt(value) >= parseInt(min) ? "1" : "输入的" + item.Tag + "必须大等于" + itemStart.Tag + "的值";
        }
        else {
            return "1";
        }
    }
    else {
        return "输入的" + item.Tag + "格式有误";
    }
}
function intCheck(item, value, min, max) {

    //if (!isNaN(parseInt(value))) {
    if (reg_int.test(value)) {
        if (min !== null && max !== null) {
            return parseInt(min) <= parseInt(value) && parseInt(value) <= parseInt(max) ? "1" : "输入的" + item.Tag + "必须介于" + min + "和" + max + "之间";
        }
        else if (min === null && max !== null) {
            return parseInt(value) <= parseInt(max) ? "1" : "输入的" + item.Tag + "必须小等于" + max;
        }
        else if (min !== null && max === null) {
            return parseInt(value) >= parseInt(min) ? "1" : "输入的" + item.Tag + "必须大等于" + min;
        }
        else {
            return "1";
        }
    }
    else {
        return "输入的" + item.Tag + "格式有误";
    }
}
function intInfo(item, min, max) {

    if (min !== "" && max !== "") {
        return "请输入" + item.Tag + ",值必须介于" + min + "和" + max + "之间";
    }
    else if (min === "" && max !== "") {
        return "请输入" + item.Tag + ",值必须小等于" + max;
    }
    else if (min !== "" && max === "") {
        return "请输入" + item.Tag + ",值必须大等于" + min;
    }
    else {
        return "请输入" + item.Tag;
    }
}

/// <summary> 浮点数字验证 </summary>
/// <param name="value">待验证的字符串</param>
/// <param name="expression">小数点后面保留几位小数(冒号后需大于0)</param>
/// <param name="min">取值范围上限</param>
/// <param name="max">取值范围下限</param>
function floatCompareCheck(item, itemStart, itemEnd, value, min, max) {

    let index = value.indexOf('.');
    if (!isNaN(parseFloat(value)) && ((index > 0 && value.substring(index + 1).length === parseInt(item.ExpStart)) || index < 0)) {
        if (min !== null && max !== null) {
            return parseFloat(min) <= parseFloat(value) && parseFloat(value) <= parseFloat(max) ? "1" : "输入的" + item.Tag + "必须介于" + itemStart.Tag + "和" + itemEnd.Tag + "之间";
        }
        else if (min === null && max !== null) {
            return parseFloat(value) <= parseFloat(max) ? "1" : "输入的" + item.Tag + "必须小等于" + itemEnd.Tag + "的值";
        }
        else if (min !== null && max === null) {
            return parseFloat(value) >= parseFloat(min) ? "1" : "输入的" + item.Tag + "必须大等于" + itemStart.Tag + "的值";
        }
        else {
            return "1";
        }
    }
    else {
        return "输入的" + item.Tag + "格式有误，有小数的应保留" + item.ExpStart + "位小数";
    }
}
function floatCheck(item, value, min, max) {
    var index = value.indexOf('.');
    if (!isNaN(parseFloat(value)) && ((index > 0 && value.substring(index + 1).length === parseInt(item.ExpStart)) || index < 0)) {
        if (min !== null && max !== null) {
            return parseFloat(min) <= parseFloat(value) && parseFloat(value) <= parseFloat(max) ? "1" : "输入的" + item.Tag + "必须介于" + min + "和" + max + "之间";
        }
        else if (min === null && max !== null) {
            return parseFloat(value) <= parseFloat(max) ? "1" : "输入的" + item.Tag + "必须小等于" + max;
        }
        else if (min !== null && max === null) {
            return parseFloat(value) >= parseFloat(min) ? "1" : "输入的" + item.Tag + "必须大等于" + min;
        }
        else {
            return "1";
        }
    }
    else {
        return "输入的" + item.Tag + "格式有误，有小数的应保留" + item.ExpStart + "位小数";
    }
}
function floatInfo(item, min, max) {
    if (min !== "" && max !== "") {
        return "请输入" + item.Tag + ",值必须介于" + min + "和" + max + "之间,有小数的应保留" + item.ExpStart + "位小数";
    }
    else if (min === "" && max !== "") {
        return "请输入" + item.Tag + ",值必须小等于" + max + ",有小数的应保留" + item.ExpStart + "位小数";
    }
    else if (min !== "" && max === "") {
        return "请输入" + item.Tag + ",值必须大等于" + min + ",有小数的应保留" + item.ExpStart + "位小数";
    }
    else {
        return "请输入" + item.Tag + ",有小数的应保留" + item.ExpStart + "位小数";
    }
}


/// <summary> ajax验证 </summary>
/// <param name="value">待验证的字符串</param>
/// <param name="expression">ajax验证路径</param>
function ajaxCheck(item, value) {
    var result = "";
    $.ajax(
        {
            type: "post",
            url: item.ExpStart + "&value=" + value, //发送到一般处理程序中处理
            async: false,      //ajax同步
            contentType: "application/json; charset=utf-8",
            success: function (msg)//调用成功运行这个函数
            {
                result = msg;
            },
            error: function () //调用出错运行这个函数
            {
                result = "Ajax调用出错";
            }
        });
    return result;
}
function ajaxInfo(item) {
    return "请输入" + item.Tag;
}

/// <summary> 邮箱验证 </summary>
/// <param name="value">待验证的字符串</param>
function emailCheck(item, value) {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var r = value.match(reg);
    if (r !== null) {
        return stringCheck(item, value);
    }
    else {
        return "输入的" + item.Tag + "格式不正确，格式应为：server@163.com";
    }
}
function emailInfo(item) {
    return "请输入" + item.Tag + "，其格式为：server@163.com，长度为" + (item.ExpStart === item.ExpEnd ? item.ExpStart : item.ExpStart + "~" + item.ExpEnd) + "个字符";
}


/// <summary> 纯中文验证 </summary>
/// <param name="value">待验证的字符串</param>
function chineseCheck(item, value) {
    var reg = /^[\u4e00-\u9fa5]+$/;
    var r = value.match(reg);
    if (r !== null) {
        return stringCheck(item, value);
    }
    else {
        return "输入的" + item.Tag + "必须是纯汉字";
    }
}
function chineseInfo(item) {
    return "请输入" + item.Tag + "，必须是纯汉字，长度为" + parseInt(item.ExpStart) / 2 + "~" + parseInt(item.ExpEnd) / 2 + "个汉字";
}

/// <summary> 纯英文验证 </summary>
/// <param name="value">待验证的字符串</param>
function englishCheck(item, value) {
    let reg = new RegExp("^[a-zA-z]{" + item.ExpStart + "," + item.ExpEnd + "}$");
    let r = value.match(reg);
    if (r !== null) {
        return "1";
    }
    else {
        return "输入的" + item.Tag + "格式不正确，应为长度由" + item.ExpStart + "~" + item.ExpEnd + "个字母组成的英文";
    }
}
function englishInfo(item) {
    return "请输入" + item.Tag + "，长度为" + item.ExpStart + "~" + item.ExpEnd + "个字母组成的英文";
}


/// <summary> 密码验证，最长支持50位密码验证 </summary>
/// <param name="value">待验证的字符串</param>
function passwordCheck(item, value) {
    let reg = /^[a-zA-z@]{1}[a-zA-z0-9@_]{0,49}$/;
    let r = value.match(reg);
    if (r !== null) {
        return stringCheck(item, value);
    }
    else {
        return "输入的" + item.Tag + "格式不正确，应由字母、数字、'@'、'_'，并以字母或'@'开始";
    }
}
function passwordInfo(item) {
    return "请输入" + item.Tag + "，长度为" + (item.ExpStart === item.ExpEnd ? item.ExpStart : item.ExpStart + "~" + item.ExpEnd) + "个字符，由字母、数字、'@'、'_'，并以字母或'@'开始";
}

/// <summary> 固定电话验证 </summary>
/// <param name="value">待验证的字符串</param>
function phoneCheck(item, value) {
    let reg = /^(\d{4}-|\d{3}-|\d{0}-)?(\d{8}|\d{7})$/;
    let r = value.match(reg);
    if (r !== null) {
        return "1";
    }
    else {
        return "输入的" + item.Tag + "格式不正确，其格式为：1234-12345678或1234-1234567或123-12345678或123-1234567或12345678或1234567";
    }
}
function phoneInfo(item) {
    return "请输入" + item.Tag + "，其格式为：1234-12345678或1234-1234567或123-12345678或123-1234567或12345678或1234567";
}


/// <summary> 手机号码验证 </summary>
/// <param name="value">待验证的字符串</param>
function mobileCheck(item, value) {
    let reg = /^1\d{10}$/;
    let r = value.match(reg);
    if (r !== null) {
        return "1";
    }
    else {
        return "输入的" + item.Tag + "格式不正确，应由以1开头的11为数字组成";
    }
}
function mobileInfo(item) {
    return "请输入" + item.Tag + "，应由以1开头的11为数字组成";
}

/// <summary> 联系电话验证 </summary>
/// <param name="value">待验证的字符串</param>
function contactCheck(item, value) {
    let reg = /^((\d{4}-|\d{3}-|\d{0}-)?(\d{8}|\d{7}))$|^(1\d{10})$/;
    let r = value.match(reg);
    if (r !== null) {
        return "1";
    }
    else {
        return "输入的" + item.Tag + "格式不正确，格式应为：1234-12345678或1234-1234567或123-12345678或123-1234567或12345678或1234567或以1开头的11为数字号码";
    }
}
function contactInfo(item) {
    return "请输入" + item.Tag + "，其格式为：1234-12345678或1234-1234567或123-12345678或123-1234567或12345678或1234567或以1开头的11为数字号码";
}


/// <summary> 邮政编码验证 </summary>
/// <param name="value">待验证的字符串</param>
function postCodeCheck(item, value) {
    let reg = /^[1-9]\d{5}$/;
    let r = value.match(reg);
    if (r !== null) {
        return "1";
    }
    else {
        return "输入的" + item.Tag + "格式不正确，应由以非0开头的6为数字组成";
    }
}
function postCodeInfo(item) {
    return "请输入" + item.Tag + "，应由以非0开头的6为数字组成";
}

/// <summary> 身份证验证 </summary>
/// <param name="value">待验证的字符串</param>
function idcardCheck(item, value) {
    let reg = /^\d{15}(\d\d[0-9xX])?$/;
    let r = value.match(reg);
    if (r !== null) {
        return "1";
    }
    else {
        return "输入的" + item.Tag + "格式不正确，应由15位数字或18位字符（前17位必须为数字，最后一位可以是数字或X）";
    }
}
function idcardInfo(item) {
    return "请输入" + item.Tag + "，应由15位或18位字符组成";
}


/// <summary> QQ验证 </summary>
/// <param name="value">待验证的字符串</param>
function qqCheck(item, value) {
    let reg = /^[1-9]\d{4,14}$/;
    let r = value.match(reg);
    if (r !== null) {
        return "1";
    }
    else {
        return "输入的" + item.Tag + "格式不正确，应为非0开始的5~15为的纯数字";
    }
}
function qqInfo(item) {
    return "请输入" + item.Tag + "，由非0开始的5~15为的纯数字组成";
}

/// <summary> 网址验证 </summary>
/// <param name="value">待验证的字符串</param>
function urlCheck(item, value) {
    let reg = new RegExp("^[a-zA-z]+://[^\s]*$");
    let r = value.match(reg);
    if (r !== null) {
        return stringCheck(item, value);
    }
    else {
        return "输入的" + item.Tag + "格式不正确，例：http://www.baidu.com";
    }
}
function urlInfo(item) {
    return "请输入" + item.Tag + "，例：http://www.baidu.com，长度为" + (item.ExpStart === item.ExpEnd ? item.ExpStart : item.ExpStart + "~" + item.ExpEnd) + "个字符";
}


/// <summary> IP地址验证 </summary>
/// <param name="value">待验证的字符串</param>
function ipCheck(item, value) {
    let reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
    let r = value.match(reg);
    if (r !== null) {
        return "1";
    }
    else {
        return "输入的" + item.Tag + "格式不正确，例：192.168.0.1";
    }
}
function ipInfo(item) {
    return "请输入" + item.Tag + "，例：192.168.0.1";
}


/// <summary> 字符串验证 </summary>
/// <param name="value">待验证的字符串</param>
/// <param name="expression">长度控制（string:1,20——表示长度为1~20的字符串）</param>
function stringCompareCheck(item, itemStart, itemEnd, value, min, max) {

    if (min !== "" && max !== "") {
        if (itemStart.Name === itemEnd.Name) {
            return value === min ? "1" : item.Tag + "的值与" + itemStart.Tag + "不一致";
        }
        else {
            return min >= value && value <= max ? "1" : item.Tag + "的值必须介于" + min + "和" + max + "之间";
        }
    }
    else if (min === "" && max !== "") {
        return value <= min ? "1" : item.Tag + "的值必须小等于" + itemEnd.Tag + "的值";
    }
    else if (min !== "" && max === "") {
        return value >= max ? "1" : item.Tag + "的值必须大等于" + itemStart.Tag + "的值";
    }
    else {
        return "1";
    }
}
function stringCheck(item, value) {
    // 获得字符串实际长度
    let realLength = _getStringRealLength(value);
    return parseInt(item.ExpStart) <= realLength && realLength <= parseInt(item.ExpEnd) ? "1" : "输入的" + item.Tag + "长度不符合要求，应为" + (item.ExpStart === item.ExpEnd ? item.ExpStart : item.ExpStart + "~" + item.ExpEnd) + "个字符";
}
function stringInfo(item) {
    return "请输入" + item.Tag + "，其长度为" + (item.ExpStart === item.ExpEnd ? item.ExpStart : item.ExpStart + "~" + item.ExpEnd) + "个字符";
}

/// <summary> 下拉框验证 </summary>
/// <param name="value">待验证的字符串</param>
/// <param name="expression">长度控制（string:1,20——表示长度为1~20的字符串）</param>
function selectCheck(item, value) {
    //return parseInt(value) > 0 ? "1" : "请选择" + item.Tag;
    return value.length > 0 ? "1" : "请选择" + item.Tag;
}
function selectInfo(item) {
    return "请选择" + item.Tag;
}

/// <summary> 复选框验证 </summary>
/// <param name="value">待验证的字符串</param>
/// <param name="expression">长度控制（string:1,20——表示长度为1~20的字符串）</param>
/// <param name="min">取值范围上限</param>
/// <param name="max">取值范围下限</param>
function selectNumCheck(item, value, min, max) {
    if (min !== "" && max !== "") {
        return parseInt(min) <= value && value <= parseInt(max) ? "1" : (min === max ? "请选择" + min + "个" + item.Tag : "请选择" + min + "~" + max + "个" + item.Tag);
    }
    else if (min === "" && max !== "") {
        return parseFloat(value) <= parseFloat(max) ? "1" : "请选择不超过" + max + "个" + item.Tag;
    }
    else if (min !== "" && max === "") {
        return parseFloat(value) >= parseFloat(min) ? "1" : "请选择不少于" + max + "个" + item.Tag;
    }
    else {
        return "1";
    }
}
function selectNumInfo(item, min, max) {
    if (min !== "" && max !== "") {
        return min === max ? "请选择" + min + "个" + item.Tag : "请选择" + min + "~" + max + "个" + item.Tag;
    }
    else if (min === "" && max !== "") {
        return "请选择不超过" + max + "个" + item.Tag;
    }
    else if (min !== "" && max === "") {
        return "请选择不少于" + min + "个" + item.Tag;
    }
    else {
        return "请选择" + item.Tag;
    }
}

/// <summary> 获得字符串实际长度 </summary>
/// <param name="value">待计算的字符串</param>
function _getStringRealLength(value) {
    let data = value === null ? "" : value;
    var realLength = 0, len = data.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = data.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}


// 获取验证项
function getValidateItem(name) {

    for (let i = 0; i < formItemsCheck.length; i++) {
        if (formItemsCheck[i].Name === name) {
            return formItemsCheck[i];
        }
    }

    return null;

}

function formatDate(value, fmt) {
    if (value === "" || value === null) return null;

    let getDate = new Date(value);
    let o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

