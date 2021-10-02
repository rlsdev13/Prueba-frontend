import { fetchCrypto } from "./fetch";

const getData = async ( crypto = '') => {

    const resp = await fetchCrypto(`https://data.messari.io/api/v1/assets/${crypto}/metrics`);
    const body = await resp.json();
    const { id, name, symbol } = body.data;
    const { 
        price_usd, 
        percent_change_usd_last_1_hour:ch_usd_1hr, 
        percent_change_usd_last_24_hours:ch_usd_24hr,
        real_volume_last_24_hours: real_vol_24h,
    } = body.data.market_data;

    const { 
        current_marketcap_usd:rep_mark, 
    } = body.data.marketcap;

    const {
        percent_change_last_1_week : ch_usd_7d,
        percent_change_last_1_month : ch_usd_30d,
        percent_change_year_to_date : ch_usd_ytd,
    } = body.data.roi_data;

    const data = {
        id,
        name,
        symbol,
        price_usd : Number(price_usd).toFixed(2),
        ch_usd_1hr : Number(ch_usd_1hr).toFixed(2),
        ch_usd_24hr : Number(ch_usd_24hr).toFixed(2),
        real_vol_24h : abbrNum(Number(real_vol_24h)),
        rep_mark : abbrNum(Number(rep_mark)),
        ch_usd_7d : Number(ch_usd_7d).toFixed(2),
        ch_usd_30d : Number(ch_usd_30d).toFixed(2),
        ch_usd_ytd : Number(ch_usd_ytd).toFixed(2),
    };

    return data;
    // console.log(data);
}

function abbrNum(number, decPlaces = 2) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }
    return number;
}

export {
    abbrNum,
    getData
}
