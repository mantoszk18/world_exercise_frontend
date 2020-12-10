import './Continents.css';
import {Route, useParams, useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import appConfig from "../config.json";
import {renderElements, fetchData} from "../utilities";
import {Countries} from "./Country";


const Continent = () => {
    const { continentName } = useParams();
    const { url, path } = useRouteMatch();
    const [ regions, setRegions ] = useState([]);
    const api_url = new URL(`continent/${continentName}/regions`, appConfig.API_SERVER_URL);

    useEffect(() => {
        fetchData(api_url, setRegions);
    },[api_url])

    const getRegionCountries = (chosen_region) => {
        fetchData(api_url, setRegions);
        if (regions) {
            return regions.find(region => region.region === chosen_region);
        }
        return [];
    };

    return (
        <div className="Continent-contents">
            <h2 className="text-center"> Choose one of {continentName}'s regions:</h2>
            { renderElements(regions, url, 'region') }

            <Route path={`${path}/:regionName`}>
                <Countries getCountries = {getRegionCountries}/>
            </Route>
        </div>
    );
};


const Continents = () => {
    const [continents, setContinents] = useState([])
    const { url, path } = useRouteMatch();
    const api_url = new URL('continent', appConfig.API_SERVER_URL);

    useEffect(() => {
        fetchData(api_url, setContinents)
    }, [api_url])

    return (
        <div className="Continents-contents">
            <h1 className="text-center">Choose a continent to view its contents:</h1>
            { renderElements(continents, url, 'continent') }

            <Route path={`${path}/:continentName`}>
                <Continent />
            </Route>
        </div>
    );
};

export default Continents;