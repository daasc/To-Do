(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{257:function(t,e,n){t.exports=n.p+"img/editing.e42c3c6.png"},258:function(t,e,n){t.exports=n.p+"img/bin.a6fd295.png"},259:function(t,e,n){var content=n(265);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(106).default)("9f02e552",content,!0,{sourceMap:!1})},260:function(t,e,n){"use strict";n.r(e);var d={name:"CardComments",props:{text:{type:String,default:""},date:{type:String,default:""},id:{type:String,default:""}},data:function(){return{edits:!1,textEdit:""}},methods:{remove:function(){this.$emit("removeComments",{id:this.id})},setEdit:function(){this.$emit("editComments",{id:this.id,text:this.textEdit}),this.edits=!1},showEdit:function(){this.textEdit=this.text,this.edits=!0},cancel:function(){this.edits=!1,this.textEdit=""}}},o=(n(264),n(50)),component=Object(o.a)(d,(function(){var t=this,e=t.$createElement,d=t._self._c||e;return t.edits?d("div",{staticClass:"edit"},[d("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textEdit,expression:"textEdit"}],staticClass:"edit-comments",attrs:{cols:"30",rows:"10","data-testid":"edit-input-comments"},domProps:{value:t.textEdit},on:{input:function(e){e.target.composing||(t.textEdit=e.target.value)}}}),t._v(" "),d("div",{staticClass:"actions-edit"},[d("button",{staticClass:"button-3 edit-button",attrs:{"data-testid":"button-edit-comments"},on:{click:function(e){return t.setEdit()}}},[t._v("\n      Edit\n    ")]),t._v(" "),d("button",{staticClass:"button-3 cancel",attrs:{"data-testid":"cancel-edit"},on:{click:function(e){return t.cancel()}}},[t._v("\n      Cancel\n    ")])])]):d("div",{staticClass:"list-comments"},[d("div",{staticClass:"comments"},[d("div",{staticClass:"text"},[d("div",{staticClass:"date"},[t._v(t._s(t.date))]),t._v(" "),d("div",{staticClass:"text-comments",attrs:{"data-testid":"text-comments"}},[t._v(t._s(t.text))])]),t._v(" "),d("div",{staticClass:"actions"},[d("span",{attrs:{"data-testid":"edit-comments"},on:{click:function(e){return t.showEdit()}}},[d("img",{attrs:{src:n(257),alt:""}})]),t._v(" "),d("span",{attrs:{"data-testid":"delete-comments"},on:{click:function(e){return t.remove()}}},[d("img",{attrs:{src:n(258),alt:""}})])])]),t._v(" "),d("hr")])}),[],!1,null,"794233e6",null);e.default=component.exports},264:function(t,e,n){"use strict";n(259)},265:function(t,e,n){var d=n(105)(!1);d.push([t.i,".list-comments .comments[data-v-794233e6]{display:flex;width:100%;align-items:center}.list-comments .comments .text[data-v-794233e6]{width:90%}.list-comments .comments .text .date[data-v-794233e6]{color:#b1b3b4}.list-comments .comments .text .text-comments[data-v-794233e6]{padding:0 5px}.list-comments .comments .actions[data-v-794233e6]{width:10%;display:flex;justify-content:space-around}.list-comments .comments .actions img[data-v-794233e6]{cursor:pointer;width:20px}.list-comments hr[data-v-794233e6]{border-top:1px solid #d7dbdd}.edit[data-v-794233e6]{display:flex;flex-direction:column;width:100%;grid-gap:10px;gap:10px}.edit .edit-comments[data-v-794233e6]{width:auto;height:60px;border:1px solid #ddd;border-radius:10px;padding:10px 10px 0;resize:none;outline:none}.edit .actions-edit[data-v-794233e6]{display:flex;grid-gap:10px;gap:10px;justify-content:flex-end}",""]),t.exports=d}}]);