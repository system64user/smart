/*
	Global Bigmir replic storage by Ivan Grishin /4.03.2008/
	Language: russian /ru_RU.cp1251/

	!Every! replic used in JS must be added to object below and used through __REPLIC.<replicName>.
	To create new language domain copypaste this file, rename to replics_<langSuffix>.js and translate step by step.
	Avoid replics duplicating, look file for replic already defined.

	Don't forget about checking out, updating and merging the most fresh version from CVS ;-)

	Last modified: 12.03.2008
*/

__REPLIC	= {

// bm common replics
    sniveller       : 'Вы уверенны, что хотите сообщить администрации сайта о том, что пользователь нарушает Правила комментирования и размещения контента?',
    snivellerSend   : 'Спасибо за сотрудничество! Сообщение о нарушении было отправлено и будет рассмотрено администрацией в ближайшее время',
    
// bm search replics
	ukraine			: 'Украина',
	world			: 'мир',
	files			: 'файлы',
	goods			: 'товары',
	search			: 'Поиск',
	
	ukraine_new	: 'в Украине',
	world_new		: 'в мире',
	files_new		: 'в файлах',
	goods_new		: 'в товарах',
	
// comments replics
	enterComment	: 'Введите текст комментария',
	enterCaptcha	: 'Введите защитный код',
	delComment		: 'Удалить комментарий',
	clearComment	: 'Очистить текст комментария',
	add				: 'Добавить',
	minimize		: 'Свернуть',

//prikol replics
	emptyEmail			:	'Введите Email',
	wronEmail				:	'Email введен не корректно',
	emptyText				:	'Введите текст сообщения',
	emptyAnekCat		:	'Выберите категорию анекдота',
	emptyAnekText		:	'Введите текст анекдота',
	emptyPicCat			:	'Выберите категорию картинки',
	emptyNamePict		:	'Введите название картинки',
	emptyPicUrl			:	'Введите Url картинки',
	emptyFilePic		:	'Введите файл картинки',
	emptyStoryCat		:	'Выберите категорию истории',
	emptyStoryName		:	'Введите название истории',
	emptyStoryext		:	'Введите текст истории',
	emptyCatVid			:	'Выберите категория видео',
	emptyVidName		:	'Введите название видео',
	emptyVidUrl			:	'Введите Url видео',
	maxFilesLim			:	'Максимальное количество файлов ограничено 30',
	ajaxError			:	'Ошибка Ajax(а)',
	ajaxWait			:	'Подождите',

	// start page
	tools				:	' Инструменты',
	select				:	' выберите',
	internet_settings	:	' Настройки Інтернета',
	settings			:	' Настройки',
	edit				:	'Редактировать',
	params				:	'Параметры',
	predp				:	'Предпочтения',
	therd_reg			:	'В открытом окне, виберите вкладку',
	obsch				:	'Общие',
	osnovn				:	'Основные',
	osnov				:	'Основные',
	main				:	'Главные',
	chrom_home			:   'Добавте скопированную ссылку в ',
	open_next_page		:	'Открыть эту страницу',
	other_ins			:	'Вставте скопированную ссылку в строку',
	opServ				:	' Сервис',
	home_page			:	' Домашняя страница',
	jan					:   'Январь',
	feb					:   'Февраль',
	mar					:   'Март',
	apr					:   'Апрель',
	may					:   'Май',
	jun					:   'Июнь',
	jul					:   'Июль',
	aug					:   'Август',
	sep					:   'Сентябрь',
	oct					:   'Октябрь',
	nov					:   'Ноябрь',
	des					:   'Декабрь',
	jan1				:   'Января',
	feb1				:   'Февраля',
	mar1				:   'Марта',
	apr1				:   'Апреля',
	may1				:   'Мая',
	jun1				:   'Июня',
	jul1				:   'Июля',
	aug1				:   'Августа',
	sep1				:   'Сентября',
	oct1				:   'Октября',
	nov1				:   'Ноября',
	des1				:   'Декабря',
	today				:   "Сегодня",
	sun					:	"Вc",
	mon					:	"Пн",
	tue					:	"Вт",
	wen					:	"Ср",
	the					:	"Чт",
	fri					:	"Пт",
	sat					:	"Сб",
	sel_date			:   "Выбрать дату",
	on_today			:	"На сегодня",
	toggle				:	"Сменить день начала недели (ПН/ВС)",
	prev_year			:	"Пред. год (удерживать для меню)",
	next_year			:	"След. год (удерживать для меню)",
	prev_month			:	"Пред. месяц (удерживать для меню)",
	next_month			:	"След. месяц (удерживать для меню)",
	mon_first			:	"Показать понедельник первым",
	sun_first			:	"Показать воскресенье первым",
	close				:	"Закрыть",
	maximize            :   "Развернуть",
	maximize_all        :   "Развернуть все",
	minimize_all        :   "Свернуть все"
}

function s(ru) {
//	if (__REPLIC_TRNSL[ru] != undefined)
//		return __REPLIC_TRNSL[ru];
//	else 
		return ru;
}