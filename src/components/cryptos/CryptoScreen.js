import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from "react-csv";

import { cryptoStartLoading } from '../../actions/crypto';
import { Navbar } from '../ui/Navbar';

export const CryptoScreen = () => {
    
    const dispatch = useDispatch();

    const cryptos = ['bitcoin','ethereum','cardano'];

    useEffect(() => {
        dispatch( cryptoStartLoading(cryptos));
    }, [dispatch])
   


    const { cryptosData } = useSelector(state => state.cryptos);

    const headers = [
        { label : "Id", key : "id"},
        { label : "Name", key : "name"},
        { label : "Symbol", key : "symbol"},
        { label : "Price_usd", key : "price_usd"},
        { label : "Ch_usd_1hr", key : "ch_usd_1hr"},
        { label : "Ch_usd_24hr", key : "ch_usd_24hr"},
        { label : "Rep_mark", key : "rep_mark"},
        { label : "Real_vol_24h", key : "real_vol_24h"},
        { label : "Ch_usd_7d", key : "ch_usd_7d"},
        { label : "Ch_usd_30d", key : "ch_usd_30d"},
        { label : "Ch_usd_ytd", key : "ch_usd_ytd"},
    ]
    const csvReport = {
        data : cryptosData,
        headers : headers,
        filename : "Cryptos.csv"
    }

    const jsonReport = {
        data : JSON.stringify( cryptosData ),
        filename : "Cryptos.json"
    }
    // const data = [
    // {
    //     id : "1e31218a-e44e-4285-820c-8282ee222035",
    //     name : "Bitcoin",
    //     symbol : "BTC",
    //     price_usd : "$46,000.53",
    //     ch_usd_1hr : "-0.22%",
    //     ch_usd_24hr : "-0.22%",
    //     img_day : "https://data.messari.io/api/v1/assets/${id}/metrics/market-data/history/sl.png?width=140&height=30",
    //     rep_mark: "$880B",
    //     real_vol_24h : "$5.23B",
    //     ch_usd_7d : "-0.35%",
    //     ch_usd_30d : "-0.62%",
    //     ch_usd_ytd : "+58.92%"

    // }];

    return (
        <>
            <Navbar/>
            <br /><br />
            <div className="container">
                <table className="table  table-dark table-hover mt-8">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Asset</th>
                            <th scope="col">Price (USD)</th>
                            <th scope="col">Change vs USD(1H)</th>
                            <th scope="col">Change vs USD(24H)</th>
                            <th scope="col">7 Day trend</th>
                            <th scope="col">Reported marketcap</th>
                            <th scope="col">Real volume (24h)</th>
                            <th scope="col">Percent change (7d)</th>
                            <th scope="col">Percent change (30d)</th>
                            <th scope="col">Percent change (YTD)</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cryptosData.map( (crypto, index) => {
                                return (
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td><img src={`https://messari.io/asset-images/${crypto.id}/16.png?v=2`} alt="img" /> {crypto.name+"-"+crypto.symbol}</td>
                                        <td>${crypto.price_usd}</td>
                                        <td>{crypto.ch_usd_1hr}%</td>
                                        <td>{crypto.ch_usd_24hr}%</td>
                                        <td><img src={`https://data.messari.io/api/v1/assets/${crypto.id}/metrics/market-data/history/sl.png?width=140&height=30`} alt="" /></td>
                                        <td>${crypto.rep_mark}</td>
                                        <td>${crypto.real_vol_24h}</td>
                                        <td>{crypto.ch_usd_7d}</td>
                                        <td>{crypto.ch_usd_30d}</td>
                                        <td>{crypto.ch_usd_ytd}</td>
                                    </tr>            
                                )
                            })
                        }    
                    </tbody>
                </table>
                <div className="container mt-2">
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <CSVLink className="btn btn-success" {...csvReport}>Export to CSV</CSVLink>
                        </div>
                        <div className="col-2">
                            <CSVLink className="btn btn-success " {...jsonReport}>Export to JSON</CSVLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
