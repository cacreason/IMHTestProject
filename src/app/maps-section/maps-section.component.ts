/**
 * Chris Creason - IMH Test Project
 * 2/8/22
 * Google Maps Component
 */
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-maps-section',
  templateUrl: './maps-section.component.html',
  styleUrls: ['./maps-section.component.css']
})
export class MapsSectionComponent implements OnInit {
  // Reference to Map Component and Search Field for Google Map component
  @ViewChild("googleMapSearch") gmInputField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;

  // Property to store selected place on Google Maps marker click event
  selectedPlace: google.maps.places.PlaceResult | undefined;

  //Property to store Google Maps info window that is created on marker click
  infowindow = new google.maps.InfoWindow();

  // lat long coordinates for map center
  initialCoordinates = {
    lat: 36.823860,
    lng: -76.128730
  }

  // Initial map configuration settings
  mapConfig = {
    disableDefaultUI: false,
    fullScreenControl: true,
    zoomControl: true,
    zoom: 11
  }
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Attach input element to SearchBox in order to provide Google Places query predictions on text change.
    const searchField = new google.maps.places.SearchBox(this.gmInputField.nativeElement);

    // Align input field to top center of map
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.gmInputField.nativeElement);

    /** 
     *  Add 'places changed' event listener to search field and define function callback that renders a marker on the map
     * for each place returned by the search field.  
     */
    searchField.addListener('places_changed', ()=>{
      const places = searchField.getPlaces();
      const bounds = new google.maps.LatLngBounds();
      if(places?.length === 0){
        return;
      }
      places?.forEach(place=>{
        if(!place.geometry || !place.geometry.location){
          return;
        }
        if(place.geometry.viewport){
          bounds.union(place.geometry.viewport);
          this.createMarker(place);
        }
        else{
          bounds.extend(place.geometry.location);
          this.createMarker(place);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  /**
   * Function to create a marker on the Google Maps component and display an info window on marker click event.
   * @param place 
   * @returns 
   */
  createMarker(place: google.maps.places.PlaceResult): void {
    if (!place.geometry || !place.geometry.location) return;
    const infoWindow = new google.maps.InfoWindow();
    const map = this.map.googleMap;
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  
    this.selectedPlace = place;

    google.maps.event.addListener(marker, "click", () => {
      this.infowindow.close();
      this.infowindow.setContent(`
      <h1>` + place.name +"</h1>" +
      "<p>" + place.formatted_address + "</p>" || "");
      this.infowindow.open({
        anchor: marker,
        map});
    });
  }
}
