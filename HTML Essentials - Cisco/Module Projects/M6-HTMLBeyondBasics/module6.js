<script>
document.addEventListener('DOMContentLoaded', function() {
  const continentInfo = {
    'north-america': {
      continent: 'North America',
      river: 'Mississippi River',
      mountain: 'Denali',
      landmarks: 'Grand Canyon, Statue of Liberty, Niagara Falls'
    },
    'south-america': {
      continent: 'South America',
      river: 'Amazon River',
      mountain: 'Aconcagua',
      landmarks: 'Machu Picchu, Galapagos Islands'
    },
    'europe': {
      continent: 'Europe',
      river: 'Danube River',
      mountain: 'Mont Blanc',
      landmarks: 'Eiffel Tower, Colosseum, Acropolis of Athens'
    },
    'africa': {
      continent: 'Africa',
      river: 'Nile River',
      mountain: 'Mount Kilimanjaro',
      landmarks: 'Sphinx, Table Mountain'
    },
    'asia': {
      continent: 'Asia',
      river: 'Yangtze River',
      mountain: 'Mount Everest',
      landmarks: 'Great Wall of China, Petra'
    },
    'australia-and-oceania': {
      continent: 'Australia and Oceania',
      river: 'Murray River',
      mountain: 'Mount Kosciuszko',
      landmarks: 'Sydney Opera House, Great Barrier Reef, Uluru'
    }
  };

  function displayContinentInfo(continentId) {
    const info = continentInfo[continentId];
    if (info) {
      alert(`Continent: ${info.continent}\nRiver: ${info.river}\nMountain: ${info.mountain}\nLandmarks: ${info.landmarks}`);
    } else {
      alert('Information not available');
    }
  }

  document.querySelectorAll('area').forEach(area => {
    area.addEventListener('click', function() {
      const continentId = this.id;
      displayContinentInfo(continentId);
    });
  });

  const discoverLocationButton = document.getElementById('discoverLocation');
  
  discoverLocationButton.addEventListener('click', () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const continentId = determineContinentByGeo(latitude, longitude);
        displayContinentInfo(continentId);
      }, (error) => {
        alert("Error obtaining geolocation: " + error.message);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });

  function determineContinentByGeo(latitude, longitude) {
    if (latitude > 35 && longitude > -10 && longitude < 40) {
      return 'europe';
    } else if (latitude < 0 && longitude > -80 && longitude < -34) {
      return 'south-america';
    } else if (latitude > 0 && longitude > -130 && longitude < -70) {
      return 'north-america';
    } else if (latitude > 5 && latitude < 60 && longitude > 40 && longitude < 180) {
      return 'asia';
    } else if (latitude > -35 && latitude < 35 && longitude > 10 && longitude < 50) {
      return 'africa';
    } else if (latitude < -10 && longitude > 110 && longitude < 180) {
      return 'australia-and-oceania';
    }
    alert("Continent could not be determined based on your location.");
    return null; // Fallback for locations not covered
  }
});
</script>