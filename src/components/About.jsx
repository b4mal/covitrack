import React from 'react';
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about__header">
        <h1>About This App</h1>
      </div>
      <div className="about__content">
        <p>This is a personal project for educational purpose. This is made with ReactJS and coded by <strong>B4mal Goswami</strong>.
        <br/>All data fetched from <strong><a href="https://corona.lmao.ninja/" rel="noreferrer" target="_blank">disease.sh</a></strong>.</p>
        <p>Data displayed here should not be used and/or referenced for any professional use.</p>
        <p>Noteable features used here: react-router, react-hooks, material ui, numeral, react-chartjs-2</p>
      </div>
    </div>
  )
}

export default About
