import React, { useState } from 'react';
import { INDIA_TERRITORIES, StateTerritory, ZONES } from '@/data/indiaTerritories';
import { MapPin, CheckCircle2, ShieldAlert, Sparkles, Search, Layers, Globe } from 'lucide-react';

interface IndiaTerritoryMapProps {
  selectedStates: string[];
  isPanIndia: boolean;
  onSelectionChange: (selectedStates: string[], isPanIndia: boolean) => void;
  allowMultiSelect?: boolean;
  maxSelections?: number;
  readOnly?: boolean;
  territoryType?: 'proposed' | 'approved' | 'franchise';
}

export const IndiaTerritoryMap: React.FC<IndiaTerritoryMapProps> = ({
  selectedStates,
  isPanIndia,
  onSelectionChange,
  allowMultiSelect = true,
  maxSelections = 36,
  readOnly = false,
  territoryType = 'proposed'
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredTerritory, setHoveredTerritory] = useState<StateTerritory | null>(null);

  const filteredTerritories = INDIA_TERRITORIES.filter(t => {
    const matchesZone = selectedZone === 'All' || t.zone === selectedZone;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.majorHubs.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesZone && matchesSearch;
  });

  const handleToggleState = (stateName: string) => {
    if (readOnly) return;

    if (isPanIndia) {
      // If was pan-india and user clicks a state, switch to individual selection
      onSelectionChange([stateName], false);
      return;
    }

    if (selectedStates.includes(stateName)) {
      onSelectionChange(selectedStates.filter(s => s !== stateName), false);
    } else {
      if (!allowMultiSelect) {
        onSelectionChange([stateName], false);
      } else {
        if (selectedStates.length >= maxSelections) {
          alert(`You can select a maximum of ${maxSelections} territories under this pathway.`);
          return;
        }
        onSelectionChange([...selectedStates, stateName], false);
      }
    }
  };

  const handleSelectPanIndia = () => {
    if (readOnly) return;
    if (isPanIndia) {
      onSelectionChange([], false);
    } else {
      onSelectionChange(INDIA_TERRITORIES.map(t => t.name), true);
    }
  };

  const handleSelectZone = (zone: string) => {
    if (readOnly || zone === 'All') return;
    const zoneStates = INDIA_TERRITORIES.filter(t => t.zone === zone).map(t => t.name);
    // Combine existing with zone states
    const combined = Array.from(new Set([...selectedStates, ...zoneStates]));
    onSelectionChange(combined, false);
  };

  const clearSelection = () => {
    if (readOnly) return;
    onSelectionChange([], false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
      {/* Top Banner / Controls */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Globe className="w-4 h-4" />
              <span>National Healthcare Network Allocation</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              Interactive India Territory Selector
              <span className={`text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider ${
                territoryType === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                territoryType === 'franchise' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              }`}>
                {territoryType === 'approved' ? 'Approved Territory' : territoryType === 'franchise' ? 'Franchise Site Zone' : 'Proposed Territory'}
              </span>
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl font-light">
              Click individual states, whole geographic zones, or toggle Pan-India authorization. 
              The system registers your exact operational footprint.
            </p>
          </div>

          {!readOnly && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSelectPanIndia}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all duration-300 ${
                  isPanIndia 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-300'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Pan-India Coverage ({INDIA_TERRITORIES.length} States/UTs)</span>
              </button>
              {(selectedStates.length > 0 || isPanIndia) && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          )}
        </div>

        {/* Selected Summary Pill Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Scope:</span>
            {isPanIndia ? (
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full font-semibold">
                ★ All-India National Footprint Selected
              </span>
            ) : selectedStates.length > 0 ? (
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 px-3 py-1 rounded-full font-medium">
                {selectedStates.length} State{selectedStates.length > 1 ? 's' : ''} / UTs Selected
              </span>
            ) : (
              <span className="text-amber-400 font-medium bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                No territory chosen yet — please select below
              </span>
            )}
          </div>
          <div className="text-slate-400">
            States: 28 | Union Territories: 8 | Zonal Divisions: 6
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Zone Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <Layers className="w-4 h-4 text-slate-500 mr-1 flex-shrink-0" />
          {ZONES.map(zone => (
            <button
              key={zone}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedZone === zone
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {zone}
            </button>
          ))}
          {selectedZone !== 'All' && !readOnly && (
            <button
              type="button"
              onClick={() => handleSelectZone(selectedZone)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 underline decoration-dotted"
            >
              + Select All {selectedZone}
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state, code, hub..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Territory Interactive Grid / Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredTerritories.map((t) => {
            const isSelected = isPanIndia || selectedStates.includes(t.name);
            return (
              <div
                key={t.id}
                onClick={() => handleToggleState(t.name)}
                onMouseEnter={() => setHoveredTerritory(t)}
                onMouseLeave={() => setHoveredTerritory(null)}
                className={`relative group rounded-2xl p-4 transition-all duration-200 border text-left cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50/80 border-blue-400 ring-2 ring-blue-500/20 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                } ${readOnly ? 'cursor-default' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center font-bold text-xs text-slate-700 group-hover:text-blue-700 transition-colors">
                      {t.code}
                    </span>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-700 transition-colors flex items-center gap-1.5">
                        {t.name}
                        {t.isUnionTerritory && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-normal">
                            UT
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-light">
                        {t.zone} Zone • Tier {t.tier}
                      </p>
                    </div>
                  </div>

                  <div className="mt-1">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-400 transition-colors" />
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[170px]" title={t.majorHubs.join(', ')}>
                    Hubs: {t.majorHubs.slice(0, 2).join(', ')}
                  </span>
                  <span className="font-medium text-slate-600">Pop: {t.approxPopulation}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTerritories.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No states or territories match your search query "{searchQuery}".
          </div>
        )}
      </div>

      {/* Selected Territory Tags Display */}
      {selectedStates.length > 0 && !isPanIndia && (
        <div className="p-6 bg-slate-50/70 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Selected Proposed Territories ({selectedStates.length}):
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(selectedStates)).map((st, idx) => (
              <span
                key={`${st}-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium border border-blue-200"
              >
                {st}
                {!readOnly && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleState(st);
                    }}
                    className="hover:text-red-600 text-blue-500 font-bold ml-0.5"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Strict Legal Disclaimer Callout as per Dharani's directive */}
      <div className="p-4 sm:p-5 bg-amber-50 border-t border-amber-200 flex items-start gap-3 text-amber-900 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">
            MANDATORY CURAQUANTIS™ TERRITORIAL GOVERNANCE NOTICE:
          </p>
          <p className="leading-relaxed text-amber-900/90 font-light">
            Selecting or nominating a territory during the application phase represents a <strong>Proposed Territory only</strong> and does <strong>NOT</strong> automatically grant territorial exclusivity, operational franchise rights, or agency rights. 
            CuraQuantis™ strictly reserves the right to evaluate market viability, conduct demographic scrutiny, and allocate territories subject to formal agreement execution.
          </p>
        </div>
      </div>
    </div>
  );
};
