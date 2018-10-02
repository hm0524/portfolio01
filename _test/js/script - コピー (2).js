
var _Model = Backbone.Model.extend({
	//constructor: function() {},
	//url: '',

	defaults:{
		id: "",
		title: "",
		pickUpUrl: "",
		workUrl: "",
		comment: "",
		etc1: "",
		etc2: "",
	},

//	defaults: function() {
//		return {
//		};
//	},
	validate: function(attrs) {
	},
	initialize: function(attrs, options) {
		//this.set({cid: this.cid});
	}
});

var _View = Backbone.View.extend({

	el: '#element-id',
	//id: '',
	//tagName: '',
	//className: '',

	events: {
		'click #id-menuHomeBtn'		: '_onTopBtn',
		'click #id-menuWorkListBtn'	: '_onWorkListBtn',
		'click #id-blogBtn'			: '_onblogBtn',
		'click #id-enquiryBtn'		: '_onenquiryBtn',
		'click #sidbarToggle'		: '_onSidbarToggle',
		'click #id-side-sub'		: '_onSideSub',
		'click #id-side-nav a'		: '_onSidbarToggle',
		'click #id-workList a'		: '_onWorkBtn',			// ヘッダ 作品一覧 クリック
		'click #id-sub a'			: '_onWorkBtn',			// サイド 作品一覧 クリック
		'click #id-slider img'		: '_onWorkBtn',			// PICK UP クリック
		'click #id-goTop'			: '_onTopBtn'
	},

	//template: _.template($('').html()),

	/**
	 * csv読み込み
	 */
	readCsvData: function(){

		var that = this;

//		if(settingFile._list === undefined) {

			$.get('setting.csv',function(data){

				// 設定ファイルのリスト化
				settingFile._list = $.csv()(data);

// -- ▼▼▼▼▼ model set ▼▼▼▼▼

//id: "",
//title: "",
//pickUpUrl: "",
//workUrl: "",
//comment: "",
//etc1: "",
//etc2: "",

//var zzzzz = $.csv()(data);
////$(zzzzz).each(function(i){
//$.each(zzzzz, function(index, val) {
//
//	if (index > 1) {
//		console.log(zzzzz[index][1]);
//		that.model.set('id', zzzzz[index][0]);
//		that.model.set('title', zzzzz[index][1]);
//	}
//})
//console.table(that.model);


that.model.set($.csv()(data));
console.table(that.model.changed);
var xxx = that.model.get(2);
console.log(xxx[1]);
// -- ▲▲▲▲▲ model set ▲▲▲▲▲

				// メニュー配置
				$('#id_menu').load('temp_menu.html', function() {

					// 配置が終わったら作品一覧配置
					that.viewWorkList();
				});

				// トップ配置
				$('#id_main').load('temp_top.html', function() {

					// 配置が終わったらPICK UP配置
					that.viewPickup();

					// 配置が終わったらフッタ配置
					$('#id_footer').load('temp_footer.html');

				});

			})
//		}
	},

	/**
	 * 作品一覧
	 */
	viewWorkList: function(){

		// 設定ファイル
		var csvList = settingFile._list;

		// ヘッダメニューの作品一覧
		$(csvList).each(function(i){
			if (i > 1) {
				$("#id-workList").append("<li><a id=" + this[ 0 ] +" href='#'>" + this[ 1 ] + "</a></li>");
			}
		})

		// サイドメニューの作品一覧
		$(csvList).each(function(i){
			if (i > 1) {
				$("#id-sub").append("<li class='class-side-nav-text'><a id=" + this[ 0 ] +" href='#'>" + this[ 1 ] + "</a></li>");
			}
		})

	},

	/**
	 * スライダー初期設定
	 */
	iniSlider: function(){

		// 初期化完了イベント
//		$('.class-slider').on('init', function(slick){

		// 画像がlazyLoadされる度に呼ばれるイベント
		$('.class-slider').on('lazyLoaded', function(event, slick, image, imageSource){

			// 作品一覧 縦位置調整
			workListPaddingTop();

		});

		$('.class-slider').slick({
			accessibility: false,	// 矢印キーでスライドを切り替える
			adaptiveHeight: true,	// スライドの高さが違うときに自動調整する
			autoplay: true,			// 自動再生する
			slidesToShow: 4,		// 表示させるスライド数
			arrows: false,			// 前次ボタンを表示するか
			autoplaySpeed: 1000,	// 自動再生で切り替えする時間(ミリ秒) [初期値:3000]
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 2,	// 表示させるスライド数
					}
			},{
				breakpoint: 768,
					settings: {
						slidesToShow: 1,	// 表示させるスライド数
					}
			}]
		});

	},

	/**
	 * PICK UP配置
	 */
	viewPickup: function(){

		var that = this;

		// 設定ファイル
		var csvList = settingFile._list;

		// PICK UP
		var _code;
		$(csvList).each(function(i){

			// データはリストの2行目から
			if (i > 1) {

				// PICK UPアドレスが空白はスルー
				if(this[ 2 ]){
//					_code = $("<div><img id=" + this[ 0 ] +" src=" + this[ 2 ] + "></div>");
					_code = $("<div><img id=" + this[ 0 ] +" data-lazy=" + this[ 2 ] + "></div>");
					$("#id-slider").append(_code);
				}

				// 最後までappendできたか確認
				if((csvList.length -1) == i) {

					_code.ready(function() {
//						console.log(_code.height());

						// 最後までappendできたらスライダー初期設定
						that.iniSlider();

					});
				}
			}
		})
	},

	render: function() {
		return this;
	},

	_onSidbarToggle: function(ev){

		var exclusion = ev.target.id

		// 作品一覧は除外
		if ( exclusion !== 'id-side-sub' ) {

			// 作品一覧のアイコンも除外
			if ( exclusion !== 'id-sub-toggle' ) {

				// アイコン変更
				if ( $("#id-side-nav").attr('aria-expanded') === "true" ) {
					// [×] → [三]
					$('#sidbarToggle span').removeClass('fa-times');
					$('#sidbarToggle span').addClass('fa-bars');
					$("#id-side-nav").collapse('hide');
				} else {
					// [三] → [×]
					$('#sidbarToggle span').removeClass('fa-bars');
					$('#sidbarToggle span').addClass('fa-times');
				}
			}
		}
	},

	/**
	 * 作品ボタンクリック
	 * @param ev
	 */
	_onWorkBtn: function(ev){

		alert('作品クリック id:' + ev.currentTarget.id);
		console.log(ev);

	},

	/**
	 * ページ内リンク
	 * @param jumpTarget リンク先id
	 */
	linkInThePage: function(jumpTarget){

		$("html,body").animate({scrollTop:$(jumpTarget).offset().top}, 500, 'swing');
	},

	/**
	 * Topボタンクリック
	 * @param ev
	 */
	_onTopBtn: function(ev){

		this.linkInThePage('#element-id');

	},

	/**
	 * 作品一覧ボタンクリック
	 * @param ev
	 */
	_onWorkListBtn: function(ev){

		this.linkInThePage('#id-work-list');

	},

	/**
	 * ブログボタンクリック
	 * @param ev
	 */
	_onblogBtn: function(ev){

		this.linkInThePage('#id-blog');

	},

	/**
	 * お問い合わせボタンクリック
	 * @param ev
	 */
	_onenquiryBtn: function(ev){

		this.linkInThePage('#id-enquiry');

	},

	_onSideSub: function(ev){

		// アイコン変更
		if ( $("#id-sub").attr('aria-expanded') === "true" ) {
			// [↓] → [→]
			$('#id-sub-toggle').removeClass('fa-chevron-down');
			$('#id-sub-toggle').addClass('fa-chevron-right');
		} else {
			// [→] → [↓]
			$('#id-sub-toggle').removeClass('fa-chevron-right');
			$('#id-sub-toggle').addClass('fa-chevron-down');
		}

	},

	initialize: function(options) {
		this.options = options;

		// csv読み込み
		this.readCsvData();

	},
});

/**
 * 設定ファイルのリスト set/get
 */
settingFile = function() {
	var _rtn;
	return {
		get _list() {
			return _rtn;
		},
		set _list(val) {
			_rtn = val;
		}
	}
};

/**
 * PICK UPの高さ set/get
 */
pickUpArea = function(){

//console.log(val);

	var _rtn;

	return {
		get _height() {
			return _rtn;
		},
		set _height(val) {
			_rtn = val;
		}
	}
};

/**
 * 作品一覧 縦位置調整
 */
workListPaddingTop = function(){

//	if ( pickUpArea._height == undefined ) {
//
//		pickUpArea._height = $('.class-pick-up').height();
////		pickUpArea._height = 300;	// 初期値入れていいいかも
//
//	} else 	if ( pickUpArea._height < $('.class-pick-up').height() ) {

//		// 大きい方をset
		pickUpArea._height = $('.class-pick-up').height();
//	}

	var _pickUpHeight = pickUpArea._height;

//	$('.class-work-list').css('padding-top', $('.class-pick-up').height());
	$('.class-work-list').css('padding-top', _pickUpHeight);

};

/**
 * ウインドウリサイズ完了(一応)処理
 */
(function () {
	var timer = 0;

	window.onresize = function () {
		if (timer > 0) {
			clearTimeout(timer);
		}

		timer = setTimeout(function () {

			// サイドメニューが開いていたら閉じる
			$('#sidbarToggle span').removeClass('fa-times');
			$('#sidbarToggle span').addClass('fa-bars');
			$("#id-side-nav").collapse('hide');

			// 作品一覧 縦位置調整
			workListPaddingTop();

		}, 200);
	};

}());


(function () {

	var _M =new _Model();
	var _V = new _View({model:_M});

	// View インスタンス生成
//	var _V = new _View();

	_V.render();

	return _V;

}());



