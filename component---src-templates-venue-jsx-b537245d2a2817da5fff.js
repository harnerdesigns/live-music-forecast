(self.webpackChunkcolorado_live_music_dir=self.webpackChunkcolorado_live_music_dir||[]).push([[536],{3048:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(7294),l=(a=o)&&a.__esModule?a:{default:a};function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var c=function(e){function t(){return i(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){return l.default.createElement("div",{className:"adsbybaidu"},"TODO")}}]),t}(l.default.Component);t.default=c},7388:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=l(n(7294)),o=l(n(5697));function l(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var c=function(e){function t(){return i(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){window&&(window.adsbygoogle=window.adsbygoogle||[]).push({})}},{key:"render",value:function(){return r.default.createElement("ins",{className:this.props.className+" adsbygoogle",style:this.props.style,"data-ad-client":this.props.client,"data-ad-slot":this.props.slot,"data-ad-layout":this.props.layout,"data-ad-layout-key":this.props.layoutKey,"data-ad-format":this.props.format,"data-full-width-responsive":this.props.responsive})}}]),t}(r.default.Component);t.default=c,c.propTypes={className:o.default.string,style:o.default.object,client:o.default.string.isRequired,slot:o.default.string.isRequired,layout:o.default.string,layoutKey:o.default.string,format:o.default.string,responsive:o.default.string},c.defaultProps={className:"",style:{display:"block"},format:"auto",layout:"",layoutKey:"",responsive:"false"}},3911:function(e,t,n){"use strict";var a=o(n(7388)),r=o(n(3048));function o(e){return e&&e.__esModule?e:{default:e}}var l={Google:a.default,Baidu:r.default};t.Z=l},2621:function(e,t,n){"use strict";var a=n(7294),r=n(3911);t.Z=function(e){var t,n=e.type,o=e.style;switch(n){case"feed":t=a.createElement(r.Z.Google,{client:"ca-pub-5546207212206045",slot:"6315873557000",style:Object.assign({display:"block"},o),format:"fluid","layout-key":"-ee+7u-2p-dp+ym"});break;default:t=a.createElement(r.Z.Google,{client:"ca-pub-5546207212206045",slot:"4922900839",style:Object.assign({display:"block"},o),format:"auto","layout-key":"-ee+7u-2p-dp+ym","full-width-responsive":!0})}return a.createElement(a.Fragment,null,t,a.createElement("script",{dangerouslySetInnerHTML:{__html:"(adsbygoogle = window.adsbygoogle || []).push({});"}}))}},6946:function(e,t,n){"use strict";var a=n(7294),r=n(3013);t.Z=function(){return a.createElement("img",{className:"blue-border",src:r.Z})}},6660:function(e,t,n){"use strict";var a=n(8929),r=n.n(a),o=n(1804),l=n.n(o),i=n(7294),s=n(5444),c=n(3964),u=n.n(c),m=n(8538),d=n(7128),f=n(956),p=n(3148);t.Z=function(e){var t=e.event,n=e.showImage,a=void 0===n||n,o=e.showDate,c=void 0!==o&&o,y=e.showTicket,g=void 0!==y&&y,v=e.showLink,_=void 0===v||v,b=e.featured,h=void 0!==b&&b,N=t.data,w=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),E={dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,arrows:!1,autoplay:!0};return i.createElement("div",{key:N.Name,className:"event__card"+(N.Featured||h?" event__card--featured":"")},_&&i.createElement(s.Link,{className:"event__link",to:t.fields.slug,key:N.Name}),a&&N.Image&&N.Featured&&i.createElement(m.Z,E,N.Image.map((function(e,t){return i.createElement("div",{key:t,className:"event__image-wrapper"},i.createElement("img",{className:"event__image",src:e.url}))}))),a&&N.Image&&!N.Featured&&i.createElement("div",{className:"event__image-wrapper"},i.createElement("img",{className:"event__image",src:N.Image[0].url})),a&&!N.Image&&i.createElement("div",{className:"event__image-wrapper"},i.createElement("img",{className:"event__image",src:f.Z})),i.createElement("div",{className:"event__card-heading"},i.createElement("h2",{className:"event__name"},N.Name),N.Subtitle&&i.createElement("h3",{className:"event__subtitle"},N.Subtitle),i.createElement("h4",{className:"event__time-wrapper"},u()(N.StartDate).format(c?"MM/DD/YYYY @ h:mm A":"h:mm A")," ",N.DoorsTime&&"| Doors @ "+u()(N.DoorsTime).format("h:mm A"),N.Venues&&i.createElement(i.Fragment,null,c?" - ":" @ ",i.createElement(s.Link,{className:"event__venue-name",to:N.Venues[0].fields.slug},N.Venues[0].data.Name)))),i.createElement("div",{className:"event__meta-wrapper"},N.SoldOut&&i.createElement("div",{className:"event__tag event__tag--sold-out"},i.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:"ban"}),"Sold Out"),N.Venues&&i.createElement(s.Link,{to:"/browse/"+l()(N.Venues[0].data.City),className:"event__tag event__city"},i.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:"map-marker-alt"}),N.Venues[0].data.City),N.Tags&&N.Tags.map((function(e){return i.createElement("div",{key:r()(e),className:"event__tag event__tag--"+r()(e)},i.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:p.Z[e]||"tag"}),e)})),N.Genres&&N.Genres.map((function(e,t){if(t>2)return i.createElement(s.Link,{key:r()(e),to:"/browse/genres/"+e,className:"event__tag event__tag--"+r()(e)},i.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:p.Z[e]||"music"}),e)})),N.Artist_Genres&&N.Artist_Genres.map((function(e,t){if(t<2)return i.createElement(s.Link,{to:"/browse/genres/"+l()(e),className:"event__tag event__tag--"+r()(e),key:r()(e)},i.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:p.Z[e]||"music"}),e)}))),(N.Featured||g)&&!N.SoldOut&&N.TicketURL&&i.createElement("a",{href:N.TicketURL,target:"_blank",rel:"noreferrer noopener",className:"button event__ticket-button"},"Buy Tickets"," ",N.Price&&"("+(isNaN(parseFloat(N.Price))?N.Price:w.format(parseFloat(N.Price)))+(N.PriceRange?"+":"")+")",i.createElement(d.FontAwesomeIcon,{icon:"external-link-alt"})))}},1918:function(e,t,n){"use strict";var a=n(7294),r=(n(5444),n(6660)),o=n(2621);t.Z=function(e){var t=e.eventNodes,n=t.length>=1?t.map((function(e,n){return a.createElement(a.Fragment,{key:n},a.createElement(r.Z,{event:e.node,showDate:!0,featured:0==n}),0==n&&t.length>1&&a.createElement(o.Z,null))})):a.createElement("h2",{className:"no-upcoming-shows"},"😢",a.createElement("br",null),"No Upcoming Shows");return a.createElement("section",{className:"event__list"},n)}},5673:function(e,t,n){"use strict";var a=n(7294),r=(n(5444),n(7128));t.Z=function(e){var t=e.metaArray,n=(void 0===t?[]:t).map((function(e,t){return!!e&&a.createElement("li",{key:t,className:"meta-list__item"},e.link?a.createElement("a",{href:e.link,target:"_blank",rel:"noopener noreferrer"},a.createElement(r.FontAwesomeIcon,{icon:e.icon}),e.label):a.createElement("span",null,a.createElement(r.FontAwesomeIcon,{icon:e.icon}),e.label))}));return a.createElement("ul",{className:"meta-list"},n)}},4472:function(e,t,n){"use strict";var a=n(7294);n(5444);t.Z=function(e){var t=e.title,n=e.subtitle,r=e.logo,o=e.accentColor,l=e.className,i=e.children;return a.createElement("header",{className:"page-title__wrapper"+(r?" has-logo":"")+" "+l},r&&a.createElement("img",{style:{backgroundColor:o},className:"page-title__logo",src:r}),a.createElement("div",{className:"page-title__content"},t&&a.createElement("h1",null,t),n&&a.createElement("h2",null,n),i))}},3506:function(e,t,n){"use strict";n.r(t);var a=n(7294),r=n(5414),o=n(1296),l=n(2797),i=n.n(l),s=n(4472),c=n(6946),u=n(1918),m=n(5673);t.default=function(e){var t=e.pageContext,n=e.data,l=(t.venue,n.events.edges),d=n.venue.data,f=[d.Address&&{icon:"map-marker-alt",label:d.Address,link:"http://maps.google.com/?q="+d.Address},d.Phone&&{icon:"phone-alt",label:d.Phone,link:"tel:"+d.Phone},d.Website&&{icon:"desktop",label:"Website",link:d.Website}];return a.createElement(o.Z,null,a.createElement("div",{className:"category-container"},a.createElement(r.Z,{title:"Live Music at "+d.Name+" in "+d.City+", CO | "+i().siteTitle}),a.createElement(s.Z,{title:d.Name,subtitle:"Live Music Venue in "+d.City+", CO",logo:d.Logo?d.Logo[0].url:null,accentColor:d.AccentColor},a.createElement(m.Z,{metaArray:f}),d.Description&&a.createElement("p",{className:"venue__description"},d.Description)),a.createElement(c.Z,null),a.createElement(s.Z,{title:n.events.totalCount+" Upcoming Shows at "+d.Name}),a.createElement(u.Z,{eventNodes:l})))}},1804:function(e,t,n){var a=n(5393)((function(e,t,n){return e+(n?"-":"")+t.toLowerCase()}));e.exports=a},3013:function(e,t){"use strict";t.Z="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2MSIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDEwNjEgODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNyAyM0w4Mi44NDc1IDU2TDE0NS42NzYgMjNMMjAxLjUyMyA1NkwyNjQuMzUyIDIzTDMyMC4xOTkgNTZMMzgzLjAyOCAyM0w0MzguODc1IDU2TDUwMS43MDQgMjNMNTU3LjU1MSA1Nkw2MjAuMzggMjNMNjc3Ljk3MiA1Nkw3NDAuODAxIDIzTDc5Ni42NDggNTZMODU5LjQ3NyAyM0w5MTUuMzI0IDU2TDk3OC4xNTMgMjNMMTAzNCA1NiIgc3Ryb2tlPSIjMDAyODY4IiBzdHJva2Utd2lkdGg9IjMwIi8+Cjwvc3ZnPgo="}}]);
//# sourceMappingURL=component---src-templates-venue-jsx-b537245d2a2817da5fff.js.map