
var Preferences={_prefServices:null,_contextMenuEnabled:true,_preferredTargetMap:{},_prefSaved:new Array(),_socialServicesEnabled:false,_userFBAuthPreferences:true,_userTwitterAuthPreferences:true,load:function(){this._getServicesList();this._loadContextMenuSettings();this._loadSocialServicesSettings();},loadPreferredTargets:function(){this._preferredTargetMap={};if(localStorage[Constants.SERVICES_STORAGE_NAME]!=undefined){this._prefSaved=localStorage[Constants.SERVICES_STORAGE_NAME].split(',');}
this._createServicesToShowList();this._createTargetMap();},_getServicesList:function(){var that=this;if(BootLoader.isAddThis){var serviceList="";var service_array;chrome.cookies.get({url:"http://addthis.com",name:"uss"},function(cookie){if(cookie==null){addthis.user.getServiceShareHistory(function(services){var service_array=[];if(typeof services==="string"){service_array=services.split(',');}
serviceList=service_array.join();if(localStorage[Constants.SERVICES_STORAGE_NAME]==undefined||localStorage[Constants.SERVICES_STORAGE_NAME]=="")
localStorage[Constants.SERVICES_STORAGE_NAME]=serviceList;});}else{serviceList=cookie.value.split(",").join();if(localStorage[Constants.SERVICES_STORAGE_NAME]==undefined||localStorage[Constants.SERVICES_STORAGE_NAME]=="")
localStorage[Constants.SERVICES_STORAGE_NAME]=serviceList;}
addthis.user.getPreferredServices(function(services){that._prefServices=services;BootLoader.loadServices();});});}},_createServicesToShowList:function(){if(this._prefServices){for(var i=0;i<this._prefServices.length;i++){if(this._prefSaved&&this._prefSaved.length==11)
break;if(typeof(this._prefServices[i])!=undefined&&this._prefServices[i]){if(this._prefSaved.indexOf(this._prefServices[i])<0)
this._prefSaved.push(this._prefServices[i]);}}}},_createTargetMap:function(){if(this._prefSaved&&typeof(this._prefSaved)!=undefined&&this._prefSaved.length){for(var i=0;i<this._prefSaved.length&&i<11;i++){if(typeof(this._prefSaved[i])!=undefined&&this._prefSaved[i]){var target=new Services.serviceMap(this._prefSaved[i],["igoogle","dashboard","windows"].indexOf(this._prefSaved[i])<0?BootLoader.isAddThis?addthis.util.getServiceName(this._prefSaved[i]):"":this._prefSaved[i]);this._preferredTargetMap[target.name]=target;}}}},getPreferredServicesDetails:function(){return this._preferredTargetMap;},setPreferredServices:function(servicesList){localStorage[Constants.SERVICES_STORAGE_NAME]=servicesList;this.loadPreferredTargets();},_loadContextMenuSettings:function(){_contextMenuEnabled=(!localStorage["context_menu"]||localStorage["context_menu"]=="true")?true:false;},isContextMenu:function(){return _contextMenuEnabled;},setContextMenu:function(contextVal){_contextMenuEnabled=contextVal;ContextMenu.removeContextMenu();if(!contextVal)
ContextMenu.removeContextMenu();else{ATX.contextMenu.initialize();}},_loadSocialServicesSettings:function(){Preferences._userFBAuthPreferences=(localStorage["fb_auth_pref"]=="true")?true:false;Preferences._userTwitterAuthPreferences=(localStorage["twitter_auth_pref"]=="true")?true:false;Preferences._socialServicesEnabled=(localStorage["social_services"]=="true")&&(Preferences._userFBAuthPreferences||Preferences._userTwitterAuthPreferences)?true:false;},setSocialServices:function(socialVal){Preferences._socialServicesEnabled=socialVal;},isSocialServices:function(){return Preferences._socialServicesEnabled;},setFBAuthPreference:function(fbAuthVal){localStorage["fb_auth_pref"]=fbAuthVal;Preferences._userFBAuthPreferences=fbAuthVal;},isFBAuthPreference:function(){return Preferences._userFBAuthPreferences;},setTwitterAuthPreference:function(twitterAuthVal){localStorage["twitter_auth_pref"]=twitterAuthVal;Preferences._userTwitterAuthPreferences=twitterAuthVal;},isTwitterAuthPreference:function(){return Preferences._userTwitterAuthPreferences;}};var ATX=ATX||{};ATX.preferences={initialize:function(){if(typeof localStorage['new_install']==='undefined'){this.firstRun();}},firstRun:function(){localStorage['new_install']="false";localStorage["context_menu"]="true";localStorage["context_menu_search"]="false";}};