var map,bounds,infowindow;
var markers = [];

// 获取地点方式：硬编码
var my_locations = [
  {
    title: '解放碑',
    en: 'Jie Fang Bei',
    addr: '',
    location: {
      lat: 29.5572902504,
      lng: 106.5771286740
    }
  },
  {
    title: '较场口',
    en: "Jiao Chang Kou",
    addr: '',
    location: {
      lat: 29.5538418171,
      lng: 106.5744778180
    }
  },
  {
    title: '重庆朝天门广场',
    en: 'Chongqing Chaotianmen Square',
    addr: '',
    location: {
      lat: 29.5667999891,
      lng: 106.5878479496
    }
  },
  {
    title: '重庆大剧院',
    en: 'Chongqing Grand Theatre',
    addr: '',
    location: {
      lat: 29.5699092050,
      lng: 106.5812108840
    }
  },
  {
    title: '重庆湖广会馆',
    en: 'Chong Qing Hu Guang Hui Guan',
    addr: '',
    location: {
      lat: 29.5589763778,
      lng: 106.5878757296
    }
  }
];

// initMap
function initMap() {
  infowindow = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();
  map=new google.maps.Map(document.getElementById('map'),{
    center:{lat:29.5568677625,lng:106.5749075215},
    zoom:13
  });
}

// 显示信息栏
function populateInfoWindow(marker, infowindow,addressData) {
  if (infowindow.marker != marker) {
    console.log(markers);
    for(var i=0;i<markers.length;i++){
      markers[i].setAnimation(null);
    }
    infowindow.marker = marker;
    // addressData（标记的地址信息）以异步方式加载进去
    infowindow.setContent('<div class="marker-title">' + marker.title + '</div>' + '<div class="marker-li">' + marker.en + '</div>' + '<div class="marker-li">'+ addressData +'</div>');
    infowindow.setPosition(marker.position);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
      marker.setAnimation(null);
    });
    // 打开标记对应的信息窗口
    infowindow.open(map, marker);
  }
}

// 设置标记
function setMarkers(locations){
  clearMarkers();
  markers.splice(0,markers.length);
  // 设置标记的默认和高亮样式
  var defaultIcon = makeMarkerIcon('eef210');
  var highlightedIcon = makeMarkerIcon('74da2d');
  // 如需要每一次输入后重新设置bounds并fitBounds，则启用如下代码并注释掉initMap()中的相同代码
  // bounds = new google.maps.LatLngBounds();
  for(var i=0;i<locations.length;i++){
    var loc=locations[i];
    var marker = new google.maps.Marker({
      position: loc.location,
      map: map,
      title: loc.title,
      en:loc.en,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon
    });
    // 将标记放入markers数组
    markers.push(marker);
    bounds.extend(markers[i].position);
    // 鼠标移开显示标记的默认样式
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
    // 鼠标移入显示标记的高亮样式
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    // 设置点击标记时实现的方法（内含jquery的ajax）
    marker.addListener('click', function() {
      var self = this;
      requestApi(self, function(data){
        populateInfoWindow(self, infowindow, data);
      });
    });
  }
  // 适应标记的范围
  map.fitBounds(bounds);
}

// 清除标记
function clearMarkers(){
  for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
}

// 此方法来源：udacity课件中的指导方法，来自定义标记样式颜色
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

// 获取并应用第三方API：Foursquare API
function requestApi(location, ftc) {
  var clientId = 'OW2V12JB4ZZP01UJU0RGS1DGBJ1NOGPT2XPX5FLK5KYZ42AC';
  var clientSecret = 'CDZCZWF1WWVVEQYCSPR231NKXDLZ4WEKZ4KOTU1ZRFWX1EBE';
  var url = 'https://api.foursquare.com/v2/venues/search?v=20161016';
  var requestUrl = url + '&client_id=' + clientId + '&client_secret=' + clientSecret
                      + '&query=' + location.title + "&ll=" + location.position.lat() + "," + location.position.lng();
  console.log('requestUrl is '+requestUrl);
  // 异步jquery ajax获取
  $.ajax({
    type: 'GET',
    url: requestUrl,
    success: function (res) {
      console.log(res);
      var address = res.response.venues[0].location.formattedAddress.reverse().join(",") + "," + location.title;
      console.log(address);
      ftc(address);
    },
    error: function(error){
      alert('获取API错误：' + error);
      console.log('获取API错误：'+ error);
    }
  })
}

// 错误处理
var errorHandler = function(){
    alert("似乎出了点小问题，请检查后重试...");
};
