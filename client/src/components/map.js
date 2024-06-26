import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '350px',
    borderRadius: "10px",
    zIndex: "10 !important",
    border: "2px solid #1a237e",
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        var points = [];
        if (props.prodData[0][7].length !== 0) { points.push({ latitude: props.prodData[0][7], longitude: props.prodData[0][6], label: "Manufacturer" }) }
        if (props.prodData[2][0].length !== 0) { points.push({ latitude: props.prodData[2][0], longitude: props.prodData[1][7], label: "Retailer" }) }
        if (props.prodData[2][3].length !== 0) { points.push({ latitude: props.prodData[2][3], longitude: props.prodData[2][2], label: "Distribution Hub" }) }

        this.state = {
            stores: points,
        };
    }

    fitBounds = (mapProps, map) => {
        const bounds = new this.props.google.maps.LatLngBounds();
        this.state.stores.forEach(store => {
            bounds.extend(new this.props.google.maps.LatLng(store.latitude, store.longitude));
        });

        if (this.state.stores.length === 1) {
            map.setZoom(11);
            map.setCenter(bounds.getCenter());

        } else {
            map.fitBounds(bounds);

            const listener = this.props.google.maps.event.addListener(map, 'idle', () => {
                map.setZoom(map.getZoom());  // -1 for zoom out or not?
                this.props.google.maps.event.removeListener(listener);
            });
        }
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return (
                <Marker
                    key={index}
                    position={{
                        lat: store.latitude,
                        lng: store.longitude
                    }}
                    label={{
                        text: store.label,
                        color: "blue",
                        fontSize: "16px",
                        fontWeight: "bold"
                    }}
                />
            );
        });
    }

    render() {
        return (
            <Map
                google={this.props.google}
                style={mapStyles}
                initialCenter={{ lat: 44.439663, lng: 26.096306 }}
                zoom={11}
                ref={this.mapRef}
                onReady={this.fitBounds}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}

MapContainer = GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(MapContainer);

export default MapContainer;
