(self.webpackChunkcolorado_live_music_dir=self.webpackChunkcolorado_live_music_dir||[]).push([[794],{6218:function(e,t,a){"use strict";var n=a(1804),r=a.n(n),c=a(7294),l=a(5444);t.Z=function(e){var t=e.artist,a=e.large,n=void 0!==a&&a;return console.log({artist:t}),c.createElement(l.Link,{to:t.fields.slug,className:"artist__card "+(n?"artist__card--large":null)},t.data.Image&&c.createElement("div",{className:"artist__image-wrapper"},c.createElement("img",{className:"artist__image",src:t.data.Image[0].url})),c.createElement("div",null,c.createElement("h4",{className:"artist__name"},t.data.Name),n&&t.data.Bio&&c.createElement("div",{className:"aritst__bio",dangerouslySetInnerHTML:{__html:t.data.Bio}}),n&&t.data.GenresRec&&t.data.GenresRec.map((function(e,a){return c.createElement(c.Fragment,null,c.createElement(l.Link,{to:"/browse/genres/"+r()(e.data.Name)},e.data.Name),a<t.data.GenresRec.length-1?", ":"")}))))}},8433:function(e,t,a){"use strict";var n=a(7294),r=(a(5444),a(6660),a(6218));t.Z=function(e){var t=e.artists;console.log({artists:t});var a=t.map((function(e){return e.node&&(e=e.node),n.createElement(r.Z,{artist:e})}));return n.createElement("section",{className:"artist__grid"},a)}},6946:function(e,t,a){"use strict";var n=a(7294),r=a(3013);t.Z=function(){return n.createElement("img",{className:"blue-border",src:r.Z})}},6660:function(e,t,a){"use strict";var n=a(8929),r=a.n(n),c=a(1804),l=a.n(c),s=a(7294),i=a(5444),o=a(3964),m=a.n(o),u=a(8538),d=a(7128),g=a(956),_=a(3148);t.Z=function(e){var t=e.event,a=e.showImage,n=void 0===a||a,c=e.showDate,o=void 0!==c&&c,v=e.showTicket,N=void 0!==v&&v,E=e.showLink,f=void 0===E||E,w=e.featured,p=void 0!==w&&w,M=t.data,I=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),h={dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,arrows:!1,autoplay:!0};return s.createElement("div",{key:M.Name,className:"event__card"+(M.Featured||p?" event__card--featured":"")},f&&s.createElement(i.Link,{className:"event__link",to:t.fields.slug,key:M.Name}),n&&M.Image&&M.Featured&&s.createElement(u.Z,h,M.Image.map((function(e){return s.createElement("div",{className:"event__image-wrapper"},s.createElement("img",{className:"event__image",src:e.url}))}))),n&&M.Image&&!M.Featured&&s.createElement("div",{className:"event__image-wrapper"},s.createElement("img",{className:"event__image",src:M.Image[0].url})),n&&!M.Image&&s.createElement("div",{className:"event__image-wrapper"},s.createElement("img",{className:"event__image",src:g.Z})),s.createElement("div",{className:"event__card-heading"},s.createElement("h2",{className:"event__name"},M.Name),M.Subtitle&&s.createElement("h3",{className:"event__subtitle"},M.Subtitle),s.createElement("h4",{className:"event__time-wrapper"},m()(M.StartDate).format(o?"MM/DD/YYYY @ h:mm A":"h:mm A")," ",M.DoorsTime&&"| Doors @ "+m()(M.DoorsTime).format("h:mm A"),M.Venues&&s.createElement(i.Link,{className:"event__venue-name",to:M.Venues[0].fields.slug},o?"-":"@"," ",M.Venues[0].data.Name))),s.createElement("div",{className:"event__meta-wrapper"},M.SoldOut&&s.createElement("div",{class:"event__tag event__tag--sold-out"},s.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:"ban"}),"Sold Out"),M.Venues&&s.createElement(i.Link,{to:"/browse/"+l()(M.Venues[0].data.City),className:"event__tag event__city"},s.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:"map-marker-alt"}),M.Venues[0].data.City),M.Tags&&M.Tags.map((function(e){return s.createElement("div",{className:"event__tag event__tag--"+r()(e)},s.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:_.Z[e]||"tag"}),e)})),M.Genres&&M.Genres.map((function(e,t){if(t>2)return s.createElement(i.Link,{to:"/browse/genres/"+e,className:"event__tag event__tag--"+r()(e)},s.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:_.Z[e]||"music"}),e)})),M.Artist_Genres&&M.Artist_Genres.map((function(e,t){if(t<2)return s.createElement(i.Link,{to:"/browse/genres/"+l()(e),className:"event__tag event__tag--"+r()(e)},s.createElement(d.FontAwesomeIcon,{fixedWidth:!0,icon:_.Z[e]||"music"}),e)}))),(M.Featured||N)&&!M.SoldOut&&M.TicketURL&&s.createElement("a",{href:M.TicketURL,target:"_blank",rel:"noreferrer noopener",className:"button event__ticket-button"},"Buy Tickets"," ",M.Price&&"("+(isNaN(parseFloat(M.Price))?M.Price:I.format(parseFloat(M.Price)))+(M.PriceRange?"+":"")+")",s.createElement(d.FontAwesomeIcon,{icon:"external-link-alt"})))}},1918:function(e,t,a){"use strict";var n=a(7294),r=(a(5444),a(6660));t.Z=function(e){var t=e.eventNodes,a=t.length>=1?t.map((function(e){return n.createElement(r.Z,{event:e.node,showDate:!0})})):n.createElement("h2",{className:"no-upcoming-shows"},"😢",n.createElement("br",null),"No Upcoming Shows");return n.createElement("section",{className:"event__list"},a)}},5673:function(e,t,a){"use strict";var n=a(7294),r=(a(5444),a(7128));t.Z=function(e){var t=e.metaArray,a=(void 0===t?[]:t).map((function(e){return!!e&&n.createElement("li",{className:"meta-list__item"},e.link?n.createElement("a",{href:e.link,target:"_blank",rel:"noopener noreferrer"},n.createElement(r.FontAwesomeIcon,{icon:e.icon}),e.label):n.createElement("span",null,n.createElement(r.FontAwesomeIcon,{icon:e.icon}),e.label))}));return n.createElement("ul",{className:"meta-list"},a)}},4472:function(e,t,a){"use strict";var n=a(7294);a(5444);t.Z=function(e){var t=e.title,a=e.subtitle,r=e.logo,c=e.accentColor,l=e.className,s=e.children;return n.createElement("header",{className:"page-title__wrapper"+(r?" has-logo":"")+" "+l},r&&n.createElement("img",{style:{backgroundColor:c},className:"page-title__logo",src:r}),n.createElement("div",{className:"page-title__content"},t&&n.createElement("h1",null,t),a&&n.createElement("h2",null,a),s))}},8202:function(e,t,a){"use strict";a.r(t);var n=a(7294),r=a(5414),c=a(2498),l=a(2797),s=a.n(l),i=a(4472),o=a(6946),m=a(1918),u=(a(5673),a(8433));t.default=function(e){var t=e.pageContext,a=e.data;t.genre;console.log({genreContext:t});var l=a.events.edges,d=a.genre.data,g=a.artists.edges;return n.createElement(c.Z,null,n.createElement("div",{className:"category-container"},n.createElement(r.Z,{title:"Live "+d.Name+" Music in Colorado | "+s().siteTitle}),n.createElement(i.Z,{title:d.Name,subtitle:"Live "+d.Name+" Music in Colorado",logo:d.Logo?d.Logo[0].url:null,accentColor:d.AccentColor},d.Description&&n.createElement("p",{className:"venue__description"},d.Description)),n.createElement(o.Z,null),n.createElement(i.Z,{title:a.events.totalCount+" Upcoming "+d.Name+" Shows"}),n.createElement(m.Z,{eventNodes:l}),n.createElement(o.Z,null),n.createElement(i.Z,{title:g.length+" "+d.Name+" Artist"}),n.createElement(u.Z,{artists:g})))}},1804:function(e,t,a){var n=a(5393)((function(e,t,a){return e+(a?"-":"")+t.toLowerCase()}));e.exports=n},3013:function(e,t){"use strict";t.Z="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2MSIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDEwNjEgODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNyAyM0w4Mi44NDc1IDU2TDE0NS42NzYgMjNMMjAxLjUyMyA1NkwyNjQuMzUyIDIzTDMyMC4xOTkgNTZMMzgzLjAyOCAyM0w0MzguODc1IDU2TDUwMS43MDQgMjNMNTU3LjU1MSA1Nkw2MjAuMzggMjNMNjc3Ljk3MiA1Nkw3NDAuODAxIDIzTDc5Ni42NDggNTZMODU5LjQ3NyAyM0w5MTUuMzI0IDU2TDk3OC4xNTMgMjNMMTAzNCA1NiIgc3Ryb2tlPSIjMDAyODY4IiBzdHJva2Utd2lkdGg9IjMwIi8+Cjwvc3ZnPgo="}}]);
//# sourceMappingURL=component---src-templates-genre-jsx-317d1757c54e32a41727.js.map