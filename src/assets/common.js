  /**
 * 获取指定标签对象
 * @param {String} id 标签的id属性值
 * @returns {Element}根据id属性值返回指定标签对象
 */
function my$(id) {
	return document.getElementById(id);
}

/**
 * 元素移动动画（2019-1-14）
 * @param{Element,JSON,Function} 移动obj(dom对象)json里的键值对(属性：值)，fn:判断是否依次移动
 */
function startMove(elem, json,fn) {
	clearInterval(elem.timer);
	elem.timer = setInterval(function() {
		var flag = true;
		for(var attr in json) {
			var _target = json[attr];
			var _cur;
			if(attr == "opacity") {
				_cur = parseInt(getStyle(elem, attr) * 100);
			} else {
				_cur = parseInt(getStyle(elem, attr));
			}
			var speed = (_target - _cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(attr == "opacity") {
				elem.style.opacity = (_cur + speed) / 100;
				elem.style.filter = "alpha(opacity=" + (_cur + speed) + ")";
			} else {
				elem.style[attr] = _cur + speed + "px";
			}

			if(_cur != _target) {
				flag = false;
			}
		}
		if(flag) {
			clearInterval(elem.timer);
			if(fn){
				fn();
			}
		}
	}, 20);
}

/**
 * 获取元素样式属性的值
 * @param {Element,Attr} elem 任意元素;attr 任意属性
 * @return{*} 任意元素任意属性的值
 */
function getStyle(elem, attr) {
	if(window.getComputedStyle) {
		return getComputedStyle(elem, null)[attr];
	}
	return elem.currentStyle[attr];
}

/**
 * 设置元素的文本内容
 * @param {Element} elem 任意元素
 * @param {String} text 任意文本内容
 */
function setInnerText(elem,text) {
    if (typeof(elem.textContent) == "undefined") {
        elem.innerText = text;
    } else {
        elem.textContent = text;
    }
}

/**
 * 获取元素的文本内容
 * @param {Element} elem 任意元素
 * @returns {*} 任意元素中的文本内容
 */
function getInnerText(elem) {
    if (typeof(elem.textContent) == "undefined") {
        return elem.innerText;
    } else {
        return elem.textContent;
    }
}

/**
 * 事件监听
 * @param {Element,Event,Function,Boolean} elem 任意元素;evtName 任意事件;foo 事件监听函数;boo 判断是冒泡(false)还是捕获(ture)
 */
function addEvent(elem,evtName,foo,boo){
	if(elem.addEventListener){
		boo=boo?boo:false;
		elem.addEventListener(evtName,foo,boo);
	}else{
		var onEvt="on"+evtName;
		elem.attachEvent(onEvt,foo);
	}
}
/**
 * 移除事件监听
 * @param {Element,Event,Function} elem 任意元素;evtName 任意事件;foo 事件监听函数;
 */
function removeEvent(elem,evtName,foo){
	if(elem.removeEventListener){
		elem.removeEventListener(evtName,foo)
	}else{
		elem.detachEvent("on"+evtName,foo);
	}
}


/**
 * 阻止事件冒泡
 * @param {Event} e 事件兼容
 * */
function stopBubbles(e){
	var evt=e || window.event;
	if(evt.stopProgagation){
		evt.stopPropagation();
	}else{
		evt.cancelBubble=true;
	}
}


/**
 * 阻止事件的默认行为
 * @param {Event} e 事件兼容
 */
function preventDefault(e){
	var evt=e || window.event;
	if (typeof evt.preventDefault != 'undefined') {//w3c
	 	evt.preventDefault();
	 } else{
	 	evt.returnValue = false;//ie
	 }
}


/**
 * 查询某一个cookie
 * @param {String} name 根据name查询对应的cookie
 * @returns{Array} 返回对应cookie的值
 */
function getCookie(name) {
	var cookies = document.cookie;
	var arr = cookies.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if(newArr[0] == name) {
			return newArr[1];
		}
	}
}
/**
 * 添加一个cookie
 * @param {String,String,Number} name 添加cookie的名为name，值为val，n天后过期
 */
function setCookie(name, val, n) {
	var dt = new Date();
	dt.setDate(dt.getDate() + n);
	document.cookie = name + "=" + "val" + ";expires=" + dt;

}
/**
 * 删除某一个cookie
 * @param{String} name 删除名为name的cookie
 */
function removeCookie(name) {
	setCookie(name, 1, -1);
}



/*********** 日期  ************/
/**
 * 判断某年份是否为闰年
 * @param{String} year
 * @return {Boolean} 返回ture/false
 */
function isLeapYear(year) {
	if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
		return true;
	}
	return false;
}
/**
 * 将日期格式化输出 "2019-01-19 10:15:20"
 * @param{Date,String} date, s:年月日之间的连接符
 * @return {Date} 返回格式化后的日期形式
 */
function format(date, s) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds= date.getSeconds();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	var str = year + s + month + s + day + " " + hours + ":" + minutes + ":" + seconds;
	return str;
}
/**
 * 获得某年某个月份的天数
 * @param{Number} year, month 
 * @return {String} 返回某年某个月份的天数
 */
function getDays(year, month) {
	switch(month) {
		case 2:
			if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
				return 29 + "天";
			}
			return 28 + "天";
		case 4:
		case 6:
		case 9:
		case 11:
			return 30 + "天";
		default:
			return 31 + "天";
	}
}
/**
 * 判断两个日期相差的天数
 * @param{Date} date1, date2 两个日期相差的天数
 * @return {String} 返回两个日期相差的天数
 */
function getDiffDays(date1, date2) {
	//var ss=Math.abs(date1-date2);相差的毫秒
	var ss = Math.abs(date1 - date2) / 1000;
	var day = Math.floor(ss / 3600 / 24);
	var hour = Math.floor(ss / 3600 % 24);
	var minute = Math.floor(ss / 3600 % 60);
	var second = Math.floor(ss % 60);
	return day + "天" + hour + "小时" + minute + "分" + second + "秒";
}
/**
 * 获得N天以后的日期
 * @param{Number} n n天以后的日期
 * @return {String} 返回n天以后的日期
 */
function getNDay(n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	return oDate;
}


/**
 * 获取父级元素中的第一个子元素
 * @param {Element} elem 父级元素
 * @returns {*} 返回父级元素中的第一个子元素
 */
function getFirstElement(elem) {
    if (elem.firstElementChild) {
        return elem.firstElementChild;
    } else {
        var node = elem.firstChild;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 * 获取父级元素中的最后一个子元素
 * @param {Element} elem 父级元素
 * @returns {*} 返回父级元素中的最后一个子元素
 */
function getLastElement(elem) {
    if (elem.lastElementChild) {
        return elem.lastElementChild;
    } else {
        var node = elem.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
/**
 * 获取某个元素的前一个兄弟元素
 * @param {Element} elem 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElement(elem) {
    if (elem.previousElementSibling) {
        return elem.previousElementSibling
    } else {
        var node = elem.previousSibling;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
/**
 * 获取某个元素的后一个兄弟元素
 * @param {Element} elem 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElement(elem) {
    if (elem.nextElementSibling) {
        return elem.nextElementSibling
    } else {
        var node = elem.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 * 获取某个元素的所有兄弟元素
 * @param {Element} elem 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(elem) {
    if (!elem) return;
    var elements = [];
    var ele = elem.previousSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);
        }
        ele = ele.previousSibling;
    }
    ele = elem.nextSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);

        }
        ele = ele.nextSibling;
    }
    return elements;
}


/**
 * 返回当前浏览器是什么类型的浏览器
 */
function userBrowser(){
    var browserName=navigator.userAgent.toLowerCase();
    if(/msie/i.test(browserName) && !/opera/.test(browserName)){
        console.log("IE");
    }else if(/firefox/i.test(browserName)){
        console.log("Firefox");
    }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
        console.log("Chrome");
    }else if(/opera/i.test(browserName)){
        console.log("Opera");
    }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
        console.log("Safari");
    }else{
        console.log("不存在此浏览器!");
    }
}


/**
 * 获取的是页面向上或者向左卷曲出去的距离的值,返回的是对象
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
/* function getScroll() {
     return {
         top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0,
         left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft||0
     };
 }*/