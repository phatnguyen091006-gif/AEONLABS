/* ===================================
   AEONLABS — AI Chat Widget
   Self-contained: HTML, CSS, JS in one file
   =================================== */
(function(){
'use strict';

// ---- BUSINESS KNOWLEDGE BASE ----
var BIZ = {
  name: 'AEONLABS',
  tagline: 'AI-Powered Marketing Agency',
  email: 'hello@aeonlabs.ai',
  services: [
    {name:'AI Ad Campaigns', desc:'Ads that learn and improve every hour. Your cost-per-click drops, conversions rise — automatically.'},
    {name:'SEO Automation', desc:'Rank higher, faster. Our AI finds gaps competitors miss, writes optimised content, and builds authority on autopilot.'},
    {name:'Content Generation', desc:'Blog posts, emails, social captions — generated in your brand voice. Reviewed by humans. Published at peak times.'},
    {name:'Social Media AI', desc:'We predict what your audience wants, then create and schedule it automatically.'},
    {name:'Predictive Analytics', desc:'Trend forecasting, churn prediction, and revenue modelling — all in real-time.'},
    {name:'Brand Strategy', desc:'Data-driven positioning that cuts through noise. We find your edge and build a brand people remember.'}
  ],
  stats: {roas:'340%', leads:'2M+', costReduction:'85%', clients:'50+'},
  process: '1. Free discovery call → 2. AI audit of your current marketing → 3. Custom strategy proposal → 4. Launch & optimize → 5. Monthly reporting',
  pricing: 'We offer custom packages based on your needs. Most clients start from $2,500/month. Book a free call to get a tailored quote.',
  timeline: 'Onboarding takes 1–2 weeks. You\'ll see initial results within 30 days, with significant impact by 90 days.',
  faq: [
    {q:'How is this different from a normal agency?', a:'We use AI to automate and optimize everything — from ad copy to bid management. This means faster results, lower costs, and 24/7 optimization that human teams can\'t match.'},
    {q:'Do I need a big budget?', a:'No. Our AI is designed to maximize ROI regardless of budget. We\'ve helped startups with $1K/month budgets and enterprises with $500K+.'},
    {q:'What industries do you work with?', a:'E-commerce, SaaS, fintech, healthcare, real estate, education, and more. Our AI adapts to any industry.'},
    {q:'How do you measure success?', a:'Real business metrics: revenue, leads, cost-per-acquisition, ROAS. We set clear KPIs upfront and report monthly.'}
  ]
};

// ---- INTENT MATCHING ----
var intents = [
  {keys:['service','offer','what do you do','help with','provide','work'],
   resp:function(){return'We offer 6 core AI-powered marketing services:\n\n'+BIZ.services.map(function(s,i){return'**'+(i+1)+'. '+s.name+'** — '+s.desc;}).join('\n\n')+'\n\nWould you like to know more about any of these, or book a free consultation?';}},
  {keys:['price','cost','how much','budget','pricing','package','afford'],
   resp:function(){return BIZ.pricing+'\n\nWant me to help you book a call with our team?';}},
  {keys:['process','how does it work','steps','onboard','start','begin','get started'],
   resp:function(){return'Here\'s our process:\n\n'+BIZ.process+'\n\nReady to start? I can help you book a free discovery call!';}},
  {keys:['time','how long','timeline','when','results','fast'],
   resp:function(){return BIZ.timeline;}},
  {keys:['book','meeting','call','schedule','consult','appointment','talk to','speak'],
   resp:function(){return'BOOKING_FORM';}},
  {keys:['contact','email','reach','phone','touch'],
   resp:function(){return'You can reach us at **'+BIZ.email+'**. Or I can help you book a meeting right now — just say "book a call"!';}},
  {keys:['result','case study','proof','roas','performance','stats'],
   resp:function(){return'Here are some real results from our clients:\n\n📊 **'+BIZ.stats.roas+'** Average ROAS\n👥 **'+BIZ.stats.leads+'** Leads Generated\n💰 **'+BIZ.stats.costReduction+'** Cost Reduction\n🤝 **'+BIZ.stats.clients+'** Happy Clients\n\nWant to see how we can get similar results for you?';}},
  {keys:['different','why you','vs','compared','competitor','unique','special'],
   resp:function(){return BIZ.faq[0].a;}},
  {keys:['industry','sector','niche','who do you work'],
   resp:function(){return BIZ.faq[2].a;}},
  {keys:['measure','kpi','metric','success','report'],
   resp:function(){return BIZ.faq[3].a;}},
  {keys:['ad','ads','advertising','campaign','google','facebook','meta','ppc'],
   resp:function(){var s=BIZ.services[0];return'**'+s.name+'**\n\n'+s.desc+'\n\nOur AI manages Google, Meta, LinkedIn, and TikTok ads. Want to learn more or book a free audit?';}},
  {keys:['seo','search','rank','organic','google rank'],
   resp:function(){var s=BIZ.services[1];return'**'+s.name+'**\n\n'+s.desc;}},
  {keys:['content','blog','write','copy','email market'],
   resp:function(){var s=BIZ.services[2];return'**'+s.name+'**\n\n'+s.desc;}},
  {keys:['social','instagram','tiktok','linkedin','twitter','post'],
   resp:function(){var s=BIZ.services[3];return'**'+s.name+'**\n\n'+s.desc;}},
  {keys:['analytic','predict','forecast','data','insight'],
   resp:function(){var s=BIZ.services[4];return'**'+s.name+'**\n\n'+s.desc;}},
  {keys:['brand','position','identity','strategy'],
   resp:function(){var s=BIZ.services[5];return'**'+s.name+'**\n\n'+s.desc;}},
  {keys:['hello','hi','hey','good morning','good afternoon','sup','yo'],
   resp:function(){return'Hey there! 👋 Welcome to '+BIZ.name+'. I\'m here to help you learn about our AI marketing services, see results, or book a free consultation. What can I help you with?';}},
  {keys:['thank','thanks','cheers','appreciate'],
   resp:function(){return'You\'re welcome! 😊 Is there anything else I can help you with?';}},
  {keys:['bye','goodbye','see you','later'],
   resp:function(){return'Thanks for chatting! If you need anything, I\'m always here. Have a great day! 🚀';}}
];

function matchIntent(msg){
  var lower = msg.toLowerCase();
  for(var i=0;i<intents.length;i++){
    for(var j=0;j<intents[i].keys.length;j++){
      if(lower.indexOf(intents[i].keys[j])!==-1) return intents[i].resp();
    }
  }
  return'I\'d love to help with that! Here are some things I can assist with:\n\n• Our **services** and how they work\n• **Pricing** and packages\n• **Results** and case studies\n• **Booking** a free consultation\n• Our **process** and timeline\n\nJust ask about any of these, or type "book a call" to schedule a meeting!';
}

// ---- SIMPLE MARKDOWN ----
function md(text){
  return text
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\n/g,'<br>');
}

// ---- BUILD WIDGET ----
function init(){
  // Inject CSS
  var style=document.createElement('style');
  style.textContent='\
.aeon-chat-fab{position:fixed;bottom:28px;right:28px;z-index:9999;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#A78BFA,#3B82F6);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 30px rgba(108,99,255,0.4);transition:all .3s cubic-bezier(.16,1,.3,1);}\
.aeon-chat-fab:hover{transform:scale(1.08);box-shadow:0 8px 40px rgba(108,99,255,0.55);}\
.aeon-chat-fab svg{width:28px;height:28px;fill:white;transition:transform .3s;}\
.aeon-chat-fab.open svg{transform:rotate(90deg);}\
.aeon-chat-fab .fab-ping{position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(108,99,255,0.5);animation:fab-ping 2s infinite;}\
@keyframes fab-ping{0%{transform:scale(1);opacity:1}100%{transform:scale(1.5);opacity:0}}\
\
.aeon-chat-window{position:fixed;bottom:100px;right:28px;z-index:9998;width:380px;max-height:560px;border-radius:20px;background:rgba(10,10,26,0.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 40px rgba(108,99,255,0.08);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(20px) scale(0.95);pointer-events:none;transition:all .35s cubic-bezier(.16,1,.3,1);}\
.aeon-chat-window.visible{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}\
\
.aeon-chat-header{padding:20px;background:linear-gradient(135deg,rgba(108,99,255,0.12),rgba(59,130,246,0.08));border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:12px;flex-shrink:0;}\
.aeon-chat-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#A78BFA);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}\
.aeon-chat-header-text h4{font-family:"Outfit",sans-serif;font-size:15px;font-weight:600;color:#f0f0f5;margin:0;}\
.aeon-chat-header-text p{font-size:11px;color:rgba(240,240,245,0.5);margin:2px 0 0;}\
.aeon-chat-status{width:7px;height:7px;border-radius:50%;background:#4ade80;margin-left:auto;flex-shrink:0;box-shadow:0 0 8px rgba(74,222,128,0.4);}\
\
.aeon-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;min-height:250px;max-height:360px;}\
.aeon-chat-messages::-webkit-scrollbar{width:4px;}\
.aeon-chat-messages::-webkit-scrollbar-thumb{background:rgba(108,99,255,0.3);border-radius:4px;}\
\
.aeon-msg{max-width:85%;padding:12px 16px;border-radius:16px;font-size:13px;line-height:1.6;animation:msg-in .3s ease-out;}\
@keyframes msg-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}\
.aeon-msg.bot{align-self:flex-start;background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.12);color:rgba(240,240,245,0.85);border-bottom-left-radius:4px;}\
.aeon-msg.user{align-self:flex-end;background:linear-gradient(135deg,#6C63FF,#3B82F6);color:white;border-bottom-right-radius:4px;}\
.aeon-msg strong{color:#A78BFA;}\
.aeon-msg.user strong{color:white;}\
\
.aeon-msg.typing .dot-loader{display:flex;gap:4px;padding:4px 0;}\
.aeon-msg.typing .dot-loader span{width:6px;height:6px;border-radius:50%;background:rgba(167,139,250,0.6);animation:typing-dot 1.2s infinite;}\
.aeon-msg.typing .dot-loader span:nth-child(2){animation-delay:.2s;}\
.aeon-msg.typing .dot-loader span:nth-child(3){animation-delay:.4s;}\
@keyframes typing-dot{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-4px)}}\
\
.aeon-chat-input-wrap{padding:12px 16px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;align-items:center;flex-shrink:0;background:rgba(5,5,16,0.5);}\
.aeon-chat-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:10px 14px;color:#f0f0f5;font-family:"Inter",sans-serif;font-size:13px;outline:none;transition:border-color .3s;}\
.aeon-chat-input::placeholder{color:rgba(240,240,245,0.3);}\
.aeon-chat-input:focus{border-color:rgba(108,99,255,0.4);}\
.aeon-chat-send{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#3B82F6);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s;flex-shrink:0;}\
.aeon-chat-send:hover{transform:scale(1.08);box-shadow:0 4px 16px rgba(108,99,255,0.4);}\
.aeon-chat-send svg{width:16px;height:16px;fill:white;}\
\
.aeon-booking-form{padding:4px 0;}\
.aeon-booking-form input,.aeon-booking-form select,.aeon-booking-form textarea{width:100%;padding:9px 12px;margin:4px 0;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:#f0f0f5;font-family:"Inter",sans-serif;font-size:12px;outline:none;transition:border-color .3s;}\
.aeon-booking-form input:focus,.aeon-booking-form select:focus,.aeon-booking-form textarea:focus{border-color:rgba(108,99,255,0.4);}\
.aeon-booking-form select{appearance:none;-webkit-appearance:none;}\
.aeon-booking-form select option{background:#0d0d20;color:#f0f0f5;}\
.aeon-booking-form textarea{resize:none;height:50px;}\
.aeon-booking-submit{width:100%;padding:10px;margin-top:6px;border-radius:10px;border:none;background:linear-gradient(135deg,#6C63FF,#3B82F6);color:white;font-family:"Inter",sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .3s;}\
.aeon-booking-submit:hover{box-shadow:0 6px 20px rgba(108,99,255,0.35);}\
\
.aeon-quick-btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}\
.aeon-quick-btn{padding:6px 12px;border-radius:20px;border:1px solid rgba(108,99,255,0.2);background:rgba(108,99,255,0.06);color:rgba(240,240,245,0.7);font-size:11px;cursor:pointer;transition:all .3s;font-family:"Inter",sans-serif;}\
.aeon-quick-btn:hover{background:rgba(108,99,255,0.15);border-color:rgba(108,99,255,0.4);color:#f0f0f5;}\
\
@media(max-width:480px){.aeon-chat-window{width:calc(100vw - 20px);right:10px;bottom:90px;max-height:70vh;}.aeon-chat-fab{bottom:18px;right:18px;}}\
';
  document.head.appendChild(style);

  // FAB button
  var fab=document.createElement('button');
  fab.className='aeon-chat-fab';
  fab.id='aeon-chat-fab';
  fab.setAttribute('aria-label','Open chat');
  fab.innerHTML='<div class="fab-ping"></div><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/></svg>';
  document.body.appendChild(fab);

  // Chat window
  var win=document.createElement('div');
  win.className='aeon-chat-window';
  win.id='aeon-chat-window';
  win.innerHTML='\
<div class="aeon-chat-header">\
  <div class="aeon-chat-avatar">🤖</div>\
  <div class="aeon-chat-header-text"><h4>AEONLABS AI</h4><p>Typically replies instantly</p></div>\
  <div class="aeon-chat-status"></div>\
</div>\
<div class="aeon-chat-messages" id="aeon-chat-messages"></div>\
<div class="aeon-chat-input-wrap">\
  <input type="text" class="aeon-chat-input" id="aeon-chat-input" placeholder="Ask me anything..." autocomplete="off">\
  <button class="aeon-chat-send" id="aeon-chat-send" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>\
</div>';
  document.body.appendChild(win);

  var msgs=document.getElementById('aeon-chat-messages');
  var input=document.getElementById('aeon-chat-input');
  var sendBtn=document.getElementById('aeon-chat-send');
  var isOpen=false;

  // Toggle
  fab.addEventListener('click',function(){
    isOpen=!isOpen;
    win.classList.toggle('visible',isOpen);
    fab.classList.toggle('open',isOpen);
    if(isOpen && msgs.children.length===0){
      // Welcome message
      setTimeout(function(){
        addBot('Hey there! 👋 I\'m the AEONLABS AI assistant. I can help you with:\n\n• Learn about our **services**\n• See our **results** and case studies\n• Get **pricing** info\n• **Book a free call** with our team\n\nWhat would you like to know?',true);
      },400);
    }
    if(isOpen) input.focus();
  });

  // Send
  function send(){
    var text=input.value.trim();
    if(!text)return;
    addUser(text);
    input.value='';
    // Typing indicator
    var typing=addTyping();
    var delay=500+Math.random()*800;
    setTimeout(function(){
      msgs.removeChild(typing);
      var resp=matchIntent(text);
      if(resp==='BOOKING_FORM'){
        addBot('I\'d love to help you book a meeting! Please fill in the details below:');
        setTimeout(function(){addBookingForm();},300);
      } else {
        addBot(resp,true);
      }
    },delay);
  }

  sendBtn.addEventListener('click',send);
  input.addEventListener('keydown',function(e){if(e.key==='Enter')send();});

  function addUser(text){
    var el=document.createElement('div');
    el.className='aeon-msg user';
    el.textContent=text;
    msgs.appendChild(el);
    scroll();
  }

  function addBot(text,withQuickBtns){
    var el=document.createElement('div');
    el.className='aeon-msg bot';
    el.innerHTML=md(text);
    msgs.appendChild(el);
    if(withQuickBtns){
      var qb=document.createElement('div');
      qb.className='aeon-quick-btns';
      var btns=['Services','Pricing','Results','Book a Call'];
      btns.forEach(function(b){
        var btn=document.createElement('button');
        btn.className='aeon-quick-btn';
        btn.textContent=b;
        btn.addEventListener('click',function(){
          input.value=b;
          send();
        });
        qb.appendChild(btn);
      });
      msgs.appendChild(qb);
    }
    scroll();
    return el;
  }

  function addTyping(){
    var el=document.createElement('div');
    el.className='aeon-msg bot typing';
    el.innerHTML='<div class="dot-loader"><span></span><span></span><span></span></div>';
    msgs.appendChild(el);
    scroll();
    return el;
  }

  function addBookingForm(){
    var el=document.createElement('div');
    el.className='aeon-msg bot';
    el.innerHTML='\
<div class="aeon-booking-form">\
  <input type="text" id="book-name" placeholder="Your name">\
  <input type="email" id="book-email" placeholder="Email address">\
  <input type="text" id="book-company" placeholder="Company name (optional)">\
  <select id="book-service">\
    <option value="">Select a service...</option>\
    <option>AI Ad Campaigns</option>\
    <option>SEO Automation</option>\
    <option>Content Generation</option>\
    <option>Social Media AI</option>\
    <option>Predictive Analytics</option>\
    <option>Brand Strategy</option>\
    <option>Not sure — need advice</option>\
  </select>\
  <textarea id="book-message" placeholder="Tell us about your project..."></textarea>\
  <button class="aeon-booking-submit" id="book-submit">Submit Booking Request</button>\
</div>';
    msgs.appendChild(el);
    scroll();

    document.getElementById('book-submit').addEventListener('click',function(){
      var name=document.getElementById('book-name').value.trim();
      var email=document.getElementById('book-email').value.trim();
      if(!name||!email){
        addBot('Please fill in at least your **name** and **email** so we can get back to you! 😊');
        return;
      }
      var service=document.getElementById('book-service').value;
      var company=document.getElementById('book-company').value.trim();
      var message=document.getElementById('book-message').value.trim();
      var submitBtn=document.getElementById('book-submit');
      submitBtn.textContent='Sending...';
      submitBtn.disabled=true;
      // Send to Go High Level
      fetch('https://services.leadconnectorhq.com/hooks/tYIxCosCGk6xIbPT7uJp/webhook-trigger/a9f7ff8e-f095-4bdc-ada9-2b7284a7554f',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name:name,email:email,company:company,service:service,message:message,source:'AEONLABS Website — Chatbot Booking',page:window.location.href}),
        mode:'no-cors'
      }).finally(function(){
        addBot('Thanks, **'+name+'**! 🎉 Your booking request has been submitted. Our team will reach out to you at **'+email+'** within 24 hours to schedule your free consultation.\n\nIn the meantime, feel free to ask me anything else!',true);
      });
    });
  }

  function scroll(){
    setTimeout(function(){msgs.scrollTop=msgs.scrollHeight;},50);
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
