/* main */
$(document).ready(function () {

//tooltips
$('[data-toggle="tooltip"]').tooltip();





//верхнее меню СТРАНЫ
$('.dropdown-country').on('click', function (event) {
	$(this).toggleClass('active');
	$('.nav-country').toggle();
	$('.dropdown').removeClass('open');
	event.stopPropagation();
});
$('.dropdown-toggle, .nav-country__content').on('click', function () {
	$('.nav-country').hide();
	$('.dropdown-country').removeClass('active');
});
$(document).on('click touchstart', function (event) {
	if ($(event.target).closest('.nav-country').length) return;
	$('.nav-country').hide();
	$('.dropdown-country').removeClass('active');
	event.stopPropagation();
});





//переключение иконок accordion
function toggleIcon(e) {
	$(e.target)
			.prev('.accordion__hdr')
			.find('.hdr_icon')
			.toggleClass('i--down');
}
//переключение в tourcontact-accordion
$('#tourcontact-accordion').on('hidden.bs.collapse', toggleIcon);
$('#tourcontact-accordion').on('shown.bs.collapse', toggleIcon);





// toggle панель
$('.toggled-panel__header').on('click', function () {
	var panel = $(this).attr('id');
	$('#' + panel + '_p').slideToggle();
	$('#' + panel + ' i').toggleClass('i--up');
});





//кнопка наверх
$(window).scroll(function () {
	if ($(this).scrollTop() > 650) {
		$('#totop').fadeIn();
	} else {
		$('#totop').fadeOut();
	}
});

$('#totop').click(function () {
	$('body,html').animate({
		scrollTop: 0
	}, 800);
	return false;
});





//заперщаем закрываться dropdown если клик на класс noclose (spinner e.t.c)
$(document).on('click.bs.dropdown.data-api', '.noclose', function(e) {
	e.stopPropagation();
});





//форма ПОДБОР ТУРА


//грузим значение в Откуда

$('#tourpicking-whence ul li').on('click', function () {
	var text = $(this).text();
	$('#tourpicking-fld-whence').val(text);
	$('#tourpicking-fld-whence').attr('title', text);
});


//грузим значение в Куда

$('#tourpicking-where ul li').on('click', function () {
	var text = $(this).text();
	$('#tourpicking-fld-where').val(text);
	$('#tourpicking-fld-where').attr('title', text);
});


//программим С даты

$('.when-datepicker').datepicker({
	format: 'dd.mm.yyyy',
	language: 'ru',
	multidate: true,
	multidateSeparator: ', ',
	autoclose: false,
	clearBtn: true,
	todayHighlight: true
}).on('changeDate', function() {
	var text =  $('.when-datepicker').data('datepicker').getFormattedDate('dd.mm.yyyy');
	$('#tourpicking-fld-when').val(text);
	$('#tourpicking-fld-when').attr('title', text);
});


//грузим значения в На сколько

$('#tourpicking-how1').TouchSpin({ initval: 7  });
$('#tourpicking-how2').TouchSpin({ initval: 10 });

$('#tourpicking-how1').on('change', function () {
	var how_text1 = parseInt($('#tourpicking-how1').val()),
			how_text2 = parseInt($('#tourpicking-how2').val());
	if (how_text1 > how_text2) {
		how_text2 = how_text1;
		$('#tourpicking-how2').val(how_text2);
	}
	$('#tourpicking-fld-how').val('ночей ' + how_text1 + '—' + how_text2);
	$('#tourpicking-fld-how').attr('title', 'ночей ' + how_text1 + '—' + how_text2);
});

$('#tourpicking-how2').on('change', function () {
	var how_text1 = parseInt($('#tourpicking-how1').val()),
			how_text2 = parseInt($('#tourpicking-how2').val());
	if (how_text2 < how_text1) {
		how_text1 = how_text2;
		$('#tourpicking-how1').val(how_text1);
	}
	$('#tourpicking-fld-how').val('ночей ' + how_text1 + '—' + how_text2);
	$('#tourpicking-fld-how').attr('title', 'ночей ' + how_text1 + '—' + how_text2);
});



//грузим значение в Кто

var adults_suffix = ' взрослый',
		adults_text = '1',
		childs_prefix = '',
		childs_suffix = '',
		childs_text = '';

$('input[name="who-adults"]').on('change', function () {
	var txt = $(this).val();
	if (txt == 1) {
		adults_suffix = ' взрослый';
	} else {
		adults_suffix = ' взрослых';
	}
	adults_text = txt + adults_suffix;
	$('#tourpicking-fld-who').val(adults_text + childs_prefix + childs_text);
	$('#tourpicking-fld-who').attr('title', adults_text + childs_prefix + childs_text);
});

$('input[name="who-childs"]').on('change', function () {
	var txt = $(this).val();
	if (txt == 0) {
			txt = '';
			childs_prefix = '';
			childs_suffix = '';
	} else {
		if (txt == 1) {
			childs_prefix = ' + ';
			childs_suffix = ' ребенок';
		} else {
			childs_prefix = ' + ';
			childs_suffix = ' детей';
		}
	}
	childs_text = txt + childs_suffix;
	$('#tourpicking-fld-who').val(adults_text + childs_prefix + childs_text);
	$('#tourpicking-fld-who').attr('title', adults_text + childs_prefix + childs_text);
});





// фиксируем в правое колонке

function fixAsFilterHotel() {  // фильтр отелей
	var
		def_top 			= $(document).scrollTop(),
		def_width 		=	$(document).width(),
		val_top 			= $('.pagewrap').position().top,
		val_bottom 		= $('footer').position().top - $('footer').height() - 80,
		val_width			=	$('.pagewrap__col-right').width(),
		val_margin    = $('.pagewrap').height() - $('#as_filter-hotel').height() - 100;

	if (def_width >= 1024) {
		if (def_top >= val_top && def_top <= val_bottom) {
			$('#as_filter-hotel').css({position: 'fixed', top: '2rem', 'margin-top': 'auto', width: val_width});
		}
		else {
			$('#as_filter-hotel').css({position: 'relative', top: '0', 'margin-top': 'auto', width: val_width});
		}
		if (def_top >= ($('.pagewrap').height() + 80)) {
			$('#as_filter-hotel').css({position: 'relative', top: '0', 'margin-top': val_margin, width: val_width});
		}
	}
}
$(window).scroll(function() {fixAsFilterHotel()});
$(window).resize(function() {fixAsFilterHotel()});

function fixAsSubmenu() {  // подменю
	var
		def_top 			= $(document).scrollTop(),
		def_width 		=	$(document).width(),
		val_top 			= $('.pagewrap').position().top,
		val_bottom 		= $('footer').position().top - $('footer').height() + 200,
		val_width			=	$('.pagewrap__col-right').width();

	if (def_width >= 1024) {
		if (def_top >= val_top && def_top <= val_bottom) {
			$('#as_r-submenu').css({position: 'fixed', top: '3rem', 'margin-top': 'auto', width: val_width});
		}
		else {
			$('#as_r-submenu').css({position: 'relative', top: '0', 'margin-top': 'auto', width: val_width});
		}
	}
}
$(window).scroll(function() {fixAsSubmenu()});
$(window).resize(function() {fixAsSubmenu()});

function fixAsAdv() {  // блок рекламы
	var
			def_top 			= $(document).scrollTop(),
			def_width 		=	$(document).width(),
			val_top 			= $('.pagewrap').position().top,
			val_bottom 		= $('footer').position().top - $('footer').height() - 80,
			val_width			=	$('.pagewrap__col-right').width(),
			val_margin    = $('.pagewrap').height() - $('#as_r-adv').height() - 100;

	if (def_width >= 1024) {
		if (def_top >= val_top && def_top <= val_bottom) {
			$('#as_r-adv').css({position: 'fixed', top: '2rem', 'margin-top': 'auto', width: val_width});
		}
		else {
			$('#as_r-adv').css({position: 'relative', top: '0', 'margin-top': 'auto', width: val_width});
		}
		if (def_top >= ($('.pagewrap').height() + 80)) {
			$('#as_r-adv').css({position: 'relative', top: '0', 'margin-top': val_margin, width: val_width});
		}
	}
}
//$(window).scroll(function() {fixAsAdv()});
//$(window).resize(function() {fixAsAdv()});



$('.aside-submenu').on('click','a', function (event) {
	event.preventDefault();
	var id  = $(this).attr('href'),
	top = $(id).offset().top;
	$('body, html').animate({scrollTop: top}, 800);
});



// Где купить туры

$('.buytours-card__close').on('click', function (event) {
	$('.buytours-card_plate').hide();
});

$('.buytours__btn').on('click', function (event) {
	$('.buytours-card_plate').show();
});





// окно Помощи

$('.panel-quest__btn button').on('click', function () {
	$('#' + $(this).attr('rel')).fadeToggle();
});





// настройка полей

// подключения select2
$('#fld-buytours_metro').select2({
	placeholder: "Станция метро",
	language: "ru",
	theme: "bootstrap"
});

// класс выбора даты
$('.hasdatepicker').datepicker({
	language: "ru",
	autoclose: true,
	todayHighlight: true
});
$('.hasdatepicker-daterange').datepicker({
	language: "ru",
	autoclose: true,
	todayHighlight: true
});

// спиннер
$('.hastouchspin').TouchSpin();





// слайдеры

$('.block-slider--photoalbum').slick({
	dots: true,
	infinite: true,
	variableWidth: true,
	centerMode: true
});

$('.block-slider--plate').slick({
	dots: true,
	infinite: true,
	variableWidth: true,
	centerMode: true
});

$('.block-slider--adaptive').slick({
	dots: true,
	infinite: true,
	autoplay: true,
	slidesToShow: 4,
	responsive: [{
		breakpoint: 1025,
		settings: {	slidesToShow: 3	}
	}, {
		breakpoint: 769,
		settings: {	slidesToShow: 2	}
	}, {
		breakpoint: 321,
		settings: {	slidesToShow: 1 }
	}]
});


});