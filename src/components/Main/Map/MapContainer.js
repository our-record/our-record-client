import React, { useState, useEffect } from 'react';
import './overlay.css';
import './markerOverlay.css';

const MapContainer = ({
  searchPlace,
  setLong,
  setLat,
  setPlaceName,
  recordMarkers,
}) => {
  const [initialCenterX, setInitialCenterX] = useState();
  const [initialCenterY, setInitialCenterY] = useState();
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById('myMap');
    console.log(initialCenterY, initialCenterX);

    const options = {
      center: recordMarkers
        ? new kakao.maps.LatLng(recordMarkers[0].y, recordMarkers[0].x)
        : new kakao.maps.LatLng(37.28057234546219, 127.01017663391963),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const setRecordMarkers = recordMarkers => {
      let linePath = [];

      for (var i = 0; i < recordMarkers.length; i++) {
        const MarkerOverlay = new kakao.maps.CustomOverlay({
          map: map,
          clickable: true,
          content: `
          <div class="customOverlay">
            <img src="/icon/pin.png"></img>
            <div>${i + 1}</div>
          </div>`,
          position: new kakao.maps.LatLng(
            recordMarkers[i].y,
            recordMarkers[i].x
          ),
          xAnchor: 0.5,
          yAnchor: 1,
          zIndex: 0,
        });

        linePath[i] = new kakao.maps.LatLng(
          recordMarkers[i].y,
          recordMarkers[i].long
        );
      }

      const polyLine = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 2,
        strokeColor: '#ff1b4b',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });

      polyLine.setMap(map);
    };

    recordMarkers && setRecordMarkers(recordMarkers);

    const ps = new kakao.maps.services.Places();

    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i], null);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    };

    ps.keywordSearch(searchPlace, placesSearchCB);

    const displayMarker = (place, image) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: image,
      });

      let content = `
      <div class="wrap">
        <div class="info">
          <div class="title">
            ${place.place_name}
          </div>
          <div class="body">
            <div class="desc">
              <div class="ellipsis">${place.address_name}</div>
              <div class="category">${place.category_name}</div>
              <div><a href="${place.place_url}" target="_blank" class="link">정보보기</a></div>
            </div>
          </div>
        </div>
      </div>
      `;

      console.log(place);

      let overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        window.event.preventDefault();
        setPlaceName(place.place_name);
        setLong(place.x);
        setLat(place.y);
        overlay.setMap(map);
        findClicked(place);
      });
    };

    const findClicked = dataNumber => {
      const imageSrc = '/icon/pin.png';
      const imageSize = new kakao.maps.Size(39, 40);
      const imageOption = { offset: new kakao.maps.Point(18.5, 40) };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      displayMarker(dataNumber, markerImage);
    };
  }, [searchPlace, recordMarkers]);

  // const getInitialCenter = dataArray => {
  //   let resultX = [];
  //   let resultY = [];
  //   for (let i = 0; i < dataArray.length; i++) {
  //     for (let j = i + 1; j < dataArray.length; j++) {
  //       dataArray[i].coordinate - dataArray[j].y > 0
  //         ? resultY.push(dataArray[i].y - dataArray[j].y)
  //         : resultY.push((dataArray[i].y - dataArray[j].y) * -1);
  //     }
  //   }

  //   for (let i = 0; i < dataArray.length; i++) {
  //     for (let j = i + 1; j < dataArray.length; j++) {
  //       dataArray[i].coordinate + dataArray[j].y > 0
  //         ? resultX.push(dataArray[i].x - dataArray[j].x)
  //         : resultX.push((dataArray[i].x - dataArray[j].x) * -1);
  //     }
  //   }

  //   setInitialCenterX(Math.max(...resultX) / 2);
  //   setInitialCenterY(Math.max(...resultY) / 2);
  // };

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
