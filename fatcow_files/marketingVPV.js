window.FOUNDATION_VPV = (function() {
  var locationValues = {
    controlpanel: {
    flow: 'login',
    step: 'control_panel'
    },
    webmail: {
    flow: 'login',
    step: 'webmail'
    }
  };

  var getCookie = function (name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  var baseVPV = {
    userType: 'anonymous',
    affiliate: 'null',
    currency: getCookie('Currency') || 'USD',
    pageApplication: 'front_of_site',
    pageType: 'login',
    pageId: 'null'
  };

  return {
    fireWithURL: function(urlLocation, vpvArgs) {
      var vpvData = Object.assign({}, baseVPV, {vpvFlow: locationValues[urlLocation].flow, vpvStep: locationValues[urlLocation].step}, vpvArgs); 
      window.dataLayer.push(vpvData);
    },

    fireWithARGS: function(flow, step, vpvArgs) {
      var vpvData = Object.assign({}, baseVPV, {vpvFlow: flow, vpvStep: step}, vpvArgs);
      window.dataLayer.push(vpvData);
    },

    fireWithBase: function(vpvArgs) {
      var vpvData = Object.assign({}, baseVPV, vpvArgs);
      window.dataLayer.push(vpvData);
    },

    fireCustomMessage: function(vpvArgs) {
     window.dataLayer.push(vpvArgs)
    }
  }
})()
