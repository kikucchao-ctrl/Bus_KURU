self.addEventListener('push',function(event){
  var data={title:'🚌 バスクル',body:'バスが近づいています！'};
  if(event.data){try{data=event.data.json();}catch(e){}}
  event.waitUntil(
    self.registration.showNotification(data.title||'🚌 バスクル',{
      body:data.body||'バスが近づいています！',
      icon:'/Bus_KURU/icon-192.png',
      tag:'buskuru',
      requireInteraction:false,
      vibrate:[200,100,200]
    })
  );
});
self.addEventListener('notificationclick',function(event){
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(function(clientList){
      for(var i=0;i<clientList.length;i++){
        var client=clientList[i];
        if(client.url.indexOf('/Bus_KURU/')>=0&&'focus' in client){
          return client.focus();
        }
      }
      if(clients.openWindow)return clients.openWindow('/Bus_KURU/');
    })
  );
});
self.addEventListener('message',function(event){
  if(event.data&&event.data.type==='TEST_NOTIFICATION'){
    self.registration.showNotification('🚌 バスクル テスト',{
      body:event.data.body||'テスト通知です！',
      tag:'buskuru-test',
      vibrate:[200,100,200]
    });
  }
});
