AdService = window.AdService || [];
AdService.push(function() {
	AdService.AdSlot('v_preroll').setParam({'max_ad_duration': 30000, 'sz': '640x480'});
	AdService.AdSlot('v_postroll').setParam({'max_ad_duration': 30000, 'sz': '640x480'});
});
Object.assign(window.ui.AdServiceConfig, {
	configurations: {
		sizes: {
			'top': {
				'sizes': window.ui.viewportSize == "tablet" ? [[728,90],[468,60],[320,75],[320,50],[300,50],[300,75]] : [[970,250],[800,250],[970,90],[728,90],[468,60]]
			},
			'right': {
				'sizes': [[300,600],[200,600],[160,600],[120,600]]
			},
			'contentad_1': {
				'sizes': [[800,250],[300,250],[728,90],[468,60]]
			},
			'contentad_2': {
				'sizes': [[300,250]]
			},
			'box_1': {
				'sizes': window.ui.viewportSize == "tablet" ? [[300,250]] : [[300,600],[300,250]]
			},
			'box_2': {
				'sizes': [[300,250]]
			},
			'box_3': {
				'sizes': [[300,250]]
			},
			'box_4': {
				'sizes': [[300,250]]
			},
			'box_5': {
				'sizes': [[300,250]]
			},
			'box_6': {
				'sizes': [[300,250]]
			},
			'box_7': {
				'sizes': [[300,250]]
			},
			'box_8': {
				'sizes': [[300,250]]
			},
			'box_9': {
				'sizes': [[300,250]]
			},
			'box_10': {
				'sizes': [[300,250]]
			},
			'box_11': {
				'sizes': [[300,250]]
			},
			'box_12': {
				'sizes': [[300,250]]
			},
			'box_13': {
				'sizes': [[300,250]]
			},
			'box_14': {
				'sizes': [[300,250]]
			},
			'box_15': {
				'sizes': [[300,250]]
			},
			'bottom': {
				'sizes': window.ui.viewportSize == "tablet" ? [[728,90],[468,60],[320,75],[320,50],[300,50],[300,75]] : [[970,250],[800,250],[970,90],[728,90],[468,60]]
			},
			'rectangle_exit': {
				'sizes': [[300,600],[300,250]]
			},
			'rectangle_exit_2': {
				'sizes': [[300,250]]
			},
			'rectangle_layer': {
				'sizes': [[300,600],[300,250]]
			},
			'rectangle_layer_2': {
				'sizes': [[300,250]]
			},
			'slider': {
				'sizes': [[728,90]]
			}
		}
	},
	exclusionRules: {},
	prebidRules: function() {
		AdService.AdSlot('contentad_1').setConfig('secure',false);
		AdService.setParam("layoutclass","b");
		AdService.setParam("deviceclass","b");
		AdService.setParam("deviceclient","browser");
		if(typeof (document.cookie.match(/(?:^|; )gdna=([^;]*)/i) || [0, false])[1] === 'string') {
			AdService.setParam("GDNA","1");
		} else {
			AdService.setParam("GDNA","0");
		}
		/* targeting */
		var pbTargeting = {};
		/* xandr id */
		function getCookieValue(cookie) {
			var val = document.cookie.match('(^|;)\\s*' + cookie + '\\s*=\\s*([^;]+)');
			return val ? val.pop() : '';
		}
		var pbXandr = undefined;
		/* params */
		var getPlacementName = function(tagid,adtype,short){
			var separator = short == 2 ? '-' : (short == 3 ? '/' : '|');
			return (short == 3 ? separator + AdService.getParam('network') + separator : '')+ AdService.getParam('portal') + separator + AdService.getParam('category') + (short == undefined || short == 3 ? separator + AdService.getParam('section') : '') + separator + tagid + (short == undefined || short == 2 ? separator + AdService.getParam('layoutclass') : '') + (short == undefined ? separator + AdService.getParam('deviceclass') + separator + AdService.getParam('deviceclient') : '') + (adtype !== undefined && adtype !== null ? separator + adtype : '');
		};
		/* prebid config */
		var domain = {'mailcom':'mail.com','gmxcom':'gmx.com','gmxes':'gmx.es','gmxfr':'gmx.fr','gmxcouk':'gmx.co.uk'}[AdService.getParam('portal')] || 'mail.com';
		var isDev = location.host.indexOf(".server.lan") !== -1 || location.host.indexOf("dev.") !== -1 || location.host.indexOf("qa.") !== -1 || location.href.indexOf("prebiddebug=1") !== -1 || location.host.indexOf(".cad.") !== -1;
		var runIt_simple = AdService.getParam('category') != 'advertorial' && AdService.info.abd().isBlocked != true && AdService.getParam('deviceclient') != 'browser_clean';
		var runIt = runIt_simple && (getCookieValue("uiconsent").indexOf("fullConsent") !== -1 || (AdService.getParam('tcf_pur').indexOf(',1,') != -1 && AdService.getParam('tcf_pur').indexOf(',2,') != -1 && AdService.getParam('tcf_pur').indexOf(',3,') != -1 && AdService.getParam('tcf_pur').indexOf(',4,') != -1 && AdService.getParam('tcf_pur').indexOf(',7,') != -1 && AdService.getParam('tcf_pub').indexOf(',1,') != -1 && AdService.getParam('tcf_pub').indexOf(',2,') != -1 && AdService.getParam('tcf_pub').indexOf(',3,') != -1 && AdService.getParam('tcf_pub').indexOf(',4,') != -1 && AdService.getParam('tcf_pub').indexOf(',7,') != -1));
		var pbConfig = {
			enabled: runIt && location.href.indexOf("disable_prebid=1") == -1 ? true : false,
			iframeUrl: '//dl.'+domain+'/uim/'+(isDev ? 'dev' : 'live')+'/logic_pbjs.html'+(isDev && document.cookie.indexOf("pbjsdebug=1") !== -1 ? '?pbjs_debug=true&apn_test=true' : ''),
			initial: ['top','right','contentad_1'/*,'contentad_2'*/,'box_1','box_2','box_3','bottom','slider'],
			slotSets: [['top','right','contentad_1'/*,'contentad_2'*/,'box_1','box_2','box_3','bottom','slider'],'rectangle_layer','rectangle_exit'],
			timeout: !isDev ? { initial: AdService.getParam('portal') == 'gmxcom' ? 1700 : 1700, slots: [900, 1000, 1200, 1500, 1800, 2100, 2400, 2700], auctionIframe: 3000 } : { initial: 10000, slots: [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000], auctionIframe: 10000 },
			passover: {
				timeout: !isDev ? { initial: { bidder: AdService.getParam('portal') == 'gmxcom' ? 1500 : 1500, total: 1900 }, slots: [{ bidder: 900, total: 900 }, { bidder: 1000, total: 1000 }, { bidder: 1200, total: 1200 }, { bidder: 1500, total: 1500 }, { bidder: 1800, total: 1800 }, { bidder: 2100, total: 2100 }, { bidder: 2400, total: 2400 }, { bidder: 2700, total: 2700 }], cmp: 7000 } : { initial: { bidder: 10000, total: 12000 }, slots: [{ bidder: 10000, total: 12000 }, { bidder: 10000, total: 12000 }, { bidder: 10000, total: 12000 }, { bidder: 10000, total: 12000 }, { bidder: 10000, total: 12000 }, { bidder: 10000, total: 12000 }, { bidder: 10000, total: 12000 }, { bidder: 10000, total: 12000 }], cmp: 7000 },
				slots: {},
				initial: ['top','right','contentad_1'/*,'contentad_2'*/,'box_1','box_2','box_3','bottom','slider'],
				params: {portal:AdService.getParam('portal'),category:AdService.getParam('category'),section:AdService.getParam('section'),layoutclass:AdService.getParam('layoutclass'),deviceclass:AdService.getParam('deviceclass'),deviceclient:AdService.getParam('deviceclient'),customdebug:AdService.getParam('customdebug'),amzn_debug_mode:AdService.getParam('amzn_debug_mode'),external_uid:AdService.getParam('external_uid'),forcetimeout:location.href.indexOf("forcetimeout=1") !== -1,int:1,location:location.pathname || '',cl:AdService.getParam("cl")}
			}
		};
		if(AdService.getParam('portal') == 'mailcom'){
			pbConfig.passover.slots = {
				'contentad_1': [{
					code: "contentad_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}}, pubstack:{adUnitName:"contentad_1",adUnitPath:getPlacementName("contentad_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("contentad_1")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340208",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662700",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613948"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1375424",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039727",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492059",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372886",zoneId:"2037978",position:"atf"}},
						{bidder:"adform",params:{mid:"1038966"}},
						{bidder:"sovrn",params:{tagid:"891349"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("contentad_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("contentad_1","medium_rectangle",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("contentad_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}
				}],
				'contentad_2': [],
				'top': [{
					code: "top|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("top")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340209",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662704",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613975"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1375425",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039730",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492060",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372886",zoneId:"2037980",position:"atf"}},
						{bidder:"adform",params:{mid:"1038979"}}
					]
				},{
					code: "top|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891350"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("top","billboard",1)}}
					]
				},{
					code: "top|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891351"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","leaderboard",2)}}
					]
				},{
					code: "top|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891352"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("top","superbanner",1)}}
					]
				},{
					code: "top|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891353"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("top","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("top","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}
				}],
				'box_1': [{
					code: "box_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340210",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662706",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613962"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1375426",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039733",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492061",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372886",zoneId:"2037982",position:"atf"}},
						{bidder:"adform",params:{mid:"1038972"}}
					]
				},{
					code: "box_1|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891354"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("box_1","halfpagead",1)}}
					]
				},{
					code: "box_1|mediumrectangle", mediaTypes: {banner:{sizes: [[300,250]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891355"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("box_1","medium_rectangle",1)}}
					]
				},{
					code: "box_1|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22942445",allowSmallerSizes:true,position:"above",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}
				}],
				'box_2': [{
					code: "box_2|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340211",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662708",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613949"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1375427",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039735",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492062",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372886",zoneId:"2037984",position:"btf"}},
						{bidder:"adform",params:{mid:"1038967"}},
						{bidder:"sovrn",params:{tagid:"891356"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_2","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("box_2","medium_rectangle",1)}}
					]
				},{
					code: "box_2|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22942445",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_2","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}
				}],
				'box_3': [{
					code: "box_3|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340212",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662709",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613950"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1375428",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039738",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492063",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372886",zoneId:"2037986",position:"btf"}},
						{bidder:"adform",params:{mid:"1038968"}},
						{bidder:"sovrn",params:{tagid:"891357"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_3","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("box_3","medium_rectangle",1)}}
					]
				},{
					code: "box_3|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22942445",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_3","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}
				}],
				'right': [{
					code: "right|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("right")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340213",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662711",size:[160,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613932"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1375429",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039734",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492064",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372886",zoneId:"2037988",position:"atf"}},
						{bidder:"adform",params:{mid:"1038975"}}
					]
				},{
					code: "right|skyscraper", mediaTypes: {banner:{sizes: [[160,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891359"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","wide_skyscraper",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("right","wide_skyscraper",1)}}
					]
				},{
					code: "right|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891358"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("right","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}
				}],
				'bottom': [{
					code: "bottom|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("bottom")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340214",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662716",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613976"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1375430",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039737",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492065",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372886",zoneId:"2037990",position:"atf"}},
						{bidder:"adform",params:{mid:"1038976"}}
					]
				},{
					code: "bottom|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891361"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("bottom","billboard",1)}}
					]
				},{
					code: "bottom|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891362"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","leaderboard",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("bottom","leaderboard",1)}}
					]
				},{
					code: "bottom|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891363"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("bottom","superbanner",1)}}
					]
				},{
					code: "bottom|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891364"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("bottom","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("bottom","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}
				}],
				'slider': [{
					code: "slider|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}}, pubstack:{adUnitName:"slider",adUnitPath:getPlacementName("slider",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("slider")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340215",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662718",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613977"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1375431",formatId:"75982"}},
						{bidder:"openx",params:{unit:"544039740",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492066",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372886",zoneId:"2037992",position:"btf"}},
						{bidder:"adform",params:{mid:"1038973"}},
						{bidder:"sovrn",params:{tagid:"891365"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("slider","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("slider","superbanner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("slider","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}
				}],
				'rectangle_layer': [{
					code: "rectangle_layer|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}}, pubstack:{adUnitName:"rectangle_layer",adUnitPath:getPlacementName("rectangle_layer",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_layer")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482047",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689411",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3908104"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1406408",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113841",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537603",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2104630",position:"atf"}},
						{bidder:"adform",params:{mid:"1071588"}},
						{bidder:"sovrn",params:{tagid:"926717"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_layer","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_layer","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}
				}],
				'rectangle_exit': [{
					code: "rectangle_exit|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}}, pubstack:{adUnitName:"rectangle_exit",adUnitPath:getPlacementName("rectangle_exit",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_exit")}},
						{bidder:"appnexus",params:{placementId:"21485689",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482048",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689412",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3908105"}},
						{bidder:"smart",params:{siteId:"407339",pageId:"1406411",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113844",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537604",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2104632",position:"atf"}},
						{bidder:"adform",params:{mid:"1071589"}},
						{bidder:"sovrn",params:{tagid:"926718"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_exit","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1554711",tagId:getPlacementName("rectangle_exit","halfpagead",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_exit","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}
				}]
			};
		} else if(AdService.getParam('portal') == 'gmxcom'){
			pbConfig.passover.slots = {
				'contentad_1': [{
					code: "contentad_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}}, pubstack:{adUnitName:"contentad_1",adUnitPath:getPlacementName("contentad_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("contentad_1")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340176",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662819",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613475"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1375409",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039708",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492045",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2037878",position:"atf"}},
						{bidder:"adform",params:{mid:"1038928"}},
						{bidder:"sovrn",params:{tagid:"891321"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("contentad_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("contentad_1","medium_rectangle",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("contentad_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}
				}],
				'contentad_2': [],
				'top': [{
					code: "top|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("top")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340177",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662823",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613469"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1375410",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039711",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492046",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2037880",position:"atf"}},
						{bidder:"adform",params:{mid:"1038941"}}
					]
				},{
					code: "top|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891323"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("top","billboard",1)}}
					]
				},{
					code: "top|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891325"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","leaderboard",2)}}
					]
				},{
					code: "top|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891327"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("top","superbanner",1)}}
					]
				},{
					code: "top|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891328"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("top","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("top","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}
				}],
				'box_1': [{
					code: "box_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340178",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662825",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613470"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1375412",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039714",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492047",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2037882",position:"atf"}},
						{bidder:"adform",params:{mid:"1038934"}}
					]
				},{
					code: "box_1|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891329"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("box_1","halfpagead",1)}}
					]
				},{
					code: "box_1|mediumrectangle", mediaTypes: {banner:{sizes: [[300,250]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891330"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("box_1","medium_rectangle",1)}}
					]
				},{
					code: "box_1|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22940947",allowSmallerSizes:true,position:"above",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}
				}],
				'box_2': [{
					code: "box_2|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340179",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662827",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613476"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1375413",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039717",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492048",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2037884",position:"btf"}},
						{bidder:"adform",params:{mid:"1038929"}},
						{bidder:"sovrn",params:{tagid:"891331"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_2","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("box_2","medium_rectangle",1)}}
					]
				},{
					code: "box_2|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22940947",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_2","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}
				}],
				'box_3': [{
					code: "box_3|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340180",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662828",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613477"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1375414",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039720",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492049",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2037886",position:"btf"}},
						{bidder:"adform",params:{mid:"1038930"}},
						{bidder:"sovrn",params:{tagid:"891332"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_3","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("box_3","medium_rectangle",1)}}
					]
				},{
					code: "box_3|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22940947",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_3","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}
				}],
				'right': [{
					code: "right|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("right")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340181",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662830",size:[160,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613471"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1375415",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039723",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492050",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2037888",position:"atf"}},
						{bidder:"adform",params:{mid:"1038937"}}
					]
				},{
					code: "right|skyscraper", mediaTypes: {banner:{sizes: [[160,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891334"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","wide_skyscraper",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("right","wide_skyscraper",1)}}
					]
				},{
					code: "right|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891333"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("right","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}
				}],
				'bottom': [{
					code: "bottom|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("bottom")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340182",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662835",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613472"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1375416",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039726",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492051",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2037890",position:"atf"}},
						{bidder:"adform",params:{mid:"1038938"}}
					]
				},{
					code: "bottom|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891336"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("bottom","billboard",1)}}
					]
				},{
					code: "bottom|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891337"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","leaderboard",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("bottom","leaderboard",1)}}
					]
				},{
					code: "bottom|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891338"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("bottom","superbanner",1)}}
					]
				},{
					code: "bottom|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891339"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("bottom","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("bottom","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}
				}],
				'slider': [{
					code: "slider|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}}, pubstack:{adUnitName:"slider",adUnitPath:getPlacementName("slider",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("slider")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340183",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"662837",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613478"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1375417",formatId:"75982"}},
						{bidder:"openx",params:{unit:"544039729",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492052",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2037892",position:"btf"}},
						{bidder:"adform",params:{mid:"1038935"}},
						{bidder:"sovrn",params:{tagid:"891340"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("slider","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("slider","superbanner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("slider","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}
				}],
				'rectangle_layer': [{
					code: "rectangle_layer|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}}, pubstack:{adUnitName:"rectangle_layer",adUnitPath:getPlacementName("rectangle_layer",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_layer")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482038",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689396",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3908072"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1406399",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113845",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537594",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2104624",position:"atf"}},
						{bidder:"adform",params:{mid:"1071581"}},
						{bidder:"sovrn",params:{tagid:"926708"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_layer","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_layer","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}
				}],
				'rectangle_exit': [{
					code: "rectangle_exit|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}}, pubstack:{adUnitName:"rectangle_exit",adUnitPath:getPlacementName("rectangle_exit",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_exit")}},
						{bidder:"appnexus",params:{placementId:"21485681",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482039",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689397",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3908073"}},
						{bidder:"smart",params:{siteId:"407335",pageId:"1406400",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113848",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537595",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372884",zoneId:"2104626",position:"atf"}},
						{bidder:"adform",params:{mid:"1071582"}},
						{bidder:"sovrn",params:{tagid:"926709"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_exit","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1554714",tagId:getPlacementName("rectangle_exit","halfpagead",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_exit","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}
				}]
			};
		} else if(AdService.getParam('portal') == 'gmxes'){
			pbConfig.passover.slots = {
				'contentad_1': [{
					code: "contentad_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}}, pubstack:{adUnitName:"contentad_1",adUnitPath:getPlacementName("contentad_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("contentad_1")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340192",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663557",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613609"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1375393",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039703",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492031",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2037778",position:"atf"}},
						{bidder:"adform",params:{mid:"1038845"}},
						{bidder:"sovrn",params:{tagid:"891278"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("contentad_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("contentad_1","medium_rectangle",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("contentad_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}
				}],
				'contentad_2': [],
				'top': [{
					code: "top|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("top")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340193",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663561",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613636"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1375394",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039706",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492032",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2037780",position:"atf"}},
						{bidder:"adform",params:{mid:"1038859"}}
					]
				},{
					code: "top|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891280"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("top","billboard",1)}}
					]
				},{
					code: "top|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891282"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","leaderboard",2)}}
					]
				},{
					code: "top|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891283"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("top","superbanner",1)}}
					]
				},{
					code: "top|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891285"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("top","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("top","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}
				}],
				'box_1': [{
					code: "box_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340194",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663563",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613625"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1375395",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039709",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492033",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2037782",position:"atf"}},
						{bidder:"adform",params:{mid:"1038852"}}
					]
				},{
					code: "box_1|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891287"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("box_1","halfpagead",1)}}
					]
				},{
					code: "box_1|mediumrectangle", mediaTypes: {banner:{sizes: [[300,250]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891290"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("box_1","medium_rectangle",1)}}
					]
				},{
					code: "box_1|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22940983",allowSmallerSizes:true,position:"above",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}
				}],
				'box_2': [{
					code: "box_2|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340195",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663565",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613610"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1375396",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039704",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492034",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2037784",position:"btf"}},
						{bidder:"adform",params:{mid:"1038846"}},
						{bidder:"sovrn",params:{tagid:"891292"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_2","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("box_2","medium_rectangle",1)}}
					]
				},{
					code: "box_2|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22940983",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_2","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}
				}],
				'box_3': [{
					code: "box_3|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340196",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663566",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613611"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1375397",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039707",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492035",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2037786",position:"btf"}},
						{bidder:"adform",params:{mid:"1038847"}},
						{bidder:"sovrn",params:{tagid:"891294"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_3","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("box_3","medium_rectangle",1)}}
					]
				},{
					code: "box_3|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22940983",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_3","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}
				}],
				'right': [{
					code: "right|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("right")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340197",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663568",size:[160,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613593"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1375398",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039710",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492036",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2037788",position:"atf"}},
						{bidder:"adform",params:{mid:"1038855"}}
					]
				},{
					code: "right|skyscraper", mediaTypes: {banner:{sizes: [[160,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891296"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","wide_skyscraper",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("right","wide_skyscraper",1)}}
					]
				},{
					code: "right|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891295"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("right","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}
				}],
				'bottom': [{
					code: "bottom|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("bottom")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340198",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663573",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613637"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1375399",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039713",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492037",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2037790",position:"atf"}},
						{bidder:"adform",params:{mid:"1038856"}}
					]
				},{
					code: "bottom|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891299"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("bottom","billboard",1)}}
					]
				},{
					code: "bottom|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891301"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","leaderboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("bottom","leaderboard",1)}}
					]
				},{
					code: "bottom|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891302"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("bottom","superbanner",1)}}
					]
				},{
					code: "bottom|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891304"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("bottom","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("bottom","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}
				}],
				'slider': [{
					code: "slider|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}}, pubstack:{adUnitName:"slider",adUnitPath:getPlacementName("slider",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("slider")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340199",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663575",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613638"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1375400",formatId:"75982"}},
						{bidder:"openx",params:{unit:"544039716",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492038",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2037792",position:"btf"}},
						{bidder:"adform",params:{mid:"1038853"}},
						{bidder:"sovrn",params:{tagid:"891305"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("slider","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("slider","superbanner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("slider","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}
				}],
				'rectangle_layer': [{
					code: "rectangle_layer|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}}, pubstack:{adUnitName:"rectangle_layer",adUnitPath:getPlacementName("rectangle_layer",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_layer")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482044",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689404",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3908086"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1406405",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113832",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537600",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2104600",position:"atf"}},
						{bidder:"adform",params:{mid:"1071662"}},
						{bidder:"sovrn",params:{tagid:"926714"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_layer","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_layer","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}
				}],
				'rectangle_exit': [{
					code: "rectangle_exit|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}}, pubstack:{adUnitName:"rectangle_exit",adUnitPath:getPlacementName("rectangle_exit",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_exit")}},
						{bidder:"appnexus",params:{placementId:"21485685",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482045",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689405",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3908087"}},
						{bidder:"smart",params:{siteId:"407329",pageId:"1406406",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113835",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537601",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372876",zoneId:"2104602",position:"atf"}},
						{bidder:"adform",params:{mid:"1071663"}},
						{bidder:"sovrn",params:{tagid:"926715"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_exit","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1555392",tagId:getPlacementName("rectangle_exit","halfpagead",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_exit","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}
				}]
			};
		} else if(AdService.getParam('portal') == 'gmxfr'){
			pbConfig.passover.slots = {
				'contentad_1': [{
					code: "contentad_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}}, pubstack:{adUnitName:"contentad_1",adUnitPath:getPlacementName("contentad_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("contentad_1")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340200",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"664760",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613719"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1375379",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039683",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492017",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2037672",position:"atf"}},
						{bidder:"adform",params:{mid:"1038739"}},
						{bidder:"sovrn",params:{tagid:"891229"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("contentad_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("contentad_1","medium_rectangle",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("contentad_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}
				}],
				'contentad_2': [],
				'top': [{
					code: "top|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("top")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340201",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"664764",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613744"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1375380",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039686",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492018",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2037674",position:"atf"}},
						{bidder:"adform",params:{mid:"1038752"}}
					]
				},{
					code: "top|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891231"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("top","billboard",1)}}
					]
				},{
					code: "top|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891232"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","leaderboard",2)}}
					]
				},{
					code: "top|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891234"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("top","superbanner",1)}}
					]
				},{
					code: "top|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891236"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("top","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("top","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}
				}],
				'box_1': [{
					code: "box_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340202",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"664766",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613733"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1375381",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039689",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492019",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2037676",position:"atf"}},
						{bidder:"adform",params:{mid:"1038745"}}
					]
				},{
					code: "box_1|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891238"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("box_1","halfpagead",1)}}
					]
				},{
					code: "box_1|mediumrectangle", mediaTypes: {banner:{sizes: [[300,250]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891240"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("box_1","medium_rectangle",1)}}
					]
				},{
					code: "box_1|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22941341",allowSmallerSizes:true,position:"above",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}
				}],
				'box_2': [{
					code: "box_2|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340203",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"664768",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613720"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1375382",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039692",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492020",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2037678",position:"btf"}},
						{bidder:"adform",params:{mid:"1038740"}},
						{bidder:"sovrn",params:{tagid:"891242"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_2","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("box_2","medium_rectangle",1)}}
					]
				},{
					code: "box_2|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22941341",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_2","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}
				}],
				'box_3': [{
					code: "box_3|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340204",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"664769",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613721"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1375383",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039695",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492021",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2037680",position:"btf"}},
						{bidder:"adform",params:{mid:"1038741"}},
						{bidder:"sovrn",params:{tagid:"891244"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_3","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("box_3","medium_rectangle",1)}}
					]
				},{
					code: "box_3|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22941341",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_3","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}
				}],
				'right': [{
					code: "right|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("right")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340205",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"664771",size:[160,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613702"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1375384",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039698",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492022",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2037682",position:"atf"}},
						{bidder:"adform",params:{mid:"1038748"}}
					]
				},{
					code: "right|skyscraper", mediaTypes: {banner:{sizes: [[160,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891247"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","wide_skyscraper",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("right","wide_skyscraper",1)}}
					]
				},{
					code: "right|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891245"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("right","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}
				}],
				'bottom': [{
					code: "bottom|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("bottom")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340206",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"664776",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613745"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1375385",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039701",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492023",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2037684",position:"atf"}},
						{bidder:"adform",params:{mid:"1038749"}}
					]
				},{
					code: "bottom|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891251"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("bottom","billboard",1)}}
					]
				},{
					code: "bottom|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891253"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","leaderboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("bottom","leaderboard",1)}}
					]
				},{
					code: "bottom|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891255"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("bottom","superbanner",1)}}
					]
				},{
					code: "bottom|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891256"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("bottom","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("bottom","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}
				}],
				'slider': [{
					code: "slider|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}}, pubstack:{adUnitName:"slider",adUnitPath:getPlacementName("slider",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("slider")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340207",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"664778",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613746"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1375386",formatId:"75982"}},
						{bidder:"openx",params:{unit:"544039682",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492024",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2037686",position:"btf"}},
						{bidder:"adform",params:{mid:"1038746"}},
						{bidder:"sovrn",params:{tagid:"891258"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("slider","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("slider","superbanner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("slider","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}
				}],
				'rectangle_layer': [{
					code: "rectangle_layer|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}}, pubstack:{adUnitName:"rectangle_layer",adUnitPath:getPlacementName("rectangle_layer",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_layer")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482041",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689377",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3908095"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1406402",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113824",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537597",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2104580",position:"atf"}},
						{bidder:"adform",params:{mid:"1071674"}},
						{bidder:"sovrn",params:{tagid:"926711"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_layer","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_layer","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}
				}],
				'rectangle_exit': [{
					code: "rectangle_exit|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}}, pubstack:{adUnitName:"rectangle_exit",adUnitPath:getPlacementName("rectangle_exit",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_exit")}},
						{bidder:"appnexus",params:{placementId:"21485687",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482042",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689378",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3908096"}},
						{bidder:"smart",params:{siteId:"407323",pageId:"1406403",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113826",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537598",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372872",zoneId:"2104582",position:"atf"}},
						{bidder:"adform",params:{mid:"1071675"}},
						{bidder:"sovrn",params:{tagid:"926712"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_exit","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1555391",tagId:getPlacementName("rectangle_exit","halfpagead",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_exit","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}
				}]
			};
		} else if(AdService.getParam('portal') == 'gmxcouk'){
			pbConfig.passover.slots = {
				'contentad_1': [{
					code: "contentad_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}}, pubstack:{adUnitName:"contentad_1",adUnitPath:getPlacementName("contentad_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("contentad_1")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340184",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663441",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613513"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1375362",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039677",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492003",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2037572",position:"atf"}},
						{bidder:"adform",params:{mid:"1038723"}},
						{bidder:"sovrn",params:{tagid:"891185"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("contentad_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("contentad_1","medium_rectangle",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("contentad_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.contentad_1.sizes}
				}],
				'contentad_2': [],
				'top': [{
					code: "top|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("top")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340185",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663445",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613536"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1375363",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039676",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492004",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2037574",position:"atf"}},
						{bidder:"adform",params:{mid:"1038736"}}
					]
				},{
					code: "top|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891186"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("top","billboard",1)}}
					]
				},{
					code: "top|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891187"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","leaderboard",2)}}
					]
				},{
					code: "top|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891514"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("top","superbanner",1)}}
					]
				},{
					code: "top|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"top",adUnitPath:getPlacementName("top",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891190"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("top","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("top","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("top","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.top.sizes}
				}],
				'box_1': [{
					code: "box_1|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340186",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663447",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613526"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1375364",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039679",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492005",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2037576",position:"atf"}},
						{bidder:"adform",params:{mid:"1038729"}}
					]
				},{
					code: "box_1|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891192"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("box_1","halfpagead",1)}}
					]
				},{
					code: "box_1|mediumrectangle", mediaTypes: {banner:{sizes: [[300,250]]}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891196"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_1","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("box_1","medium_rectangle",1)}}
					]
				},{
					code: "box_1|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_1",adUnitPath:getPlacementName("box_1",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22941283",allowSmallerSizes:true,position:"above",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_1.sizes}
				}],
				'box_2': [{
					code: "box_2|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340187",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663449",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613514"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1375365",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039681",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492006",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2037578",position:"btf"}},
						{bidder:"adform",params:{mid:"1038724"}},
						{bidder:"sovrn",params:{tagid:"891198"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_2","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("box_2","medium_rectangle",1)}}
					]
				},{
					code: "box_2|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_2",adUnitPath:getPlacementName("box_2",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22941283",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_2")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_2","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_2.sizes}
				}],
				'box_3': [{
					code: "box_3|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340188",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663450",size:[300,250]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613515"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1375366",formatId:"75978"}},
						{bidder:"openx",params:{unit:"544039684",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492007",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2037580",position:"btf"}},
						{bidder:"adform",params:{mid:"1038725"}},
						{bidder:"sovrn",params:{tagid:"891199"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("box_3","medium_rectangle",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("box_3","medium_rectangle",1)}}
					]
				},{
					code: "box_3|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:false}}}, pubstack:{adUnitName:"box_3",adUnitPath:getPlacementName("box_3",null,3)},
					bids: [
						{bidder:"appnexus",params:{placementId:"22941283",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_3")}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_3","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.box_3.sizes}
				}],
				'right': [{
					code: "right|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("right")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340189",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663452",size:[160,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613497"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1375367",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039687",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492008",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2037582",position:"atf"}},
						{bidder:"adform",params:{mid:"1038732"}}
					]
				},{
					code: "right|skyscraper", mediaTypes: {banner:{sizes: [[160,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891202"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","wide_skyscraper",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("right","wide_skyscraper",1)}}
					]
				},{
					code: "right|halfpagead", mediaTypes: {banner:{sizes: [[300,600]]}}, pubstack:{adUnitName:"right",adUnitPath:getPlacementName("right",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891200"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("right","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("right","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.right.sizes}
				}],
				'bottom': [{
					code: "bottom|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("bottom")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340190",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663457",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613537"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1375368",formatId:"88173"}},
						{bidder:"openx",params:{unit:"544039690",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492009",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2037584",position:"atf"}},
						{bidder:"adform",params:{mid:"1038733"}}
					]
				},{
					code: "bottom|billboard", mediaTypes: {banner:{sizes: [[970,250]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891206"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","billboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("bottom","billboard",1)}}
					]
				},{
					code: "bottom|leaderboard", mediaTypes: {banner:{sizes: [[970,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891207"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","leaderboard",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("bottom","leaderboard",1)}}
					]
				},{
					code: "bottom|superbanner", mediaTypes: {banner:{sizes: [[728,90]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891208"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("bottom","superbanner",1)}}
					]
				},{
					code: "bottom|fullsize", mediaTypes: {banner:{sizes: [[468,60]]}}, pubstack:{adUnitName:"bottom",adUnitPath:getPlacementName("bottom",null,3)},
					bids: [
						{bidder:"sovrn",params:{tagid:"891209"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("bottom","fullsize_banner",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("bottom","fullsize_banner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("bottom","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.bottom.sizes}
				}],
				'slider': [{
					code: "slider|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}}, pubstack:{adUnitName:"slider",adUnitPath:getPlacementName("slider",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("slider")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"below",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12340191",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"663459",size:[728,90]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3613538"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1375369",formatId:"75982"}},
						{bidder:"openx",params:{unit:"544039693",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22492010",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2037586",position:"btf"}},
						{bidder:"adform",params:{mid:"1038730"}},
						{bidder:"sovrn",params:{tagid:"891515"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("slider","superbanner",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("slider","superbanner",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("slider","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.slider.sizes}
				}],
				'rectangle_layer': [{
					code: "rectangle_layer|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}}, pubstack:{adUnitName:"rectangle_layer",adUnitPath:getPlacementName("rectangle_layer",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_layer")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482035",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689389",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3907970"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1406396",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113836",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537591",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2104540",position:"atf"}}, 
						{bidder:"adform",params:{mid:"1071655"}},
						{bidder:"sovrn",params:{tagid:"926705"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_layer","halfpagead",2)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_layer","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_layer.sizes}
				}],
				'rectangle_exit': [{
					code: "rectangle_exit|all", mediaTypes: {banner:{sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}}, pubstack:{adUnitName:"rectangle_exit",adUnitPath:getPlacementName("rectangle_exit",null,3)},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("rectangle_exit")}},
						{bidder:"appnexus",params:{placementId:"21485683",position:"above",keywords:pbTargeting}},
						{bidder:"yieldlab",params:{adslotId:"12482036",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"ix",params:{siteId:"689390",size:[300,600]}},
						{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"3907972"}},
						{bidder:"smart",params:{siteId:"407319",pageId:"1406397",formatId:"75979"}},
						{bidder:"openx",params:{unit:"544113839",delDomain:"united-internet-d.openx.net"}},
						{bidder:"improvedigital",params:{placementId:"22537592",publisherId:1258}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"372868",zoneId:"2104544",position:"atf"}}, 
						{bidder:"adform",params:{mid:"1071656"}},
						{bidder:"sovrn",params:{tagid:"926706"}},
						{bidder:"triplelift",params:{inventoryCode:getPlacementName("rectangle_exit","halfpagead",2)}},
						{bidder:"taboola",params:{publisherId:"1555390",tagId:getPlacementName("rectangle_exit","halfpagead",1)}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("rectangle_exit","sizeless"), sizes: window.ui.AdServiceConfig.configurations.sizes.rectangle_exit.sizes}
				}]
			};
		}
		return pbConfig;
	}
});