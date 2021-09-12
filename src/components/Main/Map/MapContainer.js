import React, { useEffect } from 'react';
import './overlay.css';
import './markerOverlay.css';

const { kakao } = window;

const MapContainer = ({
  searchTerm,
  setLong,
  setLat,
  setPlaceName,
  recordMarkers,
}) => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.28057234546219, 127.01017663391963),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    let recordPath = recordMarkers.filter(data => data.place);
    recordPath.length !== 0 && showRecordMarkers(recordPath, map);

    searchTerm && searchPlaceMarker(map);
  }, [recordMarkers, searchTerm]);

  const showRecordMarkers = (recordPath, map) => {
    let points = [];

    for (let i = 0; i < recordPath.length; i++) {
      new kakao.maps.CustomOverlay({
        map: map,
        clickable: true,
        content: `
        <div class="customOverlay">
          <img src="/icon/pin.png"></img>
          <div>${i + 1}</div>
        </div>`,
        position: new kakao.maps.LatLng(
          recordPath[i].latitude,
          recordPath[i].longitude
        ),
        xAnchor: 0.45,
        yAnchor: 0.85,
        zIndex: 0,
      });

      points[i] = new kakao.maps.LatLng(
        recordPath[i].latitude,
        recordPath[i].longitude
      );
    }

    const bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    map.setBounds(bounds);

    const polyLine = new kakao.maps.Polyline({
      path: points,
      strokeWeight: 2,
      strokeColor: '#ff1b4b',
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
    });

    polyLine.setMap(map);
  };

  const searchPlaceMarker = map => {
    const ps = new kakao.maps.services.Places();
    let selectedMarker = null;

    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    };

    ps.keywordSearch(searchTerm, placesSearchCB);

    const displayMarker = place => {
      const basicImageSrc = '/icon/placeholder.png';
      const clickedImageSrc = '/icon/pin.png';
      const imageSize = new kakao.maps.Size(38, 38);
      const imageOption = { offset: new kakao.maps.Point(18, 45) };

      const basicMarkerImage = new kakao.maps.MarkerImage(
        basicImageSrc,
        imageSize,
        imageOption
      );

      const clickedMarkerImage = new kakao.maps.MarkerImage(
        clickedImageSrc,
        imageSize,
        imageOption
      );

      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: basicMarkerImage,
      });

      marker.basicMarkerImage = basicMarkerImage;

      let iwContent = `
          <div class="wrap">
            <div class="info">
              <div class="title">
                ${
                  place.place_name && place.place_name.length > 20
                    ? `${place.place_name.slice(0, 20)}...`
                    : place.place_name
                }
              </div>
              <div class="body">
                <div class="desc">
                  <div class="ellipsis">${place.address_name}</div>
                  <div class="category">
                  ${
                    place.category_name && place.category_name.length > 28
                      ? `${place.category_name.slice(0, 28)}...`
                      : place.category_name
                  }</div>
                </div>
              </div>
            </div>
          </div>
          `;

      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close();
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        if (!selectedMarker || selectedMarker !== marker) {
          !!selectedMarker &&
            selectedMarker.setImage(selectedMarker.basicMarkerImage);
          marker.setImage(clickedMarkerImage);
        }
        selectedMarker = marker;
        setPlaceName(place.place_name);
        setLong(place.x);
        setLat(place.y);
      });
    };
  };

  return (
    <div
      id="myMap"
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
};

export default MapContainer;
