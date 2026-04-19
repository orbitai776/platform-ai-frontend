import{g as f,T as L,o as c,c as u,b as t,n as k,x as N,j as g,G as V,e as K,y as F,z as W,aa as X,a2 as J,ab as R,E as Z,A as M,F as H,r as I,a0 as q,C as P,d as $,w as tt,k as w,a5 as z,ac as et}from"./CPB3dK_b.js";function nt(r){const i=r.toLowerCase(),s=a=>a[Math.floor(Math.random()*a.length)],e={dalat:["đà lạt","da lat","Đà Lạt","Đà lạt"],danang:["đà nẵng","da nang","Đà Nẵng","Đà nẵng"],thailand:["thái lan","bangkok","Thái Lan"],phuquoc:["phú quốc","phu quoc","Phú Quốc"],price:["giá","bao nhiêu","chi phí","budget"],suggest:["gợi ý","đi đâu","du lịch đâu"]},n=a=>a.some(d=>i.includes(d));return n(e.dalat)?s([`🏔️ **ĐÀ LẠT 3N2Đ - HOT NHẤT**

📍 Điểm nổi bật:
- Thung lũng Tình Yêu
- Thác Datanla
- Chợ đêm

💰 Giá từ: 2.590.000đ
👉 Bạn đi gia đình hay couple vậy?`,`🌸 **ĐÀ LẠT CHILL**

- Săn mây Cầu Đất
- Cafe view rừng
- Homestay xịn

💡 Đi tháng 11–2 đẹp nhất
👉 Bạn đi mấy ngày mình build chi tiết luôn`,`🏕️ **ĐÀ LẠT CHO TEAM TRẺ**

- Check-in sống ảo
- Cafe cực chill
- Đồ ăn ngon

💰 Budget: 2tr–3tr/người
👉 Có cần mình lên lịch trình full không?`]):n(e.danang)?s([`🏖️ **ĐÀ NẴNG 3N2Đ**

- Bà Nà Hills (Cầu Vàng)
- Hội An
- Biển Mỹ Khê

💰 Giá từ: 2.990.000đ
👉 Combo biển + núi cực chill 😎`,`🌊 **ĐÀ NẴNG - HỘI AN**

- Ngày 1: Bà Nà
- Ngày 2: Hội An
- Ngày 3: Sơn Trà

👉 Bạn thích biển hay phố cổ hơn?`,`🔥 **ĐÀ NẴNG DEAL HOT**

- Vé đang rẻ
- KS nhiều ưu đãi

👉 Đi thời điểm này rất ngon 👌`]):n(e.thailand)?s([`✈️ **THÁI LAN 5N4Đ**

- Bangkok + Pattaya
- Đảo Coral
- Shopping

💰 ~6.990.000đ
👉 Bạn đi tour hay tự túc?`,`🌴 **THÁI LAN CHILL**

- Ăn uống siêu ngon
- Massage Thái
- Mall xịn

👉 Đi nhóm rất vui luôn 😆`,`🔥 **DEAL THÁI LAN**

- Vé rẻ
- KS 4*

👉 Có thể giữ slot trước cho bạn`]):n(e.phuquoc)?s([`🏝️ **PHÚ QUỐC 4N3Đ**

- VinWonders
- Cáp treo Hòn Thơm
- Sunset cực đẹp

💰 ~4.500.000đ
👉 Nghỉ dưỡng cực hợp`,`🌅 **PHÚ QUỐC RESORT**

- Biển trong xanh
- Hải sản ngon
- Chill max level

👉 Bạn đi nghỉ dưỡng hay khám phá?`]):n(e.price)?s([`💰 **GIÁ TOUR**

- Đà Lạt: 2tr5 – 3tr
- Đà Nẵng: 3tr – 4tr
- Thái Lan: 6tr – 8tr

👉 Budget bạn bao nhiêu mình tối ưu cho`,`💸 **CHI PHÍ THAM KHẢO**

- Nội địa: ~2tr – 4tr
- Quốc tế: ~6tr+

👉 Đi mấy ngày mình tính chuẩn hơn`]):n(e.suggest)?s([`🌟 **GỢI Ý HOT**

- Chill: Đà Lạt
- Biển: Đà Nẵng
- Quốc tế: Thái Lan

👉 Bạn thích vibe nào?`,`🎯 **ĐI ĐÂU ĐẸP**

- Couple: Đà Lạt
- Gia đình: Đà Nẵng
- Bạn bè: Thái Lan

👉 Mình build lịch trình luôn cho bạn`]):s([`🌍 Bạn muốn đi đâu?

👉 Mình có thể:
- Tư vấn tour
- Lên lịch trình
- Tối ưu chi phí`,`😎 Cho mình:
- Đi đâu
- Mấy ngày
- Budget

👉 Mình build plan xịn cho bạn luôn`])}function st(r){const i=r.toLowerCase(),s=h=>h[Math.floor(Math.random()*h.length)],e={danang:["đà nẵng","da nang"],dalat:["đà lạt","da lat"],phuquoc:["phú quốc","phu quoc"],vungtau:["vũng tàu","vung tau"],priceLow:["rẻ","giá rẻ","budget thấp","tiết kiệm"],priceMid:["tầm trung","ổn","ok"],priceHigh:["cao cấp","luxury","resort","xịn"],couple:["cặp đôi","couple","2 người"],family:["gia đình"],group:["nhóm","bạn bè","team"]},n=h=>h.some(C=>i.includes(C));let a=null;n(e.dalat)?a="dalat":n(e.danang)?a="danang":n(e.phuquoc)?a="phuquoc":n(e.vungtau)&&(a="vungtau");let d=null;n(e.priceLow)?d="low":n(e.priceHigh)?d="high":n(e.priceMid)&&(d="mid");let m=null;if(n(e.couple)?m="couple":n(e.family)?m="family":n(e.group)&&(m="group"),a){const h={dalat:"Đà Lạt",danang:"Đà Nẵng",phuquoc:"Phú Quốc",vungtau:"Vũng Tàu"}[a];return s(d==="high"?[`🏨 **RESORT CAO CẤP ${h.toUpperCase()}**

- Villa riêng + hồ bơi
- View cực đẹp
- Dịch vụ 4–5⭐

💰 ~2tr–5tr/đêm
👉 Phù hợp nghỉ dưỡng cực chill 😎`,`✨ **VILLA LUXURY ${h}**

- Không gian riêng tư
- Full tiện nghi
- Rất hợp honeymoon 💕

👉 Bạn đi mấy người mình chọn villa chuẩn hơn`]:d==="low"?[`💸 **KHÁCH SẠN GIÁ RẺ ${h}**

- 300k–600k/đêm
- Sạch sẽ, đủ tiện nghi

👉 Phù hợp tiết kiệm nhưng vẫn ổn 👌`,`🏠 **HOMESTAY ${h}**

- Giá mềm
- Chill, decor đẹp

👉 Bạn cần gần trung tâm hay view đẹp?`]:m==="group"?[`👥 **VILLA NHÓM ${h}**

- 3–5 phòng ngủ
- Có hồ bơi riêng
- BBQ ngoài trời

💰 ~2tr–4tr/đêm (chia ra rất rẻ)
👉 Đi team cực hợp 🔥`,`🏡 **VILLA NGUYÊN CĂN ${h}**

- Không gian rộng
- Tự do ăn chơi

👉 Bạn đi bao nhiêu người mình chọn size villa chuẩn`]:m==="couple"?[`💕 **VILLA CHO CẶP ĐÔI ${h}**

- View đẹp, riêng tư
- Decor lãng mạn

💰 ~800k–2tr/đêm
👉 Rất hợp đi chill hoặc kỷ niệm`,`🌸 **HOMESTAY CHILL ${h}**

- Nhỏ xinh
- View xịn

👉 Bạn thích style hiện đại hay vintage?`]:[`🏨 **KHÁCH SẠN ${h}**

- Giá: 500k – 2tr
- Nhiều lựa chọn

👉 Bạn muốn:
- Gần trung tâm
- View đẹp
- Hay giá rẻ?`,`🌟 **GỢI Ý LƯU TRÚ ${h}**

- Budget thấp → homestay
- Tầm trung → hotel
- Cao cấp → villa/resort

👉 Cho mình budget + số người mình chọn chuẩn luôn`])}return s([`🏨 Bạn muốn ở khu vực nào?

👉 Mình có thể gợi ý:
- Đà Lạt
- Đà Nẵng
- Phú Quốc

👉 Nói mình location + budget là mình chọn chuẩn luôn 😎`,`😄 Bạn cần tìm khách sạn hay villa?

👉 Cho mình:
- Đi đâu
- Bao nhiêu người
- Budget

👉 Mình lọc đúng nhu cầu cho bạn luôn`])}function it(r){const i=r.toLowerCase(),s=v=>v[Math.floor(Math.random()*v.length)],e=i.includes("sài gòn")||i.includes("sg")||i.includes("hcm"),n=i.includes("hà nội")||i.includes("hn"),a=i.includes("đà nẵng")||i.includes("dn"),d=i.includes("thái lan")||i.includes("bangkok"),m=i.includes("cuối tuần"),h=i.includes("mai"),C=i.includes("tuần sau"),_=i.includes("giá")||i.includes("bao nhiêu");return e&&a?s(_?[`✈️ **SG → ĐÀ NẴNG**

💰 Giá vé:
- Thường: ~800k – 1.2tr (1 chiều)
- Cuối tuần: ~1.3tr – 1.8tr

💡 Tip: đặt trước 1–2 tuần để rẻ hơn`]:[`✈️ Bay SG → Đà Nẵng rất nhiều chuyến/ngày

⏱️ Thời gian bay: ~1h20p  
💰 Giá trung bình: ~1tr

👉 Bạn bay ngày nào mình check giờ đẹp cho`,`🔥 Tuyến SG → Đà Nẵng đang có nhiều deal

👉 Bạn đi ${m?"cuối tuần":"ngày thường"} hay thời gian cụ thể?`]):n&&a?s([`✈️ **HN → ĐÀ NẴNG**

⏱️ Bay ~1h15p  
💰 Giá: 900k – 1.5tr

👉 Có nhiều chuyến sáng và tối đẹp`,`🌤️ Bay từ Hà Nội vào Đà Nẵng rất tiện

👉 Bạn muốn bay giờ sáng hay tối?`]):d?s([`✈️ **VIỆT NAM → THÁI LAN**

💰 Giá:
- Bay thẳng: ~1.8tr – 3tr
- Khứ hồi: ~2.5tr – 4tr

⏱️ Bay ~1h30p – 2h

👉 Bạn muốn bay từ HCM hay Hà Nội?`,`🌴 Bay Thái Lan đang rất rẻ

🔥 Vietjet / AirAsia thường có deal

👉 Bạn dự định đi tháng mấy?`]):h?`⚠️ Bay ngày mai thường giá cao

💰 Có thể từ 1.5tr – 3tr

👉 Nếu linh hoạt, bạn nên dời 2–3 ngày để tiết kiệm`:m?`🔥 Cuối tuần giá vé thường tăng 20–40%

👉 Nếu muốn rẻ hơn:
- Bay giữa tuần
- Đặt sớm`:C?`👍 Tuần sau là thời điểm đẹp để đặt vé

💰 Giá thường ổn định ~1tr – 1.5tr nội địa

👉 Bạn cho mình tuyến bay mình check cụ thể`:_?`💰 **GIÁ VÉ THAM KHẢO**

- Nội địa: ~800k – 1.5tr
- Quốc tế gần: ~2tr – 4tr

👉 Bạn bay từ đâu → đâu mình báo chuẩn luôn`:i.includes("đặt vé")||i.includes("book")?`🎫 Mình có thể hỗ trợ bạn:

- Tìm vé rẻ
- Chọn giờ đẹp
- So sánh hãng bay

👉 Bạn cho mình:
- Điểm đi
- Điểm đến
- Ngày bay`:s([`✈️ Bạn muốn bay từ đâu → đâu?

👉 Mình sẽ tìm vé tốt nhất cho bạn`,`🌍 Mình hỗ trợ:
- Vé nội địa
- Vé quốc tế
- Săn vé rẻ

👉 Nhập tuyến bay + ngày là ok 😎`])}function ot(r){const i=r.toLowerCase(),s=d=>d[Math.floor(Math.random()*d.length)],e={"đà lạt":[{name:"Mứt dâu Đà Lạt",price:"120.000đ",desc:"Ngọt nhẹ, dẻo"},{name:"Trà Atiso",price:"80.000đ",desc:"Thanh nhiệt, tốt sức khỏe"},{name:"Dâu tây tươi",price:"150.000đ/kg",desc:"Hái tại vườn"},{name:"Hồng treo gió",price:"200.000đ",desc:"Dẻo, ngọt tự nhiên"},{name:"Cà phê Arabica",price:"180.000đ",desc:"Thơm, vị đậm"}],"đà nẵng":[{name:"Chả bò Đà Nẵng",price:"250.000đ/kg",desc:"Dai ngon, đậm vị"},{name:"Mực rim me",price:"180.000đ",desc:"Chua cay, bắt vị"},{name:"Bánh khô mè",price:"50.000đ",desc:"Giòn, thơm mè"},{name:"Rong biển Mỹ Khê",price:"100.000đ",desc:"Tươi, giàu dinh dưỡng"},{name:"Nước mắm Nam Ô",price:"150.000đ",desc:"Đậm đà truyền thống"}],"phú quốc":[{name:"Nước mắm Phú Quốc",price:"200.000đ",desc:"Nguyên chất"},{name:"Hồ tiêu Phú Quốc",price:"150.000đ",desc:"Thơm, cay nhẹ"},{name:"Rượu sim",price:"250.000đ",desc:"Đặc sản nổi tiếng"},{name:"Khô cá thiều",price:"180.000đ",desc:"Ngon, dễ bảo quản"},{name:"Bánh tét mật cật",price:"120.000đ",desc:"Đậm chất miền biển"}]};let n=null;i.includes("đà lạt")&&(n="đà lạt"),i.includes("đà nẵng")&&(n="đà nẵng"),i.includes("phú quốc")&&(n="phú quốc");const a=i.includes("đặc sản")||i.includes("mua gì")||i.includes("quà")||i.includes("gợi ý");return n&&e[n]?{text:`🛍️ Đặc sản ${n.toUpperCase()} bạn nên mua:`,products:e[n]}:a?{text:s([`🎁 Bạn muốn tìm đặc sản ở đâu?

👉 Mình gợi ý chuẩn cho:
- Đà Lạt
- Đà Nẵng
- Phú Quốc`]),products:[]}:{text:`🛍️ Bạn muốn mua đặc sản ở đâu?

👉 Nhập địa điểm mình gợi ý chi tiết luôn`,products:[]}}const at={tour:nt,villa:st,flight:it,product:ot};function rt(){const r=f([]),i=f(!1),s=f(null),e=f([]),n=f(null),a=f([{id:"tour",name:"AI Du Lịch",type:"tour",status:"active"},{id:"villa",name:"AI Khách Sạn",type:"villa",status:"active"},{id:"flight",name:"AI Vé Máy Bay",type:"flight",status:"active"},{id:"product",name:"AI Đặc Sản",type:"product",status:"active"},{id:"news",name:"AI Tin Tức",type:"news",status:"active"},{id:"support",name:"AI Hỗ Trợ",type:"support",status:"active"},{id:"general",name:"AI Tư Vấn Tổng",type:"general",status:"active"}]),d=L(()=>a.value.find(b=>b.id===n.value)),m=async b=>{n.value=b;const x="conv_"+Date.now();return s.value=x,r.value=[],e.value.push({conversation_id:x,partner_service_id:b}),localStorage.setItem("current_conversation_id",x),x},h=b=>{const x=d.value?.type,y=at[x];return y?y(b):"🤖 Model chưa hỗ trợ!"};return{messages:r,isLoading:i,sendMessage:async b=>{if(!b)return;r.value.push({id:Date.now(),role:"user",content:b}),i.value=!0,await new Promise(y=>setTimeout(y,800));const x=h(b);typeof x=="object"?r.value.push({id:Date.now()+1,role:"assistant",content:x.text,products:x.products,isCompleted:!0}):r.value.push({id:Date.now()+1,role:"assistant",content:x,isCompleted:!0}),i.value=!1},resetChat:()=>{r.value=[],s.value=null,n.value=null,localStorage.removeItem("current_conversation_id")},createConversation:m,loadConversationHistory:async()=>[],loadConversations:async()=>[],loadPartnerServices:async()=>a.value,loadOrganization:async()=>({id:"fake-org"}),partnerServices:a,conversationsList:e,currentConversationId:s}}const lt={class:"border-b border-slate-200/70 bg-white/75 px-3 py-2 backdrop-blur-xl"},ct={class:"grid grid-cols-2 gap-2 rounded-[14px] bg-slate-100/90 p-1"},dt={__name:"AITabs",props:["modelValue"],emits:["update:modelValue"],setup(r){return(i,s)=>(c(),u("div",lt,[t("div",ct,[t("button",{class:k(["rounded-xl px-3 py-1.5 text-[13px] font-semibold transition",r.modelValue==="messages"?"bg-white text-slate-900 shadow-sm":"text-slate-500 hover:text-slate-700"]),onClick:s[0]||(s[0]=e=>i.$emit("update:modelValue","messages"))}," Tin nhắn ",2),t("button",{class:k(["relative rounded-xl px-3 py-1.5 text-[13px] font-semibold transition",r.modelValue==="news"?"bg-white text-slate-900 shadow-sm":"text-slate-500 hover:text-slate-700"]),onClick:s[1]||(s[1]=e=>i.$emit("update:modelValue","news"))},[...s[2]||(s[2]=[t("span",null,"Tin tức",-1),t("span",{class:"absolute right-2.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-400"},null,-1)])],2)])]))}},ut={key:0,class:"mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white shadow-sm sm:flex"},ht={class:"max-w-[85%] min-w-0"},gt={key:0,class:"inline-flex items-center rounded-full bg-sky-100 px-2 py-1 text-[10px] font-medium text-sky-700"},pt={class:"whitespace-pre-wrap break-words text-[13px] leading-relaxed"},mt={key:1,class:"mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-[11px] font-semibold text-white shadow-sm sm:flex"},xt={__name:"AIChatMessage",props:{role:String,content:{type:String,default:""},products:{type:Array,default:()=>[]},isCompleted:{type:Boolean,default:!0}},setup(r){const i=r,s=L(()=>i.role==="user"),e=L(()=>s.value?"border-sky-500/15 bg-gradient-to-br from-sky-500 to-cyan-500 text-white rounded-br-md":"border-white/80 bg-white/90 text-slate-700 backdrop-blur rounded-bl-md");return(n,a)=>(c(),u("div",{class:k(["flex gap-3",s.value?"justify-end":"justify-start"])},[s.value?N("",!0):(c(),u("div",ut," AI ")),t("div",ht,[t("div",{class:k(["mb-2 flex items-center gap-2",s.value?"justify-end":"justify-start"])},[t("span",{class:k(["text-[10px] font-bold uppercase tracking-[0.1em]",s.value?"text-slate-400":"text-sky-600"])},g(s.value?"Bạn":"Trợ lý AI"),3),!s.value&&!r.isCompleted?(c(),u("span",gt," Đang phản hồi ")):N("",!0)],2),t("div",{class:k(["overflow-hidden rounded-[22px] border px-4 py-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]",e.value])},[t("p",pt,g(r.content),1)],2)]),s.value?(c(),u("div",mt," Bạn ")):N("",!0)],2))}},vt={class:"border-t border-slate-200/70 bg-white/80 px-3 pb-3 pt-2 backdrop-blur-xl"},bt={class:"rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"},ft={class:"flex items-end gap-3"},yt={class:"min-w-0 flex-1"},wt=["disabled","onKeydown"],kt={class:"mt-1 flex items-center justify-between gap-3 text-[10px]"},_t={class:"text-slate-400"},Ct={class:"font-medium text-slate-300"},Nt=["disabled"],Tt={__name:"AIChatInput",props:{loading:{type:Boolean,default:!1}},emits:["send"],setup(r,{emit:i}){const s=Z(),e=f(""),n=f(null),a=r,d=i,m=async()=>{await R(),n.value&&(n.value.style.height="auto",n.value.style.height=`${Math.min(n.value.scrollHeight,160)}px`)},h=()=>{!e.value.trim()||a.loading||(d("send",e.value),e.value="",m())},C=()=>{if("webkitSpeechRecognition"in window||"SpeechRecognition"in window){const _=window.webkitSpeechRecognition||window.SpeechRecognition,v=new _;v.lang="vi-VN",v.continuous=!1,v.onresult=T=>{e.value=T.results[0][0].transcript,m()},v.start()}else s.error("Trình duyệt của bạn không hỗ trợ nhập giọng nói")};return K(()=>{m()}),(_,v)=>(c(),u("div",vt,[t("div",bt,[t("div",ft,[t("button",{class:"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-900 hover:text-white",title:"Nhập giọng nói",onClick:C},[...v[1]||(v[1]=[t("svg",{class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"})],-1)])]),t("div",yt,[F(t("textarea",{ref_key:"textareaRef",ref:n,"onUpdate:modelValue":v[0]||(v[0]=T=>e.value=T),disabled:r.loading,rows:"1",class:"composer-textarea min-h-[40px] w-full resize-none bg-transparent px-1 py-1.5 text-[13px] leading-relaxed text-slate-700 outline-none placeholder:text-slate-400",placeholder:"Nhập câu hỏi của bạn...",onInput:m,onKeydown:X(J(h,["prevent"]),["enter"])},null,40,wt),[[W,e.value]]),t("div",kt,[t("span",_t,g(r.loading?"Đang phản hồi...":"Nhấn Enter để gửi"),1),t("span",Ct,g(e.value.trim().length)+"/1000",1)])]),t("button",{class:k(["flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition",e.value.trim()&&!r.loading?"bg-slate-900 hover:-translate-y-0.5 hover:bg-slate-950":"bg-slate-300"]),disabled:!e.value.trim()||r.loading,title:"Gửi tin nhắn",onClick:h},[...v[2]||(v[2]=[t("svg",{class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 12h14m-6-6l6 6-6 6"})],-1)])],10,Nt)])])]))}},Mt=V(Tt,[["__scopeId","data-v-2840d5cc"]]),Bt={class:"overflow-hidden rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"},$t={class:"flex items-start gap-4"},Lt={class:"min-w-0 flex-1"},St={class:"flex flex-wrap items-center gap-2"},Ht={class:"inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500"},It={class:"mt-2 text-sm leading-6 text-slate-500"},At={class:"font-semibold text-slate-700"},Vt={class:"mt-5 grid gap-2 sm:grid-cols-2"},jt=["onClick"],Gt={class:"flex items-start justify-between gap-3"},Pt={class:"text-sm font-semibold text-slate-800"},zt={class:"mt-2 line-clamp-2 text-xs leading-5 text-slate-500"},Kt={__name:"AIChatWelcome",props:{serviceName:{type:String,default:"AI Assistant"},serviceType:{type:String,default:"tour"}},emits:["suggest"],setup(r){const i=r,s={tour:[{text:"🏖️ Tour Đà Nẵng",message:"Tư vấn cho tôi tour Đà Nẵng 3 ngày 2 đêm"},{text:"✈️ Tour Thái Lan",message:"Có tour Thái Lan nào giá rẻ không?"},{text:"🏔️ Lịch trình Đà Lạt",message:"Gợi ý lịch trình Đà Lạt cho gia đình"}],villa:[{text:"🏨 Kiểm tra Villa trống",message:"Kiểm tra giúp tôi các villa còn trống vào cuối tuần này"},{text:"💰 Báo giá phòng",message:"Giá villa cho đoàn 10 người là bao nhiêu?"},{text:"📍 Vị trí Villa",message:"Các villa này có gần biển không?"}],inventory:[{text:"🛍️ Kiểm tra tồn kho",message:"Sản phẩm này còn hàng không bạn?"},{text:"🏷️ Giá sản phẩm",message:"Cho tôi biết giá của sản phẩm này"},{text:"🚚 Giao hàng",message:"Chính sách giao hàng của bên mình như thế nào?"}]},e=L(()=>s[i.serviceType]||s.tour);return(n,a)=>(c(),u("section",Bt,[t("div",$t,[a[4]||(a[4]=t("div",{class:"flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-slate-900 text-white shadow-lg"},[t("svg",{class:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.8",d:"M9.75 3.75h4.5m-7.5 5.5h10.5m-13 0h.75m11.5 0h.75m-10 5.5a2.75 2.75 0 015.5 0v.25h-5.5v-.25zm8 0a2.75 2.75 0 015.5 0v.25h-5.5v-.25zM8 7.5a1.25 1.25 0 11-2.5 0A1.25 1.25 0 018 7.5zm10.5 0A1.25 1.25 0 1116 7.5a1.25 1.25 0 012.5 0zM12 3.75v3"})])],-1)),t("div",Lt,[t("div",St,[a[0]||(a[0]=t("span",{class:"inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-medium text-sky-700"}," Sẵn sàng hỗ trợ ",-1)),t("span",Ht,g(r.serviceName||"AI Assistant"),1)]),a[3]||(a[3]=t("h3",{class:"mt-3 text-xl font-semibold text-slate-900"},"Xin chào, mình có thể giúp gì cho bạn hôm nay?",-1)),t("p",It,[a[1]||(a[1]=M(" Bạn đang trò chuyện với ",-1)),t("strong",At,g(r.serviceName||"AI Assistant"),1),a[2]||(a[2]=M(". Chọn một gợi ý bên dưới hoặc nhập câu hỏi riêng để bắt đầu. ",-1))])])]),t("div",Vt,[(c(!0),u(H,null,I(e.value,d=>(c(),u("button",{key:d.text,class:"group rounded-[20px] border border-slate-200 bg-slate-50/70 px-4 py-3 text-left transition hover:border-sky-200 hover:bg-white hover:shadow-sm",onClick:m=>n.$emit("suggest",d.message)},[t("div",Gt,[t("span",Pt,g(d.text),1),a[5]||(a[5]=t("svg",{class:"mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-sky-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1))]),t("p",zt,g(d.message),1)],8,jt))),128))])]))}},Rt={},qt={class:"rounded-[24px] border border-dashed border-slate-300 bg-white/75 px-6 py-8 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)]"};function Ot(r,i){return c(),u("section",qt,[...i[0]||(i[0]=[q('<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500"><svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg></div><h3 class="mt-4 text-lg font-semibold text-slate-800">Cuộc trò chuyện mới đã sẵn sàng</h3><p class="mt-2 text-sm leading-6 text-slate-500"> Chọn một gợi ý để bắt đầu nhanh hoặc gửi câu hỏi đầu tiên của bạn ngay bên dưới. </p>',3)])])}const Dt=V(Rt,[["render",Ot]]),Ut={class:"space-y-4"},Qt={class:"flex items-start gap-4"},Et={class:"flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-slate-100 text-2xl"},Yt={class:"min-w-0 flex-1"},Ft={class:"flex flex-wrap items-start justify-between gap-3"},Wt={class:"min-w-0"},Xt={class:"text-[15px] font-bold leading-SNUG text-slate-900"},Jt={class:"mt-0.5 text-[10px] font-semibold tracking-wide text-slate-400"},Zt={class:"mt-3 text-[13px] leading-relaxed text-slate-500"},te={class:"mt-4 grid grid-cols-2 gap-2"},ee={class:"rounded-xl bg-slate-50 px-3 py-2.5"},ne={class:"mt-1 text-[13px] font-semibold text-slate-700"},se={class:"rounded-xl bg-slate-50 px-3 py-2.5"},ie={class:"mt-1 text-[13px] font-semibold text-slate-700"},oe={class:"col-span-2 rounded-xl bg-rose-50 px-3 py-2.5"},ae={class:"flex items-center justify-between gap-3"},re={class:"text-[14px] font-bold text-rose-600"},le=["onClick"],ce={__name:"AINewsList",emits:["askNews"],setup(r){const i=[{id:1,icon:"🏖️",title:"🎉 Tour Đà Nẵng - Giảm 30% tháng 6",date:"01/06/2024",description:"Khách sạn 4 sao view biển, bao gồm vé tham quan Bà Nà Hills, buffet sáng tại khách sạn",location:"Đà Nẵng, Việt Nam",duration:"3 ngày 2 đêm",price:"2,990,000đ/khách"},{id:2,icon:"✈️",title:"✈️ Vé máy bay đi Thái Lan chỉ từ 1.2tr",date:"28/05/2024",description:"Bay cùng VietJet, bao gồm 20kg hành lý ký gửi, chọn chỗ miễn phí",location:"Bangkok, Phuket, Chiang Mai",duration:"Khứ hồi linh hoạt",price:"1,200,000đ/vé"},{id:3,icon:"🏔️",title:"🏨 Khách sạn Đà Lạt ưu đãi 40%",date:"25/05/2024",description:"Nghỉ dưỡng cuối tuần, view đồi thông, bao gồm bữa sáng, spa miễn phí",location:"Đà Lạt, Lâm Đồng",duration:"2 ngày 1 đêm",price:"1,500,000đ/phòng"}];return(s,e)=>(c(),u("div",Ut,[e[5]||(e[5]=q('<section class="overflow-hidden rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"><div class="flex items-start gap-4"><div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-amber-100 text-amber-700"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2zm-8 4h6m-6 4h6M7 9h.01M7 13h.01"></path></svg></div><div><p class="text-[10px] font-bold uppercase tracking-[0.1em] text-amber-600">News Feed</p><h3 class="mt-1 text-lg font-bold text-slate-900">Tin nổi bật</h3><p class="mt-1.5 text-[13px] leading-relaxed text-slate-500"> Chọn tin để xem thêm chi tiết ngay trong khung chat này. </p></div></div></section>',1)),(c(),u(H,null,I(i,n=>t("article",{key:n.id,class:"group overflow-hidden rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(15,23,42,0.12)]"},[t("div",Qt,[t("div",Et,g(n.icon),1),t("div",Yt,[t("div",Ft,[t("div",Wt,[t("h4",Xt,g(n.title),1),t("p",Jt,g(n.date),1)]),e[0]||(e[0]=t("span",{class:"inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"}," Gợi ý nhanh ",-1))]),t("p",Zt,g(n.description),1),t("div",te,[t("div",ee,[e[1]||(e[1]=t("div",{class:"flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400"},[t("svg",{class:"h-3.5 w-3.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]),M(" Điểm đến ")],-1)),t("p",ne,g(n.location),1)]),t("div",se,[e[2]||(e[2]=t("div",{class:"flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400"},[t("svg",{class:"h-3.5 w-3.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})]),M(" Thời gian ")],-1)),t("p",ie,g(n.duration),1)]),t("div",oe,[t("div",ae,[e[3]||(e[3]=t("div",{class:"flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-rose-400"},[t("svg",{class:"h-3.5 w-3.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})]),M(" Giá ưu đãi ")],-1)),t("p",re,g(n.price),1)])])]),t("button",{class:"mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-950",onClick:a=>s.$emit("askNews",n)},[...e[4]||(e[4]=[M(" Đặt câu hỏi về tour này ",-1),t("svg",{class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1)])],8,le)])])])),64))]))}},de={class:"pointer-events-none fixed inset-x-3 bottom-3 z-[9999] sm:inset-x-auto sm:bottom-6 sm:right-6"},ue={class:"pointer-events-auto ml-auto flex w-full max-w-[400px] flex-col items-end gap-3"},he={key:0,class:"chat-shell relative flex h-[calc(100vh-6.5rem)] max-h-[550px] w-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:h-[550px]",style:{isolation:"isolate"}},ge={class:"relative border-b border-slate-200/50 bg-white/80 px-4 py-2.5 backdrop-blur-xl"},pe={class:"flex items-center justify-between gap-4"},me={class:"flex shrink-0 items-center gap-1.5"},xe={key:0,class:"relative space-y-4"},ve={class:"grid gap-3"},be=["onClick"],fe={class:"relative flex items-start gap-4"},ye={class:"min-w-0 flex-1"},we={class:"flex flex-wrap items-start justify-between gap-3"},ke={class:"min-w-0"},_e={class:"truncate text-sm font-bold text-slate-900"},Ce={class:"mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400"},Ne={class:"mt-3 line-clamp-2 text-[13px] leading-relaxed text-slate-500"},Te={key:0,class:"rounded-[24px] border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center text-sm text-slate-500"},Me={key:1,class:"relative"},Be={key:0,class:"space-y-4"},$e={key:1,class:"space-y-5"},Le={key:0,class:"rounded-[22px] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"},Se={class:"flex items-center gap-3"},He={class:"flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700"},Ie={class:"min-w-0"},Ae={class:"text-sm font-semibold text-slate-900"},Ve={key:1,class:"flex justify-start"},je={key:1,class:"chat-scroll relative flex-1 overflow-y-auto px-4 pb-4 pt-4"},Ge={class:"flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15"},Pe={key:0,class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},ze={key:1,class:"h-4 w-4 text-sky-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},Ke={class:"flex flex-col text-left leading-none"},Re={class:"text-[12px] font-bold tracking-tight text-white"},qe={__name:"AIChatContainer",setup(r){const i=f(!1),s=f("messages"),e=f(null),n=f(null),{messages:a,isLoading:d,sendMessage:m,resetChat:h,createConversation:C,loadConversationHistory:_,loadConversations:v,loadPartnerServices:T,loadOrganization:j,partnerServices:B,conversationsList:b,currentConversationId:x}=rt(),y=L(()=>{if(n.value)return B.value.find(l=>l.id===n.value);if(x.value&&b.value.length>0){const l=b.value.find(o=>o.conversation_id===x.value);if(l)return B.value.find(o=>o.id===l.partner_service_id)}return null}),G=l=>{const o=`${l?.type||""} ${l?.category||""} ${l?.name||""}`.toLowerCase();return o.includes("tour")||o.includes("travel")?"✈":o.includes("villa")||o.includes("hotel")||o.includes("room")?"⌂":o.includes("inventory")||o.includes("product")||o.includes("shop")?"◫":"AI"},O=l=>{const o=l?.type||l?.category||"assistant";return String(o).replace(/_/g," ")},D=l=>l==="active"?"Sẵn sàng":"Tạm tắt",U=l=>l==="active"?"bg-emerald-100 text-emerald-700":"bg-slate-100 text-slate-500",S=async()=>{await R(),e.value&&e.value.scrollTo({top:e.value.scrollHeight,behavior:"smooth"})},Q=async l=>{if(l){n.value=l,d.value=!0;try{const o=await C(l);o&&(await _(o),S())}catch(o){console.error("Error createConversation:",o)}finally{d.value=!1}}},A=async l=>{!l||!l.trim()||d.value||(await m(l),S())},E=l=>{s.value="messages",setTimeout(()=>{const o=`Tôi muốn hỏi về: ${l.title}. Bạn tư vấn thêm được không?`;A(o)},200)},Y=()=>{confirm("Quay lại danh sách trợ lý?")&&(h(),n.value=null)};return P(()=>a.value.length,S),P(()=>x.value,l=>{l||(n.value=null)}),K(async()=>{await j(),await T(),await v();const l=localStorage.getItem("current_conversation_id");l&&(x.value=l,await _(l),S())}),(l,o)=>(c(),u("div",de,[t("div",ue,[$(et,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"translate-y-3 opacity-0 scale-[0.98]","enter-to-class":"translate-y-0 opacity-100 scale-100","leave-active-class":"transition duration-150 ease-in","leave-from-class":"translate-y-0 opacity-100 scale-100","leave-to-class":"translate-y-3 opacity-0 scale-[0.98]"},{default:tt(()=>[i.value?(c(),u("div",he,[o[10]||(o[10]=t("div",{class:"pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_40%)]"},null,-1)),t("div",ge,[t("div",pe,[o[5]||(o[5]=t("div",{class:"flex items-center gap-2.5 min-w-0"},[t("div",{class:"flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm"},[t("svg",{class:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"})])]),t("div",{class:"flex items-center gap-2 truncate"},[t("h2",{class:"text-[14px] font-bold text-slate-900 truncate"},"Chat hỗ trợ"),t("span",{class:"flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"})])],-1)),t("div",me,[t("button",{class:"flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white/50 text-slate-500 transition hover:bg-slate-50 hover:text-sky-600",title:"Đổi trợ lý",onClick:Y},[...o[3]||(o[3]=[t("svg",{class:"h-3.5 w-3.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})],-1)])]),t("button",{class:"flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white/50 text-slate-500 transition hover:bg-rose-50 hover:text-rose-500",title:"Đóng chat",onClick:o[0]||(o[0]=p=>i.value=!1)},[...o[4]||(o[4]=[t("svg",{class:"h-3.5 w-3.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])])])]),$(dt,{modelValue:s.value,"onUpdate:modelValue":o[1]||(o[1]=p=>s.value=p)},null,8,["modelValue"]),s.value==="messages"?(c(),u("div",{key:0,ref_key:"messagesContainer",ref:e,class:"chat-scroll relative flex-1 overflow-y-auto px-4 pb-4 pt-4"},[w(x)?(c(),u("div",Me,[w(a).length===0&&!w(d)?(c(),u("div",Be,[$(Dt),$(Kt,{"service-name":y.value?.name,"service-type":y.value?.type||y.value?.category,onSuggest:A},null,8,["service-name","service-type"])])):(c(),u("div",$e,[y.value?(c(),u("div",Le,[t("div",Se,[t("div",He,g(G(y.value)),1),t("div",Ie,[t("p",Ae,g(y.value.name),1),o[8]||(o[8]=t("p",{class:"text-xs text-slate-500"}," Phiên trò chuyện đang hoạt động và sẵn sàng phản hồi. ",-1))])])])):N("",!0),(c(!0),u(H,null,I(w(a),p=>(c(),z(xt,{key:p.id,role:p.role,content:p.content,products:p.products,"is-completed":p.isCompleted},null,8,["role","content","products","is-completed"]))),128)),w(d)?(c(),u("div",Ve,[...o[9]||(o[9]=[t("div",{class:"flex items-end gap-3"},[t("div",{class:"hidden h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white shadow-sm sm:flex"}," AI "),t("div",{class:"rounded-[24px] rounded-bl-md border border-white/70 bg-white/90 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"},[t("div",{class:"mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600"},"Đang phản hồi"),t("div",{class:"flex gap-1.5"},[t("span",{class:"h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce",style:{"animation-delay":"0ms"}}),t("span",{class:"h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce",style:{"animation-delay":"150ms"}}),t("span",{class:"h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce",style:{"animation-delay":"300ms"}})])])],-1)])])):N("",!0)]))])):(c(),u("div",xe,[o[7]||(o[7]=t("section",{class:"overflow-hidden rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"},[t("div",{class:"flex items-start gap-4"},[t("div",{class:"flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-sky-100 text-sky-700"},[t("svg",{class:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.8",d:"M17 8h2a2 2 0 012 2v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9a2 2 0 012-2h2m10 0V6a3 3 0 00-3-3H10a3 3 0 00-3 3v2m10 0H7"})])]),t("div",{class:"min-w-0"},[t("p",{class:"text-[10px] font-bold uppercase tracking-[0.14em] text-sky-600"},"Bắt đầu nhanh"),t("h3",{class:"mt-1 text-lg font-bold text-slate-900"},"Chọn trợ lý phù hợp với nhu cầu"),t("p",{class:"mt-1.5 text-[13px] leading-relaxed text-slate-500"}," Mỗi trợ lý có vai trò và kiến thức riêng biệt. Chọn đúng trợ lý để nhận câu trả lời sát thực tế nhất. ")])])],-1)),t("div",ve,[(c(!0),u(H,null,I(w(B),p=>(c(),u("button",{key:p.id,class:k(["group relative overflow-hidden rounded-[24px] border bg-white/85 p-4 text-left shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)]",n.value===p.id?"border-sky-400 ring-2 ring-sky-100":"border-white/70 hover:border-sky-200"]),onClick:Oe=>Q(p.id)},[o[6]||(o[6]=t("div",{class:"absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.4),rgba(241,245,249,0.25))]"},null,-1)),t("div",fe,[t("div",{class:k(["flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] text-lg font-semibold transition",n.value===p.id?"bg-slate-900 text-white":"bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white"])},g(G(p)),3),t("div",ye,[t("div",we,[t("div",ke,[t("h4",_e,g(p.name),1),t("p",Ce,g(O(p)),1)]),t("span",{class:k(["inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",U(p.status)])},g(D(p.status)),3)]),t("p",Ne,g(p.config?.system_prompt||"Trợ lý AI hỗ trợ bạn thông minh và chính xác."),1)])])],10,be))),128))]),w(B).length===0&&!w(d)?(c(),u("div",Te," Chưa có trợ lý khả dụng để hiển thị. ")):N("",!0)]))],512)):(c(),u("div",je,[$(ce,{onAskNews:E})])),s.value==="messages"&&w(x)?(c(),z(Mt,{key:2,loading:w(d),onSend:A},null,8,["loading"])):N("",!0)])):N("",!0)]),_:1}),t("button",{class:"group flex items-center gap-2.5 rounded-full bg-slate-900/95 px-3.5 py-2 text-white shadow-[0_20px_60px_rgba(15,23,42,0.28)] ring-1 ring-white/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-slate-950",onClick:o[2]||(o[2]=p=>i.value=!i.value)},[t("span",Ge,[i.value?(c(),u("svg",ze,[...o[12]||(o[12]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"},null,-1)])])):(c(),u("svg",Pe,[...o[11]||(o[11]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"},null,-1)])]))]),t("div",Ke,[o[13]||(o[13]=t("div",{class:"mb-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400/80"},"AI Chat",-1)),t("div",Re,g(i.value?"Thu gọn":"Chat ngay"),1)])])])]))}},Ue=V(qe,[["__scopeId","data-v-2e32c442"]]);export{Ue as A};
