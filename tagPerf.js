// version 0.8.18 - 11/07/2023
!function(t,e){(!tC.tagPerfSampling&&0==Math.floor(500*Math.random())||tC.tagPerfSampling&&0==Math.floor(Math.random()*tC.tagPerfSampling))&&tC.containersLaunched&&(t.tC.tagPerfAnalyzer=new function(n,a){var r=tC.tagPerf?tC.tagPerf.pagePatterns:tC.tagPatterns,o=("http:"==e.location.protocol?"http:":"https:")+"//tag.commander1.com/tagsperf",s=[],c={};for(var d in this.tags={},tC.tagPerf&&(r=r.concat(tC.tagPerf.customPatterns)),this.concatPatterns=function(){var t=[];for(var e in r)r[e].hasOwnProperty("p")&&t.push(r[e].p);return t.join("|")},this.getPageMetrics=function(){var e,r=n.performance.timing.navigationStart;return function(){if("msFirstPaint"in n.performance.timing?e=n.performance.timing.msFirstPaint-r:t.performance.getEntriesByType("paint").length>0&&(e=t.performance.getEntriesByType("paint")[0].startTime),void 0===e||e<0||e>12e4){e=n.performance.timing.responseStart-r;for(var i={},o=a.getElementsByTagName("head")[0].children,s=0;s<o.length;s++){var c=o[s];"SCRIPT"==c.tagName&&c.src&&!c.async&&(i[c.src]=!0),"LINK"==c.tagName&&"stylesheet"==c.rel&&c.href&&(i[c.href]=!0)}for(var d=n.performance.getEntriesByType("resource"),g=!1,f=0;f<d.length;f++)if(g||!i[d[f].name]||"script"!=d[f].initiatorType&&"link"!=d[f].initiatorType)g=!0;else{var h=d[f].responseEnd;(void 0===e||h>e)&&(e=h)}}e=Math.max(e,0)}(),{dr:Math.round(n.performance.timing.domContentLoadedEventEnd-r),fp:Math.round(e),dl:Math.round(n.performance.timing.loadEventEnd-r)}},tC.containersLaunched)s.push(d);this.processPage=function(){this.fullRegex=new RegExp(this.concatPatterns(),"i");var t={};if(!(0>=(c=this.getPageMetrics()).dl||c.dl>32e3||0>=c.dr||c.dr>32e3||0>=c.fp||c.fp>32e3)){for(var e in tC.containersLaunched)for(var a in tC.containersLaunched[e])for(var r in tC.containersLaunched[e][a].t)t[e+"_"+a+"_"+tC.containersLaunched[e][a].t[r].id]=1;for(var i=n.performance.getEntriesByType("resource"),d=i.length;d--;)this.processTag(i[d],t);var g={s:s.join("|"),dr:Math.min(c.dr,32e3),dl:Math.min(c.dl,32e3),fp:Math.min(c.fp,32e3),ev:tC.tagPerf.env_template||tc_vars.env_template||"default",tg:encodeURIComponent(JSON.stringify(this.tags))};if("custom_segment"in n.tc_vars&&(g.cs=n.tc_vars.custom_segment),navigator&&"sendBeacon"in navigator)navigator.sendBeacon(o,JSON.stringify(g));else{var f=Object.keys(g).map(function(t){return t+"="+g[t]}).join("&"),h=o+"?"+f;h.length<1500&&((new Image).src=h)}}},this.processTag=function(t,e){if(!(t.duration<0)){var n=t.name,a=function(t){var e=0;for(i=0;i<t.length;i++)char=t.charCodeAt(i),e=(e<<5)-e+char,e&=e;return Math.abs(e)};if(this.fullRegex.test(n))for(var o=0;o<r.length;o++)if(new RegExp(r[o].p,"i").test(n)){var s,d,g,f;if(d=g="",r[o].id?(s=r[o].id,d=r[o].sid,g=r[o].cid,r[o].label?(f=r[o].label,id_tpl=0):id_tpl=r[o].idt):r[o].label&&(s="999"+a(f=r[o].label),r[o].id_site&&r[o].id_container&&(d=r[o].id_site,g=r[o].id_container)),void 0===f&&void 0===e[d+"_"+g+"_"+s])continue;var h="t"+d+"_"+g+"_"+s;return h in this.tags||(this.tags["t"+d+"_"+g+"_"+s]={id:s,c:g,s:d,bdr:0,bfp:0,bdl:0,t:0},void 0!==f&&(this.tags[h].lb=f)),t.startTime<c.dr&&(this.tags[h].bdr+=Math.min(Math.round(t.duration),32e3)),t.startTime<c.fp&&(this.tags[h].bfp+=Math.min(Math.round(t.duration),32e3)),t.startTime<c.dl&&(this.tags[h].bdl+=Math.min(Math.round(t.duration),32e3)),this.tags[h].t+=Math.min(Math.round(t.duration),32e3),!0}return!1}},n.performance&&n.performance.getEntriesByType&&setTimeout(function(t){t.processPage()},2e3,this)}(t,e))}(window,document);
