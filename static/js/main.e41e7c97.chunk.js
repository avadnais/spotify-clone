(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t,a){},104:function(e,t,a){},105:function(e,t,a){},106:function(e,t,a){},110:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(53),r=a.n(c),o=(a(92),a(8)),i=(a(93),a(94),"".concat("http://accounts.spotify.com/authorize","?client_id=").concat("b8f893a2affb49d7b73943e5711bd383","&redirect_uri=").concat("http://avadnais.github.io/spotify-clone","&scope=").concat(["user-read-playback-state","user-modify-playback-state","user-read-currently-playing","user-read-recently-played","user-top-read","playlist-read-private","streaming"].join("%20"),"&response_type=token&show_dialog=true")),s=function(){return l.a.createElement("div",{className:"login"},l.a.createElement("img",{src:"https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png",alt:"logo"}),l.a.createElement("a",{href:i},"Login with Spotify"))},u=a(56),m=a.n(u);a(95),a(96),a(97);var E=function(e){var t=e.playlist,a=e.Icon,n=e.onClick,c=(e.id,e.title);return l.a.createElement("div",{onClick:function(){n(t)},className:"sideBarOption"},a&&l.a.createElement(a,{className:"sideBarOption_icon"}),a?l.a.createElement("h4",null,c):l.a.createElement("p",null,c))},d=a(57),p=a.n(d),f=a(33),y=a.n(f),v=a(62),_=a.n(v),g=Object(n.createContext)(),b=function(e){var t=e.initialState,a=e.reducer,c=e.children;return l.a.createElement(g.Provider,{value:Object(n.useReducer)(a,t)},c)},S=function(){return Object(n.useContext)(g)};var T=function(e){var t,a=e.spotify,n=S(),c=Object(o.a)(n,2),r=c[0].playlists,i=c[1],s=function(e){a.getPlaylist(e.id).then(function(e){i({type:"SET_SELECTED_PLAYLIST",selected_playlist:e})})};return l.a.createElement("div",{className:"sidebar"},l.a.createElement("img",{src:"https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png",alt:"logo",className:"logo"}),l.a.createElement(E,{title:"Home",Icon:p.a}),l.a.createElement(E,{title:"Search",Icon:y.a}),l.a.createElement(E,{title:"Your Library",Icon:_.a}),l.a.createElement("br",null),l.a.createElement("strong",{className:"sidebar_title"},"Playlists"),l.a.createElement("hr",null),null===r||void 0===r?void 0:null===(t=r.items)||void 0===t?void 0:t.map(function(e){return l.a.createElement(E,{key:e.id,title:e.name,onClick:s,playlist:e})}))},h=a(24),N=a.n(h),k=a(34),O=(a(103),a(104),a(127));var L=function(){var e,t=S(),a=Object(o.a)(t,1)[0].user;return l.a.createElement("div",{className:"header"},l.a.createElement("div",{className:"header_left"},l.a.createElement(y.a,null),l.a.createElement("input",{placeholder:"Search for artists, songs, or podcasts",type:"text"})),l.a.createElement("div",{className:"header_right"},l.a.createElement(O.a,{src:null===a||void 0===a?void 0:null===(e=a.images[0])||void 0===e?void 0:e.url,alt:null===a||void 0===a?void 0:a.display_name}),l.a.createElement("h4",null,null===a||void 0===a?void 0:a.display_name)))},C=a(63),j=a.n(C),w=a(64),R=a.n(w),P=a(65),I=a.n(P);a(105);var A=function(e){var t=e.item,a=e.playSong,n=e.i,c=t.track,r=S(),i=Object(o.a)(r,1)[0].track;return l.a.createElement("div",{id:c.id,className:"songRow",onClick:function(){a(t)}},l.a.createElement("div",{className:"songRow_index_container",id:"index_container_"+c.id},c.id===(null===i||void 0===i?void 0:i.id)?l.a.createElement("div",{className:"songRow_audioWave",id:"songRow_audioWave"},l.a.createElement("span",null),l.a.createElement("span",null),l.a.createElement("span",null),l.a.createElement("span",null),l.a.createElement("span",null)):l.a.createElement("h4",{className:"songRow_index"},n+1)),l.a.createElement("img",{className:"songRow_album",src:c.album.images[0].url,alt:""}),l.a.createElement("div",{className:"songRow_info"},l.a.createElement("h1",null,c.name),l.a.createElement("p",null,c.artists.map(function(e){return e.name}).join(", ")," -"," ",c.album.name)))};var D=function(e){var t,a=e.spotify,c=S(),r=Object(o.a)(c,2),i=r[0],s=i.selected_playlist,u=i.playing,m=r[1],E=function(e){m({type:"SET_SELECTED_TRACK",track:e.track}),u||m({type:"SET_PLAYING",playing:!0}),a.play({uris:["spotify:track:".concat(e.track.id)]}).then(function(){console.log("%cPlayback started","color:green")})};return Object(n.useEffect)(function(){console.log("%cBODY RENDERED in useEffect []","color: purple"),function(){var e=Object(k.a)(N.a.mark(function e(){return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.getUserPlaylists().then(function(e){m({type:"SET_PLAYLISTS",playlists:e}),a.getPlaylist(e.items[0].id).then(function(e){m({type:"SET_SELECTED_PLAYLIST",selected_playlist:e})})});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()()},[a,m]),l.a.createElement("div",{className:"body"},l.a.createElement(L,null),l.a.createElement("div",{className:"body_info"},l.a.createElement("img",{className:"album_cover",src:null===s||void 0===s?void 0:s.images[0].url,alt:"Album cover"}),l.a.createElement("div",{className:"body_infoText"},l.a.createElement("strong",null,"PLAYLIST"),l.a.createElement("h2",null,null===s||void 0===s?void 0:s.name),l.a.createElement("p",null,null===s||void 0===s?void 0:s.description))),l.a.createElement("div",{className:"body_songs"},l.a.createElement("div",{className:"body_icons"},l.a.createElement(j.a,{className:"body_shuffle body_green",onClick:function(){a.play({context_uri:"spotify:playlist:".concat(s.id)}).then(function(){m({type:"SET_CURRENT_SELECTED_TRACK",track:s.tracks[0]}),u||m({type:"SET_PLAYING",playing:!0})})}}),l.a.createElement(R.a,{className:"body_green",fontSize:"large"}),l.a.createElement(I.a,null)),null===s||void 0===s?void 0:null===(t=s.tracks)||void 0===t?void 0:t.items.map(function(e,t){return l.a.createElement(A,{i:t,item:e,playSong:E})})))},Y=(a(106),a(68)),x=a.n(Y),M=a(67),K=a.n(M),G=a(69),U=a.n(G),F=a(66),V=a.n(F),B=a(70),W=a.n(B),z=a(71),J=a.n(z),H=a(125),q=a(124),Q=a(123);var X=function(e){var t=e.spotify,a=S(),c=Object(o.a)(a,2),r=c[0],i=r.volume,s=r.track,u=r.playing,m=c[1];return Object(n.useEffect)(function(){console.log("%cFOOTER RENDERED","color: yellow"),function(){var e=Object(k.a)(N.a.mark(function e(){return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getMyCurrentPlaybackState().then(function(e){m({type:"SET_SELECTED_TRACK",track:e.item.track}),u||m({type:"SET_PLAYING",playing:!0})});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()()},[t,m]),Object(n.useEffect)(function(){console.log("%cFOOTER RENDERED","color: cyan")}),l.a.createElement("div",{className:"footer"},l.a.createElement("div",{className:"footer"},l.a.createElement("div",{className:"footer_left"},l.a.createElement("img",{src:null===s||void 0===s?void 0:s.album.images[0].url,alt:null===s||void 0===s?void 0:s.name,className:"footer_albumLogo"}),s&&l.a.createElement("div",{className:"footer_songInfo"},l.a.createElement("h4",null,s.name),l.a.createElement("p",null,s.artists.map(function(e){return e.name}).join(", ")))),l.a.createElement("div",{className:"footer_center"},l.a.createElement("div",{className:"footer_icons"},l.a.createElement(V.a,{className:"footer_green"}),l.a.createElement(K.a,{className:"footer_icon"}),l.a.createElement(x.a,{fontSize:"large",className:"footer_icon",onClick:function(){u?(t.pause(),m({type:"SET_PLAYING",playing:!1})):(t.play(),m({type:"SET_PLAYING",playing:!0}))}}),l.a.createElement(U.a,{className:"footer_icon",onClick:function(){t.skipToNext().then(function(){t.getMyCurrentPlaybackState().then(function(e){m({type:"SET_SELECTED_TRACK",track:e.item.track}),m({type:"SET_PLAYING",playing:!0})})})}}),l.a.createElement(W.a,{className:"footer_green"}))),l.a.createElement("div",{className:"footer_right"},l.a.createElement(H.a,{container:!0,spacing:2},l.a.createElement(H.a,{item:!0},l.a.createElement(J.a,null)),l.a.createElement(H.a,{item:!0},l.a.createElement(Q.a,null)),l.a.createElement(H.a,{item:!0,xs:!0},l.a.createElement(q.a,{min:0,max:100,value:i,step:1,onChangeCommitted:function(e){var a=e.target.childNodes[0].value;m({type:"SET_VOLUME",volume:a}),t.setVolume(a)}}))))))},Z=function(e){var t=e.spotify;return l.a.createElement("div",{className:"dashboard"},l.a.createElement("div",{className:"dashboard_body"},l.a.createElement(T,{spotify:t}),l.a.createElement(D,{spotify:t})),l.a.createElement(X,{spotify:t}))},$=new m.a,ee=function(){var e=S(),t=Object(o.a)(e,2),a=t[0].token,c=t[1];return Object(n.useEffect)(function(){var e=window.location.hash.substring(1).split("&").reduce(function(e,t){var a=t.split("=");return e[a[0]]=decodeURIComponent(a[1]),e},{}).access_token;window.history.pushState({},null,"/"),e&&$.setAccessToken(e),c({type:"SET_TOKEN",token:e}),$.getMe().then(function(e){c({type:"SET_USER",user:e})}),$.getMyDevices().then(function(e){c({type:"SET_VOLUME",volume:e.devices[0].volume_percent}),c({type:"SET_DEVICE",device_id:e.devices[0].id}),$.transferMyPlayback([e.devices[0].id],{is_active:"true"})}),$.getMyCurrentPlayingTrack().then(function(e){console.log("Currently playing \ud83c\udfb5",e.item.id),c({type:"SET_SELECTED_TRACK",current_track:e.item.id}),console.log(e),c({type:"SET_PLAYING",playing:e.is_playing})})},[c]),l.a.createElement("div",{className:"app"},a?l.a.createElement(Z,{spotify:$}):l.a.createElement(s,null))},te=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,128)).then(function(t){var a=t.getCLS,n=t.getFID,l=t.getFCP,c=t.getLCP,r=t.getTTFB;a(e),n(e),l(e),c(e),r(e)})},ae=a(14),ne=function(e,t){switch(console.log(t),t.type){case"SET_USER":return Object(ae.a)(Object(ae.a)({},e),{},{user:t.user});case"SET_TOKEN":return Object(ae.a)(Object(ae.a)({},e),{},{token:t.token});case"SET_PLAYLISTS":return Object(ae.a)(Object(ae.a)({},e),{},{playlists:t.playlists});case"SET_SELECTED_PLAYLIST":return Object(ae.a)(Object(ae.a)({},e),{},{selected_playlist:t.selected_playlist});case"SET_DISCOVER_WEEKLY":return Object(ae.a)(Object(ae.a)({},e),{},{discover_weekly:t.discover_weekly});case"SET_SELECTED_TRACK":return Object(ae.a)(Object(ae.a)({},e),{},{track:t.track});case"SET_PLAYING":return Object(ae.a)(Object(ae.a)({},e),{},{playing:t.playing});case"SET_VOLUME":return Object(ae.a)(Object(ae.a)({},e),{},{volume:t.volume});default:return e}};r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(b,{initialState:{user:null,playlists:[],discover_weekly:null,token:null,spotify:null,loading:!0},reducer:ne},l.a.createElement(ee,null))),document.getElementById("root")),te()},87:function(e,t,a){e.exports=a(110)},92:function(e,t,a){},93:function(e,t,a){},94:function(e,t,a){},95:function(e,t,a){},96:function(e,t,a){},97:function(e,t,a){}},[[87,1,2]]]);
//# sourceMappingURL=main.e41e7c97.chunk.js.map