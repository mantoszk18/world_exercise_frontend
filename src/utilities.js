import {Link} from "react-router-dom";
import React from "react";


export const renderElements = (elements, url, element_display_attr, element_url_attr) => {
    let [last] = elements.slice(-1);
    // if not explicitly given, we use displayed attribute value in url
    if (!element_url_attr) element_url_attr = element_display_attr;
    // sorting for a nicer display effect
    elements.sort((a,b) => a[element_display_attr].localeCompare(b[element_display_attr]));

    return elements.map((element) => (
        <span key={element[element_display_attr]}>
        <Link to={`${url}/${element[element_url_attr]}`}>{element[element_display_attr]}</Link>
            {element === last ? "" : " - "}
        </span>
    ))
};

export const fetchData = async (api_url, setData) => {
    const response = await fetch(api_url);

    let data = await response.json()
    if (response.ok) {
        let data_to_store = data.results ? data.resulst : data;
        setData(data_to_store)
    }
};