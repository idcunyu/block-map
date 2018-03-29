var map,bounds,infowindow;
var markers = [];

// 获取地点方式：硬编码
var locations = [
  {
    title: '洪崖洞',
    en: 'Hong Ya Dong',
    addr: '重庆市渝中区嘉滨路88号洪崖洞民俗风貌区',
    location: {
      lat: 29.5618602504,
      lng: 106.5778986740
    }
  },
  {
    title: '解放碑',
    en: 'Jie Fang Bei',
    addr: '重庆市渝中区邹容路',
    location: {
      lat: 29.5572902504,
      lng: 106.5771286740
    }
  },
  {
    title: '重庆喜来登大酒店',
    en: 'Sheraton Chongqing Hotel',
    addr: '重庆市南岸区南滨路78号',
    location: {
      lat: 29.5437238098,
      lng: 106.5865312996
    }
  },
  {
    title: '重庆人民广场',
    en: "Chongqing People's Square",
    addr: '重庆渝中区人民路173号人民大礼堂前',
    location: {
      lat: 29.5617248135,
      lng: 106.5526237149
    }
  },
  {
    title: '重庆大剧院',
    en: 'Chongqing Grand Theatre',
    addr: '重庆市江北区江北嘴江北正街',
    location: {
      lat: 29.5699092050,
      lng: 106.5812108840
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
  var defaultIcon = makeMarkerIcon('eef210');
  var highlightedIcon = makeMarkerIcon('74da2d');
  setMarkers(locations,defaultIcon,highlightedIcon);
  map.fitBounds(bounds);
}

// 设置标记
function setMarkers(locations,defaultIcon,highlightedIcon){
  for(var i=0;i<locations.length;i++){
    var loc=locations[i]
    var marker = new google.maps.Marker({
      position: loc.location,
      map: map,
      title: loc.title,
      en:loc.en,
      addr:loc.addr,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon
    });
    markers.push(marker);
    bounds.extend(markers[i].position);
    marker.addListener('click', function() {
      populateInfoWindow(this, infowindow);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
  }
}

// 移除标记（暂未用到）
// function removeMarker(){
//   for(var i = 0; i < markers.length; i++){
//     markers[i].setMap(null);
//   }
// }

// 显示信息栏
function populateInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div class="marker-title">' + marker.title + '</div>' + '<div class="marker-li">' + marker.en + '</div>' + '<div class="marker-li">'+ marker.addr +'</div>');
    // infowindow.setContent('');
    infowindow.setPosition(marker.location);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
      marker.setAnimation(null);
    });
    // 打开标记对应的信息窗口
    infowindow.open(map, marker);
  }
}

// 自定义标记样式颜色
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

// 错误处理
var errorHandler = function(){
    alert("SORRY!GOOGLE MAP ERROR!");
};
