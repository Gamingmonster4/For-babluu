/* =====================================================
   A SPECIAL DELIVERY — script.js
   Vanilla JS only. No dependencies.
===================================================== */
(function(){
  'use strict';

  /* ---------- CONFIG ---------- */
  const RELATIONSHIP_START = new Date('2025-01-20T00:00:00'); // 20 • 01 • 2025
  const SPOTIFY_PLACEHOLDER_URL = 'https://open.spotify.com/'; // <-- replace with your playlist link
  const MEMORY_COUNT = 15;

  const PIZZA_MESSAGES = [
    'One slice closer to our next date ❤️',
    'Saving the last slice for me?',
    'Hope we eat vegan pizza together soon.',
    'Every bite tastes like "I miss you."',
    'This slice had your name on it.',
    'Cheesy, just like my texts to you.',
    'You + me + pizza = perfect plan.',
    'Almost gone... just like my patience to see you.'
  ];

  const state = {
    completion: { letter:false, memories:false, bouquet:false, pizza:false, final:false },
    teddyTaps:0,
    seaTaps:0,
    typedBuffer:''
  };

  /* =====================================================
     UTILITIES
  ===================================================== */
  function $(sel, ctx){ return (ctx||document).querySelector(sel); }
  function $all(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)); }
  function rand(min,max){ return Math.random()*(max-min)+min; }
  function showToast(msg, ms){
    const toast = $('#eggToast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=>toast.classList.remove('show'), ms||2400);
  }

  /* =====================================================
     AMBIENT FLOATING HEARTS + SPARKLES (whole site)
  ===================================================== */
  function spawnAmbient(){
    const heartsLayer = $('#ambientHearts');
    const sparkleLayer = $('#ambientSparkles');

    function spawnHeart(){
      const h = document.createElement('div');
      h.className = 'floating-heart';
      h.textContent = Math.random() > .5 ? '❤️' : '💗';
      const size = rand(12,22);
      h.style.fontSize = size+'px';
      h.style.left = rand(0,100)+'vw';
      h.style.bottom = '-30px';
      h.style.setProperty('--drift', rand(-40,40)+'px');
      h.style.animationDuration = rand(9,16)+'s';
      heartsLayer.appendChild(h);
      setTimeout(()=>h.remove(), 17000);
    }
    function spawnSparkle(){
      const s = document.createElement('div');
      s.className = 'floating-sparkle';
      s.textContent = '✨';
      s.style.left = rand(0,100)+'vw';
      s.style.top = rand(0,100)+'vh';
      s.style.fontSize = rand(10,16)+'px';
      s.style.animationDelay = rand(0,2)+'s';
      sparkleLayer.appendChild(s);
      setTimeout(()=>s.remove(), 3000);
    }
    setInterval(spawnHeart, 1400);
    setInterval(spawnSparkle, 900);
    for(let i=0;i<6;i++) setTimeout(spawnHeart, i*300);
  }

  /* =====================================================
     SCROLL FADE-IN FOR .page SECTIONS
  ===================================================== */
  function initScrollReveal(){
    const pages = $all('.page:not(.page-envelope)');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold:0.18 });
    pages.forEach(p=>io.observe(p));
  }

  /* =====================================================
     PAGE 1 — ENVELOPE
  ===================================================== */
  function initEnvelope(){
    const envelope = $('#envelope');
    const petalBurst = $('#petalBurst');
    let opened = false;

    function openEnvelope(){
      if(opened) return;
      opened = true;
      envelope.classList.add('open');
      setTimeout(burstPetals, 550);
    }

    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') openEnvelope(); });

    function burstPetals(){
      petalBurst.classList.add('active');
      const colors = ['#d1495b','#f0a0c4','#f7c9c9','#e88aa0'];
      for(let i=0;i<90;i++){
        const p = document.createElement('div');
        p.className = 'petal';
        const startX = 50 + rand(-8,8);
        const angle = rand(0,360) * Math.PI/180;
        const dist = rand(20,140);
        const dx = Math.cos(angle)*dist;
        const dy = Math.sin(angle)*dist - rand(0,30);
        p.style.left = startX+'vw';
        p.style.top = '46vh';
        p.style.background = colors[Math.floor(rand(0,colors.length))];
        p.style.transform = `translate(0,0) rotate(0deg)`;
        p.style.transition = `transform ${rand(0.8,1.4)}s cubic-bezier(.2,.8,.3,1), opacity 1.8s ease`;
        petalBurst.appendChild(p);
        requestAnimationFrame(()=>{
          requestAnimationFrame(()=>{
            p.style.transform = `translate(${dx}vw, ${dy}vh) rotate(${rand(120,480)}deg)`;
          });
        });
      }
      setTimeout(()=>{
        petalBurst.classList.add('curtain');
        setTimeout(()=>{
          document.body.style.overflow='auto';
          $('#pageHero').scrollIntoView({behavior:'smooth'});
          setTimeout(()=>{
            petalBurst.classList.remove('active','curtain');
            petalBurst.innerHTML='';
          }, 900);
        }, 750);
      }, 2000);
    }
  }

  /* =====================================================
     ENVELOPE-STAGE FLOATING HEARTS
  ===================================================== */
  function spawnEnvelopeFloaters(){
    const layer = $('#envelopeFloaters');
    if(!layer) return;
    for(let i=0;i<14;i++){
      const el = document.createElement('div');
      el.textContent = Math.random()>.5 ? '✨' : '🤍';
      el.style.position='absolute';
      el.style.left = rand(0,100)+'%';
      el.style.top = rand(0,100)+'%';
      el.style.fontSize = rand(10,18)+'px';
      el.style.opacity = rand(.3,.8);
      el.style.animation = `twinkle ${rand(2,4)}s ease-in-out infinite`;
      el.style.animationDelay = rand(0,3)+'s';
      layer.appendChild(el);
    }
  }

  /* =====================================================
     PAGE 2 — TEDDY + COUNTER
  ===================================================== */
  function initTeddy(){
    const teddy = $('#teddyWrap');
    const speech = $('#teddySpeech');
    const lines = [
      "You're my favorite person 🤎",
      "Hi love, miss you already",
      "Home is wherever you are",
      "Okay okay one more hug then",
      "*blushes intensely*",
      "You found my soft spot",
      "Officially your #1 fan"
    ];
    let lastIdx = -1;
    function trigger(){
      state.teddyTaps++;
      let idx;
      do{ idx = Math.floor(rand(0,lines.length)); } while(idx===lastIdx);
      lastIdx = idx;
      speech.textContent = lines[idx];
      speech.classList.add('show');
      clearTimeout(trigger._t);
      trigger._t = setTimeout(()=>speech.classList.remove('show'), 1800);

      if(state.teddyTaps === 7){
        speech.textContent = "okay okay you got me... I love you so much 🥹";
        speech.classList.add('show');
        teddy.querySelector('.teddy-svg').style.filter = 'drop-shadow(0 14px 18px rgba(209,73,91,.4)) saturate(1.3)';
        showToast('teddy is blushing 🐻💗', 2600);
      }
    }
    teddy.addEventListener('click', trigger);
    teddy.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') trigger(); });
  }

  function initCounter(){
    const els = {
      years:$('#cYears'), months:$('#cMonths'), days:$('#cDays'),
      hours:$('#cHours'), minutes:$('#cMinutes'), seconds:$('#cSeconds')
    };
    function update(){
      const now = new Date();
      let diffMs = now - RELATIONSHIP_START;
      if(diffMs < 0) diffMs = 0;

      let years = now.getFullYear() - RELATIONSHIP_START.getFullYear();
      let months = now.getMonth() - RELATIONSHIP_START.getMonth();
      let days = now.getDate() - RELATIONSHIP_START.getDate();
      let hours = now.getHours() - RELATIONSHIP_START.getHours();
      let minutes = now.getMinutes() - RELATIONSHIP_START.getMinutes();
      let seconds = now.getSeconds() - RELATIONSHIP_START.getSeconds();

      if(seconds<0){ seconds+=60; minutes--; }
      if(minutes<0){ minutes+=60; hours--; }
      if(hours<0){ hours+=24; days--; }
      if(days<0){
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonth; months--;
      }
      if(months<0){ months+=12; years--; }

      els.years.textContent = years;
      els.months.textContent = months;
      els.days.textContent = days;
      els.hours.textContent = String(hours).padStart(2,'0');
      els.minutes.textContent = String(minutes).padStart(2,'0');
      els.seconds.textContent = String(seconds).padStart(2,'0');
    }
    update();
    setInterval(update, 1000);

    const card = $('#counterCard');
    card.addEventListener('click', ()=> card.classList.toggle('expanded'));
    card.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') card.classList.toggle('expanded'); });
  }

  /* =====================================================
     GIFT CARDS / OVERLAY NAV
  ===================================================== */
  function initGiftNav(){
    $all('.gift-card').forEach(card=>{
      card.addEventListener('click', ()=>{
        const key = card.dataset.open;
        $('#overlay'+capitalize(key)).classList.add('active');
        document.body.style.overflow='hidden';
      });
    });
    $all('[data-close]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const key = btn.dataset.close;
        if(key==='secret'){
          $('#overlaySecret').classList.remove('active');
        } else {
          $('#overlay'+capitalize(key)).classList.remove('active');
        }
        document.body.style.overflow='auto';
      });
    });
    $('#continueToFinal').addEventListener('click', ()=>{
      $('#pageFinal').scrollIntoView({behavior:'smooth'});
    });
  }
  function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

  function markComplete(key){
    state.completion[key] = true;
    const check = $('#check-'+key);
    if(check) check.classList.add('show');
    checkSecretUnlock();
  }

  /* =====================================================
     MEMORIES / SCRAPBOOK
  ===================================================== */
  function initMemories(){
    $('#spotifyLink').href = SPOTIFY_PLACEHOLDER_URL;

    const memEnvelope = $('#memoriesEnvelope');
    memEnvelope.addEventListener('click', ()=> memEnvelope.classList.toggle('open'));

    const captions = [
      "the day it all started","that random tuesday we laughed for hours",
      "your favorite coffee order","us being ridiculous as always",
      "the trip we still talk about","quiet nights, best nights",
      "you, mid-laugh (my favorite)","that one golden-hour photo",
      "we got lost and didn't care","matching outfits, unmatched chaos",
      "the call that lasted till 2am","your handwriting on my birthday card",
      "us vs. the world","the memory I replay most","still my favorite person"
    ];

    let page = 0;
    const pageEl = $('#scrapbookPage');
    const countEl = $('#scrapCount');

    function render(){
      pageEl.classList.add('turning');
      setTimeout(()=>{
        pageEl.innerHTML = `
          <div class="washi" style="left:${20+rand(-10,10)}px; transform:rotate(${rand(-6,6)}deg);"></div>
          <div class="scrap-photo" style="background-image:url('assets/images/memory${page+1}.jpg'); background-size:cover; background-position:center;"></div>
          <p class="scrap-caption">${captions[page]}</p>
        `;
        countEl.textContent = `${page+1} / ${MEMORY_COUNT}`;
        pageEl.classList.remove('turning');
      }, 220);
    }

    $('#openScrapbook').addEventListener('click', ()=>{
      $('#memoriesIntro').hidden = true;
      $('#scrapbook').hidden = false;
      render();
      markComplete('memories');
    });
    $('#scrapNext').addEventListener('click', ()=>{ page = (page+1) % MEMORY_COUNT; render(); });
    $('#scrapPrev').addEventListener('click', ()=>{ page = (page-1+MEMORY_COUNT) % MEMORY_COUNT; render(); });
  }

  /* =====================================================
     BOUQUET BUILDER
  ===================================================== */
  const FLOWER_EMOJI = { rose:'🌹', tulip:'🌷', lily:'🌺', sunflower:'🌻', babysbreath:'🤍', daisy:'🌼' };

  function initBouquet(){
    let selectedFlowers = new Set();
    let ribbon = '#f4a6c1';
    let wrap = '#f7e8d4';

    const stepFlowers = $('#bouquetStepFlowers');
    const stepRibbon = $('#bouquetStepRibbon');
    const stepReveal = $('#bouquetStepReveal');

    $all('.flower-option').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const f = btn.dataset.flower;
        if(selectedFlowers.has(f)){ selectedFlowers.delete(f); btn.classList.remove('selected'); }
        else{ selectedFlowers.add(f); btn.classList.add('selected'); }
      });
    });

    $('#toRibbonStep').addEventListener('click', ()=>{
      if(selectedFlowers.size===0){ showToast('pick at least one flower 🌸'); return; }
      stepFlowers.hidden = true; stepRibbon.hidden = false;
    });

    $all('#ribbonOptions .swatch').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        $all('#ribbonOptions .swatch').forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected'); ribbon = btn.dataset.ribbon;
      });
    });
    $all('#wrapOptions .swatch').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        $all('#wrapOptions .swatch').forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected'); wrap = btn.dataset.wrap;
      });
    });

    $('#toRevealStep').addEventListener('click', ()=>{
      stepRibbon.hidden = true; stepReveal.hidden = false;
      assembleBouquet();
      markComplete('bouquet');
    });

    function assembleBouquet(){
      const flowersEl = $('#bouquetFlowers');
      const wrapEl = $('#bouquetWrap');
      flowersEl.innerHTML='';
      wrapEl.style.background = `linear-gradient(180deg, transparent 55%, ${wrap} 55%)`;
      wrapEl.style.border = `6px solid ${ribbon}`;
      wrapEl.classList.remove('show');

      const emojis = [];
      selectedFlowers.forEach(f=>{ for(let i=0;i<5;i++) emojis.push(FLOWER_EMOJI[f]); });
      shuffle(emojis).forEach((em,i)=>{
        const span = document.createElement('span');
        span.textContent = em;
        span.style.opacity = 0;
        span.style.transform = 'scale(0)';
        span.style.transition = `all .4s cubic-bezier(.2,1.4,.4,1) ${i*40}ms`;
        flowersEl.appendChild(span);
        requestAnimationFrame(()=>{
          span.style.opacity = 1;
          span.style.transform = 'scale(1)';
        });
      });

      requestAnimationFrame(()=> requestAnimationFrame(()=> wrapEl.classList.add('show')));
      sparkleBouquet();
    }

    function sparkleBouquet(){
      const layer = $('#bouquetSparkles');
      layer.innerHTML='';
      for(let i=0;i<20;i++){
        const s = document.createElement('span');
        s.textContent='✨';
        s.style.position='absolute';
        s.style.left = rand(10,90)+'%';
        s.style.top = rand(10,90)+'%';
        s.style.fontSize = rand(10,16)+'px';
        s.style.animation = `twinkle ${rand(1.4,2.4)}s ease-in-out infinite`;
        s.style.animationDelay = rand(0,1)+'s';
        layer.appendChild(s);
      }
    }

    $('#saveBouquet').addEventListener('click', ()=>{
      showToast('bouquet saved to your heart ❤️');
    });
    $('#rebuildBouquet').addEventListener('click', ()=>{
      selectedFlowers = new Set();
      $all('.flower-option').forEach(b=>b.classList.remove('selected'));
      $all('.swatch').forEach(b=>b.classList.remove('selected'));
      stepReveal.hidden = true; stepFlowers.hidden = false;
    });
  }
  function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]); }

  /* =====================================================
     PIZZA GIFT
  ===================================================== */
  function initPizza(){
    const box = $('#giftBox');
    const boxHint = $('#giftBoxHint');
    const pizzaWrap = $('#pizzaWrap');
    const pizzaEnd = $('#pizzaEnd');
    const popup = $('#pizzaPopup');
    let slicesLeft = 8;
    let boxPreTapped = false;

    box.addEventListener('click', ()=>{
      if(box.classList.contains('opened')){
        if(!boxPreTapped){
          boxPreTapped = true;
          showToast('patience... good things take time 😏');
        }
        return;
      }
      box.classList.add('opened');
      boxHint.style.display='none';
      const steam = document.createElement('div');
      steam.className='steam';
      box.appendChild(steam);
      setTimeout(()=>{ pizzaWrap.hidden = false; }, 500);
    });

    $all('.pizza-slice').forEach(slice=>{
      slice.addEventListener('click', ()=>{
        if(slice.classList.contains('gone')) return;
        slice.classList.add('gone');
        slicesLeft--;
        const msg = PIZZA_MESSAGES[Math.floor(rand(0,PIZZA_MESSAGES.length))];
        popup.textContent = msg;
        popup.classList.add('show');
        clearTimeout(initPizza._t);
        initPizza._t = setTimeout(()=>popup.classList.remove('show'), 1700);

        if(slicesLeft===0){
          setTimeout(()=>{
            pizzaWrap.hidden = true;
            pizzaEnd.hidden = false;
            confettiBurst();
            markComplete('pizza');
          }, 900);
        }
      });
    });
  }

  /* =====================================================
     CONFETTI (used at pizza end + final secret)
  ===================================================== */
  function confettiBurst(container){
    const layer = container || document.body;
    const colors = ['#d1495b','#f0a0c4','#d8a24a','#fdf1cf','#8ac4a0'];
    for(let i=0;i<70;i++){
      const c = document.createElement('div');
      c.style.position='fixed';
      c.style.left = rand(0,100)+'vw';
      c.style.top = '-10px';
      c.style.width = rand(6,10)+'px';
      c.style.height = rand(6,10)+'px';
      c.style.background = colors[Math.floor(rand(0,colors.length))];
      c.style.opacity = '.9';
      c.style.zIndex = 200;
      c.style.borderRadius = Math.random()>.5 ? '50%':'2px';
      c.style.transition = `transform ${rand(1.6,2.6)}s ease-in, opacity 2.4s ease`;
      document.body.appendChild(c);
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          c.style.transform = `translate(${rand(-60,60)}px, ${rand(70,100)}vh) rotate(${rand(180,720)}deg)`;
          c.style.opacity='0';
        });
      });
      setTimeout(()=>c.remove(), 2800);
    }
  }

  /* =====================================================
     FINAL PAGE — fireflies + fireworks
  ===================================================== */
  function initFinal(){
    const fireflyLayer = $('#fireflies');
    for(let i=0;i<16;i++){
      const f = document.createElement('div');
      f.className='firefly';
      f.style.left = rand(0,100)+'%';
      f.style.top = rand(0,100)+'%';
      f.style.animationDelay = rand(0,6)+'s';
      f.style.animationDuration = rand(6,11)+'s';
      fireflyLayer.appendChild(f);
    }

    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          launchFireworks();
          io.disconnect();
        }
      });
    }, { threshold:.4 });
    io.observe($('#pageFinal'));
  }

  function launchFireworks(){
    const layer = $('#fireworksLayer');
    const colors = ['#f0a0c4','#fdf1cf','#d1495b','#8ac4a0','#a0c4f0'];
    function burst(){
      const cx = rand(15,85), cy = rand(15,55);
      const color = colors[Math.floor(rand(0,colors.length))];
      for(let i=0;i<26;i++){
        const p = document.createElement('div');
        p.className='firework-particle';
        p.style.left = cx+'vw';
        p.style.top = cy+'vh';
        p.style.background = color;
        p.style.boxShadow = `0 0 6px 2px ${color}`;
        layer.appendChild(p);
        const angle = rand(0,360)*Math.PI/180;
        const dist = rand(40,110);
        requestAnimationFrame(()=>{
          p.style.transition = `transform 1s ease-out, opacity 1s ease-out`;
          requestAnimationFrame(()=>{
            p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
            p.style.opacity='0';
          });
        });
        setTimeout(()=>p.remove(), 1100);
      }
    }
    burst();
    let count=1;
    const interval = setInterval(()=>{
      burst(); count++;
      if(count>=5) clearInterval(interval);
    }, 900);
  }

  /* =====================================================
     COMPLETION TRACKING + SECRET ENDING
  ===================================================== */
  function checkSecretUnlock(){
    const c = state.completion;
    if(c.letter && c.memories && c.bouquet && c.pizza){
      const btn = $('#secretBtn');
      if(btn.hidden){
        btn.hidden = false;
        $('#secretHint').textContent = 'you found everything... one more thing ↑';
        showToast('all memories unlocked ✨', 2600);
      }
    }
  }

  function initSecretEnding(){
    $('#secretBtn').addEventListener('click', ()=>{
      const overlay = $('#overlaySecret');
      overlay.classList.add('active');
      document.body.style.overflow='hidden';
      spawnSecretStarsAndPetals();
      typeSecretMessage();
    });
  }

  function spawnSecretStarsAndPetals(){
    const stars = $('.secret-stars');
    const petals = $('.secret-petals');
    if(stars.childElementCount) return;
    for(let i=0;i<40;i++){
      const s = document.createElement('div');
      s.style.position='absolute';
      s.style.width='2px'; s.style.height='2px'; s.style.borderRadius='50%';
      s.style.background='#fff';
      s.style.left=rand(0,100)+'%'; s.style.top=rand(0,100)+'%';
      s.style.opacity = rand(.3,1);
      s.style.animation = `twinkle ${rand(1.5,3)}s ease-in-out infinite`;
      stars.appendChild(s);
    }
    for(let i=0;i<24;i++){
      const p = document.createElement('div');
      p.textContent='🌸';
      p.style.position='absolute';
      p.style.left=rand(0,100)+'%'; p.style.top='-20px';
      p.style.fontSize = rand(10,16)+'px';
      p.style.animation = `floatUp ${rand(6,10)}s linear infinite`;
      p.style.animationDelay = rand(0,6)+'s';
      p.style.setProperty('--drift', rand(-30,30)+'px');
      p.style.transform='rotate(180deg)';
      petals.appendChild(p);
    }
  }

  function typeSecretMessage(){
    const el = $('#typingText');
    const sig = $('#secretSignature');
    if(el.dataset.typed) return;
    el.dataset.typed = 'true';
    const lines = [
      "If I had to live my life a thousand times...",
      "I'd still find you.",
      "I'd still fall in love with you.",
      "I'd still choose you.",
      "Every single time."
    ].join('\n');
    let i = 0;
    el.textContent='';
    function typeChar(){
      if(i <= lines.length){
        el.textContent = lines.slice(0,i);
        i++;
        setTimeout(typeChar, 34);
      } else {
        sig.hidden = false;
        confettiBurst();
      }
    }
    typeChar();
  }

  /* =====================================================
     EASTER EGGS
  ===================================================== */
  function initEasterEggs(){
    // flowers bloom on tap (doodle layers) — click anywhere on hero doodles
    $('.doodles-hero').addEventListener('click', (e)=>{
      const bloom = document.createElement('span');
      bloom.textContent='🌸';
      bloom.style.position='fixed';
      bloom.style.left = e.clientX+'px';
      bloom.style.top = e.clientY+'px';
      bloom.style.fontSize='0px';
      bloom.style.transition='all .5s cubic-bezier(.2,1.6,.4,1)';
      bloom.style.zIndex = 50;
      document.body.appendChild(bloom);
      requestAnimationFrame(()=>{ bloom.style.fontSize='26px'; bloom.style.transform='translateY(-14px)'; });
      setTimeout(()=>{ bloom.style.opacity='0'; }, 700);
      setTimeout(()=>bloom.remove(), 1200);
    });

    // typed word "babluuu" triggers heart rain anywhere on the site
    window.addEventListener('keydown', (e)=>{
      if(e.key.length !== 1) return;
      state.typedBuffer = (state.typedBuffer + e.key).slice(-10).toLowerCase();
      if(state.typedBuffer.includes('babluuu')){
        heartRain();
        showToast('found it 🥹❤️', 2200);
        state.typedBuffer = '';
      }
    });

    function heartRain(){
      for(let i=0;i<40;i++){
        setTimeout(()=>{
          const h = document.createElement('div');
          h.textContent='❤️';
          h.style.position='fixed';
          h.style.left = rand(0,100)+'vw';
          h.style.top='-30px';
          h.style.fontSize = rand(14,26)+'px';
          h.style.zIndex=150;
          h.style.transition = `transform ${rand(2,3.4)}s ease-in, opacity 3s ease`;
          document.body.appendChild(h);
          requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
              h.style.transform = `translateY(110vh) rotate(${rand(-30,30)}deg)`;
              h.style.opacity='0';
            });
          });
          setTimeout(()=>h.remove(), 3600);
        }, i*40);
      }
    }
  }

  /* =====================================================
     MUSIC PLAYER
  ===================================================== */
  function initMusicPlayer(){
    const audio = $('#bgMusic');
    const toggle = $('#musicToggle');
    const iconPlay = $('#iconPlay');
    const iconPause = $('#iconPause');
    const vol = $('#volumeSlider');
    const titleLabel = $('#musicTitleLabel');
    const embedWrap = $('#spotifyEmbedWrap');
    const sourceSpotifyBtn = $('#sourceSpotifyBtn');
    const sourceMp3Btn = $('#sourceMp3Btn');
    audio.volume = 0.6;

    let source = 'spotify'; // 'spotify' | 'mp3'
    let spotifyOpen = false;

    function setSource(next){
      source = next;
      sourceSpotifyBtn.classList.toggle('active', source==='spotify');
      sourceMp3Btn.classList.toggle('active', source==='mp3');
      titleLabel.textContent = source==='spotify' ? 'Until I Found You 🎧' : 'our song 🎧';

      // stop whichever source was active before switching
      audio.pause();
      embedWrap.classList.remove('visible');
      spotifyOpen = false;
      toggle.classList.remove('playing');
      iconPlay.style.display='block'; iconPause.style.display='none';
    }

    sourceSpotifyBtn.addEventListener('click', ()=> setSource('spotify'));
    sourceMp3Btn.addEventListener('click', ()=> setSource('mp3'));

    toggle.addEventListener('click', ()=>{
      if(source === 'mp3'){
        if(audio.paused){
          audio.play().catch(()=>showToast('add music.mp3 to assets/music 🎵'));
          toggle.classList.add('playing');
          iconPlay.style.display='none'; iconPause.style.display='block';
        } else {
          audio.pause();
          toggle.classList.remove('playing');
          iconPlay.style.display='block'; iconPause.style.display='none';
        }
      } else {
        // Spotify source: reveal the official embed — its own play button
        // (inside the iframe) handles actual playback and licensing.
        spotifyOpen = !spotifyOpen;
        embedWrap.classList.toggle('visible', spotifyOpen);
        toggle.classList.toggle('playing', spotifyOpen);
        iconPlay.style.display = spotifyOpen ? 'none' : 'block';
        iconPause.style.display = spotifyOpen ? 'block' : 'none';
        if(spotifyOpen) showToast('tap play inside the Spotify card ▶️', 2600);
      }
    });

    vol.addEventListener('input', ()=>{ audio.volume = vol.value/100; });
  }

  /* =====================================================
     LETTER PAGE completion + tiny petals drifting inside letter
  ===================================================== */
  function initLetterPage(){
    const petalLayer = $('.letter-petals');
    for(let i=0;i<8;i++){
      const p = document.createElement('span');
      p.textContent='🌸';
      p.style.position='absolute';
      p.style.left = rand(0,100)+'%';
      p.style.top = '-10%';
      p.style.fontSize = rand(10,15)+'px';
      p.style.opacity='.7';
      p.style.animation = `floatUp ${rand(8,14)}s linear infinite`;
      p.style.animationDelay = rand(0,8)+'s';
      p.style.setProperty('--drift', rand(-20,20)+'px');
      p.style.transform='rotate(180deg)';
      petalLayer.appendChild(p);
    }
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ markComplete('letter'); io.disconnect(); }
      });
    }, { threshold:.5 });
    io.observe($('#pageLetter'));
  }

  /* =====================================================
     INIT
  ===================================================== */
  document.addEventListener('DOMContentLoaded', ()=>{
    spawnAmbient();
    spawnEnvelopeFloaters();
    initScrollReveal();
    initEnvelope();
    initTeddy();
    initCounter();
    initGiftNav();
    initMemories();
    initBouquet();
    initPizza();
    initFinal();
    initSecretEnding();
    initEasterEggs();
    initMusicPlayer();
    initLetterPage();

    // lock scroll until envelope opens, matching "reveal page 2" spec
    document.body.style.overflow='hidden';
  });
})();
