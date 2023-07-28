// Interface for the Poi (Point of interest)
interface Poi { name: string, lat: number, lon: number}

// Interface for the event
interface Event { lat: string, lon: string, event_type: string }

// Interface for the completed poi to be returned
interface CompletedPoi extends Poi {
    clicks: number,
    impressions: number
}

export {
    Poi,
    Event,
    CompletedPoi
}
