
import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {  MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [GoogleMap, MapMarker,NgFor]
})
export class MapComponent implements OnInit {
  @Input() movie: any; // Movie object with locations
  zoom = 12;
  markers:any[]=[];
  center = { lat: 37.762199, lng: -122.445167 };
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
  };

  ngOnInit() {

      this.center =  { lat: 37.762199, lng: -122.445167 };
      this.addMarker();

  }


  addMarker() {
    if (!this.movie || !this.movie.locations?.length) {
      console.warn('No locations available to add markers');
      return;
    }

    this.movie.locations.forEach((location: any, index: number) => {
      this.markers.push({
        position: {
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude),
        },
        label: {
          color: 'black',
          text: location.address, // Etiqueta dinámica basada en el índice
        },
        title: location.address || `Marker ${index + 1}`, // Dirección como título del marcador
        options: { animation: google.maps.Animation.DROP }, // Animación DROP
      });
    });

    console.log('Markers added:', this.markers);
  }

}
