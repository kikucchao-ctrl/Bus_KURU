// バスクル サービスワーカー（v1：通知表示テスト用）
// このファイルは画面を閉じていてもスマホの中で生き続け、通知を表示する役目を持つ

// インストール時：すぐに新しいサービスワーカーに切り替える
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

// 有効化時：すぐにこのサービスワーカーを使い始める
self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

// テスト通知を画面側（バスクルのHTML）から受け取って表示する
// ※今はまだサーバーからのプッシュには対応していません（次のステップで対応）
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'TEST_NOTIFICATION') {
    self.registration.showNotification('🚌 バスクル（テスト通知）', {
      body: event.data.body || 'サービスワーカーは正常に動いています！',
      icon: undefined,
      tag: 'bk-test'
    });
  }
});
