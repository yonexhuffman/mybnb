/*!
 * # Custom Semantic UI - Calendar
 */

;(function (e, t, n, i) {
     e.fn.calendar = function (t) {
         var o, a = e(this),
             r = a.selector || "",
             s = (new Date).getTime(),
             c = [],
             l = arguments[0],
             u = "string" == typeof l,
             d = [].slice.call(arguments, 1);
         return a.each(function () {
             var a, f, m = e.isPlainObject(t) ? e.extend(!0, {}, e.fn.calendar.settings, t) : e.extend({}, e.fn.calendar.settings),
                 g = m.className,
                 p = m.namespace,
                 h = m.selector,
                 v = m.formatter,
                 b = m.parser,
                 y = m.metadata,
                 x = m.error,
                 C = "." + p,
                 w = "module-" + p,
                 k = e(this),
                 T = k.find(h.input),
                 S = k.find(h.popup),
                 A = k.find(h.activator),
                 D = this,
                 R = k.data(w),
                 E = !1,
                 P = !1;
             f = {
                 initialize: function () {
                     f.debug("Initializing calendar for", D), a = f.get.isTouch(), f.setup.popup(), f.setup.inline(), f.setup.input(), f.setup.date(), f.create.calendar(), f.bind.events(), f.instantiate()
                 },
                 instantiate: function () {
                     f.verbose("Storing instance of calendar"), R = f, k.data(w, R)
                 },
                 destroy: function () {
                     f.verbose("Destroying previous calendar for", D), k.removeData(w), f.unbind.events()
                 },
                 setup: {
                     popup: function () {
                         if (!m.inline && (A.length || (A = k.children().first(), A.length))) {
                             if (e.fn.popup === i) return void f.error(x.popup);
                             S.length || (S = e("<div/>").addClass(g.popup).prependTo(A.parent())), S.addClass(g.calendar);
                             var t = m.onVisible,
                                 n = m.onHidden;
                             T.length || (S.attr("tabindex", "0"), t = function () {
                                 return f.focus(), m.onVisible.apply(S, arguments)
                             }, n = function () {
                                 return f.blur(), m.onHidden.apply(S, arguments)
                             });
                             var o = function () {
                                     return f.set.focusDate(f.get.date()), f.set.mode(m.startMode), m.onShow.apply(S, arguments)
                                 },
                                 a = m.on || (T.length ? "focus" : "click"),
                                 r = e.extend({}, m.popupOptions, {
                                     popup: S,
                                     on: a,
                                     hoverable: "hover" === a,
                                     onShow: o,
                                     onVisible: t,
                                     onHide: m.onHide,
                                     onHidden: n
                                 });
                             f.popup(r)
                         }
                     },
                     inline: function () {
                         (!A.length || m.inline) && (S = e("<div/>").addClass(g.calendar).appendTo(k), T.length || S.attr("tabindex", "0"))
                     },
                     input: function () {
                         m.touchReadonly && T.length && a && T.prop("readonly", !0)
                     },
                     date: function () {
                         if (T.length) {
                             var e = T.val(),
                                 t = b.date(e, m);
                             f.set.date(t, m.formatInput, !1)
                         }
                     }
                 },
                 create: {
                     calendar: function () {
                         var t, n, i, o, a, r = f.get.mode(),
                             s = new Date,
                             c = f.get.date(),
                             l = f.get.focusDate(),
                             u = l || c || m.initialDate || s;
                         u = f.helper.dateInRange(u), l || (l = u, f.set.focusDate(l, !1, !1));
                         var d = u.getMinutes(),
                             p = u.getHours(),
                             h = u.getDate(),
                             b = u.getMonth(),
                             x = u.getFullYear(),
                             C = "year" === r,
                             w = "month" === r,
                             k = "day" === r,
                             T = "hour" === r,
                             A = "minute" === r,
                             D = "time" === m.type,
                             R = k ? 7 : T ? 4 : 3,
                             E = 7 === R ? "seven" : 4 === R ? "four" : "three",
                             P = k || T ? 6 : 4,
                             F = (new Date(x, b, 1).getDay() - m.firstDayOfWeek % 7 + 7) % 7;
                         if (!m.constantHeight && k) {
                             var O = new Date(x, b + 1, 0).getDate() + F;
                             P = Math.ceil(O / 7)
                         }
                         var q = C ? 10 : w ? 1 : 0,
                             j = k ? 1 : 0,
                             I = T || A ? 1 : 0,
                             z = T || A ? h : 1,
                             N = new Date(x - q, b - j, z - I, p),
                             M = new Date(x + q, b + j, z + I, p),
                             L = C ? new Date(10 * Math.ceil(x / 10) - 9, 0, 0) : w ? new Date(x, 0, 0) : k ? new Date(x, b, 0) : new Date(x, b, h, -1),
                             V = C ? new Date(10 * Math.ceil(x / 10) + 1, 0, 1) : w ? new Date(x + 1, 0, 1) : k ? new Date(x, b + 1, 1) : new Date(x, b, h + 1),
                             H = e("<table/>").addClass(g.table).addClass(E + " column").addClass(r);
                         if (!D) {
                             var U = e("<thead/>").appendTo(H);
                             o = e("<tr/>").appendTo(U), a = e("<th/>").attr("colspan", "" + R).appendTo(o);
                             var W = e("<span/>").addClass(g.link).appendTo(a);
                             W.text(v.header(u, r, m));
                             var B = w ? m.disableYear ? "day" : "year" : k ? m.disableMonth ? "year" : "month" : "day";
                             W.data(y.mode, B);
                             var Y = e("<span/>").addClass(g.prev).appendTo(a);
                             Y.data(y.focusDate, N), Y.toggleClass(g.disabledCell, !f.helper.isDateInRange(L, r)), e("<i/>").addClass(g.prevIcon).appendTo(Y);
                             var Q = e("<span/>").addClass(g.next).appendTo(a);
                             if (Q.data(y.focusDate, M), Q.toggleClass(g.disabledCell, !f.helper.isDateInRange(V, r)), e("<i/>").addClass(g.nextIcon).appendTo(Q), k)
                                 for (o = e("<tr/>").appendTo(U), t = 0; R > t; t++) a = e("<th/>").appendTo(o), a.text(v.dayColumnHeader((t + m.firstDayOfWeek) % 7, m))
                         }
                         var X = e("<tbody/>").appendTo(H);
                         for (t = C ? 10 * Math.ceil(x / 10) - 9 : k ? 1 - F : 0, n = 0; P > n; n++)
                             for (o = e("<tr/>").appendTo(X), i = 0; R > i; i++, t++) {
                                 var $ = C ? new Date(t, b, 1, p, d) : w ? new Date(x, t, 1, p, d) : k ? new Date(x, b, t, p, d) : T ? new Date(x, b, h, t) : new Date(x, b, h, p, 5 * t),
                                     K = C ? t : w ? m.text.monthsShort[t] : k ? $.getDate() : v.time($, m, !0);
                                 a = e("<td/>").addClass(g.cell).appendTo(o), a.text(K), a.data(y.date, $);
                                 var Z = k && $.getMonth() !== b || !f.helper.isDateInRange($, r),
                                     J = f.helper.dateEqual($, c, r);
                                 a.toggleClass(g.disabledCell, Z), a.toggleClass(g.activeCell, J), T || A || a.toggleClass(g.todayCell, f.helper.dateEqual($, s, r)), f.helper.dateEqual($, l, r) && f.set.focusDate($, !1, !1)
                             }
                         if (m.today) {
                             var G = e("<tr/>").appendTo(X),
                                 _ = e("<td/>").attr("colspan", "" + R).addClass(g.today).appendTo(G);
                             _.text(v.today(m)), _.data(y.date, s)
                         }
                         f.update.focus(!1, H), S.empty(), H.appendTo(S)
                     }
                 },
                 update: {
                     focus: function (t, n) {
                         n = n || S;
                         var i = f.get.mode(),
                             o = f.get.date(),
                             r = f.get.focusDate(),
                             s = f.get.startDate(),
                             c = f.get.endDate(),
                             l = (t ? r : null) || o || (a ? null : r);
                         n.find("td").each(function () {
                             var t = e(this),
                                 n = t.data(y.date);
                             if (n) {
                                 var o = t.hasClass(g.disabledCell),
                                     u = t.hasClass(g.activeCell),
                                     d = f.helper.dateEqual(n, r, i),
                                     m = l ? !!s && f.helper.isDateInRange(n, i, s, l) || !!c && f.helper.isDateInRange(n, i, l, c) : !1;
                                 t.toggleClass(g.focusCell, d && (!a || E)), t.toggleClass(g.rangeCell, m && !u && !o)
                             }
                         })
                     }
                 },
                 refresh: function () {
                     f.create.calendar()
                 },
                 bind: {
                     events: function () {
                         S.on("mousedown" + C, f.event.mousedown), S.on("touchstart" + C, f.event.mousedown), S.on("mouseup" + C, f.event.mouseup), S.on("touchend" + C, f.event.mouseup), S.on("mouseover" + C, f.event.mouseover), T.length ? (T.on("input" + C, f.event.inputChange), T.on("focus" + C, f.event.inputFocus), T.on("blur" + C, f.event.inputBlur), T.on("click" + C, f.event.inputClick), T.on("keydown" + C, f.event.keydown)) : S.on("keydown" + C, f.event.keydown)
                     }
                 },
                 unbind: {
                     events: function () {
                         S.off(C), T.length && T.off(C)
                     }
                 },
                 event: {
                     mouseover: function (t) {
                         var n = e(t.target),
                             i = n.data(y.date),
                             o = 1 === t.buttons;
                         i && f.set.focusDate(i, !1, !0, o)
                     },
                     mousedown: function (t) {
                         T.length && t.preventDefault(), E = t.type.indexOf("touch") >= 0;
                         var n = e(t.target),
                             i = n.data(y.date);
                         i && f.set.focusDate(i, !1, !0, !0)
                     },
                     mouseup: function (t) {
                         f.focus(), t.preventDefault(), t.stopPropagation(), E = !1;
                         var n = e(t.target),
                             i = n.parent();
                         (i.data(y.date) || i.data(y.focusDate) || i.data(y.mode)) && (n = i);
                         var o = n.data(y.date),
                             a = n.data(y.focusDate),
                             r = n.data(y.mode);
                         if (o) {
                             var s = n.hasClass(g.today);
                             f.selectDate(o, s)
                         } else a ? f.set.focusDate(a) : r && f.set.mode(r)
                     },
                     keydown: function (e) {
                         if ((27 === e.keyCode || 9 === e.keyCode) && f.popup("hide"), f.popup("is visible"))
                             if (37 === e.keyCode || 38 === e.keyCode || 39 === e.keyCode || 40 === e.keyCode) {
                                 var t = f.get.mode(),
                                     n = "day" === t ? 7 : "hour" === t ? 4 : 3,
                                     i = 37 === e.keyCode ? -1 : 38 === e.keyCode ? -n : 39 == e.keyCode ? 1 : n;
                                 i *= "minute" === t ? 5 : 1;
                                 var o = f.get.focusDate() || f.get.date() || new Date,
                                     a = o.getFullYear() + ("year" === t ? i : 0),
                                     r = o.getMonth() + ("month" === t ? i : 0),
                                     s = o.getDate() + ("day" === t ? i : 0),
                                     c = o.getHours() + ("hour" === t ? i : 0),
                                     l = o.getMinutes() + ("minute" === t ? i : 0),
                                     u = new Date(a, r, s, c, l);
                                 "time" === m.type && (u = f.helper.mergeDateTime(o, u)), f.helper.isDateInRange(u, t) && f.set.focusDate(u)
                             } else if (13 === e.keyCode) {
                             var d = f.get.focusDate();
                             d && f.selectDate(d)
                         }(38 === e.keyCode || 40 === e.keyCode) && (e.preventDefault(), f.popup("show"))
                     },
                     inputChange: function () {
                         var e = T.val(),
                             t = b.date(e, m);
                         f.set.date(t, !1)
                     },
                     inputFocus: function () {
                         S.addClass(g.active)
                     },
                     inputBlur: function () {
                         if (S.removeClass(g.active), m.formatInput) {
                             var e = f.get.date(),
                                 t = v.datetime(e, m);
                             T.val(t)
                         }
                     },
                     inputClick: function () {
                         f.popup("show")
                     }
                 },
                 get: {
                     date: function () {
                         return k.data(y.date)
                     },
                     focusDate: function () {
                         return k.data(y.focusDate)
                     },
                     startDate: function () {
                         var e = f.get.calendarModule(m.startCalendar);
                         return e ? e.get.date() : k.data(y.startDate)
                     },
                     endDate: function () {
                         var e = f.get.calendarModule(m.endCalendar);
                         return e ? e.get.date() : k.data(y.endDate)
                     },
                     mode: function () {
                         var t = k.data(y.mode) || m.startMode,
                             n = f.get.validModes();
                         return e.inArray(t, n) >= 0 ? t : "time" === m.type ? "hour" : "month" === m.type ? "month" : "year" === m.type ? "year" : "day"
                     },
                     validModes: function () {
                         var e = [];
                         return "time" !== m.type && (m.disableYear && "year" !== m.type || e.push("year"), (!m.disableMonth && "year" !== m.type || "month" === m.type) && e.push("month"), m.type.indexOf("date") >= 0 && e.push("day")), m.type.indexOf("time") >= 0 && (e.push("hour"), m.disableMinute || e.push("minute")), e
                     },
                     isTouch: function () {
                         try {
                             return n.createEvent("TouchEvent"), !0
                         } catch (e) {
                             return !1
                         }
                     },
                     calendarModule: function (t) {
                         return t ? (t instanceof e || (t = k.parent().children(t).first()), t.data(w)) : null
                     }
                 },
                 set: {
                     date: function (e, t, n) {
                         t = t !== !1, n = n !== !1, e = f.helper.sanitiseDate(e), e = f.helper.dateInRange(e);
                         var o = v.datetime(e, m);
                         if (n && m.onChange.call(D, e, o) === !1) return !1;
                         var a = f.get.endDate();
                         a && e && e > a && f.set.endDate(i), f.set.dataKeyValue(y.date, e), f.set.focusDate(e), t && T.length && T.val(o)
                     },
                     startDate: function (e, t) {
                         e = f.helper.sanitiseDate(e);
                         var n = f.get.calendarModule(m.startCalendar);
                         n && n.set.date(e), f.set.dataKeyValue(y.startDate, e, t)
                     },
                     endDate: function (e, t) {
                         e = f.helper.sanitiseDate(e);
                         var n = f.get.calendarModule(m.endCalendar);
                         n && n.set.date(e), f.set.dataKeyValue(y.endDate, e, t)
                     },
                     focusDate: function (e, t, n, i) {
                         e = f.helper.sanitiseDate(e), e = f.helper.dateInRange(e);
                         var o = f.set.dataKeyValue(y.focusDate, e, t);
                         n = n !== !1 && o && t === !1 || P != i, P = i, n && f.update.focus(i)
                     },
                     mode: function (e, t) {
                         f.set.dataKeyValue(y.mode, e, t)
                     },
                     dataKeyValue: function (e, t, n) {
                         var i = k.data(e),
                             o = i === t || t >= i && i >= t;
                         return t ? k.data(e, t) : k.removeData(e), n = n !== !1 && !o, n && f.create.calendar(), !o
                     }
                 },
                 selectDate: function (e, t) {
                     var n = f.get.mode(),
                         i = t || "minute" === n || m.disableMinute && "hour" === n || "date" === m.type && "day" === n || "month" === m.type && "month" === n || "year" === m.type && "year" === n;
                     if (i) {
                         var o = f.set.date(e) === !1;
                         if (!o && m.closable) {
                             f.popup("hide");
                             var a = f.get.calendarModule(m.endCalendar);
                             a && (a.popup("show"), a.focus())
                         }
                     } else {
                         var r = "year" === n ? m.disableMonth ? "day" : "month" : "month" === n ? "day" : "day" === n ? "hour" : "minute";
                         f.set.mode(r), "hour" === n || "day" === n && f.get.date() ? f.set.date(e) : f.set.focusDate(e)
                     }
                 },
                 changeDate: function (e) {
                     f.set.date(e)
                 },
                 clear: function () {
                     f.set.date(i)
                 },
                 popup: function () {
                     return A.popup.apply(A, arguments)
                 },
                 focus: function () {
                     T.length ? T.focus() : S.focus()
                 },
                 blur: function () {
                     T.length ? T.blur() : S.blur()
                 },
                 helper: {
                     sanitiseDate: function (e) {
                         return e ? (e instanceof Date || (e = b.date("" + e)), isNaN(e.getTime()) ? i : e) : i
                     },
                     dateDiff: function (e, t, n) {
                         n = n || "day";
                         var i = "time" === m.type,
                             o = "year" === n,
                             a = o || "month" === n,
                             r = "minute" === n,
                             s = r || "hour" === n;
                         return e = new Date(i ? 2e3 : e.getFullYear(), i ? 0 : o ? 0 : e.getMonth(), i ? 1 : a ? 1 : e.getDate(), s ? e.getHours() : 0, r ? Math.floor(e.getMinutes() / 5) : 0), t = new Date(i ? 2e3 : t.getFullYear(), i ? 0 : o ? 0 : t.getMonth(), i ? 1 : a ? 1 : t.getDate(), s ? t.getHours() : 0, r ? Math.floor(t.getMinutes() / 5) : 0), t.getTime() - e.getTime()
                     },
                     dateEqual: function (e, t, n) {
                         return !!e && !!t && 0 === f.helper.dateDiff(e, t, n)
                     },
                     isDateInRange: function (e, t, n, i) {
                         if (!n && !i) {
                             var o = f.get.startDate();
                             n = o && m.minDate ? Math.max(o, m.minDate) : o || m.minDate, i = m.maxDate
                         }
                         return !(!e || n && f.helper.dateDiff(e, n, t) > 0 || i && f.helper.dateDiff(i, e, t) > 0)
                     },
                     dateInRange: function (e, t, n) {
                         if (!t && !n) {
                             var i = f.get.startDate();
                             t = i && m.minDate ? Math.max(i, m.minDate) : i || m.minDate, n = m.maxDate
                         }
                         var o = "time" === m.type;
                         return e ? t && f.helper.dateDiff(e, t, "minute") > 0 ? o ? f.helper.mergeDateTime(e, t) : t : n && f.helper.dateDiff(n, e, "minute") > 0 ? o ? f.helper.mergeDateTime(e, n) : n : e : e
                     },
                     mergeDateTime: function (e, t) {
                         return e && t ? new Date(e.getFullYear(), e.getMonth(), e.getDate(), t.getHours(), t.getMinutes()) : t
                     }
                 },
                 setting: function (t, n) {
                     if (f.debug("Changing setting", t, n), e.isPlainObject(t)) e.extend(!0, m, t);
                     else {
                         if (n === i) return m[t];
                         m[t] = n
                     }
                 },
                 internal: function (t, n) {
                     if (e.isPlainObject(t)) e.extend(!0, f, t);
                     else {
                         if (n === i) return f[t];
                         f[t] = n
                     }
                 },
                 debug: function () {
                     m.debug && (m.performance ? f.performance.log(arguments) : (f.debug = Function.prototype.bind.call(console.info, console, m.name + ":"), f.debug.apply(console, arguments)))
                 },
                 verbose: function () {
                     m.verbose && m.debug && (m.performance ? f.performance.log(arguments) : (f.verbose = Function.prototype.bind.call(console.info, console, m.name + ":"), f.verbose.apply(console, arguments)))
                 },
                 error: function () {
                     f.error = Function.prototype.bind.call(console.error, console, m.name + ":"), f.error.apply(console, arguments)
                 },
                 performance: {
                     log: function (e) {
                         var t, n, i;
                         m.performance && (t = (new Date).getTime(), i = s || t, n = t - i, s = t, c.push({
                             Name: e[0],
                             Arguments: [].slice.call(e, 1) || "",
                             Element: D,
                             "Execution Time": n
                         })), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 500)
                     },
                     display: function () {
                         var t = m.name + ":",
                             n = 0;
                         s = !1, clearTimeout(f.performance.timer), e.each(c, function (e, t) {
                             n += t["Execution Time"]
                         }), t += " " + n + "ms", r && (t += " '" + r + "'"), (console.group !== i || console.table !== i) && c.length > 0 && (console.groupCollapsed(t), console.table ? console.table(c) : e.each(c, function (e, t) {
                             console.log(t.Name + ": " + t["Execution Time"] + "ms")
                         }), console.groupEnd()), c = []
                     }
                 },
                 invoke: function (t, n, a) {
                     var r, s, c, l = R;
                     return n = n || d, a = D || a, "string" == typeof t && l !== i && (t = t.split(/[\. ]/), r = t.length - 1, e.each(t, function (n, o) {
                         var a = n != r ? o + t[n + 1].charAt(0).toUpperCase() + t[n + 1].slice(1) : t;
                         if (e.isPlainObject(l[a]) && n != r) l = l[a];
                         else {
                             if (l[a] !== i) return s = l[a], !1;
                             if (!e.isPlainObject(l[o]) || n == r) return l[o] !== i ? (s = l[o], !1) : (f.error(x.method, t), !1);
                             l = l[o]
                         }
                     })), e.isFunction(s) ? c = s.apply(a, n) : s !== i && (c = s), e.isArray(o) ? o.push(c) : o !== i ? o = [o, c] : c !== i && (o = c), s
                 }
             }, u ? (R === i && f.initialize(), f.invoke(l)) : (R !== i && R.invoke("destroy"), f.initialize())
         }), o !== i ? o : a
     }, e.fn.calendar.settings = {
         name: "Calendar",
         namespace: "calendar",
         debug: !1,
         verbose: !1,
         performance: !1,
         type: "datetime",
         firstDayOfWeek: 0,
         constantHeight: !0,
         today: !1,
         closable: !0,
         monthFirst: !0,
         touchReadonly: !0,
         inline: !1,
         on: null,
         initialDate: null,
         startMode: !1,
         minDate: null,
         maxDate: null,
         ampm: !0,
         disableYear: !1,
         disableMonth: !1,
         disableMinute: !1,
         formatInput: !0,
         startCalendar: null,
         endCalendar: null,
         popupOptions: {
             position: "bottom left",
             lastResort: "bottom left",
             prefer: "opposite",
             hideOnScroll: !1
         },
         text: {
             days: ["S", "M", "T", "W", "T", "F", "S"],
             months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
             monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
             today: "Today",
             now: "Now",
             am: "AM",
             pm: "PM"
         },
         formatter: {
             header: function (e, t, n) {
                 return "year" === t ? n.formatter.yearHeader(e, n) : "month" === t ? n.formatter.monthHeader(e, n) : "day" === t ? n.formatter.dayHeader(e, n) : "hour" === t ? n.formatter.hourHeader(e, n) : n.formatter.minuteHeader(e, n)
             },
             yearHeader: function (e, t) {
                 var n = 10 * Math.ceil(e.getFullYear() / 10);
                 return n - 9 + " - " + (n + 2)
             },
             monthHeader: function (e, t) {
                 return e.getFullYear()
             },
             dayHeader: function (e, t) {
                 var n = t.text.months[e.getMonth()],
                     i = e.getFullYear();
                 return n + " " + i
             },
             hourHeader: function (e, t) {
                 return t.formatter.date(e, t)
             },
             minuteHeader: function (e, t) {
                 return t.formatter.date(e, t)
             },
             dayColumnHeader: function (e, t) {
                 return t.text.days[e]
             },
             datetime: function (e, t) {
                 if (!e) return "";
                 var n = "time" === t.type ? "" : t.formatter.date(e, t),
                     i = t.type.indexOf("time") < 0 ? "" : t.formatter.time(e, t, !1),
                     o = "datetime" === t.type ? " " : "";
                 return n + o + i
             },
             date: function (e, t) {
                 if (!e) return "";
                 var n = e.getDate(),
                     i = t.text.months[e.getMonth()],
                     o = e.getFullYear();
                 return "year" === t.type ? o : "month" === t.type ? i + " " + o : (t.monthFirst ? i + " " + n : n + " " + i) + ", " + o
             },
             time: function (e, t, n) {
                 if (!e) return "";
                 var i = e.getHours(),
                     o = e.getMinutes(),
                     a = "";
                 return t.ampm && (a = " " + (12 > i ? t.text.am : t.text.pm), i = 0 === i ? 12 : i > 12 ? i - 12 : i), i + ":" + (10 > o ? "0" : "") + o + a
             },
             today: function (e) {
                 return "date" === e.type ? e.text.today : e.text.now
             }
         },
         parser: {
             date: function (t, n) {
                 if (!t) return null;
                 if (t = ("" + t).trim().toLowerCase(), 0 === t.length) return null;
                 var o, a, r, s = -1,
                     c = -1,
                     l = -1,
                     u = -1,
                     d = -1,
                     f = i,
                     m = "time" === n.type,
                     g = n.type.indexOf("time") < 0,
                     p = t.split(n.regExp.dateWords),
                     h = t.split(n.regExp.dateNumbers);
                 if (!g)
                     for (f = e.inArray(n.text.am.toLowerCase(), p) >= 0 ? !0 : e.inArray(n.text.pm.toLowerCase(), p) >= 0 ? !1 : i, o = 0; o < h.length; o++) {
                         var v = h[o];
                         if (v.indexOf(":") >= 0) {
                             if (0 > c || 0 > s) {
                                 var b = v.split(":");
                                 for (r = 0; r < Math.min(2, b.length); r++) a = parseInt(b[r]), isNaN(a) && (a = 0), 0 === r ? c = a % 24 : s = a % 60
                             }
                             h.splice(o, 1)
                         }
                     }
                 if (!m) {
                     for (o = 0; o < p.length; o++) {
                         var y = p[o];
                         if (!(y.length <= 0)) {
                             for (y = y.substring(0, Math.min(y.length, 3)), a = 0; a < n.text.months.length; a++) {
                                 var x = n.text.months[a];
                                 if (x = x.substring(0, Math.min(y.length, Math.min(x.length, 3))).toLowerCase(), x === y) {
                                     u = a + 1;
                                     break
                                 }
                             }
                             if (u >= 0) break
                         }
                     }
                     for (o = 0; o < h.length; o++)
                         if (a = parseInt(h[o]), !isNaN(a) && a > 59) {
                             d = a, h.splice(o, 1);
                             break
                         }
                     if (0 > u)
                         for (o = 0; o < h.length; o++)
                             if (r = o > 1 || n.monthFirst ? o : 1 === o ? 0 : 1, a = parseInt(h[r]), !isNaN(a) && a >= 1 && 12 >= a) {
                                 u = a, h.splice(r, 1);
                                 break
                             }
                     for (o = 0; o < h.length; o++)
                         if (a = parseInt(h[o]), !isNaN(a) && a >= 1 && 31 >= a) {
                             l = a, h.splice(o, 1);
                             break
                         }
                     if (0 > d)
                         for (o = h.length - 1; o >= 0; o--)
                             if (a = parseInt(h[o]), !isNaN(a)) {
                                 99 > a && (a += 2e3), d = a, h.splice(o, 1);
                                 break
                             }
                 }
                 if (!g) {
                     if (0 > c)
                         for (o = 0; o < h.length; o++)
                             if (a = parseInt(h[o]), !isNaN(a) && a >= 0 && 23 >= a) {
                                 c = a, h.splice(o, 1);
                                 break
                             }
                     if (0 > s)
                         for (o = 0; o < h.length; o++)
                             if (a = parseInt(h[o]), !isNaN(a) && a >= 0 && 59 >= a) {
                                 s = a, h.splice(o, 1);
                                 break
                             }
                 }
                 if (0 > s && 0 > c && 0 > l && 0 > u && 0 > d) return null;
                 0 > s && (s = 0), 0 > c && (c = 0), 0 > l && (l = 1), 0 > u && (u = 1), 0 > d && (d = (new Date).getFullYear()), f !== i && (f ? 12 === c && (c = 0) : 12 > c && (c += 12));
                 var C = new Date(d, u - 1, l, c, s);
                 return (C.getMonth() !== u - 1 || C.getFullYear() !== d) && (C = new Date(d, u, 0, c, s)), isNaN(C.getTime()) ? null : C
             }
         },
         onChange: function (e, t) {
             return !0
         },
         onShow: function () {},
         onVisible: function () {},
         onHide: function () {},
         onHidden: function () {},
         selector: {
             popup: ".ui.popup",
             input: "input",
             activator: "input"
         },
         regExp: {
             dateWords: /[^A-Za-z\u00C0-\u024F]+/g,
             dateNumbers: /[^\d:]+/g
         },
         error: {
             popup: "UI Popup, a required component is not included in this page",
             method: "The method you called is not defined."
         },
         className: {
             calendar: "calendar-sq",
             active: "active",
             popup: "ui popup",
             table: "ui celled center aligned unstackable table",
             prev: "prev link",
             next: "next link",
             prevIcon: "chevron left icon",
             nextIcon: "chevron right icon",
             link: "link",
             cell: "link",
             disabledCell: "disabled",
             activeCell: "active",
             rangeCell: "range",
             focusCell: "focus",
             todayCell: "today",
             today: "today link"
         },
         metadata: {
             date: "date",
             focusDate: "focusDate",
             startDate: "startDate",
             endDate: "endDate",
             mode: "mode"
         }
     }
 })(jQuery, window, document);