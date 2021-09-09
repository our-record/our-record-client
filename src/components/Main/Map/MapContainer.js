import React, { useState, useEffect } from 'react';
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
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.28057234546219, 127.01017663391963),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    let recordPath = recordMarkers.filter(data => data.place);
    recordPath.length !== 0 && showRecordMarkers(recordPath, map);

    searchTerm && searchPlace(searchTerm, map);
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

  const searchPlace = (searchTerm, map) => {
    const ps = new kakao.maps.services.Places();

    const placesSearchCB = (data, status) => {
      const ImageSrc = '/icon/placeholder.png';
      const imageSize = new kakao.maps.Size(38, 38);
      const imageOption = { offset: new kakao.maps.Point(18, 45) };

      const markerImage = new kakao.maps.MarkerImage(
        ImageSrc,
        imageSize,
        imageOption
      );

      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i], markerImage);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setSearchData(data);
        map.setBounds(bounds);
      }
    };

    ps.keywordSearch(searchTerm, placesSearchCB);

    const displayMarker = (place, image) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: image,
      });

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

      kakao.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        window.event.preventDefault();
        markClickedPlace(searchData, place);
        setPlaceName(place.place_name);
        setLong(place.x);
        setLat(place.y);
      });
    };

    const markClickedPlace = (searchData, clickedPlace) => {
      const ClickedImageSrc = '/icon/pin.png';
      const ImageSrc = '/icon/placeholder.png';
      const imageSize = new kakao.maps.Size(38, 38);
      const imageOption = { offset: new kakao.maps.Point(18, 45) };

      const ClickedMarkerImage = new kakao.maps.MarkerImage(
        ClickedImageSrc,
        imageSize,
        imageOption
      );

      const markerImage = new kakao.maps.MarkerImage(
        ImageSrc,
        imageSize,
        imageOption
      );

      const markAllSearch = () => {
        for (let i = 0; i < searchData.length; i++) {
          displayMarker(searchData[i], markerImage);
        }
        displayMarker(clickedPlace, ClickedMarkerImage);
      };

      searchData && markAllSearch();
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
