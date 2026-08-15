/*!
 * JavaScript propio del blog (www.aunitz.net)
 *
 * Sustituye al clean-blog.js original de Start Bootstrap (MIT) junto con
 * jQuery 1.12.4 y Bootstrap 3 JS, que se cargaban enteros (137 KB sin
 * comprimir) para solo dos comportamientos: el menú desplegable en móvil y la
 * cabecera que se oculta al hacer scroll.
 *
 * Lo que hacía el fichero original y aquí ya no está:
 *   - $("img").addClass("img-responsive"): ahora es una regla CSS en
 *     clean-blog.less, así se aplica en el primer pintado y no provoca CLS.
 *   - $("[data-toggle='tooltip']").tooltip(): los enlaces del pager ya llevan
 *     atributo title, así que el navegador muestra su tooltip nativo.
 */
(function () {
	'use strict';

	// ------------------------------------------------------------------
	// Menú de navegación desplegable en móvil.
	//
	// Sustituye al plugin Collapse de Bootstrap reutilizando las clases que
	// bootstrap.min.css ya define: .collapse (oculto), .collapse.in (visible)
	// y .collapsing (transición de altura de 0,35 s).
	// ------------------------------------------------------------------

	// Debe coincidir con la duración de la transición de .collapsing
	var TRANSITION_MS = 350;

	function initCollapse(toggle) {
		var selector = toggle.getAttribute('data-target');
		var target = selector ? document.querySelector(selector) : null;
		if (!target) return;

		var animating = false;

		toggle.addEventListener('click', function () {
			// Ignora los clics mientras la transición está en curso, para no
			// dejar la altura a medias.
			if (animating) return;
			animating = true;

			var isOpen = target.classList.contains('in');

			// Altura de partida: la actual si se va a cerrar, 0 si se va a abrir.
			target.style.height = isOpen ? target.getBoundingClientRect().height + 'px' : '0px';
			target.classList.remove('collapse', 'in');
			target.classList.add('collapsing');

			// Fuerza un reflow para que el navegador registre esa altura inicial
			// antes de cambiarla; sin esto no hay transición, solo un salto.
			void target.offsetHeight;

			target.style.height = isOpen ? '0px' : target.scrollHeight + 'px';
			toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

			window.setTimeout(function () {
				target.classList.remove('collapsing');
				target.classList.add('collapse');
				if (!isOpen) target.classList.add('in');
				// Devuelve el control de la altura al CSS.
				target.style.height = '';
				animating = false;
			}, TRANSITION_MS);
		});
	}

	var toggles = document.querySelectorAll('[data-toggle="collapse"]');
	for (var i = 0; i < toggles.length; i++) {
		initCollapse(toggles[i]);
	}

	// ------------------------------------------------------------------
	// Cabecera fija que se oculta al bajar y reaparece al subir.
	// Solo en pantallas anchas, igual que en la versión original.
	// ------------------------------------------------------------------

	var MQL = 1170;
	var navbar = document.querySelector('.navbar-custom');

	if (navbar) {
		var previousTop = 0;
		var headerHeight = 0;
		var ticking = false;
		var enabled = false;

		function update() {
			ticking = false;
			var currentTop = window.pageYOffset;

			if (currentTop < previousTop) {
				// Subiendo
				if (currentTop > 0 && navbar.classList.contains('is-fixed')) {
					navbar.classList.add('is-visible');
				} else {
					navbar.classList.remove('is-visible', 'is-fixed');
				}
			} else {
				// Bajando
				navbar.classList.remove('is-visible');
				if (currentTop > headerHeight) {
					navbar.classList.add('is-fixed');
				}
			}

			previousTop = currentTop;
		}

		function onScroll() {
			// requestAnimationFrame agrupa las decenas de eventos de scroll por
			// segundo en una sola lectura/escritura del DOM por fotograma. El
			// original recalculaba en cada evento, mezclando lecturas y
			// escrituras en el mismo tick (forced synchronous layout).
			if (!ticking) {
				ticking = true;
				window.requestAnimationFrame(update);
			}
		}

		function sync() {
			// clientWidth, no innerWidth: excluye la barra de scroll, que es lo
			// que medía $(window).width() en la versión con jQuery.
			var shouldEnable = document.documentElement.clientWidth > MQL;
			if (shouldEnable === enabled) return;
			enabled = shouldEnable;

			if (enabled) {
				headerHeight = navbar.offsetHeight;
				previousTop = window.pageYOffset;
				// passive: garantiza al navegador que este handler nunca llamará
				// a preventDefault(), así no tiene que esperarlo para hacer scroll.
				window.addEventListener('scroll', onScroll, { passive: true });
			} else {
				window.removeEventListener('scroll', onScroll);
				navbar.classList.remove('is-visible', 'is-fixed');
			}
		}

		// El original evaluaba el ancho una sola vez al cargar, así que girar una
		// tablet no reevaluaba nada. Ahora se recalcula al redimensionar.
		sync();
		window.addEventListener('resize', sync, { passive: true });
	}

	// ------------------------------------------------------------------
	// Índice de materias: desplegar y plegar las 20 materias a la vez.
	//
	// El botón viene con el atributo hidden desde tags.html y solo se muestra
	// aquí, para que sin JavaScript no quede un control muerto en la página.
	//
	// No es un adorno: con las materias plegadas, Ctrl+F no encuentra el texto
	// que hay dentro de un <details> cerrado en varios navegadores (Chrome y
	// Edge lo despliegan al buscar; Firefox y Safari, según la versión). Este
	// botón devuelve la búsqueda en página, que es lo que se pierde al plegar.
	// ------------------------------------------------------------------

	var materiasToggle = document.querySelector('.materias-toggle');

	if (materiasToggle) {
		var materias = document.querySelectorAll('details.materia');

		materiasToggle.hidden = false;

		materiasToggle.addEventListener('click', function () {
			// El estado lo lleva aria-expanded, así que la etiqueta visible y lo
			// que anuncia un lector de pantalla no pueden desincronizarse.
			var desplegar = materiasToggle.getAttribute('aria-expanded') !== 'true';

			for (var j = 0; j < materias.length; j++) {
				materias[j].open = desplegar;
			}

			materiasToggle.setAttribute('aria-expanded', desplegar ? 'true' : 'false');
			materiasToggle.textContent = desplegar ? 'Plegar todas las materias' : 'Desplegar todas las materias';
		});
	}

	// ------------------------------------------------------------------
	// Archivo cronológico: desplegar y plegar los años a la vez.
	// Mismo patrón que el índice de materias de arriba, mismas razones.
	// ------------------------------------------------------------------

	var archivoToggle = document.querySelector('.archivo-toggle');

	if (archivoToggle) {
		var anios = document.querySelectorAll('details.archivo-anio');

		archivoToggle.hidden = false;

		archivoToggle.addEventListener('click', function () {
			var desplegar = archivoToggle.getAttribute('aria-expanded') !== 'true';

			for (var k = 0; k < anios.length; k++) {
				anios[k].open = desplegar;
			}

			archivoToggle.setAttribute('aria-expanded', desplegar ? 'true' : 'false');
			archivoToggle.textContent = desplegar ? 'Plegar todos los años' : 'Desplegar todos los años';
		});
	}
})();
