import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, ArrowUpRight } from 'lucide-react'

type Coords = { lat: number; lng: number }

/**
 * A calm, interactive dark map that melts into the near-black page. CARTO dark
 * tiles, deepened and feathered so there is no hard frame, with one quiet
 * terracotta marker on the studio. You can drag and scroll-zoom it. A single
 * lower-left chip links out to Google Maps for directions. Vanilla Leaflet (no
 * react-leaflet) so it stays version-safe on any React.
 */
export function LocationMap({
  coords,
  zoom = 15,
  mapsUrl,
  line1,
  line2,
  routeLabel,
  title,
  className,
}: {
  coords: Coords
  zoom?: number
  mapsUrl: string
  line1: string
  line2: string
  routeLabel: string
  title?: string
  className?: string
}) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elRef.current) return
    const map = L.map(elRef.current, {
      center: [coords.lat, coords.lng],
      zoom,
      zoomControl: false,
      scrollWheelZoom: true,
      attributionControl: true,
    })
    if (title) map.getContainer().setAttribute('aria-label', title)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map)

    const icon = L.divIcon({
      className: 'nv-map-marker',
      html:
        '<span style="position:relative;display:block;">' +
        '<span style="position:absolute;left:50%;top:50%;width:40px;height:40px;transform:translate(-50%,-50%);border-radius:9999px;background:rgba(208,122,84,0.18);filter:blur(9px);"></span>' +
        '<span style="position:absolute;left:50%;top:50%;width:14px;height:14px;transform:translate(-50%,-50%);border-radius:9999px;background:#d07a54;box-shadow:0 0 0 3px rgba(6,6,6,0.92),0 0 12px 2px rgba(208,122,84,0.55);"></span>' +
        '</span>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    })
    L.marker([coords.lat, coords.lng], { icon, keyboard: false }).addTo(map)

    // On touch devices one-finger dragging would trap the page scroll (a swipe
    // that lands on the map pans it instead of scrolling past). Disable drag
    // there so the page always scrolls; the map stays a calm still image and the
    // chip still opens Google Maps for directions. Pinch-zoom keeps working.
    if (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches) {
      map.dragging.disable()
    }

    return () => {
      map.remove()
    }
  }, [coords.lat, coords.lng, zoom, title])

  return (
    <div className={`nv-location-map relative overflow-hidden rounded-[28px] bg-bg ${className ?? ''}`}>
      {/* Deepen the tiles and quiet leaflet's own chrome so the map reads near-black */}
      <style>{`
        .nv-location-map .leaflet-container { background: #060606; font-family: inherit; }
        .nv-location-map .leaflet-tile-pane { filter: brightness(0.72) contrast(1.04) saturate(0.8); }
        .nv-location-map .leaflet-control-attribution {
          background: rgba(6,6,6,0.5) !important;
          color: rgba(255,255,255,0.26) !important;
          font-size: 9px;
          padding: 1px 6px;
          backdrop-filter: blur(2px);
        }
        .nv-location-map .leaflet-control-attribution a { color: rgba(255,255,255,0.4) !important; }
      `}</style>

      <div ref={elRef} className="absolute inset-0 z-0 h-full w-full" />

      {/* Heavy edge feather so the map sinks into the near-black page, no hard frame */}
      <div className="pointer-events-none absolute inset-0 z-[400] shadow-[inset_0_0_120px_58px_#060606]" />

      {/* Lower-left chip: the one control, out to Google Maps for the route */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute inset-x-4 bottom-4 z-[401] flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-bg/80 px-4 py-3.5 backdrop-blur-md transition-colors hover:border-white/15 hover:bg-bg/90 sm:inset-x-auto sm:left-5 sm:max-w-md"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-terracotta">
          <MapPin className="h-[19px] w-[19px]" strokeWidth={1.7} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[14px] text-ink">{line1}</span>
          <span className="truncate text-[12.5px] text-faint">{line2}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] text-faint transition-colors group-hover:text-ink">
          <span className="hidden sm:inline">{routeLabel} </span>
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
        </span>
      </a>
    </div>
  )
}
