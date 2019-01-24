'use strict';

(function () {

	// Homeアドレス
	localStorage.setItem('homeUrl', window.location.href);

	/**
	 * ページ内遷移
	 */
	const idTransition = function(){
		let _homeTransition = localStorage.getItem('homeTransition');
		if (_homeTransition) {
			localStorage.setItem('homeTransition', "");
			$("html,body").animate({scrollTop:$(_homeTransition).offset().top}, 500, 'swing');
		}
	};

	// メニュー配置
	$('#iHeader').load('../temp_menu.html', function() {

		$.when(

			// 【設定ファイル】読み込み
			loadSetting()

		).done(function(){

			// トップ配置
			$('#iMain').load('../temp_top.html', function() {

				// IE対応
				moveHeadWidth();

				// 【作品一覧ファイル】読み込み 作品一覧 配置
				loadWorklist();

				// フッタ 配置
				$('#iFooter').load('../temp_footer.html', function() {
					// ページ内遷移
					idTransition();
				});

			});
		});
	});

}());
