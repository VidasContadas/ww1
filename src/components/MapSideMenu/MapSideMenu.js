import React from 'react'
import Autocomplete from 'react-autocomplete'
import { pure } from 'recompose'
import MapMenuItem from '../MapMenuItem'
import YearsRange  from '../YearsRange'
import './MapSideMenu.css'
import {
  getPlaceTypeIcon,
} from '../../utils'

const MapSideMenu = ({
  dataPlaceTypes,
  selectedPlaceTypes,
  toggleOpen,
  onTogglePlaceTypeSelection,
  onResetSelectedPlaceTypes,
  uncertainYearsCount,
  includeUncertainYears,
  onIncludeUncertainYearsChange,
  yearsCounts,
  yearsFilteredCounts,
  selectedYears,
  onYearsSelectionChange,
  onResetSelectedYears,
  searchString,
  onSearchChange,
  autocompleteResults,
  onAutocompleteSelect,
}) => (
  <div className="CollectionFilters__container">
    <div className="CollectionFilters__filtermobile_title d-flex align-items-center hidden-lg-up">
      <h2>Filters</h2>
      <button type="button" className="CollectionFilters__filtermobile_title__check btn btn-secondary" onClick={toggleOpen}>
        <i className="material-icons">check</i>
      </button>
    </div>
    <div className="d-flex align-items-center CollectionFilters__input_container">
      <i className="material-icons CollectionFilters__input_container_icon hidden-md-down">search</i>
      {/* <input className="form-control CollectionFilters__input" onChange={onSearchChange} value={searchString} placeholder="Search here (e.g: postcard)" /> */}
      <form onSubmit={(e) => {
        e.preventDefault()
        onAutocompleteSelect(searchString)
      }}>
      <Autocomplete
        inputProps={{
          className:'form-control CollectionFilters__input',
          placeholder:'Search here (e.g: bombing)'
        }}
        wrapperStyle={{display:'flex', position:'relative'}}
        value={searchString}
        onChange={(event, value) => onSearchChange(value)}
        onSelect={onAutocompleteSelect}
        items={autocompleteResults}
        getItemValue={item => item}
        renderItem={(item, isHighlighted) => (
          <div className={isHighlighted ? 'CollectionFilters__autocompleteItem active' : 'CollectionFilters__autocompleteItem'}>
            {item}
          </div>
        )}
      />
      </form>
      <i className="material-icons CollectionFilters__autocomplete_reset" onClick={() => onAutocompleteSelect('')}>close</i>
    </div>
    <div className="CollectionFilters__reset_container d-flex align-items-center">
      <h5 className="CollectionFilters__reset_title">TYPE</h5>
      <a className="CollectionFilters__reset" onClick={onResetSelectedPlaceTypes}>Reset</a>
    </div>
    <div className="CollectionFilters__filter_container d-flex flex-column">
      {dataPlaceTypes && dataPlaceTypes.map(data => {
        const placeType = data.data__place_type
        // Is current place type selected as a filter?
        const selected = typeof selectedPlaceTypes[placeType] !== 'undefined' ||
                         Object.keys(selectedPlaceTypes).length === 0
        return (
          <MapMenuItem
            selected={selected}
            key={placeType}
            label={placeType}
            count={data.count}
            onClick={() => onTogglePlaceTypeSelection(placeType)}
            icon={getPlaceTypeIcon(placeType)}
          />
        )
      })}
    </div>
    <div className="CollectionFilters__reset_container d-flex align-items-center">
      <h5 className="CollectionFilters__reset_title">PERIOD</h5>
      <a className="CollectionFilters__reset" onClick={onResetSelectedYears}>Reset</a>
    </div>
    <div className="MapSideMenu__chartsContainer">
      <YearsRange
        uncertainYearsCount={uncertainYearsCount}
        uncertainYears={includeUncertainYears}
        onUncertainYearsChange={onIncludeUncertainYearsChange}
        min={1914}
        max={1920}
        onChange={onYearsSelectionChange}
        value={selectedYears}
        counts={yearsCounts}
        filteredCounts={yearsFilteredCounts}
      />
    </div>
  </div>
)

export default pure(MapSideMenu)
