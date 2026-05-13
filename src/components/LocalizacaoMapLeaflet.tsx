import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import type { OsmPoi } from '../lib/overpassPois'

const PROPERTY: [number, number] = [-25.4556, -49.2874]

/** Tiles padrão OpenStreetMap */
const TILE_OSM = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  subdomains: 'abc' as const,
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}

const ambarPinIcon = L.divIcon({
  className: 'ambar-leaflet-pin-wrap',
  html: `<div class="ambar-leaflet-pin" role="presentation"><span class="ambar-leaflet-pin-letter">Â</span></div>`,
  iconSize: [42, 48],
  iconAnchor: [21, 48],
  popupAnchor: [0, -44],
})

const poiDotIcon = L.divIcon({
  className: 'ambar-leaflet-poi-wrap',
  html: `<div class="ambar-leaflet-poi-dot" role="presentation"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -8],
})

function googleDirToPoi(destLat: number, destLng: number, travelMode: 'driving' | 'walking') {
  const [olat, olng] = PROPERTY
  return `https://www.google.com/maps/dir/?api=1&origin=${olat},${olng}&destination=${destLat},${destLng}&travelmode=${travelMode}`
}

/** Zoom com a roda só depois de clicar no mapa; ao sair com o rato desliga (evita “roubar” o scroll da página). */
function ScrollWheelZoomOnClick() {
  const map = useMap()
  useEffect(() => {
    const el = map.getContainer()
    map.scrollWheelZoom.disable()

    const enable = () => {
      map.scrollWheelZoom.enable()
    }
    const disable = () => {
      map.scrollWheelZoom.disable()
    }

    el.addEventListener('click', enable)
    el.addEventListener('mouseleave', disable)
    return () => {
      el.removeEventListener('click', enable)
      el.removeEventListener('mouseleave', disable)
      map.scrollWheelZoom.disable()
    }
  }, [map])
  return null
}

function MapCameraController({
  places,
  property,
  routePolyline,
}: {
  places: OsmPoi[]
  property: [number, number]
  routePolyline: [number, number][] | null
}) {
  const map = useMap()
  useEffect(() => {
    if (routePolyline && routePolyline.length >= 2) {
      const b = L.latLngBounds(routePolyline.map(([lat, lng]) => L.latLng(lat, lng)))
      map.flyToBounds(b, {
        padding: [48, 48],
        maxZoom: 16,
        duration: 0.95,
        easeLinearity: 0.28,
      })
      return
    }

    const pts: L.LatLngExpression[] = [L.latLng(property[0], property[1])]
    for (const p of places) {
      pts.push(L.latLng(p.lat, p.lng))
    }
    if (places.length === 0) {
      map.flyTo(property, 16, { duration: 0.75, easeLinearity: 0.35 })
      return
    }
    const b = L.latLngBounds(pts)
    map.flyToBounds(b, {
      padding: [52, 52],
      maxZoom: 17,
      duration: 0.9,
      easeLinearity: 0.28,
    })
  }, [map, places, property, routePolyline])
  return null
}

function InvalidateOnReady() {
  const map = useMap()
  useEffect(() => {
    const t = window.setTimeout(() => map.invalidateSize(), 80)
    return () => window.clearTimeout(t)
  }, [map])
  return null
}

/** Após desenhar rota (ex.: modal fechou), o Leaflet pode precisar de invalidateSize. */
function InvalidateWhenRouteChanges({
  routePolyline,
}: {
  routePolyline: [number, number][] | null
}) {
  const map = useMap()
  useEffect(() => {
    if (!routePolyline?.length) return
    const t = window.setTimeout(() => map.invalidateSize(), 150)
    return () => window.clearTimeout(t)
  }, [map, routePolyline])
  return null
}

type Props = {
  places: OsmPoi[]
  travelMode: 'driving' | 'walking'
  addressLines: string[]
  routePolyline: [number, number][] | null
  routeOrigin: { lat: number; lng: number } | null
  onClearRoute?: () => void
  /** Desenha rota OSRM no mapa a partir deste POI até o Âmbar (carro ou a pé conforme travelMode). */
  onRouteFromPoi?: (poi: OsmPoi) => void
  routeBusy?: boolean
}

export default function LocalizacaoMapLeaflet({
  places,
  travelMode,
  addressLines,
  routePolyline,
  routeOrigin,
  onClearRoute,
  onRouteFromPoi,
  routeBusy,
}: Props) {
  const propertyPopup = useMemo(
    () => (
      <div className="font-ui text-ambar-ink max-w-[220px]">
        <p className="font-bold text-sm text-ambar-navy mb-1">Âmbar</p>
        {addressLines.map((line, i) => (
          <span key={i} className="block text-xs leading-snug text-ambar-gray">
            {line}
          </span>
        ))}
        <a
          className="mt-3 inline-flex items-center justify-center rounded border border-ambar-terracotta bg-ambar-terracotta/90 px-2 py-1.5 text-xs font-semibold text-white hover:opacity-90"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua Palmeiras, 691, Água Verde, Curitiba, PR')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir no Google Maps
        </a>
      </div>
    ),
    [addressLines],
  )

  return (
    <div
      className="ambar-leaflet-theme relative h-full min-h-0 w-full overflow-hidden rounded-[14px] border border-[#002d4f]/18 bg-[#e7d1ac]/35 shadow-inner"
      title="Clique no mapa para poder ampliar ou reduzir com a roda do rato; sem clique, a roda faz scroll da página."
    >
      {routePolyline && routePolyline.length >= 2 && onClearRoute && (
        <button
          type="button"
          onClick={onClearRoute}
          className="absolute bottom-2 left-2 z-[500] rounded-md border border-[#002d4f]/35 bg-[#e7d1ac]/95 px-2.5 py-1.5 font-ui text-[11px] font-semibold text-[#002d4f] shadow-sm backdrop-blur-sm hover:bg-[#f2e6cf]"
        >
          Limpar rota
        </button>
      )}

      <MapContainer
        center={PROPERTY}
        zoom={16}
        className="absolute inset-0 z-0 h-full w-full rounded-[14px]"
        scrollWheelZoom={false}
        aria-label="Mapa interativo da localização do Âmbar"
      >
        <ScrollWheelZoomOnClick />
        <InvalidateOnReady />
        <TileLayer
          attribution={TILE_OSM.attribution}
          url={TILE_OSM.url}
          subdomains={TILE_OSM.subdomains}
          maxZoom={TILE_OSM.maxZoom}
        />
        <MapCameraController places={places} property={PROPERTY} routePolyline={routePolyline} />
        <InvalidateWhenRouteChanges routePolyline={routePolyline} />
        {routePolyline && routePolyline.length >= 2 && (
          <Polyline
            key={`route-${routePolyline.length}-${routePolyline[0]?.[0]}-${routePolyline[0]?.[1]}`}
            positions={routePolyline}
            pathOptions={{
              color: '#d8a18a',
              weight: 5,
              opacity: 0.92,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        )}
        {routeOrigin && (
          <CircleMarker
            center={[routeOrigin.lat, routeOrigin.lng]}
            radius={9}
            pathOptions={{
              color: '#e7d1ac',
              fillColor: '#c17b5d',
              fillOpacity: 1,
              weight: 2,
            }}
          >
            <Popup className="ambar-leaflet-popup">
              <span className="font-ui text-xs text-ambar-gray">Partida (rota OSRM)</span>
            </Popup>
          </CircleMarker>
        )}
        <Marker position={PROPERTY} icon={ambarPinIcon}>
          <Popup className="ambar-leaflet-popup">{propertyPopup}</Popup>
        </Marker>
        {places.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={poiDotIcon}>
            <Popup className="ambar-leaflet-popup">
              <div className="font-ui text-ambar-ink max-w-[220px]">
                <p className="font-bold text-sm text-ambar-navy mb-0.5">{p.nome}</p>
                <p className="text-xs text-ambar-gray mb-2">{p.tempo}</p>
                <div className="mt-1 flex flex-col gap-1.5">
                  <a
                    className="inline-flex justify-center rounded border border-ambar-rose px-2 py-1 text-xs font-semibold text-ambar-rose hover:bg-ambar-rose/10"
                    href={googleDirToPoi(p.lat, p.lng, travelMode)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver trajeto (Google)
                  </a>
                  {onRouteFromPoi && (
                    <button
                      type="button"
                      disabled={routeBusy}
                      onClick={() => onRouteFromPoi(p)}
                      className="inline-flex justify-center rounded border border-ambar-navy/40 bg-ambar-navy/10 px-2 py-1 text-xs font-semibold text-ambar-navy hover:bg-ambar-navy/15 disabled:opacity-50"
                    >
                      {routeBusy ? 'A calcular…' : 'Rota no mapa (OSRM)'}
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
