import { AdvancedMarker, APIProvider, InfoWindow, Map, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { AccordionCmp } from '../cmps/Accordion';

const API_KEY = 'AIzaSyB_MQYsX-7FXEM7yLEtDvplXENy5co7Vso'

// Branch coordinates
const BRANCH_LOCATIONS = {
    'Tel Aviv': { lat: 32.0853, lng: 34.7818 },
    'Jerusalem': { lat: 31.7683, lng: 35.2137 }
}

export function About() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [markerRef, marker] = useAdvancedMarkerRef()

    function handleMapClick(ev) {
        const { latLng } = ev.detail
        ev.map.panTo(latLng)
        setCoords(latLng)
    }

    function handleBranchSelect(branchName) {
        const branchCoords = BRANCH_LOCATIONS[branchName]
        if (branchCoords) {
            setCoords(branchCoords)
            setIsInfoOpen(false) // Close info window when switching branches
        }
    }
    return (
        <section className="google-map">
            <h1>Google Maps!</h1>
            <APIProvider apiKey={API_KEY}>
                <Map
                    center={coords}
                    defaultZoom={10}
                    mapId="DEMO_MAP_ID"
                    onClick={handleMapClick}
                >
                    <AdvancedMarker onClick={() => setIsInfoOpen(isOpen => !isOpen)} ref={markerRef} position={coords} >
                        <Pin
                            background={'#22ccff'}
                            borderColor={'#1e89a1'}
                            glyphColor={'#0f677a'}>

                        </Pin>
                        <img style={{ width: '5em' }} src="./logo.png" alt="" />
                    </AdvancedMarker>
                    {isInfoOpen &&
                        <InfoWindow className='red-class' anchor={marker} maxWidth={200}>
                            <div>
                                This is the content for another infowindow with <em>HTML</em>
                                -elements.
                            </div>
                            <pre>{JSON.stringify(coords, null, 4)}</pre>
                        </InfoWindow>

                    }
                </Map>
            </APIProvider>
            <AccordionCmp onBranchSelect={handleBranchSelect} />
        </section>
    )
}