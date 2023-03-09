// import React, { useEffect, useState } from 'react';
// import SemiCircleProgressBar from "react-progressbar-semicircle";
// import { db } from '../Firebase';
// import { ref, onValue,getDatabase,push } from "firebase/database";
// import './Datadisplay.css';
// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyBGr_XkeraLXvvpyTzZ2KDLG5Sn8fXNs54",
//     authDomain: "irrygatedb.firebaseapp.com",
//     databaseURL: "https://irrygatedb-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "irrygatedb",
//     storageBucket: "irrygatedb.appspot.com",
//     messagingSenderId: "238168381536",
//     appId: "1:238168381536:web:92b625e7fa369582f78b05",
//     measurementId: "G-D0F74NFMH0"
//   };

//   const app = initializeApp(firebaseConfig);
//   const database = getDatabase(app);

// export default function Datadisplay() {
//     const newChildRef = push(ref(database, 'data/'));
//     const newChildKey = newChildRef.key;
//     // const substringNewChildKey=newChildKey.substring(newChildKey.lastIndexOf('/') + 1);
//     // console.log(substringNewChildKey,typeof(substringNewChildKey));
//     console.log(newChildKey,typeof(newChildKey));
//     let [motorBoolean, setMotorBoolean] = useState(true);
//     let [tempValue, setTempValue] = useState(28);
//     let [luminosityValue, setLuminosityValue] = useState(0);
//     let [humidityValue, setHumidityValue] = useState(40);
//     const temperature = ref(db, `data/${newChildKey}/temperature/`);
//     const luminosity = ref(db, `data/${newChildKey}/lux/`);
//     const humidity = ref(db, `data/${newChildKey}/humidity/`);
//     useEffect(() => {
//         onValue(temperature, (snapshot) => {
//             const data = snapshot.val();
//             setTempValue(data);
//         });
//     });
//     useEffect(() => {
//         onValue(luminosity, (snapshot) => {
//             const data = snapshot.val();
//             setLuminosityValue(data);
//         });
//     });
//     useEffect(() => {
//         onValue(humidity, (snapshot) => {
//             const data = snapshot.val();
//             setHumidityValue(data);
//         });
//     });
import React, { useEffect, useState } from 'react';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { ref, onValue, getDatabase, query, orderByKey, limitToLast } from "firebase/database";
import './Datadisplay.css';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBGr_XkeraLXvvpyTzZ2KDLG5Sn8fXNs54",
  authDomain: "irrygatedb.firebaseapp.com",
  databaseURL: "https://irrygatedb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "irrygatedb",
  storageBucket: "irrygatedb.appspot.com",
  messagingSenderId: "238168381536",
  appId: "1:238168381536:web:92b625e7fa369582f78b05",
  measurementId: "G-D0F74NFMH0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Datadisplay() {
  let [tempValue, setTempValue] = useState(28);
  let [luminosityValue, setLuminosityValue] = useState(0);
  let [humidityValue, setHumidityValue] = useState(40);
  const [isUpdatedRecently, setIsUpdatedRecently] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpdatedRecently(false);
    }, 25000);

    return () => clearTimeout(timeout);
  }, [tempValue]);
  useEffect(() => {
    const dataRef = ref(database, 'data');
    const latestDataQuery = query(dataRef, orderByKey(), limitToLast(1));
    onValue(latestDataQuery, (snapshot) => {
      const latestData = snapshot.val();
      const latestDataKey = Object.keys(latestData)[0];
      const temperatureRef = ref(database, `data/${latestDataKey}/temperature/`);
      const luminosityRef = ref(database, `data/${latestDataKey}/lux/`);
      const humidityRef = ref(database, `data/${latestDataKey}/humidity/`);

      onValue(temperatureRef, (temperatureSnapshot) => {
        const temperatureData = temperatureSnapshot.val();
        setTempValue(temperatureData);
      });

      onValue(luminosityRef, (luminositySnapshot) => {
        const luminosityData = luminositySnapshot.val();
        setLuminosityValue(luminosityData);
      });

      onValue(humidityRef, (humiditySnapshot) => {
        const humidityData = humiditySnapshot.val();
        setHumidityValue(humidityData);
      });
    });
  }, []);
  return (
    <>
      {/* <section className='data-display'> <div className="circular-progress-bar-box"> <img src={require('../Assets/thermometer-half.svg').default} alt="thermometer" /> <p>Temperature : 78K</p></div> <p><img src={require('../Assets/droplet-half.svg').default} alt="humidity" /> Humidity : 40%</p>
                <p><img src={require('../Assets/moisture.svg').default} alt="moisture" /> Moisture : 1024</p><p><img src={require('../Assets/toggle2-off.svg').default} alt="on/off" /> Motor : on</p>
            </section> */}
      <section className="data-display"><div className="condition-display" style={luminosityValue >= 1500 && luminosityValue <= 3500 && tempValue >= 18 && tempValue <= 35 ? { backgroundColor: `green` } : { backgroundColor: `red` }}>{luminosityValue >= 1000 && luminosityValue <= 4000 && tempValue >= 18 && tempValue <= 35 ? `Conditions are ideal` : `Conditions are not ideal`}</div><div className="motor-display-box"><p className="display-box-heading">System State</p>{isUpdatedRecently === true && <button className='motor-button-on'>OFF</button>} {isUpdatedRecently === false && <button className='motor-button-off'>ON</button>}<p className="display-box-sub-heading">Main Irrigation</p></div><div className="temperature-display-box"><p className="display-box-heading">Temperature (<sup>o</sup>C)</p><SemiCircleProgressBar percentage={tempValue} showPercentValue /></div><div className="humidity-display-box"><p className="display-box-heading">Humidity (%)</p><SemiCircleProgressBar percentage={humidityValue} showPercentValue /></div>
        <div className="luminosity-display-box"><p className="display-box-sub-heading">Luminosity</p><p className="luminosity-display">{luminosityValue}mV</p></div></section>
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