import './Country.css'
import {Link, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import appConfig from "../config.json";
import {fetchData, renderElements} from "../utilities";


export const Countries = ({getCountries}) => {
    const { regionName } = useParams();
    const [ countries, setCountries ] = useState([])

    useEffect(() => {
        let countries = getCountries(regionName);
        if (countries) setCountries(countries.countries);
    }, [ regionName ])

    return (
        <div className="Countries-contents">
            <h3 className="text-center"> Now pick one of {regionName}'s countries to review:</h3>
            { renderElements(countries, '/country','name', 'code') }
        </div>
    );
}

export const Country = () => {
    const { countryCode } = useParams();
    const [ country, setCountry ] = useState({});
    const api_url = new URL(`country/${countryCode}`, appConfig.API_SERVER_URL);

    useEffect( () => {
        fetchData(api_url, setCountry)
    },[  ])

    return (
        <div className="Country-contents">
            <h3> Here be {countryCode} details </h3>
            <div className="Country-contents">
                <table>
                    { Object.entries(country).map( (attribute, i) => (
                        <CountryDetail detail={attribute} />
                    ))}
                </table>
            </div>
        </div>
    )
}

const CountryDetail = (detail) => {
    let [detail_name, detail_value] = detail.detail;
    return (
        <Fragment>
            <tr>
            <td>{detail_name}</td>
            <td>{detail_value}</td>
            </tr>
        </Fragment>
    )
}