import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Table from "./Table";
import Linegraph from "./Linegraph";
import { sortData, prettyPrintStat } from "../utils/util";
import numeral from "numeral";
import './Home.css';

function Home() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };


  return (
    <div className="home">
      <div className="home__left">
        {/* Header */}
        {/* Title + Dropdown */}
        <div className="home__header">
          <h1>Live Data</h1>
          <FormControl className="home__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.name}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Infoboxes */}
        <div className="home__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            active={casesType === "cases"}
            today={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Cured"
            active={casesType === "recovered"}
            today={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            active={casesType === "deaths"}
            today={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        {/* Graph */}
        <div className="home__graph">
          <h3 className="home__graph--title">Worldwide daily {casesType} as on {new Date(countryInfo.updated).toDateString()}</h3>
          <Linegraph height={250} casesType={casesType}/>
        </div>
      </div>
      <div className="home__right">
        {/* Table */}
        <Card>
          <CardContent>
            <div className="home__information">
              <h3>Active Cases by Country</h3>
              <Table countries={tableData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
