
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
	$('#iHeader').load('../temp_menu.html', function() {
	
		$.when(

			// 【設定ファイル】読み込み
			loadSetting()

		).done(function(){

			let setHtml = 		'<h4 class="entry-title">-ウィッグの上手なかぶり方-</h4>';
			setHtml = setHtml + '<p class="cMain__imgWrap"><img src="../img/j0032.png" data-src="../img/j0032.png" class="lazyload"></p>';
			$("#iMain").prepend(setHtml);

			// IE対応
			moveHeadWidth();

			// フッタ 配置
			$('#iFooter').load('../temp_footer.html');

		});
	});

}());

