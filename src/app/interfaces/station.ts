export interface StationReport {
    refs?: string[];
    queryType: string;
    reportType: string;
    stationId: string;
    revision?: 'COR' | 'AMD';
    placeId?: string;
    text: string;
    textHTML?: string;
    receptionTime?: string;
    reportTime: string;
    validFrom?: string;
    validEnd?: string;
}