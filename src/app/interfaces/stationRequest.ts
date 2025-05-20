export interface StationRequest {
    id?: string;
    colorize?: boolean;
    reportTypes: (
        | "SYNOP"
        | "METAR"
        | "SPECI"
        | "METAR_SPECI"
        | "TAF"
        | "LONGTAF"
        | "RAFOR"
        | "TAF_LONGTAF"
        | "TAF_LONGTAF_RAFOR"
        | "SIGMET"
        | "SIGMET_VA"
        | "SIGMET_TC"
        | "SIGMET_ALL"
        | "AIRMET"
        | "GAMET"
        | "VAA"
        | "TCA"
        | "AIREP_SPECIAL"
        | "TROPICAL_CYCLONE_WARNING"
        | "AD_WRNG"
        | "WS_WRNG"
    )[];
    places?: string[];
    stations?: string[];
    firs?: string[];
    countries?: string[];
    timeMode?:
        | "current"
        | "valid"
        | "validity-or-issue-time"
        | "range-reception-time"
        | "range-validity-or-issue-time"
        | "range-reception-time-relevant-validity"
        | "range-validity-or-issue-time-relevant-validity"
        | "range-validity-intersects";
    timeReference?: string;
    timeRangeStart?: string;
    timeRangeEnd?: string;
    aggregationStyle?: string;
}