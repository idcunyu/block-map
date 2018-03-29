// knockout视图对象
var ViewModel = function() {
  // 用self变量装载this，避免混淆
  var self = this;
  // 动态绑定输入栏输入的内容
  self.enterToFind = ko.observable('');

  // 使用计算属性来动态获取
  self.filterReadyLoc = ko.computed(function() {
    var findLoc = locations.filter(function(readyLoc) {
      // 返回输入内容能匹配的标记
      return readyLoc.title.toLowerCase().indexOf(self.enterToFind().toLowerCase()) >= 0;
    });
    return findLoc;
  });

  // 点击在列表中选择的标记
  self.markTheFindLoc = function(readyLoc) {
    var thisMarker = markers[locations.indexOf(readyLoc)];
    // 触发被选中的标记被点击的事件
    google.maps.event.trigger(thisMarker, 'click');
    // 标记的动态效果（被点击选中为BOUNCE效果）
    if (thisMarker.animation != google.maps.Animation.DROP) {
      for (var i = 0; i < locations.length; i++) {
        markers[i].setAnimation(null);
      }
      thisMarker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
};

// initApp
function initApp() {
  initMap();
  ko.applyBindings(new ViewModel());
}
