// knockout视图对象
var ViewModel = function() {
  // 用self变量装载this，避免混淆
  var self = this;
  // 动态绑定输入栏输入的内容
  self.enterToFind = ko.observable('');

  // 使用计算属性来动态获取
  self.filterLocations = ko.computed(function() {
    var findLoc = my_locations.filter(function(location) {
      // 返回输入内容能匹配的标记
      return location.title.toLowerCase().indexOf(self.enterToFind().toLowerCase()) >= 0;
    });
    setMarkers(findLoc);
    console.log("findLoc:"+findLoc);
    return findLoc;
  });

  // 点击在列表中选择的标记
  self.markTheClick = function(location) {
    var now_locations=self.filterLocations();
    var thisMarker = markers[now_locations.indexOf(location)];
    // 触发被选中的标记被点击的事件
    google.maps.event.trigger(thisMarker, 'click');
  }
};

// initApp
function initApp() {
  initMap();
  ko.applyBindings(new ViewModel());
}
