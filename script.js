        (function(){
            function initMenu() {
                var btn = document.getElementById('header_1789701682144_menu_btn');
                var menu = document.getElementById('header_1789701682144_menu');
                if (!btn || !menu) return false;
                if (btn.dataset.initialized) return true;
                btn.dataset.initialized = 'true';
                function closeMenu() {
                    menu.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
                function toggleMenu(e) {
                    e.stopPropagation();
                    var isOpen = menu.classList.toggle('open');
                    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                }
                btn.addEventListener('click', toggleMenu);
                menu.querySelectorAll('a').forEach(function(a){
                    a.addEventListener('click', function(e){
                        e.preventDefault();
                        closeMenu();
                        var targetId = a.getAttribute('data-scroll-target');
                        var targetEl = targetId ? document.getElementById(targetId) : null;
                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    });
                });
                document.addEventListener('click', function(e){
                    if (!menu.contains(e.target) && e.target !== btn) closeMenu();
                });
                document.addEventListener('keydown', function(e){
                    if (e.key === 'Escape') closeMenu();
                });
                return true;
            }
            if (!initMenu()) {
                var attempts = 0;
                var timer = setInterval(function() {
                    attempts++;
                    if (initMenu() || attempts > 20) {
                        clearInterval(timer);
                    }
                }, 100);
            }
        })();
        (function(){
            var track = document.querySelector('#services_1789701789364 .services-track');
            if (!track) return;
            var autoplayMs = 3 * 1000;
            var paused = false, resumeTimer = null;
            function next(){
                if (paused) return;
                var card = track.querySelector('.service-card');
                var step = card ? card.offsetWidth + 16 : 220;
                if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
                    track.scrollTo({left: 0, behavior: 'smooth'});
                } else {
                    track.scrollBy({left: step, behavior: 'smooth'});
                }
            }
            setInterval(next, autoplayMs);
            function onManual(){
                paused = true;
                clearTimeout(resumeTimer);
                resumeTimer = setTimeout(function(){ paused = false; }, autoplayMs);
            }
            track.addEventListener('touchstart', onManual, {passive: true});
            track.addEventListener('mousedown', onManual);
            track.addEventListener('wheel', onManual, {passive: true});
        })();
