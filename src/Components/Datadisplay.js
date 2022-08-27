import React, { useEffect, useState } from 'react';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { db } from '../Firebase';
import { ref, onValue } from "firebase/database";
import './Datadisplay.css';
export default function Datadisplay() {
    let [motorBoolean, setMotorBoolean] = useState(true);
    let [speedValue, setSpeedValue] = useState(20);
    let [calorieValue, setCalorie] = useState(0);
    const calorie = ref(db, 'realtimedata/li/');
    const speed = ref(db, 'speeddata/t/');
    useEffect(() => {
        onValue(calorie, (snapshot) => {
            const data = snapshot.val();
            setCalorie(data);
        });
    });
    useEffect(() => {
        onValue(speed, (snapshot) => {
            const data = snapshot.val();
            setSpeedValue(data);
        });
    });
    return (
        <>
            {/* <section className='data-display'> <div className="circular-progress-bar-box"> <img src={require('../Assets/thermometer-half.svg').default} alt="thermometer" /> <p>Temperature : 78K</p></div> <p><img src={require('../Assets/droplet-half.svg').default} alt="humidity" /> Humidity : 40%</p>
                <p><img src={require('../Assets/moisture.svg').default} alt="moisture" /> Moisture : 1024</p><p><img src={require('../Assets/toggle2-off.svg').default} alt="on/off" /> Motor : on</p>
            </section> */}
            <section className="data-display"><div className="condition-display" style={calorieValue >= 2800 && calorieValue <= 4000 && speedValue >= 23 && speedValue <= 35 ? { backgroundColor: `green` } : { backgroundColor: `red` }}>{calorieValue >= 2800 && calorieValue <= 4000 && speedValue >= 23 && speedValue <= 35 && speedValue >= 38 ? `Conditions are ideal` : `Conditions are not ideal`}</div><div className="motor-display-box"><p className="display-box-heading">System State</p>{motorBoolean === true && <button className='motor-button-on'>ON</button>} {motorBoolean === false && <button className='motor-button-off'>OFF</button>}<p className="display-box-sub-heading">Main Irrigation</p></div><div className="temperature-display-box"><p className="display-box-heading">Speed</p><SemiCircleProgressBar percentage={25} showPercentValue /></div>
               <div className="luminosity-display-box"><p className="display-box-sub-heading">Calorie Value</p><p className="luminosity-display">{calorieValue}mV</p></div></section>
        </>
    )
}
//<40-dark
//<800-dim
//<2000-light
// <3200-bright
//very bright
// 2800-4000(li),25-30(t),40%(h)
// let [humidityValue, setHumidityValue] = useState(0);
// const humidity = ref(db, 'humdata/h/');
// useEffect(() => {
    //     onValue(humidity, (snapshot) => {
        //         const data = snapshot.val();
        //         setHumidityValue(data);
        //     });
        // });