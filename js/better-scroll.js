/*!
 * better-normal-scroll v1.15.2
 * (c) 2016-2019 ustbhuangyi
 * Released under the MIT License.
 */
! function(t, i) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : t.BScroll = i()
}(this, function() {
	"use strict";

	function o(t, i) {
		for(; i + 1 < t.length; i++) t[i] = t[i + 1];
		t.pop()
	}
	var l = function(t, i) {
		if(Array.isArray(t)) return t;
		if(Symbol.iterator in Object(t)) return function(t, i) {
			var e = [],
				s = !0,
				o = !1,
				n = void 0;
			try {
				for(var r, h = t[Symbol.iterator](); !(s = (r = h.next()).done) && (e.push(r.value), !i || e.length !== i); s = !0);
			} catch(t) {
				o = !0, n = t
			} finally {
				try {
					!s && h.return && h.return()
				} finally {
					if(o) throw n
				}
			}
			return e
		}(t, i);
		throw new TypeError("Invalid attempt to destructure non-iterable instance")
	};
	var e = "undefined" != typeof window,
		t = e && navigator.userAgent.toLowerCase(),
		i = t && /wechatdevtools/.test(t),
		s = t && 0 < t.indexOf("android");

	function w() {
		return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date
	}

	function a(t) {
		for(var i = arguments.length, e = Array(1 < i ? i - 1 : 0), s = 1; s < i; s++) e[s - 1] = arguments[s];
		for(var o = 0; o < e.length; o++) {
			var n = e[o];
			for(var r in n) t[r] = n[r]
		}
		return t
	}

	function c(t) {
		return null == t
	}

	function d(t, i) {
		return Math.sqrt(t * t + i * i)
	}
	var n = e && document.createElement("div").style,
		r = function() {
			if(!e) return !1;
			var t = {
				standard: "transform",
				webkit: "webkitTransform",
				Moz: "MozTransform",
				O: "OTransform",
				ms: "msTransform"
			};
			for(var i in t)
				if(void 0 !== n[t[i]]) return i;
			return !1
		}();

	function h(t) {
		return !1 !== r && ("standard" === r ? "transitionEnd" === t ? "transitionend" : t : r + t.charAt(0).toUpperCase() + t.substr(1))
	}

	function p(t, i, e, s) {
		t.addEventListener(i, e, {
			passive: !1,
			capture: !!s
		})
	}

	function u(t, i, e, s) {
		t.removeEventListener(i, e, {
			passive: !1,
			capture: !!s
		})
	}

	function m(t) {
		for(var i = 0, e = 0; t;) i -= t.offsetLeft, e -= t.offsetTop, t = t.offsetParent;
		return {
			left: i,
			top: e
		}
	}

	function f(t) {
		var i = t.getBoundingClientRect();
		return {
			left: -(i.left + window.pageXOffset),
			top: -(i.top + window.pageYOffset)
		}
	}
	var g = r && "standard" !== r ? "-" + r.toLowerCase() + "-" : "",
		v = h("transform"),
		y = h("transition"),
		x = e && h("perspective") in n,
		T = e && ("ontouchstart" in window || i),
		S = !1 !== v,
		b = e && y in n,
		_ = {
			transform: v,
			transition: y,
			transitionTimingFunction: h("transitionTimingFunction"),
			transitionDuration: h("transitionDuration"),
			transitionDelay: h("transitionDelay"),
			transformOrigin: h("transformOrigin"),
			transitionEnd: h("transitionEnd")
		},
		Y = {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,
			mousedown: 2,
			mousemove: 2,
			mouseup: 2
		};

	function X(t) {
		if(t instanceof window.SVGElement) {
			var i = t.getBoundingClientRect();
			return {
				top: i.top,
				left: i.left,
				width: i.width,
				height: i.height
			}
		}
		return {
			top: t.offsetTop,
			left: t.offsetLeft,
			width: t.offsetWidth,
			height: t.offsetHeight
		}
	}

	function M(t, i) {
		for(var e in i)
			if(i[e].test(t[e])) return !0;
		return !1
	}

	function P(t) {
		var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "click",
			e = void 0;
		"mouseup" === t.type || "mousecancel" === t.type ? e = t : "touchend" !== t.type && "touchcancel" !== t.type || (e = t.changedTouches[0]);
		var s = {};
		e && (s.screenX = e.screenX || 0, s.screenY = e.screenY || 0, s.clientX = e.clientX || 0, s.clientY = e.clientY || 0);
		var o = void 0,
			n = !0,
			r = !0;
		if("undefined" != typeof MouseEvent) try {
			o = new MouseEvent(i, a({
				bubbles: n,
				cancelable: r
			}, s))
		} catch(t) {
			h()
		} else h();

		function h() {
			(o = document.createEvent("Event")).initEvent(i, n, r), a(o, s)
		}
		o.forwardedTouchEvent = !0, o._constructed = !0, t.target.dispatchEvent(o)
	}

	function D(t, i) {
		t.removeChild(i)
	}
	var E = {
		startX: 0,
		startY: 0,
		scrollX: !1,
		scrollY: !0,
		freeScroll: !1,
		directionLockThreshold: 5,
		eventPassthrough: "",
		click: !1,
		tap: !1,
		bounce: !0,
		bounceTime: 800,
		momentum: !0,
		momentumLimitTime: 300,
		momentumLimitDistance: 15,
		swipeTime: 2500,
		swipeBounceTime: 500,
		deceleration: .0015,
		flickLimitTime: 200,
		flickLimitDistance: 100,
		resizePolling: 60,
		probeType: 0,
		preventDefault: !0,
		preventDefaultException: {
			tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
		},
		HWCompositing: !0,
		useTransition: !0,
		useTransform: !0,
		bindToWrapper: !1,
		disableMouse: T,
		disableTouch: !T,
		observeDOM: !0,
		autoBlur: !0,
		wheel: !1,
		snap: !1,
		scrollbar: !1,
		pullDownRefresh: !1,
		pullUpLoad: !1,
		mouseWheel: !1,
		stopPropagation: !1,
		zoom: !1,
		infinity: !1,
		dblclick: !1
	};
	var I = {
		swipe: {
			style: "cubic-bezier(0.23, 1, 0.32, 1)",
			fn: function(t) {
				return 1 + --t * t * t * t * t
			}
		},
		swipeBounce: {
			style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
			fn: function(t) {
				return t * (2 - t)
			}
		},
		bounce: {
			style: "cubic-bezier(0.165, 0.84, 0.44, 1)",
			fn: function(t) {
				return 1 - --t * t * t * t
			}
		}
	};

	function W(t, i, e, s, o, n, r, h) {
		var a = t - i,
			l = Math.abs(a) / e,
			c = r.deceleration,
			p = r.itemHeight,
			d = r.swipeBounceTime,
			u = r.wheel,
			m = r.swipeTime,
			f = u ? 4 : 15,
			g = t + l / c * (a < 0 ? -1 : 1);
		return u && p && (g = h._findNearestValidWheel(g).y), g < s ? (g = n ? Math.max(s - n / 4, s - n / f * l) : s, m = d) : o < g && (g = n ? Math.min(o + n / 4, o + n / f * l) : o, m = d), {
			destination: Math.round(g),
			duration: m
		}
	}

	function k() {}
	var z = e ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
			return window.setTimeout(t, (t.interval || 100 / 60) / 2)
		} : k,
		H = e ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(t) {
			window.clearTimeout(t)
		} : k;

	function A(t) {
		console.error("[BScroll warn]: " + t)
	}

	function C(t, i) {
		if(!t) throw new Error("[BScroll] " + i)
	}

	function O(t) {
		var i = document.createElement("div"),
			e = document.createElement("div");
		return i.style.cssText = "position:absolute;z-index:9999;pointerEvents:none", e.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;", e.className = "bscroll-indicator", i.className = "horizontal" === t ? (i.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", e.style.height = "100%", "bscroll-horizontal-scrollbar") : (i.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", e.style.width = "100%", "bscroll-vertical-scrollbar"), i.style.cssText += ";overflow:hidden", i.appendChild(e), i
	}

	function L(t, i) {
		this.wrapper = i.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = t, this.direction = i.direction, i.fade ? (this.visible = 0, this.wrapperStyle.opacity = "0") : this.visible = 1, this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.x = 0, this.y = 0, i.interactive && this._addDOMEvents()
	}
	L.prototype.handleEvent = function(t) {
		switch(t.type) {
			case "touchstart":
			case "mousedown":
				this._start(t);
				break;
			case "touchmove":
			case "mousemove":
				this._move(t);
				break;
			case "touchend":
			case "mouseup":
			case "touchcancel":
			case "mousecancel":
				this._end(t)
		}
	}, L.prototype.refresh = function() {
		this._shouldShow() && (this.transitionTime(), this._calculate(), this.updatePosition())
	}, L.prototype.fade = function(t, i) {
		var e = this;
		if(!i || this.visible) {
			var s = t ? 250 : 500;
			t = t ? "1" : "0", this.wrapperStyle[_.transitionDuration] = s + "ms", clearTimeout(this.fadeTimeout), this.fadeTimeout = setTimeout(function() {
				e.wrapperStyle.opacity = t, e.visible = +t
			}, 0)
		}
	}, L.prototype.updatePosition = function() {
		if("vertical" === this.direction) {
			var t = Math.round(this.sizeRatioY * this.scroller.y);
			if(t < 0) {
				this.transitionTime(500);
				var i = Math.max(this.indicatorHeight + 3 * t, 8);
				this.indicatorStyle.height = i + "px", t = 0
			} else if(t > this.maxPosY) {
				this.transitionTime(500);
				var e = Math.max(this.indicatorHeight - 3 * (t - this.maxPosY), 8);
				this.indicatorStyle.height = e + "px", t = this.maxPosY + this.indicatorHeight - e
			} else this.indicatorStyle.height = this.indicatorHeight + "px";
			this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[_.transform] = "translateY(" + t + "px)" + this.scroller.translateZ : this.indicatorStyle.top = t + "px"
		} else {
			var s = Math.round(this.sizeRatioX * this.scroller.x);
			if(s < 0) {
				this.transitionTime(500);
				var o = Math.max(this.indicatorWidth + 3 * s, 8);
				this.indicatorStyle.width = o + "px", s = 0
			} else if(s > this.maxPosX) {
				this.transitionTime(500);
				var n = Math.max(this.indicatorWidth - 3 * (s - this.maxPosX), 8);
				this.indicatorStyle.width = n + "px", s = this.maxPosX + this.indicatorWidth - n
			} else this.indicatorStyle.width = this.indicatorWidth + "px";
			this.x = s, this.scroller.options.useTransform ? this.indicatorStyle[_.transform] = "translateX(" + s + "px)" + this.scroller.translateZ : this.indicatorStyle.left = s + "px"
		}
	}, L.prototype.transitionTime = function() {
		var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
		this.indicatorStyle[_.transitionDuration] = t + "ms"
	}, L.prototype.transitionTimingFunction = function(t) {
		this.indicatorStyle[_.transitionTimingFunction] = t
	}, L.prototype.destroy = function() {
		this._removeDOMEvents(), this.wrapper.parentNode.removeChild(this.wrapper)
	}, L.prototype._start = function(t) {
		var i = t.touches ? t.touches[0] : t;
		t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = i.pageX, this.lastPointY = i.pageY, this.startTime = w(), this._handleMoveEvents(p), this.scroller.trigger("beforeScrollStart")
	}, L.prototype._move = function(t) {
		var i = t.touches ? t.touches[0] : t;
		t.preventDefault(), t.stopPropagation(), this.moved || this.scroller.trigger("scrollStart"), this.moved = !0;
		var e = i.pageX - this.lastPointX;
		this.lastPointX = i.pageX;
		var s = i.pageY - this.lastPointY;
		this.lastPointY = i.pageY;
		var o = this.x + e,
			n = this.y + s;
		this._pos(o, n)
	}, L.prototype._end = function(t) {
		if(this.initiated) {
			this.initiated = !1, t.preventDefault(), t.stopPropagation(), this._handleMoveEvents(u);
			var i = this.scroller.options.snap;
			if(i) {
				var e = i.speed,
					s = i.easing,
					o = void 0 === s ? I.bounce : s,
					n = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
					r = e || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - n.x), 1e3), Math.min(Math.abs(this.scroller.y - n.y), 1e3)), 300);
				this.scroller.x === n.x && this.scroller.y === n.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = n, this.scroller.scrollTo(n.x, n.y, r, o))
			}
			this.moved && this.scroller.trigger("scrollEnd", {
				x: this.scroller.x,
				y: this.scroller.y
			})
		}
	}, L.prototype._pos = function(t, i) {
		t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = Math.round(t / this.sizeRatioX), i = Math.round(i / this.sizeRatioY), this.scroller.scrollTo(t, i), this.scroller.trigger("scroll", {
			x: this.scroller.x,
			y: this.scroller.y
		})
	}, L.prototype._shouldShow = function() {
		return "vertical" === this.direction && this.scroller.hasVerticalScroll || "horizontal" === this.direction && this.scroller.hasHorizontalScroll ? !(this.wrapper.style.display = "") : !(this.wrapper.style.display = "none")
	}, L.prototype._calculate = function() {
		if("vertical" === this.direction) {
			var t = this.wrapper.clientHeight;
			this.indicatorHeight = Math.max(Math.round(t * t / (this.scroller.scrollerHeight || t || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = t - this.indicatorHeight, this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY
		} else {
			var i = this.wrapper.clientWidth;
			this.indicatorWidth = Math.max(Math.round(i * i / (this.scroller.scrollerWidth || i || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = i - this.indicatorWidth, this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX
		}
	}, L.prototype._addDOMEvents = function() {
		var t = p;
		this._handleDOMEvents(t)
	}, L.prototype._removeDOMEvents = function() {
		var t = u;
		this._handleDOMEvents(t), this._handleMoveEvents(t)
	}, L.prototype._handleMoveEvents = function(t) {
		this.scroller.options.disableTouch || t(window, "touchmove", this), this.scroller.options.disableMouse || t(window, "mousemove", this)
	}, L.prototype._handleDOMEvents = function(t) {
		this.scroller.options.disableTouch || (t(this.indicator, "touchstart", this), t(window, "touchend", this)), this.scroller.options.disableMouse || (t(this.indicator, "mousedown", this), t(window, "mouseup", this))
	};
	var N, R, F, U, V, B, q, Z, j, G;

	function $(t) {
		if(t && t.classList) return t.classList.contains("tombstone")
	}

	function J(t, i) {
		var e = this;
		this.options = i, C("function" == typeof this.options.createTombstone, "Infinite scroll need createTombstone Function to create tombstone"), C("function" == typeof this.options.fetch, "Infinite scroll need fetch Function to fetch new data."), C("function" == typeof this.options.render, "Infinite scroll need render Function to render each item."), this.firstAttachedItem = 0, this.lastAttachedItem = 0, this.anchorScrollTop = 0, this.anchorItem = {
			index: 0,
			offset: 0
		}, this.tombstoneHeight = 0, this.tombstoneWidth = 0, this.tombstones = [], this.tombstonesAnimationHandlers = [], this.items = [], this.loadedItems = 0, this.requestInProgress = !1, this.hasMore = !0, this.scroller = t, this.wrapperEl = this.scroller.wrapper, this.scrollerEl = this.scroller.scroller, this.scroller.on("resize", function() {
			e.onResize()
		}), this.scroller.on("destroy", function() {
			e.destroy()
		}), this._onResizeHandler = setTimeout(function() {
			e.onResize(), e.scroller.on("scroll", function() {
				e.onScroll()
			})
		})
	}

	function K(t, i) {
		this.wrapper = "string" == typeof t ? document.querySelector(t) : t, this.wrapper || A("Can not resolve the wrapper DOM."), this.scroller = this.wrapper.children[0], this.scroller || A("The wrapper need at least one child element to be scroller."), this.scrollerStyle = this.scroller.style, this._init(i)
	}
	return J.prototype.destroy = function() {
		var i = this;
		clearTimeout(this._onResizeHandler), this.tombstonesAnimationHandlers.forEach(function(t) {
			clearTimeout(t)
		}), this.tombstonesAnimationHandlers = null, this.items.forEach(function(t) {
			t.node && (i.scrollerEl.removeChild(t.node), t.node = null)
		}), this.scroller.infiniteScroller = null, this.scroller = null, this.wrapperEl = null, this.scrollerEl = null, this.items = null, this.tombstones = null
	}, J.prototype.onScroll = function() {
		var t = -this.scroller.y,
			i = t - this.anchorScrollTop;
		this.anchorItem = 0 === t ? {
			index: 0,
			offset: 0
		} : this._calculateAnchoredItem(this.anchorItem, i), this.anchorScrollTop = t;
		var e = this._calculateAnchoredItem(this.anchorItem, this.scroller.wrapperHeight),
			s = this.anchorItem.index,
			o = e.index;
		i < 0 ? (s -= 30, o += 10) : (s -= 10, o += 30), this.fill(s, o), this.maybeRequestContent()
	}, J.prototype.onResize = function() {
		var t = this.options.createTombstone();
		t.style.position = "absolute", this.scrollerEl.appendChild(t), t.style.display = "", this.tombstoneHeight = t.offsetHeight, this.tombstoneWidth = t.offsetWidth, this.scrollerEl.removeChild(t);
		for(var i = 0; i < this.items.length; i++) this.items[i].height = this.items[i].width = 0;
		this.onScroll()
	}, J.prototype.fill = function(t, i) {
		this.firstAttachedItem = Math.max(0, t), this.hasMore || (i = Math.min(i, this.items.length)), this.lastAttachedItem = i, this.attachContent()
	}, J.prototype.maybeRequestContent = function() {
		var s = this;
		if(!this.requestInProgress && this.hasMore) {
			var t = this.lastAttachedItem - this.loadedItems;
			t <= 0 || (this.requestInProgress = !0, this.options.fetch(t).then(function(t) {
				if(s.requestInProgress = !1, t) s.addContent(t);
				else {
					s.hasMore = !1;
					var i = s._removeTombstones(),
						e = 0;
					s.anchorItem.index <= s.items.length ? (e = s._fixScrollPosition(), s._setupAnimations({}, e), s.scroller.resetPosition(s.scroller.options.bounceTime)) : (s.anchorItem.index -= i, e = s._fixScrollPosition(), s._setupAnimations({}, e), s.scroller.stop(), s.scroller.resetPosition(), s.onScroll())
				}
			}))
		}
	}, J.prototype.addContent = function(t) {
		for(var i = 0; i < t.length; i++) this.items.length <= this.loadedItems && this._addItem(), this.items[this.loadedItems++].data = t[i];
		this.attachContent(), this.maybeRequestContent()
	}, J.prototype.attachContent = function() {
		var t = this._collectUnusedNodes(),
			i = this._createDOMNodes(t);
		this._cleanupUnusedNodes(t), this._cacheNodeSize();
		var e = this._fixScrollPosition();
		this._setupAnimations(i, e)
	}, J.prototype.resetMore = function() {
		this.hasMore = !0
	}, J.prototype._removeTombstones = function() {
		for(var t, i = void 0, e = this.items.length, s = 0; s < e; s++) {
			var o = this.items[s].node,
				n = this.items[s].data;
			o && !$(o) || n || (void 0 === i && (i = s), o && this.scrollerEl.removeChild(o))
		}
		return t = e - i, this.items.splice(i), this.lastAttachedItem = Math.min(this.lastAttachedItem, this.items.length), t
	}, J.prototype._collectUnusedNodes = function() {
		for(var t = [], i = 0; i < this.items.length; i++)
			if(i !== this.firstAttachedItem) {
				var e = this.items[i].node;
				e && ($(e) ? (this.tombstones.push(e), this.tombstones[this.tombstones.length - 1].style.display = "none") : t.push(e)), this.items[i].node = null
			} else i = this.lastAttachedItem - 1;
		return t
	}, J.prototype._createDOMNodes = function(t) {
		for(var i = {}, e = this.firstAttachedItem; e < this.lastAttachedItem; e++) {
			for(; this.items.length <= e;) this._addItem();
			var s = this.items[e].node,
				o = this.items[e].data;
			if(s) {
				if(!$(s) || !o) continue;
				s.style.zIndex = 1, i[e] = [s, this.items[e].top - this.anchorScrollTop], this.items[e].node = null
			}
			var n = o ? this.options.render(o, t.pop()) : this._getTombStone();
			n.style.position = "absolute", this.items[e].top = -1, this.scrollerEl.appendChild(n), this.items[e].node = n
		}
		return i
	}, J.prototype._cleanupUnusedNodes = function(t) {
		for(; t.length;) this.scrollerEl.removeChild(t.pop())
	}, J.prototype._cacheNodeSize = function() {
		for(var t = this.firstAttachedItem; t < this.lastAttachedItem; t++) {
			var i = this.items[t];
			if(i.data && !i.height) {
				var e = $(i.node);
				i.height = e ? this.tombstoneHeight : i.node.offsetHeight, i.width = e ? this.tombstoneWidth : i.node.offsetWidth
			}
		}
	}, J.prototype._fixScrollPosition = function() {
		for(var t = this.anchorScrollTop = 0; t < this.anchorItem.index; t++) this.anchorScrollTop += this.items[t].height || this.tombstoneHeight;
		this.anchorScrollTop += this.anchorItem.offset;
		for(var i = this.anchorScrollTop - this.anchorItem.offset, e = this.anchorItem.index; e > this.firstAttachedItem;) i -= this.items[e - 1].height || this.tombstoneHeight, e--;
		return i
	}, J.prototype._setupAnimations = function(e, t) {
		var s = this;
		for(var i in e) {
			var o = e[i];
			this.items[i].node.style[_.transform] = "translateY(" + (this.anchorScrollTop + o[1]) + "px) scale(" + this.tombstoneWidth / this.items[i].width + ", " + this.tombstoneHeight / this.items[i].height + ")", this.items[i].node.offsetTop, o[0].offsetTop, this.items[i].node.style[_.transition] = g + "transform 200ms"
		}
		for(var n = this.firstAttachedItem; n < this.lastAttachedItem; n++) {
			var r = e[n];
			if(r) {
				var h = r[0];
				h.style[_.transition] = g + "transform 200ms, opacity 200ms", h.style[_.transform] = "translateY(" + t + "px) scale(" + this.items[n].width / this.tombstoneWidth + ", " + this.items[n].height / this.tombstoneHeight + ")", h.style.opacity = 0
			}
			t !== this.items[n].top && (r || (this.items[n].node.style[_.transition] = ""), this.items[n].node.style[_.transform] = "translateY(" + t + "px)"), this.items[n].top = t, t += this.items[n].height || this.tombstoneHeight
		}
		this.scroller.maxScrollY = -(t - this.scroller.wrapperHeight + (this.hasMore ? 2e3 : 0));
		var a = setTimeout(function() {
			for(var t in e) {
				var i = e[t];
				i[0].style.display = "none", s.tombstones.push(i[0])
			}
		}, 200);
		this.tombstonesAnimationHandlers.push(a)
	}, J.prototype._getTombStone = function() {
		var t = this.tombstones.pop();
		return t ? (t.style.display = "", t.style.opacity = 1, t.style[_.transform] = "", t.style[_.transition] = "", t) : this.options.createTombstone()
	}, J.prototype._addItem = function() {
		this.items.push({
			data: null,
			node: null,
			height: 0,
			width: 0,
			top: 0
		})
	}, J.prototype._calculateAnchoredItem = function(t, i) {
		if(0 === i) return t;
		var e = t.index,
			s = 0;
		if((i += t.offset) < 0) {
			for(; i < 0 && 0 < e && this.items[e - 1].height;) i += this.items[e - 1].height, e--;
			s = Math.max(-e, Math.ceil(Math.min(i, 0) / this.tombstoneHeight))
		} else {
			for(; 0 < i && e < this.items.length && this.items[e].height && this.items[e].height < i;) i -= this.items[e].height, e++;
			(e >= this.items.length || !this.items[e].height) && (s = Math.floor(Math.max(i, 0) / this.tombstoneHeight))
		}
		return {
			index: e += s,
			offset: i -= s * this.tombstoneHeight
		}
	}, (N = K).prototype._init = function(t) {
		this._handleOptions(t), this._events = {}, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this.setScale(1), this._addDOMEvents(), this._initExtFeatures(), this._watchTransition(), this.options.observeDOM && this._initDOMObserver(), this.options.autoBlur && this._handleAutoBlur(), this.refresh(), this.options.snap || this.scrollTo(this.options.startX, this.options.startY), this.enable()
	}, N.prototype.setScale = function(t) {
		this.lastScale = c(this.scale) ? t : this.scale, this.scale = t
	}, N.prototype._handleOptions = function(t) {
		this.options = a({}, E, t), this.translateZ = this.options.HWCompositing && x ? " translateZ(0)" : "", this.options.useTransition = this.options.useTransition && b, this.options.useTransform = this.options.useTransform && S, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollX = "horizontal" !== this.options.eventPassthrough && this.options.scrollX, this.options.scrollY = "vertical" !== this.options.eventPassthrough && this.options.scrollY, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, !0 === this.options.tap && (this.options.tap = "tap")
	}, N.prototype._addDOMEvents = function() {
		var t = p;
		this._handleDOMEvents(t)
	}, N.prototype._removeDOMEvents = function() {
		var t = u;
		this._handleDOMEvents(t)
	}, N.prototype._handleDOMEvents = function(t) {
		var i = this.options.bindToWrapper ? this.wrapper : window;
		t(window, "orientationchange", this), t(window, "resize", this), this.options.click && t(this.wrapper, "click", this, !0), this.options.disableMouse || (t(this.wrapper, "mousedown", this), t(i, "mousemove", this), t(i, "mousecancel", this), t(i, "mouseup", this)), T && !this.options.disableTouch && (t(this.wrapper, "touchstart", this), t(i, "touchmove", this), t(i, "touchcancel", this), t(i, "touchend", this)), t(this.scroller, _.transitionEnd, this)
	}, N.prototype._initExtFeatures = function() {
		this.options.snap && this._initSnap(), this.options.scrollbar && this._initScrollbar(), this.options.pullUpLoad && this._initPullUp(), this.options.pullDownRefresh && this._initPullDown(), this.options.wheel && this._initWheel(), this.options.mouseWheel && this._initMouseWheel(), this.options.zoom && this._initZoom(), this.options.infinity && this._initInfinite()
	}, N.prototype._watchTransition = function() {
		if("function" == typeof Object.defineProperty) {
			var o = this,
				n = !1,
				t = this.options.useTransition ? "isInTransition" : "isAnimating";
			Object.defineProperty(this, t, {
				get: function() {
					return n
				},
				set: function(t) {
					n = t;
					for(var i = o.scroller.children.length ? o.scroller.children : [o.scroller], e = n && !o.pulling ? "none" : "auto", s = 0; s < i.length; s++) i[s].style.pointerEvents = e
				}
			})
		}
	}, N.prototype._handleAutoBlur = function() {
		this.on("scrollStart", function() {
			var t = document.activeElement;
			!t || "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName || t.blur()
		})
	}, N.prototype._initDOMObserver = function() {
		var n = this;
		if("undefined" != typeof MutationObserver) {
			var r = void 0,
				t = new MutationObserver(function(t) {
					if(!n._shouldNotRefresh()) {
						for(var i = !1, e = !1, s = 0; s < t.length; s++) {
							var o = t[s];
							if("attributes" !== o.type) {
								i = !0;
								break
							}
							if(o.target !== n.scroller) {
								e = !0;
								break
							}
						}
						i ? n.refresh() : e && (clearTimeout(r), r = setTimeout(function() {
							n._shouldNotRefresh() || n.refresh()
						}, 60))
					}
				});
			t.observe(this.scroller, {
				attributes: !0,
				childList: !0,
				subtree: !0
			}), this.on("destroy", function() {
				t.disconnect()
			})
		} else this._checkDOMUpdate()
	}, N.prototype._shouldNotRefresh = function() {
		var t = this.x > this.minScrollX || this.x < this.maxScrollX || this.y > this.minScrollY || this.y < this.maxScrollY;
		return this.isInTransition || this.stopFromTransition || t
	}, N.prototype._checkDOMUpdate = function() {
		var e = X(this.scroller),
			s = e.width,
			o = e.height;

		function n() {
			var t = this;
			setTimeout(function() {
				(function() {
					if(!this.destroyed) {
						var t = (e = X(this.scroller)).width,
							i = e.height;
						s === t && o === i || this.refresh(), s = t, o = i, n.call(this)
					}
				}).call(t)
			}, 1e3)
		}
		n.call(this)
	}, N.prototype.handleEvent = function(t) {
		switch(t.type) {
			case "touchstart":
			case "mousedown":
				this._start(t), this.options.zoom && t.touches && 1 < t.touches.length && this._zoomStart(t);
				break;
			case "touchmove":
			case "mousemove":
				this.options.zoom && t.touches && 1 < t.touches.length ? this._zoom(t) : this._move(t);
				break;
			case "touchend":
			case "mouseup":
			case "touchcancel":
			case "mousecancel":
				this.scaled ? this._zoomEnd(t) : this._end(t);
				break;
			case "orientationchange":
			case "resize":
				this._resize();
				break;
			case "transitionend":
			case "webkitTransitionEnd":
			case "oTransitionEnd":
			case "MSTransitionEnd":
				this._transitionEnd(t);
				break;
			case "click":
				this.enabled && !t._constructed && (M(t.target, this.options.preventDefaultException) || (t.preventDefault(), t.stopPropagation()));
				break;
			case "wheel":
			case "DOMMouseScroll":
			case "mousewheel":
				this._onMouseWheel(t)
		}
	}, N.prototype.refresh = function() {
		var t = "static" === window.getComputedStyle(this.wrapper, null).position,
			i = X(this.wrapper);
		this.wrapperWidth = i.width, this.wrapperHeight = i.height;
		var e = X(this.scroller);
		this.scrollerWidth = Math.round(e.width * this.scale), this.scrollerHeight = Math.round(e.height * this.scale), this.relativeX = e.left, this.relativeY = e.top, t && (this.relativeX -= i.left, this.relativeY -= i.top), this.minScrollX = 0, this.minScrollY = 0;
		var s = this.options.wheel;
		s ? (this.items = this.scroller.children, this._checkWheelAllDisabled(), this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0, void 0 === this.selectedIndex && (this.selectedIndex = s.selectedIndex || 0), this.options.startY = -this.selectedIndex * this.itemHeight, this.maxScrollX = 0, this.maxScrollY = -this.itemHeight * (this.items.length - 1)) : (this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.options.infinity || (this.maxScrollY = this.wrapperHeight - this.scrollerHeight), this.maxScrollX < 0 ? (this.maxScrollX -= this.relativeX, this.minScrollX = -this.relativeX) : 1 < this.scale && (this.maxScrollX = this.maxScrollX / 2 - this.relativeX, this.minScrollX = this.maxScrollX), this.maxScrollY < 0 ? (this.maxScrollY -= this.relativeY, this.minScrollY = -this.relativeY) : 1 < this.scale && (this.maxScrollY = this.maxScrollY / 2 - this.relativeY, this.minScrollY = this.maxScrollY)), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < this.minScrollX, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.minScrollY, this.hasHorizontalScroll || (this.maxScrollX = this.minScrollX, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = this.minScrollY, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = m(this.wrapper), this.trigger("refresh"), !this.scaled && this.resetPosition()
	}, N.prototype.enable = function() {
		this.enabled = !0
	}, N.prototype.disable = function() {
		this.enabled = !1
	}, (R = K).prototype._start = function(t) {
		var i = Y[t.type];
		if((1 === i || 0 === t.button) && !(!this.enabled || this.destroyed || this.initiated && this.initiated !== i)) {
			this.initiated = i, this.options.preventDefault && !M(t.target, this.options.preventDefaultException) && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.movingDirectionX = 0, this.movingDirectionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = w(), this.options.wheel && (this.target = t.target), this.stop();
			var e = t.touches ? t.touches[0] : t;
			this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = e.pageX, this.pointY = e.pageY, this.trigger("beforeScrollStart")
		}
	}, R.prototype._move = function(t) {
		if(this.enabled && !this.destroyed && Y[t.type] === this.initiated) {
			this.options.preventDefault && t.preventDefault(), this.options.stopPropagation && t.stopPropagation();
			var i = t.touches ? t.touches[0] : t,
				e = i.pageX - this.pointX,
				s = i.pageY - this.pointY;
			this.pointX = i.pageX, this.pointY = i.pageY, this.distX += e, this.distY += s;
			var o = Math.abs(this.distX),
				n = Math.abs(this.distY),
				r = w();
			if(!(r - this.endTime > this.options.momentumLimitTime && !this.moved && n < this.options.momentumLimitDistance && o < this.options.momentumLimitDistance)) {
				if(this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" === this.directionLocked) {
					if("vertical" === this.options.eventPassthrough) t.preventDefault();
					else if("horizontal" === this.options.eventPassthrough) return void(this.initiated = !1);
					s = 0
				} else if("v" === this.directionLocked) {
					if("horizontal" === this.options.eventPassthrough) t.preventDefault();
					else if("vertical" === this.options.eventPassthrough) return void(this.initiated = !1);
					e = 0
				}
				e = this.hasHorizontalScroll ? e : 0, s = this.hasVerticalScroll ? s : 0, this.movingDirectionX = 0 < e ? -1 : e < 0 ? 1 : 0, this.movingDirectionY = 0 < s ? -1 : s < 0 ? 1 : 0;
				var h = this.x + e,
					a = this.y + s,
					l = !1,
					c = !1,
					p = !1,
					d = !1,
					u = this.options.bounce;
				!1 !== u && (l = void 0 === u.top || u.top, c = void 0 === u.bottom || u.bottom, p = void 0 === u.left || u.left, d = void 0 === u.right || u.right), (h > this.minScrollX || h < this.maxScrollX) && (h = h > this.minScrollX && p || h < this.maxScrollX && d ? this.x + e / 3 : h > this.minScrollX ? this.minScrollX : this.maxScrollX), (a > this.minScrollY || a < this.maxScrollY) && (a = a > this.minScrollY && l || a < this.maxScrollY && c ? this.y + s / 3 : a > this.minScrollY ? this.minScrollY : this.maxScrollY), this.moved || (this.moved = !0, this.trigger("scrollStart")), this._translate(h, a), r - this.startTime > this.options.momentumLimitTime && (this.startTime = r, this.startX = this.x, this.startY = this.y, 1 === this.options.probeType && this.trigger("scroll", {
					x: this.x,
					y: this.y
				})), 1 < this.options.probeType && this.trigger("scroll", {
					x: this.x,
					y: this.y
				});
				var m = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
					f = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
					g = this.pointX - m,
					v = this.pointY - f;
				(g > document.documentElement.clientWidth - this.options.momentumLimitDistance || g < this.options.momentumLimitDistance || v < this.options.momentumLimitDistance || v > document.documentElement.clientHeight - this.options.momentumLimitDistance) && this._end(t)
			}
		}
	}, R.prototype._end = function(t) {
		if(this.enabled && !this.destroyed && Y[t.type] === this.initiated) {
			this.initiated = !1, this.options.preventDefault && !M(t.target, this.options.preventDefaultException) && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.trigger("touchEnd", {
				x: this.x,
				y: this.y
			}), this.isInTransition = !1;
			var i = Math.round(this.x),
				e = Math.round(this.y),
				s = i - this.absStartX,
				o = e - this.absStartY;
			if(this.directionX = 0 < s ? -1 : s < 0 ? 1 : 0, this.directionY = 0 < o ? -1 : o < 0 ? 1 : 0, !this.options.pullDownRefresh || !this._checkPullDown())
				if(this._checkClick(t)) this.trigger("scrollCancel");
				else if(!this.resetPosition(this.options.bounceTime, I.bounce)) {
				this._translate(i, e), this.endTime = w();
				var n = this.endTime - this.startTime,
					r = Math.abs(i - this.startX),
					h = Math.abs(e - this.startY);
				if(this._events.flick && n < this.options.flickLimitTime && r < this.options.flickLimitDistance && h < this.options.flickLimitDistance) this.trigger("flick");
				else {
					var a = 0;
					if(this.options.momentum && n < this.options.momentumLimitTime && (h > this.options.momentumLimitDistance || r > this.options.momentumLimitDistance)) {
						var l = !1,
							c = !1,
							p = !1,
							d = !1,
							u = this.options.bounce;
						!1 !== u && (l = void 0 === u.top || u.top, c = void 0 === u.bottom || u.bottom, p = void 0 === u.left || u.left, d = void 0 === u.right || u.right);
						var m = -1 === this.directionX && p || 1 === this.directionX && d ? this.wrapperWidth : 0,
							f = -1 === this.directionY && l || 1 === this.directionY && c ? this.wrapperHeight : 0,
							g = this.hasHorizontalScroll ? W(this.x, this.startX, n, this.maxScrollX, this.minScrollX, m, this.options, this) : {
								destination: i,
								duration: 0
							},
							v = this.hasVerticalScroll ? W(this.y, this.startY, n, this.maxScrollY, this.minScrollY, f, this.options, this) : {
								destination: e,
								duration: 0
							};
						i = g.destination, e = v.destination, a = Math.max(g.duration, v.duration), this.isInTransition = !0
					} else this.options.wheel && (e = this._findNearestValidWheel(e).y, a = this.options.wheel.adjustTime || 400);
					var y = I.swipe;
					if(this.options.snap) {
						var x = this._nearestSnap(i, e);
						this.currentPage = x, a = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(i - x.x), 1e3), Math.min(Math.abs(e - x.y), 1e3)), 300), i = x.x, e = x.y, this.directionX = 0, this.directionY = 0, y = this.options.snap.easing || I.bounce
					}
					if(i !== this.x || e !== this.y) return(i > this.minScrollX || i < this.maxScrollX || e > this.minScrollY || e < this.maxScrollY) && (y = I.swipeBounce), void this.scrollTo(i, e, a, y);
					this.options.wheel && (this.selectedIndex = this._findNearestValidWheel(this.y).index), this.trigger("scrollEnd", {
						x: this.x,
						y: this.y
					})
				}
			}
		}
	}, R.prototype._checkClick = function(t) {
		var i, e, s, o = this.stopFromTransition && !this.pulling;
		if(this.stopFromTransition = !1, this.moved) return !1;
		if(this.options.wheel) {
			if(this.target && this.target.className === this.options.wheel.wheelWrapperClass) {
				var n = this._findNearestValidWheel(this.y).index,
					r = Math.round((this.pointY + f(this.wrapper).top - this.wrapperHeight / 2) / this.itemHeight);
				this.target = this.items[n + r]
			}
			var h = m(this.target).top,
				a = m(this.target).left;
			return h -= this.wrapperOffset.top, h -= Math.round(this.target.offsetHeight / 2 - this.wrapper.offsetHeight / 2) || 0, a -= this.wrapperOffset.left, a -= Math.round(this.target.offsetWidth / 2 - this.wrapper.offsetWidth / 2) || 0, h = this._findNearestValidWheel(h).y, this.scrollTo(a, h, this.options.wheel.adjustTime || 400, I.swipe), !0
		}
		if(o) return !1;
		var l = this.options.dblclick,
			c = !1;
		if(l && this.lastClickTime) {
			var p = l.delay,
				d = void 0 === p ? 300 : p;
			w() - this.lastClickTime < d && (c = !0, P(t, "dblclick"))
		}
		return this.options.tap && (i = t, e = this.options.tap, (s = document.createEvent("Event")).initEvent(e, !0, !0), s.pageX = i.pageX, s.pageY = i.pageY, i.target.dispatchEvent(s)), this.options.click && !M(t.target, this.options.preventDefaultException) && P(t), this.lastClickTime = c ? null : w(), !0
	}, R.prototype._resize = function() {
		var t = this;
		this.enabled && (s && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
			t.refresh()
		}, this.options.resizePolling))
	}, R.prototype._startProbe = function() {
		H(this.probeTimer), this.probeTimer = z(function t() {
			var i = e.getComputedPosition();
			e.trigger("scroll", i), e.isInTransition ? e.probeTimer = z(t) : e.trigger("scrollEnd", i)
		});
		var e = this
	}, R.prototype._transitionTime = function() {
		var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
		if(this.scrollerStyle[_.transitionDuration] = t + "ms", this.options.wheel)
			for(var i = 0; i < this.items.length; i++) this.items[i].style[_.transitionDuration] = t + "ms";
		if(this.indicators)
			for(var e = 0; e < this.indicators.length; e++) this.indicators[e].transitionTime(t)
	}, R.prototype._transitionTimingFunction = function(t) {
		if(this.scrollerStyle[_.transitionTimingFunction] = t, this.options.wheel)
			for(var i = 0; i < this.items.length; i++) this.items[i].style[_.transitionTimingFunction] = t;
		if(this.indicators)
			for(var e = 0; e < this.indicators.length; e++) this.indicators[e].transitionTimingFunction(t)
	}, R.prototype._transitionEnd = function(t) {
		t.target === this.scroller && this.isInTransition && (this._transitionTime(), (!this.pulling || 1 === this.movingDirectionY) && !this.resetPosition(this.options.bounceTime, I.bounce) && (this.isInTransition = !1, 3 !== this.options.probeType && this.trigger("scrollEnd", {
			x: this.x,
			y: this.y
		})))
	}, R.prototype._translate = function(t, i, e) {
		if(C(!c(t) && !c(i), "Translate x or y is null or undefined."), c(e) && (e = this.scale), this.options.useTransform ? this.scrollerStyle[_.transform] = "translate(" + t + "px," + i + "px) scale(" + e + ")" + this.translateZ : (t = Math.round(t), i = Math.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.options.wheel)
			for(var s = this.options.wheel.rotate, o = void 0 === s ? 25 : s, n = 0; n < this.items.length; n++) {
				var r = o * (i / this.itemHeight + n);
				this.items[n].style[_.transform] = "rotateX(" + r + "deg)"
			}
		if(this.x = t, this.y = i, this.setScale(e), this.indicators)
			for(var h = 0; h < this.indicators.length; h++) this.indicators[h].updatePosition()
	}, R.prototype._animate = function(r, h, a, l) {
		var c = this,
			p = this.x,
			d = this.y,
			u = this.lastScale,
			m = this.scale,
			f = w(),
			g = f + a;
		this.isAnimating = !0, H(this.animateTimer),
			function t() {
				var i = w();
				if(g <= i) return c.isAnimating = !1, c._translate(r, h, m), c.trigger("scroll", {
					x: c.x,
					y: c.y
				}), void(c.pulling || c.resetPosition(c.options.bounceTime) || c.trigger("scrollEnd", {
					x: c.x,
					y: c.y
				}));
				var e = l(i = (i - f) / a),
					s = (r - p) * e + p,
					o = (h - d) * e + d,
					n = (m - u) * e + u;
				c._translate(s, o, n), c.isAnimating && (c.animateTimer = z(t)), 3 === c.options.probeType && c.trigger("scroll", {
					x: c.x,
					y: c.y
				})
			}()
	}, R.prototype.scrollBy = function(t, i) {
		var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
			s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : I.bounce;
		t = this.x + t, i = this.y + i, this.scrollTo(t, i, e, s)
	}, R.prototype.scrollTo = function(t, i) {
		var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
			s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : I.bounce,
			o = arguments[4];
		if(this.options.wheel && (i = this._findNearestValidWheel(i).y), t !== this.x || i !== this.y)
			if(this.isInTransition = this.options.useTransition && 0 < e && (this.x !== t || this.y !== i), !e || this.options.useTransition) {
				if(this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i), e && 3 === this.options.probeType && this._startProbe(), !e && !o) {
					if(this.options.zoom) return;
					this.trigger("scroll", {
						x: t,
						y: i
					}), this._reflow = document.body.offsetHeight, this.resetPosition(this.options.bounceTime, I.bounce) || this.trigger("scrollEnd", {
						x: t,
						y: i
					})
				}
				this.options.wheel && (this.selectedIndex = this._findNearestValidWheel(i).index)
			} else this._animate(t, i, e, s.fn)
	}, R.prototype.scrollToElement = function(t, i, e, s, o) {
		if(t && (t = t.nodeType ? t : this.scroller.querySelector(t), !this.options.wheel || t.classList.contains(this.options.wheel.wheelItemClass))) {
			var n = m(t);
			n.left -= this.wrapperOffset.left, n.top -= this.wrapperOffset.top, !0 === e && (e = Math.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === s && (s = Math.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), n.left -= e || 0, n.top -= s || 0, n.left = n.left > this.minScrollX ? this.minScrollX : n.left < this.maxScrollX ? this.maxScrollX : n.left, n.top = n.top > this.minScrollY ? this.minScrollY : n.top < this.maxScrollY ? this.maxScrollY : n.top, this.options.wheel && (n.top = this._findNearestValidWheel(n.top).y), this.scrollTo(n.left, n.top, i, o)
		}
	}, R.prototype.resetPosition = function() {
		var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
			i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : I.bounce,
			e = this.x,
			s = Math.round(e);
		!this.hasHorizontalScroll || s > this.minScrollX ? e = this.minScrollX : s < this.maxScrollX && (e = this.maxScrollX);
		var o = this.y,
			n = Math.round(o);
		return !this.hasVerticalScroll || n > this.minScrollY ? o = this.minScrollY : n < this.maxScrollY && (o = this.maxScrollY), (e !== this.x || o !== this.y) && (this.scrollTo(e, o, t, i), !0)
	}, R.prototype.getComputedPosition = function() {
		var t = window.getComputedStyle(this.scroller, null),
			i = void 0,
			e = void 0;
		return e = this.options.useTransform ? (i = +((t = t[_.transform].split(")")[0].split(", "))[12] || t[4]), +(t[13] || t[5])) : (i = +t.left.replace(/[^-\d.]/g, ""), +t.top.replace(/[^-\d.]/g, "")), {
			x: i,
			y: e
		}
	}, R.prototype.stop = function() {
		if(this.options.useTransition && this.isInTransition) {
			this.isInTransition = !1, H(this.probeTimer);
			var t = this.getComputedPosition();
			this._translate(t.x, t.y), this.options.wheel ? this.target = this.items[this._findNearestValidWheel(t.y).index] : this.trigger("scrollEnd", {
				x: this.x,
				y: this.y
			}), this.stopFromTransition = !0
		} else !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, H(this.animateTimer), this.trigger("scrollEnd", {
			x: this.x,
			y: this.y
		}), this.stopFromTransition = !0)
	}, R.prototype.destroy = function() {
		this.destroyed = !0, this.trigger("destroy"), this.options.useTransition ? H(this.probeTimer) : H(this.animateTimer), this._removeDOMEvents(), this._events = {}
	}, (F = K).prototype.on = function(t, i) {
		var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this;
		this._events[t] || (this._events[t] = []), this._events[t].push([i, e])
	}, F.prototype.once = function(t, i) {
		var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this;

		function s() {
			this.off(t, s), i.apply(e, arguments)
		}
		s.fn = i, this.on(t, s)
	}, F.prototype.off = function(t, i) {
		var e = this._events[t];
		if(e)
			for(var s = e.length; s--;)(e[s][0] === i || e[s][0] && e[s][0].fn === i) && o(e, s)
	}, F.prototype.trigger = function(t) {
		var i = this._events[t];
		if(i)
			for(var e = i.length, s = [].concat(function(t) {
					if(Array.isArray(t)) {
						for(var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
						return e
					}
					return Array.from(t)
				}(i)), o = 0; o < e; o++) {
				var n = s[o],
					r = l(n, 2),
					h = r[0],
					a = r[1];
				h && h.apply(a, [].slice.call(arguments, 1))
			}
	}, (U = K).prototype._initSnap = function() {
		var m = this;
		this.currentPage = {};
		var t, i, e, s, f = this.options.snap;
		if(f.loop) {
			var o = this.scroller.children;
			1 < o.length ? (t = o[o.length - 1].cloneNode(!0), (i = this.scroller).firstChild ? (e = t, (s = i.firstChild).parentNode.insertBefore(e, s)) : i.appendChild(t), this.scroller.appendChild(o[1].cloneNode(!0))) : f.loop = !1
		}
		var g = f.el;
		"string" == typeof g && (g = this.scroller.querySelectorAll(g)), this.on("refresh", function() {
			if(m.pages = [], m.wrapperWidth && m.wrapperHeight && m.scrollerWidth && m.scrollerHeight) {
				var t = f.stepX || m.wrapperWidth,
					i = f.stepY || m.wrapperHeight,
					e = 0,
					s = void 0,
					o = void 0,
					n = void 0,
					r = 0,
					h = void 0,
					a = 0,
					l = void 0,
					c = void 0;
				if(g)
					for(h = g.length, l = -1; r < h; r++) c = X(g[r]), (0 === r || c.left <= X(g[r - 1]).left) && (a = 0, l++), m.pages[a] || (m.pages[a] = []), e = Math.max(-c.left, m.maxScrollX), s = Math.max(-c.top, m.maxScrollY), o = e - Math.round(c.width / 2), n = s - Math.round(c.height / 2), m.pages[a][l] = {
						x: e,
						y: s,
						width: c.width,
						height: c.height,
						cx: o,
						cy: n
					}, e > m.maxScrollX && a++;
				else
					for(o = Math.round(t / 2), n = Math.round(i / 2); e > -m.scrollerWidth;) {
						for(m.pages[r] = [], s = h = 0; s > -m.scrollerHeight;) m.pages[r][h] = {
							x: Math.max(e, m.maxScrollX),
							y: Math.max(s, m.maxScrollY),
							width: t,
							height: i,
							cx: e - o,
							cy: s - n
						}, s -= i, h++;
						e -= t, r++
					}
				m._checkSnapLoop();
				var p = f._loopX ? 1 : 0,
					d = f._loopY ? 1 : 0;
				m._goToPage(m.currentPage.pageX || p, m.currentPage.pageY || d, 0, void 0, !0);
				var u = f.threshold;
				m.snapThresholdY = u % 1 == 0 ? m.snapThresholdX = u : (m.snapThresholdX = Math.round(m.pages[m.currentPage.pageX][m.currentPage.pageY].width * u), Math.round(m.pages[m.currentPage.pageX][m.currentPage.pageY].height * u))
			}
		}), this.on("scrollEnd", function() {
			f.loop && (f._loopX ? (0 === m.currentPage.pageX && m._goToPage(m.pages.length - 2, m.currentPage.pageY, 0, void 0, !0), m.currentPage.pageX === m.pages.length - 1 && m._goToPage(1, m.currentPage.pageY, 0, void 0, !0)) : (0 === m.currentPage.pageY && m._goToPage(m.currentPage.pageX, m.pages[0].length - 2, 0, void 0, !0), m.currentPage.pageY === m.pages[0].length - 1 && m._goToPage(m.currentPage.pageX, 1, 0, void 0, !0)))
		}), !1 !== f.listenFlick && this.on("flick", function() {
			var t = f.speed || Math.max(Math.max(Math.min(Math.abs(m.x - m.startX), 1e3), Math.min(Math.abs(m.y - m.startY), 1e3)), 300);
			m._goToPage(m.currentPage.pageX + m.directionX, m.currentPage.pageY + m.directionY, t)
		}), this.on("destroy", function() {
			if(f.loop) {
				var t = m.scroller.children;
				2 < t.length && (D(m.scroller, t[t.length - 1]), D(m.scroller, t[0]))
			}
		})
	}, U.prototype._checkSnapLoop = function() {
		var t = this.options.snap;
		t.loop && this.pages && this.pages.length && (1 < this.pages.length && (t._loopX = !0), this.pages[0] && 1 < this.pages[0].length && (t._loopY = !0), t._loopX && t._loopY && A("Loop does not support two direction at the same time."))
	}, U.prototype._nearestSnap = function(t, i) {
		if(!this.pages.length) return {
			x: 0,
			y: 0,
			pageX: 0,
			pageY: 0
		};
		var e = 0;
		if(Math.abs(t - this.absStartX) <= this.snapThresholdX && Math.abs(i - this.absStartY) <= this.snapThresholdY) return this.currentPage;
		t > this.minScrollX ? t = this.minScrollX : t < this.maxScrollX && (t = this.maxScrollX), i > this.minScrollY ? i = this.minScrollY : i < this.maxScrollY && (i = this.maxScrollY);
		for(var s = this.pages.length; e < s; e++)
			if(t >= this.pages[e][0].cx) {
				t = this.pages[e][0].x;
				break
			}
		s = this.pages[e].length;
		for(var o = 0; o < s; o++)
			if(i >= this.pages[0][o].cy) {
				i = this.pages[0][o].y;
				break
			}
		return e === this.currentPage.pageX && ((e += this.directionX) < 0 ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), o === this.currentPage.pageY && ((o += this.directionY) < 0 ? o = 0 : o >= this.pages[0].length && (o = this.pages[0].length - 1), i = this.pages[0][o].y), {
			x: t,
			y: i,
			pageX: e,
			pageY: o
		}
	}, U.prototype._goToPage = function(t) {
		var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
			e = arguments[2],
			s = arguments[3],
			o = arguments[4],
			n = this.options.snap;
		if(n && this.pages && this.pages.length && (s = s || n.easing || I.bounce, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), this.pages[t])) {
			i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
			var r = this.pages[t][i].x,
				h = this.pages[t][i].y;
			e = void 0 === e ? n.speed || Math.max(Math.max(Math.min(Math.abs(r - this.x), 1e3), Math.min(Math.abs(h - this.y), 1e3)), 300) : e, this.currentPage = {
				x: r,
				y: h,
				pageX: t,
				pageY: i
			}, this.scrollTo(r, h, e, s, o)
		}
	}, U.prototype.goToPage = function(t, i, e, s) {
		var o = this.options.snap;
		if(o && this.pages && this.pages.length) {
			if(o.loop) {
				var n = void 0;
				o._loopX ? ((n = this.pages.length - 2) <= t ? t = n - 1 : t < 0 && (t = 0), t += 1) : ((n = this.pages[0].length - 2) <= i ? i = n - 1 : i < 0 && (i = 0), i += 1)
			}
			this._goToPage(t, i, e, s)
		}
	}, U.prototype.next = function(t, i) {
		if(this.options.snap) {
			var e = this.currentPage.pageX,
				s = this.currentPage.pageY;
			++e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this._goToPage(e, s, t, i)
		}
	}, U.prototype.prev = function(t, i) {
		if(this.options.snap) {
			var e = this.currentPage.pageX,
				s = this.currentPage.pageY;
			--e < 0 && this.hasVerticalScroll && (e = 0, s--), this._goToPage(e, s, t, i)
		}
	}, U.prototype.getCurrentPage = function() {
		var t = this.options.snap;
		return t ? t.loop ? t._loopX ? a({}, this.currentPage, {
			pageX: this.currentPage.pageX - 1
		}) : a({}, this.currentPage, {
			pageY: this.currentPage.pageY - 1
		}) : this.currentPage : null
	}, (V = K).prototype.wheelTo = function() {
		var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
		if(this.options.wheel) {
			var i = -t * this.itemHeight;
			this.scrollTo(0, i)
		}
	}, V.prototype.getSelectedIndex = function() {
		return this.options.wheel && this.selectedIndex
	}, V.prototype._initWheel = function() {
		var t = this.options.wheel;
		t.wheelWrapperClass || (t.wheelWrapperClass = "wheel-scroll"), t.wheelItemClass || (t.wheelItemClass = "wheel-item"), t.wheelDisabledItemClass || (t.wheelDisabledItemClass = "wheel-disabled-item"), void 0 === t.selectedIndex && (t.selectedIndex = 0)
	}, V.prototype._findNearestValidWheel = function(t) {
		t = 0 < t ? 0 : t < this.maxScrollY ? this.maxScrollY : t;
		for(var i = this.options.wheel, e = Math.abs(Math.round(-t / this.itemHeight)), s = e, o = this.items; 0 <= e && -1 !== o[e].className.indexOf(i.wheelDisabledItemClass);) e--;
		if(e < 0)
			for(e = s; e <= o.length - 1 && -1 !== o[e].className.indexOf(i.wheelDisabledItemClass);) e++;
		return e === o.length && (e = s), {
			index: this.wheelItemsAllDisabled ? -1 : e,
			y: -e * this.itemHeight
		}
	}, V.prototype._checkWheelAllDisabled = function() {
		var t = this.options.wheel,
			i = this.items;
		this.wheelItemsAllDisabled = !0;
		for(var e = 0; e < i.length; e++)
			if(-1 === i[e].className.indexOf(t.wheelDisabledItemClass)) {
				this.wheelItemsAllDisabled = !1;
				break
			}
	}, (B = K).prototype._initScrollbar = function() {
		var i = this,
			t = this.options.scrollbar,
			e = t.fade,
			s = void 0 === e || e,
			o = t.interactive,
			n = void 0 !== o && o;
		this.indicators = [];
		var r = void 0;
		this.options.scrollX && (r = {
			el: O("horizontal"),
			direction: "horizontal",
			fade: s,
			interactive: n
		}, this._insertScrollBar(r.el), this.indicators.push(new L(this, r))), this.options.scrollY && (r = {
			el: O("vertical"),
			direction: "vertical",
			fade: s,
			interactive: n
		}, this._insertScrollBar(r.el), this.indicators.push(new L(this, r))), this.on("refresh", function() {
			for(var t = 0; t < i.indicators.length; t++) i.indicators[t].refresh()
		}), s && (this.on("scrollEnd", function() {
			for(var t = 0; t < i.indicators.length; t++) i.indicators[t].fade()
		}), this.on("scrollCancel", function() {
			for(var t = 0; t < i.indicators.length; t++) i.indicators[t].fade()
		}), this.on("scrollStart", function() {
			for(var t = 0; t < i.indicators.length; t++) i.indicators[t].fade(!0)
		}), this.on("beforeScrollStart", function() {
			for(var t = 0; t < i.indicators.length; t++) i.indicators[t].fade(!0, !0)
		})), this.on("destroy", function() {
			i._removeScrollBars()
		})
	}, B.prototype._insertScrollBar = function(t) {
		this.wrapper.appendChild(t)
	}, B.prototype._removeScrollBars = function() {
		for(var t = 0; t < this.indicators.length; t++) this.indicators[t].destroy()
	}, (q = K).prototype._initPullDown = function() {
		this.options.probeType = 3
	}, q.prototype._checkPullDown = function() {
		var t = this.options.pullDownRefresh,
			i = t.threshold,
			e = void 0 === i ? 90 : i,
			s = t.stop,
			o = void 0 === s ? 40 : s;
		return !(-1 !== this.directionY || this.y < e) && (this.pulling || (this.pulling = !0, this.trigger("pullingDown")), this.scrollTo(this.x, o, this.options.bounceTime, I.bounce), this.pulling)
	}, q.prototype.finishPullDown = function() {
		this.pulling = !1, this.resetPosition(this.options.bounceTime, I.bounce)
	}, q.prototype.openPullDown = function() {
		var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
		this.options.pullDownRefresh = t, this._initPullDown()
	}, q.prototype.closePullDown = function() {
		this.options.pullDownRefresh = !1
	}, q.prototype.autoPullDownRefresh = function() {
		var t = this.options.pullDownRefresh,
			i = t.threshold,
			e = void 0 === i ? 90 : i,
			s = t.stop,
			o = void 0 === s ? 40 : s;
		this.pulling || (this.pulling = !0, this.scrollTo(this.x, e), this.trigger("pullingDown"), this.scrollTo(this.x, o, this.options.bounceTime, I.bounce))
	}, (Z = K).prototype._initPullUp = function() {
		this.options.probeType = 3, this.pullupWatching = !1, this._watchPullUp()
	}, Z.prototype._watchPullUp = function() {
		this.pullupWatching || (this.pullupWatching = !0, this.on("scroll", this._checkToEnd))
	}, Z.prototype._checkToEnd = function(t) {
		var i = this,
			e = this.options.pullUpLoad.threshold,
			s = void 0 === e ? 0 : e;
		1 === this.movingDirectionY && t.y <= this.maxScrollY + s && (this.once("scrollEnd", function() {
			i.pullupWatching = !1
		}), this.trigger("pullingUp"), this.off("scroll", this._checkToEnd))
	}, Z.prototype.finishPullUp = function() {
		var t = this;
		this.pullupWatching ? this.once("scrollEnd", function() {
			t._watchPullUp()
		}) : this._watchPullUp()
	}, Z.prototype.openPullUp = function() {
		var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
		this.options.pullUpLoad = t, this._initPullUp()
	}, Z.prototype.closePullUp = function() {
		this.options.pullUpLoad = !1, this.pullupWatching && (this.pullupWatching = !1, this.off("scroll", this._checkToEnd))
	}, (j = K).prototype._initMouseWheel = function() {
		var t = this;
		this._handleMouseWheelEvent(p), this.on("destroy", function() {
			clearTimeout(t.mouseWheelTimer), clearTimeout(t.mouseWheelEndTimer), t._handleMouseWheelEvent(u)
		}), this.firstWheelOpreation = !0
	}, j.prototype._handleMouseWheelEvent = function(t) {
		t(this.wrapper, "wheel", this), t(this.wrapper, "mousewheel", this), t(this.wrapper, "DOMMouseScroll", this)
	}, j.prototype._onMouseWheel = function(t) {
		var i = this;
		if(this.enabled) {
			t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.firstWheelOpreation && this.trigger("scrollStart"), this.firstWheelOpreation = !1;
			var e = this.options.mouseWheel,
				s = e.speed,
				o = void 0 === s ? 20 : s,
				n = e.invert,
				r = void 0 !== n && n,
				h = e.easeTime,
				a = void 0 === h ? 300 : h;
			clearTimeout(this.mouseWheelTimer), this.mouseWheelTimer = setTimeout(function() {
				i.options.snap || a || i.trigger("scrollEnd", {
					x: i.x,
					y: i.y
				}), i.firstWheelOpreation = !0
			}, 400);
			var l = void 0,
				c = void 0;
			switch(!0) {
				case "deltaX" in t:
					c = 1 === t.deltaMode ? (l = -t.deltaX * o, -t.deltaY * o) : (l = -t.deltaX, -t.deltaY);
					break;
				case "wheelDeltaX" in t:
					l = t.wheelDeltaX / 120 * o, c = t.wheelDeltaY / 120 * o;
					break;
				case "wheelDelta" in t:
					l = c = t.wheelDelta / 120 * o;
					break;
				case "detail" in t:
					l = c = -t.detail / 3 * o;
					break;
				default:
					return
			}
			var p = r ? -1 : 1;
			l *= p, c *= p, this.hasVerticalScroll || (l = c, c = 0);
			var d = void 0,
				u = void 0;
			if(this.options.snap) return d = this.currentPage.pageX, u = this.currentPage.pageY, 0 < l ? d-- : l < 0 && d++, 0 < c ? u-- : c < 0 && u++, void this._goToPage(d, u);
			d = this.x + Math.round(this.hasHorizontalScroll ? l : 0), u = this.y + Math.round(this.hasVerticalScroll ? c : 0), this.movingDirectionX = this.directionX = 0 < l ? -1 : l < 0 ? 1 : 0, this.movingDirectionY = this.directionY = 0 < c ? -1 : c < 0 ? 1 : 0, d > this.minScrollX ? d = this.minScrollX : d < this.maxScrollX && (d = this.maxScrollX), u > this.minScrollY ? u = this.minScrollY : u < this.maxScrollY && (u = this.maxScrollY);
			var m = this.y === u;
			this.scrollTo(d, u, a, I.swipe), this.trigger("scroll", {
				x: this.x,
				y: this.y
			}), clearTimeout(this.mouseWheelEndTimer), m && (this.mouseWheelEndTimer = setTimeout(function() {
				i.trigger("scrollEnd", {
					x: i.x,
					y: i.y
				})
			}, a))
		}
	}, (G = K).prototype._initZoom = function() {
		var t = this.options.zoom,
			i = t.start,
			e = void 0 === i ? 1 : i,
			s = t.min,
			o = void 0 === s ? 1 : s,
			n = t.max,
			r = void 0 === n ? 4 : n;
		this.scale = Math.min(Math.max(e, o), r), this.setScale(this.scale), this.scrollerStyle[_.transformOrigin] = "0 0"
	}, G.prototype._zoomTo = function(t, i, e, s) {
		this.scaled = !0;
		var o = t / (s || this.scale);
		this.setScale(t), this.refresh();
		var n = Math.round(this.startX - (i - this.relativeX) * (o - 1)),
			r = Math.round(this.startY - (e - this.relativeY) * (o - 1));
		n > this.minScrollX ? n = this.minScrollX : n < this.maxScrollX && (n = this.maxScrollX), r > this.minScrollY ? r = this.minScrollY : r < this.maxScrollY && (r = this.maxScrollY), this.x === n && this.y === r || this.scrollTo(n, r, this.options.bounceTime), this.scaled = !1
	}, G.prototype.zoomTo = function(t, i, e) {
		var s = f(this.wrapper),
			o = s.left,
			n = s.top,
			r = i + o - this.x,
			h = e + n - this.y;
		this._zoomTo(t, r, h)
	}, G.prototype._zoomStart = function(t) {
		var i = t.touches[0],
			e = t.touches[1],
			s = Math.abs(i.pageX - e.pageX),
			o = Math.abs(i.pageY - e.pageY);
		this.startDistance = d(s, o), this.startScale = this.scale;
		var n = f(this.wrapper),
			r = n.left,
			h = n.top;
		this.originX = Math.abs(i.pageX + e.pageX) / 2 + r - this.x, this.originY = Math.abs(i.pageY + e.pageY) / 2 + h - this.y, this.trigger("zoomStart")
	}, G.prototype._zoom = function(t) {
		if(this.enabled && !this.destroyed && Y[t.type] === this.initiated) {
			this.options.preventDefault && t.preventDefault(), this.options.stopPropagation && t.stopPropagation();
			var i = t.touches[0],
				e = t.touches[1],
				s = d(Math.abs(i.pageX - e.pageX), Math.abs(i.pageY - e.pageY)) / this.startDistance * this.startScale;
			this.scaled = !0;
			var o = this.options.zoom,
				n = o.min,
				r = void 0 === n ? 1 : n,
				h = o.max,
				a = void 0 === h ? 4 : h;
			s < r ? s = .5 * r * Math.pow(2, s / r) : a < s && (s = 2 * a * Math.pow(.5, a / s));
			var l = s / this.startScale,
				c = this.startX - (this.originX - this.relativeX) * (l - 1),
				p = this.startY - (this.originY - this.relativeY) * (l - 1);
			this.setScale(s), this.scrollTo(c, p, 0)
		}
	}, G.prototype._zoomEnd = function(t) {
		if(this.enabled && !this.destroyed && Y[t.type] === this.initiated) {
			this.options.preventDefault && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.isInTransition = !1, this.isAnimating = !1, this.initiated = 0;
			var i = this.options.zoom,
				e = i.min,
				s = void 0 === e ? 1 : e,
				o = i.max,
				n = void 0 === o ? 4 : o,
				r = this.scale > n ? n : this.scale < s ? s : this.scale;
			this._zoomTo(r, this.originX, this.originY, this.startScale), this.trigger("zoomEnd")
		}
	}, K.prototype._initInfinite = function() {
		this.options.probeType = 3, this.maxScrollY = -2e3, this.infiniteScroller = new J(this, this.options.infinity)
	}, K.Version = "1.15.2", K
});