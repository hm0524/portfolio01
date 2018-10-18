
let listId;

(function () {

	// ID取得
	let urlData = location.search;
	listId = urlData.split('=')[1] -1;

	// localStorage(全体)取得
	let _localStorage = localStorage.getItem('setting');
	_localStorage = JSON.parse(_localStorage);
	
	// 
	console.log(_localStorage[listId]);

	// メニュー配置
	$('#id_menu').load('temp_menu.html', function() {
	
		$.when(

			// 【設定ファイル】読み込み
			loadSetting()

		).done(function(){

			let setHtml = 		'<article>';
			setHtml = setHtml + 	'<div class="class-external-wrapper">';
			setHtml = setHtml + 		'<iframe src="http://cre-m.jp/category/gif_manga/nanda_gakuen/"></iframe>';
			setHtml = setHtml + 	'</div>';
			setHtml = setHtml + '</article>';
			$("#id_main").prepend(setHtml);

			// IE対応
			moveHeadWidth();

			// フッタ 配置
			$('#id_footer').load('temp_footer.html');

		});
	});

}());

$(window).on('load resize', function(){
//	console.log($(window).height());
//	console.log($('#id_footer').height());
//	console.log($(window).height() - $('#id_footer').height() - 20);
;
//.class-external-wrapper
});

