import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {
  const [data, setData] = useState(null); // برای داده‌های نمودار و دمای فعلی
  const [error, setError] = useState(null);

  // تابع برای گرفتن داده‌ها
  const fetchData = () => {
    setData(null);
    setError(null);
    fetch('https://team1backendapp-hkf4gah3hub3bqam.westeurope-01.azurewebsites.net/get_temp')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // آماده‌سازی داده‌ها برای نمودار
  const chartData = [
    ['Time', 'Temperature'],
    ...(data?.map(item => {
      const time = item.MeasurementTime.split('T')[1].split('.')[0]; // گرفتن ساعت:دقیقه:ثانیه
      return [time, item.MeasurementValue];
    }) || []),
  ];

  const options = {
    title: 'Temperature Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Temperature (°C)',
    },
  };

  // گرفتن دمای فعلی (آخرین دما)
  const currentTemp = data && data.length > 0 ? data[0].MeasurementValue : null;

  return (
    <div>
      <Header />
      <main>
        {error ? (
          <p>Error: {error}</p>
        ) : currentTemp !== null ? (
          <div>
            <p>Current Temperature: {currentTemp}°C</p>
            <button onClick={fetchData}>Refresh</button>
            <Chart
              chartType="LineChart"
              width="800px"
              height="400px"
              data={chartData}
              options={options}
            />
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;