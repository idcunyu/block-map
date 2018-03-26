var map;
function initMap() {
  map=new google.maps.Map(document.getElementById("map"),{
    center:{lat:116.401355,lng:39.918024},
    zoom:13
  });
  var tianAnMen={lat:116.401355,lng:39.918024};
  var marker=new google.maps.Marker({
    position:tianAnMen,
    map:map,
    title:"TianAnMen"
  });
  var infowindow=new google.maps.InfoWindow({
    content:"中国，北京，天安门"
  });
  marker.addListener("click",function(){
    infowindow.open(map,marker);
  });
}
