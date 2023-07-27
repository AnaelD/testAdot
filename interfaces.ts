interface Poi { name: string, lat: number, lon: number}
interface Event {
    lat: string;
    lon: string;
    event_type: string;
}

interface CompletedPoi extends Poi {
    clicks: number,
    impressions: number
}

export {
    Poi,
    Event,
    CompletedPoi
}
