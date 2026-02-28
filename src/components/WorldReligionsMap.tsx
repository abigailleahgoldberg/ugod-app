'use client';
import { useState, useCallback } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Dominant tradition by ISO numeric country code (no duplicate keys)
const countryTradition: Record<string, string> = {
  // Buddhism
  '064': 'buddhism',
  '104': 'buddhism',
  '116': 'buddhism',
  '144': 'buddhism',
  '408': 'buddhism',
  '418': 'buddhism',
  '496': 'buddhism',
  '764': 'buddhism',
  // Christianity
  '008': 'christianity',
  '010': 'christianity',
  '024': 'christianity',
  '032': 'christianity',
  '036': 'christianity',
  '040': 'christianity',
  '051': 'christianity',
  '056': 'christianity',
  '068': 'christianity',
  '070': 'christianity',
  '076': 'christianity',
  '100': 'christianity',
  '108': 'christianity',
  '112': 'christianity',
  '120': 'christianity',
  '124': 'christianity',
  '140': 'christianity',
  '152': 'christianity',
  '170': 'christianity',
  '178': 'christianity',
  '180': 'christianity',
  '188': 'christianity',
  '191': 'christianity',
  '192': 'christianity',
  '203': 'christianity',
  '204': 'christianity',
  '208': 'christianity',
  '214': 'christianity',
  '218': 'christianity',
  '222': 'christianity',
  '231': 'christianity',
  '232': 'christianity',
  '242': 'christianity',
  '246': 'christianity',
  '250': 'christianity',
  '266': 'christianity',
  '268': 'christianity',
  '276': 'christianity',
  '300': 'christianity',
  '304': 'christianity',
  '320': 'christianity',
  '328': 'christianity',
  '332': 'christianity',
  '340': 'christianity',
  '348': 'christianity',
  '372': 'christianity',
  '380': 'christianity',
  '384': 'christianity',
  '388': 'christianity',
  '404': 'christianity',
  '410': 'christianity',
  '426': 'christianity',
  '430': 'christianity',
  '442': 'christianity',
  '454': 'christianity',
  '484': 'christianity',
  '498': 'christianity',
  '508': 'christianity',
  '516': 'christianity',
  '528': 'christianity',
  '548': 'christianity',
  '554': 'christianity',
  '558': 'christianity',
  '566': 'christianity',
  '578': 'christianity',
  '591': 'christianity',
  '598': 'christianity',
  '600': 'christianity',
  '604': 'christianity',
  '608': 'christianity',
  '616': 'christianity',
  '620': 'christianity',
  '624': 'christianity',
  '626': 'christianity',
  '630': 'christianity',
  '642': 'christianity',
  '643': 'christianity',
  '646': 'christianity',
  '688': 'christianity',
  '694': 'christianity',
  '703': 'christianity',
  '705': 'christianity',
  '710': 'christianity',
  '716': 'christianity',
  '724': 'christianity',
  '740': 'christianity',
  '748': 'christianity',
  '752': 'christianity',
  '756': 'christianity',
  '776': 'christianity',
  '800': 'christianity',
  '804': 'christianity',
  '807': 'christianity',
  '826': 'christianity',
  '840': 'christianity',
  '858': 'christianity',
  '862': 'christianity',
  '882': 'christianity',
  '887': 'christianity',
  // Hinduism
  '356': 'hinduism',
  '524': 'hinduism',
  // Indigenous
  '090': 'indigenous',
  // Islam
  '012': 'islam',
  '031': 'islam',
  '048': 'islam',
  '050': 'islam',
  '072': 'islam',
  '096': 'islam',
  '174': 'islam',
  '262': 'islam',
  '275': 'islam',
  '288': 'islam',
  '324': 'islam',
  '360': 'islam',
  '364': 'islam',
  '368': 'islam',
  '398': 'islam',
  '400': 'islam',
  '414': 'islam',
  '417': 'islam',
  '422': 'islam',
  '434': 'islam',
  '458': 'islam',
  '466': 'islam',
  '478': 'islam',
  '499': 'islam',
  '504': 'islam',
  '512': 'islam',
  '562': 'islam',
  '586': 'islam',
  '634': 'islam',
  '682': 'islam',
  '686': 'islam',
  '706': 'islam',
  '729': 'islam',
  '760': 'islam',
  '762': 'islam',
  '784': 'islam',
  '788': 'islam',
  '792': 'islam',
  '795': 'islam',
  '818': 'islam',
  '860': 'islam',
  // Judaism
  '376': 'judaism',
  // Shinto
  '392': 'shinto',
  // Taoism
  '156': 'taoism',
  '158': 'taoism',
  '446': 'taoism',
  '702': 'taoism',
};

const traditionColors: Record<string, string> = {
  christianity: '#4A90D9',
  islam:        '#2ECC71',
  hinduism:     '#F39C12',
  buddhism:     '#E74C3C',
  judaism:      '#c9a84c',
  sikhism:      '#9B59B6',
  taoism:       '#1ABC9C',
  shinto:       '#E91E63',
  indigenous:   '#795548',
  african:      '#FF5722',
  default:      '#1e1e3a',
};

const traditionNames: Record<string, string> = {
  christianity: 'Christianity',
  islam: 'Islam',
  hinduism: 'Hinduism',
  buddhism: 'Buddhism',
  judaism: 'Judaism',
  sikhism: 'Sikhism',
  taoism: 'Taoism / Confucianism',
  shinto: 'Shinto',
  indigenous: 'Indigenous',
};

const legend = [
  { key: 'christianity', label: 'Christianity' },
  { key: 'islam', label: 'Islam' },
  { key: 'hinduism', label: 'Hinduism' },
  { key: 'buddhism', label: 'Buddhism' },
  { key: 'judaism', label: 'Judaism' },
  { key: 'taoism', label: 'Taoism' },
  { key: 'shinto', label: 'Shinto' },
  { key: 'indigenous', label: 'Indigenous' },
];

interface TooltipState { name: string; tradition: string; x: number; y: number; }
interface Props { compact?: boolean; }

export default function WorldReligionsMap({ compact = false }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMouseEnter = useCallback((geo: any, evt: React.MouseEvent) => {
    const id = String(geo.id).padStart(3, '0');
    const tradition = countryTradition[id] || 'default';
    setTooltip({ name: geo.properties.name, tradition, x: evt.clientX, y: evt.clientY });
  }, []);

  const handleMouseMove = useCallback((evt: React.MouseEvent) => {
    setTooltip(prev => prev ? { ...prev, x: evt.clientX, y: evt.clientY } : null);
  }, []);

  return (
    <div className="relative w-full h-full" onMouseMove={handleMouseMove} onMouseLeave={() => setTooltip(null)}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{
          scale: compact ? 165 : 155,
          center: [10, 5],
          rotate: [0, 0, 0],
        }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        {/* No ZoomableGroup — fixed view, hover/click only */}
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                const id = String(geo.id).padStart(3, '0');
                const tradition = countryTradition[id];
                const color = tradition ? traditionColors[tradition] : traditionColors.default;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={color}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={0.5}
                    style={{
                      default: { fill: color, outline: 'none', opacity: 0.85 },
                      hover: { fill: color, outline: 'none', opacity: 1, filter: 'brightness(1.35)' },
                      pressed: { fill: color, outline: 'none' },
                    }}
                    onMouseEnter={(evt: React.MouseEvent) => handleMouseEnter(geo, evt)}
                    onClick={() => { if (tradition) window.location.href = `/library/${tradition}`; }}
                  />
                );
              })
            }
          </Geographies>

      </ComposableMap>

      {tooltip && tooltip.tradition !== 'default' && (
        <div className="fixed z-50 pointer-events-none" style={{ left: tooltip.x + 14, top: tooltip.y - 44 }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-xl text-white text-xs font-medium whitespace-nowrap"
            style={{ background: traditionColors[tooltip.tradition] || '#1a1a3e', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span>{tooltip.name}</span>
            <span className="opacity-50">·</span>
            <span className="opacity-80">{traditionNames[tooltip.tradition] || tooltip.tradition}</span>
          </div>
        </div>
      )}

      {!compact && (
        <div className="absolute bottom-3 left-0 right-0 flex flex-wrap gap-1.5 justify-center px-3">
          {legend.map(item => (
            <a key={item.key} href={`/library/${item.key}`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold hover:scale-105 transition-transform"
              style={{ background: traditionColors[item.key] + 'cc' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
