document.addEventListener('DOMContentLoaded', async function() {
  const ipInfo = {
    ipv4: null,
    ipv6: null
  };
  const apiKey = 'YOUR_API_KEY'; // جایگزین کردن YOUR_API_KEY با کلید API از ipgeolocation.io دریافتی

  try {
    // Fetch IPv4 address
    let response = await fetch('https://api.ipify.org?format=json');
    let data = await response.json();
    ipInfo.ipv4 = data.ip;

    // Fetch IPv6 address
    response = await fetch('https://api64.ipify.org?format=json');
    data = await response.json();
    ipInfo.ipv6 = data.ip;

    displayIPInfo(ipInfo);
  } catch (error) {
    console.error('Error fetching IP:', error);
  }

  async function displayIPInfo(ipInfo) {
    if (ipInfo.ipv4 && ipInfo.ipv6) {
      const contentDiv = document.getElementById('content');
      const h1 = document.createElement('h1');
      h1.innerHTML = `Your IPv4: ${ipInfo.ipv4}`;
      // const h2 = document.createElement('h1');
      // h2.innerHTML = `Your IPv6: ${ipInfo.ipv6}`;
      contentDiv.textContent = '';
      contentDiv.appendChild(h1);
      // contentDiv.appendChild(h2);

      try {
        // Fetch location information for IPv4
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipInfo.ipv4}`);
        const data = await response.json();
        console.log(data);
        const flagImg = document.getElementById('flag');
        const p = document.createElement('p');
        p.innerHTML = `\n<b>Location:</b> ${data.city}, ${data.country_name}`;
        contentDiv.appendChild(p);
        const p2 = document.createElement('p');
        p2.innerHTML = `\n<b>ISP:</b> ${data.isp}`;
        contentDiv.appendChild(p2);
        flagImg.src = `https://flagpedia.net/data/flags/w702/${data.country_code2.toLowerCase()}.webp`;
        flagImg.style.display = 'block';
      } catch (error) {
        console.error('Error fetching location info:', error);
      }
    }
  }
});
