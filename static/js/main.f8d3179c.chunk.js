(this.webpackJsonpravenous=this.webpackJsonpravenous||[]).push([[0],{20:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),c=n(14),s=n.n(c),i=(n(20),n(13)),r=n(2),u=n(3),l=n(6),d=n(4),h=n(5),p=(n(21),n(22),n(23),n(0)),O=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.business,t=e.imageSrc,n=e.name,a=e.address,o=e.city,c=e.state,s=e.category,i=e.rating,r=e.reviewCount,u=e.url,l=e.distance,d=new URL("https://www.google.com/maps/search/");return d.searchParams.append("api",1),d.searchParams.append("query","".concat(n,", ").concat(a,", ").concat(o,", ").concat(c)),Object(p.jsxs)("div",{className:"Business",children:[Object(p.jsx)("a",{href:u,target:"blank",children:Object(p.jsx)("div",{className:"image-container",children:Object(p.jsx)("img",{src:t,alt:""})})}),Object(p.jsx)("h2",{children:n}),Object(p.jsxs)("div",{className:"Business-information",children:[Object(p.jsx)("a",{href:d,target:"blank",children:Object(p.jsxs)("div",{className:"Business-address",children:[Object(p.jsx)("p",{children:a}),Object(p.jsx)("p",{children:o}),Object(p.jsx)("p",{children:c}),Object(p.jsxs)("p",{children:[Math.floor(l)," m"]})]})}),Object(p.jsxs)("div",{className:"Business-reviews",children:[Object(p.jsx)("h3",{children:s.toUpperCase()}),Object(p.jsxs)("h3",{className:"rating",children:[i," stars"]}),Object(p.jsxs)("p",{children:[r,1===r?" review":" reviews"]})]})]})]})}}]),n}(o.a.Component),m=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.businesses;return Object(p.jsx)("div",{className:"BusinessList",children:e.map((function(e){return Object(p.jsx)(O,{business:e},e.id)}))})}}]),n}(o.a.Component);n(25),n(26);function j(e){var t=e.name,n=e.children,a=e.options,o=void 0===a?[]:a,c=e.isOpen,s=e.focusedOptionIndex,i=e.onOptionClick,r=e.onOptionPointerOver,u=e.onFocus,l=e.onUnfocus,d=c&&o.length>0&&Object(p.jsx)("ul",{className:"Autocomplete-list",children:o.map((function(e,n){return Object(p.jsx)("li",{className:"Autocomplete-option".concat(s===n?" focus":""),onClick:function(){return function(e){return i(t,e)}(e)},onPointerOver:function(){return r(t,n)},tabIndex:"0",children:e},n)}))});return Object(p.jsxs)("div",{className:"Autocomplete",onFocus:function(){return u(t)},onBlur:function(){return l(t)},children:[n,d]})}var f=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).sortByOptions={"Best Match":"best_match","Highest Rated":"rating","Most Reviewed":"review_count",Nearest:"distance"},e.handleSortByChange=function(t){return e.props.onSortByChange(t)},e.handleTermChange=function(t){var n=t.target;return e.props.onTermChange(n.value)},e.handleRadiusChange=function(t){var n=t.target;return e.props.onRadiusChange(n.value)},e.handleStatusChange=function(t){var n=t.target;return e.props.onStatusChange(n.checked)},e.handleLocationChange=function(t){var n=t.target;return e.props.onLocationChange(n.value)},e}return Object(l.a)(n,[{key:"getSortByClass",value:function(e){return e===this.props.sortBy?"active":""}},{key:"renderSortByOptions",value:function(){var e=this;return Object.keys(this.sortByOptions).map((function(t){var n=e.sortByOptions[t];return Object(p.jsx)("li",{className:e.getSortByClass(n),onClick:function(){return e.handleSortByChange(n)},children:t},n)}))}},{key:"render",value:function(){var e=this.props,t=e.onFocus,n=e.onUnfocus,a=e.onKeyDown,o=e.onOptionClick,c=e.onOptionOver,s=e.term,i=e.termRef,r=e.termOptions,u=e.isTermOptionsOpen,l=e.termFocusedOptionIndex,d=e.location,h=e.locationRef,O=e.locationOptions,m=e.isLocationOptionsOpen,f=e.locationFocusedOptionIndex,v=e.isLocationInvalid,b=e.radius,g=e.onInvalid,x=e.onSubmit;return Object(p.jsxs)("form",{className:"SearchBar",onSubmit:x,onInvalid:g,children:[Object(p.jsx)("div",{className:"SearchBar-sort-options",children:Object(p.jsx)("ul",{children:this.renderSortByOptions()})}),Object(p.jsxs)("div",{className:"SearchBar-fields",children:[Object(p.jsx)(j,{name:"term",options:r,isOpen:u,focusedOptionIndex:l,onOptionClick:o,onOptionPointerOver:c,onFocus:t,onUnfocus:n,children:Object(p.jsx)("input",{type:"text",name:"term",value:s,onChange:this.handleTermChange,onKeyDown:a,placeholder:"Search Businesses",ref:i})}),Object(p.jsx)(j,{name:"location",options:O,isOpen:m,focusedOptionIndex:f,onOptionClick:o,onOptionPointerOver:c,onFocus:t,onUnfocus:n,children:Object(p.jsx)("p",{className:"SearchBar-location".concat(v?" invalid":""),children:Object(p.jsx)("input",{type:"text",name:"location",value:d,onChange:this.handleLocationChange,onKeyDown:a,placeholder:"Where?",ref:h,required:!0})})})]}),Object(p.jsxs)("fieldset",{className:"SearchBar-distance-options",children:[Object(p.jsx)("legend",{children:"Optional"}),Object(p.jsxs)("p",{children:[Object(p.jsxs)("label",{children:[Object(p.jsx)("input",{type:"number",min:"0",max:"40000",value:b,onChange:this.handleRadiusChange}),"Specify a radius of the search area (max 40000 m)"]}),Object(p.jsxs)("label",{children:[Object(p.jsx)("input",{type:"checkbox",onChange:this.handleStatusChange}),"Consider only the businesses open now"]})]})]}),Object(p.jsx)("div",{className:"SearchBar-submit",children:Object(p.jsx)("button",{type:"submit",children:"Let's Go"})})]})}}]),n}(o.a.Component),v=n(15),b=n(7),g=n.n(b),x=n(11),y={searchApiUrl:"/v3/businesses/search",autocompleteApiUrl:"/v3/autocomplete",searchBusinesses:function(e){var t=this;return Object(x.a)(g.a.mark((function n(){var a,o,c,s,i,r,u,l,d,h,p,O,m,j,f,v;return g.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=e.term,o=void 0===a?"":a,c=e.location,s=void 0===c?"":c,i=e.sortBy,r=void 0===i?"":i,u=e.radius,l=void 0===u?"":u,d=e.onlyOpened,h=void 0===d?"":d,p=e.limit,O=void 0===p?"":p,m=t.getSearchUrl({term:o,location:s,sortBy:r,radius:l,onlyOpened:h,limit:O}),n.next=4,t.search(m);case 4:return j=n.sent,f=j.businesses,v=void 0===f?[]:f,n.abrupt("return",v.map((function(e){return t.getBusinessData(e)})));case 8:case"end":return n.stop()}}),n)})))()},searchAutocomplete:function(e){var t=this;return Object(x.a)(g.a.mark((function n(){var a,o,c;return g.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=e.text,o=e.limit,c="".concat(t.autocompleteApiUrl,"?text=").concat(a,"&limit=").concat(o),n.next=4,t.search(c);case 4:return n.abrupt("return",n.sent);case 5:case"end":return n.stop()}}),n)})))()},getSearchUrl:function(e){var t=e.term,n=e.location,a=e.sortBy,o=e.radius,c=e.onlyOpened,s=e.limit,i="".concat(this.searchApiUrl,"?");return i=t?"".concat(i,"term=").concat(t,"&"):i,i=n?"".concat(i,"location=").concat(n,"&"):i,i=a?"".concat(i,"sort_by=").concat(a,"&"):i,i=o?"".concat(i,"radius=").concat(o,"&"):i,i=c?"".concat(i,"open_now=").concat(c,"&"):i,(i=s?"".concat(i,"limit=").concat(s,"&"):i).endsWith("&")?i.slice(0,-1):i},search:function(e){return Object(x.a)(g.a.mark((function t(){var n,a,o,c,s,i;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e,{headers:{Authorization:"Bearer ".concat("IoNiWEe1LFoHMhPW3C23ogHi6ih5_rAJqUfjm6Px19rti1nBX8FD-plzKL9jxpQBMnQBZaSwH_z-hN9Ru1rqNV1WoaR0vC9p5ywlR7_hRahgEnBgCIXlNUTgcUzTYHYx")}});case 3:n=t.sent,t.next=9;break;case 6:throw t.prev=6,t.t0=t.catch(0),new C({message:"Network error has occured. Try again or later."});case 9:if(n.ok){t.next=21;break}return t.prev=10,t.next=13,n.json();case 13:c=t.sent,t.next=18;break;case 16:t.prev=16,t.t1=t.catch(10);case 18:throw s=null===(a=c.error)||void 0===a?void 0:a.code,i=(null===(o=c.error)||void 0===o?void 0:o.description)||n.statusText,new C({status:s,message:i});case 21:return t.next=23,n.json();case 23:return t.abrupt("return",t.sent);case 24:case"end":return t.stop()}}),t,null,[[0,6],[10,16]])})))()},getBusinessData:function(e){var t=e.id,n=e.image_url,a=void 0===n?"":n,o=e.name,c=e.location,s=e.categories,i=e.rating,r=e.review_count,u=e.url,l=e.distance;return{id:t,imageSrc:a,name:o,address:c.address1,city:c.city,state:c.state,country:c.country,zipCode:c.zip_code,category:s.map((function(e){return e.title})).join(", "),rating:i,reviewCount:r,url:u,distance:l}}},C=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a,o=e.status,c=e.message;return Object(u.a)(this,n),(a=t.call(this,c)).status=o,a}return n}(Object(v.a)(Error));window.addEventListener("unhandledrejection",(function(e){console.log(e.message)}));n(28);var S=Object(p.jsx)("div",{className:"Loading-icon",children:Object(p.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:100,height:100,viewBox:"0 0 496 496",children:Object(p.jsxs)("g",{children:[Object(p.jsx)("circle",{style:{fill:"#383A39"},cx:"248",cy:"24",r:"24"}),Object(p.jsx)("circle",{style:{fill:"#ECEEEE"},cx:"248",cy:"472",r:"24"}),Object(p.jsx)("circle",{style:{fill:"#77807F"},cx:"136",cy:"53.6",r:"24"}),Object(p.jsx)("path",{style:{fill:"#F2F4F4"},d:"M380.8,430.4c6.4,11.2,2.4,25.6-8.8,32.8c-11.2,6.4-25.6,2.4-32.8-8.8c-6.4-11.2-2.4-25.6,8.8-32.8\r C359.2,415.2,374.4,419.2,380.8,430.4z"}),Object(p.jsx)("path",{style:{fill:"#9FAAA9"},d:"M65.6,115.2c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8c-11.2-6.4-15.2-20.8-8.8-32.8\r S54.4,108.8,65.6,115.2z"}),Object(p.jsx)("path",{style:{fill:"#F2F7F7"},d:"M454.4,339.2c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8\r c-11.2-6.4-15.2-20.8-8.8-32.8C428,336.8,442.4,332.8,454.4,339.2z"}),Object(p.jsx)("circle",{style:{fill:"#B2BBBA"},cx:"24",cy:"248",r:"24"}),Object(p.jsx)("circle",{style:{fill:"#FFFFFF"},cx:"472",cy:"248",r:"24"}),Object(p.jsx)("path",{style:{fill:"#C5CCCB"},d:"M41.6,339.2c11.2-6.4,25.6-2.4,32.8,8.8c6.4,11.2,2.4,25.6-8.8,32.8c-11.2,6.4-25.6,2.4-32.8-8.8\r S30.4,346.4,41.6,339.2z"}),Object(p.jsx)("path",{d:"M430.4,115.2c11.2-6.4,25.6-2.4,32.8,8.8c6.4,11.2,2.4,25.6-8.8,32.8c-11.2,6.4-25.6,2.4-32.8-8.8\r C415.2,136.8,419.2,121.6,430.4,115.2z"}),Object(p.jsx)("path",{style:{fill:"#D9DDDD"},d:"M115.2,430.4c6.4-11.2,20.8-15.2,32.8-8.8c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8\r C112.8,456,108.8,441.6,115.2,430.4z"}),Object(p.jsx)("path",{style:{fill:"#111111"},d:"M339.2,41.6c6.4-11.2,20.8-15.2,32.8-8.8c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8\r C336.8,68,332.8,53.6,339.2,41.6z"})]})})}),B=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={businesses:[],errorMessage:"Start with a location value. The rest is optional.",isRequestRun:!1,sortBy:"best_match",radius:"",onlyOpened:!1,term:"",termOptions:[],isTermOptionsOpen:!1,termFocusedOptionIndex:0,location:"",isLocationInvalid:!1,locationOptions:[],isLocationOptionsOpen:!1,locationFocusedOptionIndex:0},e.locationRef=o.a.createRef(),e.locationTimeOutId=null,e.locationSearchTimeOutId=null,e.termRef=o.a.createRef(),e.termTimeOutId=null,e.termSearchTimeOutId=null,e.optionsLimit=5,e.handleFocus=function(t){clearTimeout(e["".concat(t,"TimeOutId")]),e.setState(Object(r.a)({},"is".concat(e.getCapitalizedName(t),"OptionsOpen"),!0))},e.handleUnfocus=function(t){e["".concat(t,"TimeOutId")]=setTimeout((function(){e.setState(Object(r.a)({},"is".concat(e.getCapitalizedName(t),"OptionsOpen"),!1))}))},e.getCapitalizedName=function(e){return e[0].toUpperCase()+e.slice(1)},e.handleKeyDown=function(t){var n=t.target.name,a=e.state["".concat(n,"Options")],o=e.state["".concat(n,"FocusedOptionIndex")],c=function(e){return e+1===a.length?0:e+1},s=function(e){return e-1<0?a.length-1:e-1};switch(t.code){case"Enter":if(0===a.length)return;e.setOption(n,a[o]),t.preventDefault();break;case"ArrowUp":e.setState(Object(r.a)({},"".concat(n,"FocusedOptionIndex"),s(o))),t.preventDefault();break;case"ArrowDown":e.setState(Object(r.a)({},"".concat(n,"FocusedOptionIndex"),c(o))),t.preventDefault();break;case"Tab":if(0===a.length)return;e.setState(Object(r.a)({},"".concat(n,"FocusedOptionIndex"),t.shiftKey?s(o):c(o))),t.preventDefault();break;case"Escape":e.setState(Object(r.a)({},"is".concat(e.getCapitalizedName(n),"OptionsOpen"),!1));break;default:return""}},e.handleOptionClick=function(t,n){e.setOption(t,n)},e.handleOptionOver=function(t,n){e.setState(Object(r.a)({},"".concat(t,"FocusedOptionIndex"),n))},e.setOption=function(t,n){var a;e.setState((a={},Object(r.a)(a,t,n),Object(r.a)(a,"".concat(t,"Options"),[]),Object(r.a)(a,"".concat(t,"FocusedOptionIndex"),0),a)),e["".concat(t,"Ref")].current.focus()},e.handleSortByChange=function(t){var n=e.checkFormValidity();e.setState({sortBy:t},n?e.handleSubmit:void 0)},e.handleTermChange=function(t){e.setState({term:t}),clearTimeout(e.termSearchTimeOutId),""!==t?e.termSearchTimeOutId=setTimeout((function(){return e.searchTermOptions({text:t,limit:e.optionsLimit})}),700):e.setState({termOptions:[],termFocusedOptionIndex:0})},e.searchTermOptions=function(t){var n=t.text,a=t.limit;y.searchAutocomplete({text:n,limit:a}).then((function(t){var a=null===t||void 0===t?void 0:t.terms.map((function(e){return e.text}));e.state.term===n&&!1===e.state.isRequestRun&&e.setState({termOptions:[e.state.term].concat(Object(i.a)(a)),isTermOptionsOpen:document.activeElement===e.termRef.current})})).catch((function(t){e.setState({termOptions:[]})}))},e.handleRadiusChange=function(t){t>4e4||e.setState({radius:t})},e.handleStatusChange=function(t){e.setState({onlyOpened:t})},e.handleLocationChange=function(t){e.setState({location:t,isLocationInvalid:!1}),clearTimeout(e.locationSearchTimeOutId),""!==t?e.locationSearchTimeOutId=setTimeout((function(){return e.searchLocationOptions({location:t,limit:e.optionsLimit})}),700):e.setState({locationOptions:[],locationFocusedOptionIndex:0})},e.searchLocationOptions=function(t){var n=t.location,a=t.limit;y.searchBusinesses({location:n,limit:a}).then((function(t){var a=t.map((function(e){var t=e.address,n=e.city,a=e.state,o=e.country;return"".concat(t).concat(n&&", ".concat(n)).concat(a&&", ".concat(a)," ").concat(o&&", ".concat(o))}));e.state.location===n&&!1===e.state.isRequestRun&&e.setState({locationOptions:[e.state.location].concat(Object(i.a)(a)),isLocationOptionsOpen:document.activeElement===e.locationRef.current})})).catch((function(t){e.setState({locationOptions:[]})}))},e.handleInvalid=function(t){t.preventDefault(),e.setState({isLocationInvalid:!0,errorMessage:"Please, fill the location field in"})},e.handleSubmit=function(t){if(null===t||void 0===t||t.preventDefault(),!e.state.isLocationInvalid){e.setState({locationOptions:[]});var n=e.state,a=n.sortBy,o=n.term,c=n.location,s=n.radius,i=n.onlyOpened;e.searchYelp({sortBy:a,term:o,location:c,radius:s,onlyOpened:i})}},e.searchYelp=function(t){var n=t.term,a=t.location,o=t.sortBy,c=t.radius,s=t.onlyOpened;e.state.isRequestRun||(e.setState({isRequestRun:!0,businesses:[]}),y.searchBusinesses({term:n,location:a,sortBy:o,radius:c,onlyOpened:s}).then((function(t){e.setState({businesses:t,errorMessage:t.length?"":"There is no results on the current options set. Change some of them and try again."})})).catch((function(t){var n=t.status,a=t.message;e.setState({errorMessage:e.getErrorMessage({status:n,message:a}),isLocationInvalid:"LOCATION_NOT_FOUND"===n})})).finally((function(){return e.setState({isRequestRun:!1})})))},e}return Object(l.a)(n,[{key:"checkFormValidity",value:function(){return this.locationRef.current.checkValidity()}},{key:"getErrorMessage",value:function(e){var t=e.status,n=e.message,a=void 0===n?"Something went wrong, please try again":n;switch(t){case"LOCATION_NOT_FOUND":return"Please, try to change the location";default:return a}}},{key:"render",value:function(){var e=this.state,t=e.businesses,n=e.errorMessage,a=e.isRequestRun,o=e.sortBy,c=e.term,s=e.termOptions,i=e.isTermOptionsOpen,r=e.termFocusedOptionIndex,u=e.radius,l=e.onlyOpend,d=e.location,h=e.locationOptions,O=e.isLocationOptionsOpen,j=e.locationFocusedOptionIndex,v=n?Object(p.jsx)("p",{className:"error-message",children:n}):Object(p.jsx)(m,{businesses:t});return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("h1",{children:"ravenous"}),Object(p.jsx)(f,{onFocus:this.handleFocus,onUnfocus:this.handleUnfocus,onKeyDown:this.handleKeyDown,onOptionOver:this.handleOptionOver,onOptionClick:this.handleOptionClick,sortBy:o,onSortByChange:this.handleSortByChange,term:c,termRef:this.termRef,termOptions:s,isTermOptionsOpen:i,termFocusedOptionIndex:r,onTermChange:this.handleTermChange,radius:u,onRadiusChange:this.handleRadiusChange,onlyOpend:l,onStatusChange:this.handleStatusChange,location:d,locationRef:this.locationRef,locationOptions:h,isLocationOptionsOpen:O,locationFocusedOptionIndex:j,onLocationChange:this.handleLocationChange,isLocationInvalid:this.state.isLocationInvalid,onInvalid:this.handleInvalid,onSubmit:this.handleSubmit}),a?S:v]})}}]),n}(o.a.Component),w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,30)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),o(e),c(e),s(e)}))};s.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(B,{})}),document.getElementById("root")),w()}},[[29,1,2]]]);
//# sourceMappingURL=main.f8d3179c.chunk.js.map