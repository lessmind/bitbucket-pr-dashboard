(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{ec2d:function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var i=s("60a3");class a extends i["b"]{}},ec95:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{staticClass:"items-start justify-start q-pa-md"},[s("q-ajax-bar",{attrs:{position:"top",color:"secondary",size:"2px","skip-hijack":""}}),s("div",{staticClass:"row items-center"},[s("div",{staticClass:"q-pa-sm"},[s("span",{staticClass:"q-pr-sm text-weight-medium"},[t._v("Project:")]),s("q-btn-dropdown",{attrs:{color:"primary","no-caps":"",icon:"list",label:t.currentWorkspace.name}},[s("q-list",t._l(t.projects,(function(e){return s("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],key:e.slug,attrs:{clickable:""},on:{click:function(s){return t.switchProject(e.slug)}}},[s("q-item-section",[s("q-item-label",[t._v(t._s(e.name))])],1)],1)})),1)],1)],1),s("div",{staticClass:"q-pa-sm"},[s("q-btn-dropdown",{attrs:{color:"secondary","no-caps":"",icon:"sort",label:t.sortAsc?"Oldest first":"Newest first"}},[s("q-list",[s("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(e){t.sortAsc=!0}}},[s("q-item-section",[s("q-item-label",[t._v("Oldest first")])],1)],1),s("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(e){t.sortAsc=!1}}},[s("q-item-section",[s("q-item-label",[t._v("Newest first")])],1)],1)],1)],1)],1),s("div",{staticClass:"q-pa-sm"},[s("q-select",{staticStyle:{"min-width":"250px"},attrs:{clearable:"",label:"Repositories",multiple:"",options:t.repos},model:{value:t.selectedRepos,callback:function(e){t.selectedRepos=e},expression:"selectedRepos"}})],1),s("div",{staticClass:"q-pa-sm"},[s("q-input",{staticStyle:{"max-width":"200px"},attrs:{label:"Reload after seconds",type:"number"},model:{value:t.intervalSecs,callback:function(e){t.intervalSecs=t._n(e)},expression:"intervalSecs"}})],1),s("span",{staticClass:"q-pr-sm text-weight-medium"},[t._v("Reload in "+t._s(t.reloadAfter))]),s("q-btn",{attrs:{color:"warning"},on:{click:function(e){t.timeToReload=new Date}}},[t._v("Reload now")])],1),t._l(t.selectedRepos,(function(e){return s("q-list",{key:e},[s("q-item-label",{staticClass:"text-h6"},[t._v(t._s(e))]),t._l(t.pullRequests[e],(function(i){return[s("q-separator",{key:"sp-"+i.id,attrs:{spaced:""}}),s("q-item",{key:"item-"+i.id},[s("q-item-section",{staticClass:"col justify-center",attrs:{top:""}},[s("q-btn-dropdown",{staticStyle:{width:"100px"},attrs:{size:"sm",loading:t.loading,color:t.titleStateColor(i.title),label:t.titleStateName(i.title)}},[s("q-list",[t._l(t.states,(function(a){return s("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],key:a.name,attrs:{clickable:""},on:{click:function(s){return t.switchState(a.name,i,e)}}},[s("q-item-section",[s("q-item-label",[t._v(t._s(a.name))])],1)],1)})),s("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(s){return t.approve(i,e)}}},[s("q-item-section",[s("q-item-label",[t._v("Approve")])],1)],1),s("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(s){return t.unapprove(i,e)}}},[s("q-item-section",[s("q-item-label",[t._v("Unapprove")])],1)],1)],2)],1)],1),s("q-item-section",{staticClass:"col-11",attrs:{top:""}},[s("q-item-label",{attrs:{lines:"1"}},[s("a",{staticClass:"q-mr-sm text-body2 text-weight-bold text-primary cursor-pointer",attrs:{href:i.links.html.href,target:"_blank"}},[t._v(t._s(t.trimTitle(i.title)))]),s("q-chip",[s("q-avatar",[s("img",{attrs:{src:i.author.links.avatar.href}})]),t._v("\n              "+t._s(i.author.display_name)+"\n            ")],1),t._l(i.participants,(function(e){return s("q-avatar",{key:e.user.uuid,attrs:{size:"30px"}},[s("img",{attrs:{src:e.user.links.avatar.href}}),e.approved?s("q-badge",{staticStyle:{width:"13px",height:"13px",padding:"3px"},attrs:{floating:"",color:"green"}},[s("q-icon",{attrs:{name:"check",size:"5px"}})],1):t._e()],1)}))],2),s("q-item-label",{attrs:{lines:"1"}},[s("q-badge",{staticClass:"q-mr-xs",attrs:{color:t.countBuild(i,"SUCCESSFUL")?"positive":"grey","text-color":"white"}},[t._v("\n              "+t._s(t.countBuild(i,"SUCCESSFUL"))+"\n              "),s("q-icon",{staticClass:"q-ml-xs",attrs:{name:"check_circle",size:"20px"}})],1),s("q-badge",{staticClass:"q-mr-xs",attrs:{color:t.countBuild(i,"INPROGRESS")?"primary":"grey","text-color":"white"}},[t._v("\n              "+t._s(t.countBuild(i,"INPROGRESS"))+"\n              "),s("q-icon",{staticClass:"q-ml-xs",attrs:{name:"change_circle",size:"20px"}})],1),s("q-badge",{staticClass:"q-mr-xs",attrs:{color:t.countBuild(i,"FAILED")?"negative":"grey","text-color":"white"}},[t._v("\n              "+t._s(t.countBuild(i,"FAILED"))+"\n              "),s("q-icon",{staticClass:"q-ml-xs",attrs:{name:"cancel",size:"20px"}})],1),s("q-badge",{staticClass:"q-mr-xs",attrs:{color:i.comment_count?"cyan":"grey","text-color":"white"}},[t._v("\n              "+t._s(i.comment_count)+" comments\n              "),s("q-icon",{staticClass:"q-ml-xs",attrs:{name:"message",size:"20px"}})],1),s("q-badge",{staticClass:"q-mr-xs",attrs:{color:i.task_count?"teal":"grey","text-color":"white"}},[t._v("\n              "+t._s(i.task_count)+" tasks\n              "),s("q-icon",{staticClass:"q-ml-xs",attrs:{name:"check_box",size:"20px"}})],1),s("span",{staticClass:"text-grey-8"},[t._v("\n              Last updated: "+t._s(t.pastRelativeDateTime(i.updated_on))+"\n              "),s("q-tooltip",[t._v(t._s(t.fullDateTime(i.updated_on)))])],1)],1)],1)],1)]}))],2)}))],2)},a=[],o=s("60a3"),r=s("ec2d"),n=s("bd4c"),c=function(t,e,s,i){var a,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(r=(o<3?a(r):o>3?a(e,s,r):a(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},l=function(t,e,s,i){function a(t){return t instanceof s?t:new s((function(e){e(t)}))}return new(s||(s=Promise))((function(s,o){function r(t){try{c(i.next(t))}catch(e){o(e)}}function n(t){try{c(i["throw"](t))}catch(e){o(e)}}function c(t){t.done?s(t.value):a(t.value).then(r,n)}c((i=i.apply(t,e||[])).next())}))};let p=class extends r["a"]{constructor(){super(...arguments),this.selectedRepos=[],this.states={WIP:{name:"WIP",color:"warning"},READY:{name:"READY",color:"positive"},REVIEWING:{name:"REVIEWING",color:"info"}}}data(){return{workspace:this.$route.params.workspace,selectedRepos:[],loading:!1,sortAsc:!1,intervalSecs:300,timeToReload:new Date(Date.now()+3e5),now:new Date,interval:null}}beforeDestroy(){this.interval&&clearInterval(this.interval)}countBuild(t,e){return t.statuses&&0!==t.statuses.values.length?t.statuses.values.filter((t=>t.state===e)).length:0}approve(t,e){return l(this,void 0,void 0,(function*(){this.loading=!0;try{yield this.$store.dispatch("bitbucket/approve",{pullRequest:t,repository:e,workspace:this.currentWorkspace});let s=this.trimTitle(t.title);s!=t.title&&(yield this.$store.dispatch("bitbucket/setPullRequestTitle",{pullRequest:t,title:s})),yield this.$store.dispatch("bitbucket/updateRepositoryPullRequests",{repository:e,workspace:this.currentWorkspace})}catch(s){this.$q.notify("Approve pull request failed")}this.loading=!1}))}unapprove(t,e){return l(this,void 0,void 0,(function*(){this.loading=!0;try{yield this.$store.dispatch("bitbucket/unapprove",{pullRequest:t,repository:e,workspace:this.currentWorkspace}),yield this.$store.dispatch("bitbucket/updateRepositoryPullRequests",{repository:e,workspace:this.currentWorkspace})}catch(s){this.$q.notify("Unapprove pull request failed")}this.loading=!1}))}switchState(t,e,s){return l(this,void 0,void 0,(function*(){const i="READY"===t?this.trimTitle(e.title):`[${t}]${this.trimTitle(e.title)}`;if(i!==e.title){this.loading=!0;try{yield this.$store.dispatch("bitbucket/setPullRequestTitle",{pullRequest:e,title:i}),yield this.$store.dispatch("bitbucket/updateRepositoryPullRequests",{repository:s,workspace:this.currentWorkspace})}catch(a){this.$q.notify("Update pull request state failed")}this.loading=!1}}))}titleState(t){const e=/^\[(\w+)\].*/.exec(t);return e&&this.states[e[1]]||this.states.READY}titleStateName(t){return this.titleState(t).name}titleStateColor(t){return this.titleState(t).color}trimTitle(t){const e=/^\[(\w+)\]\s*(.*)/.exec(t);return e&&this.states[e[1]]?e[2]:t}switchProject(t){this.$router.push({path:`/dashboard/${t}`})}onCurrentWorkspaceChanged(t){return l(this,void 0,void 0,(function*(){this.$store.commit("app/title",t.name),yield this.$store.dispatch("bitbucket/loadRepositories",this.currentWorkspace)}))}onIntervalSecsChanged(t){this.timeToReload=new Date(Date.now()+1e3*t)}onSelectedReposChanged(t,e){return l(this,void 0,void 0,(function*(){yield this.$store.dispatch("bitbucket/updateShowRepositories",{workspace:this.currentWorkspace,oldRepositories:e,newRepositories:t})}))}fullDateTime(t){const e=new Date(t);return n["a"].formatDate(e,"Do, MMM YYYY (ddd) HH:mm:ss")}pastRelativeDateTime(t){const e=new Date(t),s=n["a"].getDateDiff(new Date,e,"days"),i=n["a"].getDateDiff(new Date,e,"hours"),a=n["a"].getDateDiff(new Date,e,"minutes"),o=n["a"].getDateDiff(new Date,e,"seconds");let r="just now";return s?r=`${s} day(s) ago`:i?r=`${i} hour(s) ago`:a?r=`${a} minute(s) ago`:o&&(r=`${o} seconds(s) ago`),r}get reloadAfter(){const t=n["a"].getDateDiff(this.timeToReload,this.now,"days"),e=n["a"].getDateDiff(this.timeToReload,this.now,"hours"),s=n["a"].getDateDiff(this.timeToReload,this.now,"minutes"),i=n["a"].getDateDiff(this.timeToReload,this.now,"seconds");let a="now";return t?a=`${t} day(s)`:e?a=`${e} hour(s)`:s?a=`${s} minute(s)`:i&&(a=`${i} second(s)`),a}get repos(){return null===this.$store.state.bitbucket.repositories?[]:this.$store.state.bitbucket.repositories.values.map((t=>t.slug))}get pullRequests(){const t={};for(const e of this.selectedRepos){const s=Object.values(this.$store.state.bitbucket.pullRequests[e]||[]);s.sort(((t,e)=>{const s=new Date(t.updated_on),i=new Date(e.updated_on);return this.sortAsc?s.getTime()-i.getTime():i.getTime()-s.getTime()})),t[e]=s}return t}get currentWorkspace(){return null===this.$store.state.bitbucket.workspaces?{name:"",slug:""}:this.$store.state.bitbucket.workspaces.values.find((t=>t.slug===this.$route.params.workspace))||this.$store.state.bitbucket.workspaces.values[0]}get projects(){var t;return(null===(t=this.$store.state.bitbucket.workspaces)||void 0===t?void 0:t.values)||[]}mounted(){return l(this,void 0,void 0,(function*(){if(null===this.$store.state.bitbucket.workspaces&&(yield this.$store.dispatch("bitbucket/loadWorkspaces")),!this.currentWorkspace.slug)return this.$q.notify("Unable to load workspaces"),this.$store.commit("bitbucket/logout"),void this.$router.push({path:"/"});this.$route.params.workspace||this.$router.push({path:`/dashboard/${this.currentWorkspace.slug}`}),this.interval&&clearInterval(this.interval),this.interval=setInterval((()=>{Date.now()>=this.timeToReload.getTime()&&(this.timeToReload=new Date(Date.now()+1e3*this.intervalSecs),this.$store.dispatch("bitbucket/updateShowRepositories",{workspace:this.currentWorkspace,oldRepositories:[],newRepositories:this.selectedRepos})),this.now=new Date}),1e3)}))}};c([Object(o["c"])("currentWorkspace")],p.prototype,"onCurrentWorkspaceChanged",null),c([Object(o["c"])("intervalSecs")],p.prototype,"onIntervalSecsChanged",null),c([Object(o["c"])("selectedRepos")],p.prototype,"onSelectedReposChanged",null),p=c([Object(o["a"])({})],p);var u=p,d=u,h=s("2877"),m=s("9989"),v=s("7ea5"),b=s("f20b"),f=s("1c1c"),w=s("66e5"),q=s("4074"),k=s("0170"),g=s("ddd8"),y=s("27f9"),R=s("9c40"),_=s("eb85"),x=s("b047"),D=s("cb32"),$=s("58a81"),C=s("0016"),S=s("05c0"),T=s("7f67"),j=s("eebe"),I=s.n(j),W=Object(h["a"])(d,i,a,!1,null,null,null);e["default"]=W.exports;I()(W,"components",{QPage:m["a"],QAjaxBar:v["a"],QBtnDropdown:b["a"],QList:f["a"],QItem:w["a"],QItemSection:q["a"],QItemLabel:k["a"],QSelect:g["a"],QInput:y["a"],QBtn:R["a"],QSeparator:_["a"],QChip:x["a"],QAvatar:D["a"],QBadge:$["a"],QIcon:C["a"],QTooltip:S["a"]}),I()(W,"directives",{ClosePopup:T["a"]})}}]);