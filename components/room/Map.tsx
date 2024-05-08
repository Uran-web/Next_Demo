import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  MapContainerProps,
  TileLayerProps,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface Props {
  coordinates: number[];
}

interface MapProps extends MapContainerProps {
  center: number[];
  zoom: number;
}

interface TileProps extends TileLayerProps {
  attribution: string;
}

export function ChangeView({ coordinates }: Props) {
  const map = useMap();
  map.setView(coordinates, 12);
  return null;
}

const Map = ({ coordinates }: Props) => {
  const mapProps: MapProps = {
    center: coordinates,
    zoom: 12,
  };

  const tielProps: TileProps = {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  };

  return (
    <div className="z-1 position-relative">
      <MapContainer {...mapProps} style={{ width: '100%', height: 350 }}>
        <TileLayer {...tielProps} />
        <Marker position={coordinates} />
        <ChangeView coordinates={coordinates} />
      </MapContainer>
    </div>
  );
};

export default Map;
