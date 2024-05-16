  document.addEventListener('DOMContentLoaded', function() {
      const ipInfo = {
        ipv4: null,
        ipv6: null
      };
      const apiKey = 'YOUR_API_KEY'; // جایگزین کردن YOUR_API_KEY با کلید  API از ipgeolocation.io دریافتی

      // Fetch IPv4 address
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          ipInfo.ipv4 = data.ip;
          displayIPInfo(ipInfo);
        })
        .catch(error => {
          console.error('Error fetching IPv4:', error);
        });
    
      // Fetch IPv6 address
      fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          ipInfo.ipv6 = data.ip;
          displayIPInfo(ipInfo);
        })
        .catch(error => {
          console.error('Error fetching IPv6:', error);
        });
    
      function displayIPInfo(ipInfo) {
        if (ipInfo.ipv4 && ipInfo.ipv6) {
          const contentDiv = document.getElementById('content');
          const h1 = document.createElement('h1');
          h1.innerHTML = `Your IPv4: ${ipInfo.ipv4}`;
          contentDiv.textContent = '';
          contentDiv.appendChild(h1);
    
          // Fetch location information for IPv4
          fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipInfo.ipv4}`)
            .then(response => response.json())
            .then(data => {
              const flagImg = document.getElementById('flag');
              const p = document.createElement('p');
              p.innerHTML = `\n<b>Location:</b> ${data.city}, ${data.country_name}`;
              contentDiv.appendChild(p);
              const p2 = document.createElement('p');
              p2.innerHTML = `\n<b>ISP:</b> ${data.isp}`;
              contentDiv.appendChild(p2);
              flagImg.src = `https://flagpedia.net/data/flags/w702/${data.country_code2.toLowerCase()}.webp`;
              flagImg.style.display = 'block';
            })
            .catch(error => {
              console.error('Error fetching location info:', error);
            });
        }
      }
    });
    