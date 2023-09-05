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
    sniveller       : '�� ��������, ��� ������ �������� ������������� ����� � ���, ��� ������������ �������� ������� ��������������� � ���������� ��������?',
    snivellerSend   : '������� �� ��������������! ��������� � ��������� ���� ���������� � ����� ����������� �������������� � ��������� �����',
    
// bm search replics
	ukraine			: '�������',
	world			: '���',
	files			: '�����',
	goods			: '������',
	search			: '�����',
	
	ukraine_new	: '� �������',
	world_new		: '� ����',
	files_new		: '� ������',
	goods_new		: '� �������',
	
// comments replics
	enterComment	: '������� ����� �����������',
	enterCaptcha	: '������� �������� ���',
	delComment		: '������� �����������',
	clearComment	: '�������� ����� �����������',
	add				: '��������',
	minimize		: '��������',

//prikol replics
	emptyEmail			:	'������� Email',
	wronEmail				:	'Email ������ �� ���������',
	emptyText				:	'������� ����� ���������',
	emptyAnekCat		:	'�������� ��������� ��������',
	emptyAnekText		:	'������� ����� ��������',
	emptyPicCat			:	'�������� ��������� ��������',
	emptyNamePict		:	'������� �������� ��������',
	emptyPicUrl			:	'������� Url ��������',
	emptyFilePic		:	'������� ���� ��������',
	emptyStoryCat		:	'�������� ��������� �������',
	emptyStoryName		:	'������� �������� �������',
	emptyStoryext		:	'������� ����� �������',
	emptyCatVid			:	'�������� ��������� �����',
	emptyVidName		:	'������� �������� �����',
	emptyVidUrl			:	'������� Url �����',
	maxFilesLim			:	'������������ ���������� ������ ���������� 30',
	ajaxError			:	'������ Ajax(�)',
	ajaxWait			:	'���������',

	// start page
	tools				:	' �����������',
	select				:	' ��������',
	internet_settings	:	' ��������� ���������',
	settings			:	' ���������',
	edit				:	'�������������',
	params				:	'���������',
	predp				:	'������������',
	therd_reg			:	'� �������� ����, �������� �������',
	obsch				:	'�����',
	osnovn				:	'��������',
	osnov				:	'��������',
	main				:	'�������',
	chrom_home			:   '������� ������������� ������ � ',
	open_next_page		:	'������� ��� ��������',
	other_ins			:	'������� ������������� ������ � ������',
	opServ				:	' ������',
	home_page			:	' �������� ��������',
	jan					:   '������',
	feb					:   '�������',
	mar					:   '����',
	apr					:   '������',
	may					:   '���',
	jun					:   '����',
	jul					:   '����',
	aug					:   '������',
	sep					:   '��������',
	oct					:   '�������',
	nov					:   '������',
	des					:   '�������',
	jan1				:   '������',
	feb1				:   '�������',
	mar1				:   '�����',
	apr1				:   '������',
	may1				:   '���',
	jun1				:   '����',
	jul1				:   '����',
	aug1				:   '�������',
	sep1				:   '��������',
	oct1				:   '�������',
	nov1				:   '������',
	des1				:   '�������',
	today				:   "�������",
	sun					:	"�c",
	mon					:	"��",
	tue					:	"��",
	wen					:	"��",
	the					:	"��",
	fri					:	"��",
	sat					:	"��",
	sel_date			:   "������� ����",
	on_today			:	"�� �������",
	toggle				:	"������� ���� ������ ������ (��/��)",
	prev_year			:	"����. ��� (���������� ��� ����)",
	next_year			:	"����. ��� (���������� ��� ����)",
	prev_month			:	"����. ����� (���������� ��� ����)",
	next_month			:	"����. ����� (���������� ��� ����)",
	mon_first			:	"�������� ����������� ������",
	sun_first			:	"�������� ����������� ������",
	close				:	"�������",
	maximize            :   "����������",
	maximize_all        :   "���������� ���",
	minimize_all        :   "�������� ���"
}

function s(ru) {
//	if (__REPLIC_TRNSL[ru] != undefined)
//		return __REPLIC_TRNSL[ru];
//	else 
		return ru;
}