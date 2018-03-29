// knockout视图对象
var ViewModel = function(){
  var self = this;
  self.enterToFind = ko.observable('');

  // 动态绑定地址列表
  self.filteredReadyLoc = ko.computed(function () {
    var findLoc = locations.filter(function (readyLoc) {
      return readyLoc.title.toLowerCase().indexOf(self.enterToFind().toLowerCase()) >= 0;
    });
    // 设置地图标记
    // setMarkers(findLoc);
    return findLoc;
  });

  // 点击地点高亮地图上的标记
  self.markTheFindLoc = function (readyLoc) {
    var thisMarker=markers[locations.indexOf(readyLoc)];
    google.maps.event.trigger(thisMarker, 'click');
    if(thisMarker.animation!=google.maps.Animation.DROP){
      for(var i=0;i<locations.length;i++){
        markers[i].setAnimation(null);
      }
      thisMarker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
};

// initApp
function initApp(){
  initMap();
  ko.applyBindings(new ViewModel());
}
