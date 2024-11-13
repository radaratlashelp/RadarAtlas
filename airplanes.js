

// Define a method to debounce function calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const later = function () {
      clearTimeout(timeout);
      func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

$(".mapContainer").on("mousedown", function (e) {
  // Check if the click originates from the map (you may need to adjust the selector)
  if ($(e.target).closest("#units_selector").length) {
    e.preventDefault();
    e.stopPropagation();
  }
});

// Insert your element at the top
$("#infoblock-container").prepend(
  '<div id="adsbxRegDetail" class="identLarge"></div>'
);

let lastSelectedReg = ""; // to store the last known value

const targetNode = document.querySelector("#selected_registration");
const observer = new MutationObserver(function () {
  if (targetNode.textContent !== lastSelectedReg) {
    lastSelectedReg = targetNode.textContent;
    debounce(updateDetails, 300)(); // debounce for 300ms
  }
});

if (targetNode) {
  observer.observe(targetNode, { childList: true, subtree: true });
}

function updateDetails() {
  // Temporarily disconnect the observer during the update
  observer.disconnect();

  var icaoHexRaw = $("#selected_icao").text();
  var selectedReg = $("#selected_registration").text();

  var trimmedIcao = icaoHexRaw.substring(5, 11);
  var finalIcao = trimmedIcao.toLowerCase();

  var finalUpper = finalIcao.toUpperCase();

  var regNumber = $("#selected_registration").text();

  var googSearch = `<a href="https://www.google.com/search?q=${regNumber}" target="_blank"</a>`;

  var NameConversion;
  
  if (interestingList.hasOwnProperty(trimmedIcao)) {
    NameConversion = interestingList[`${trimmedIcao}`].Registrant.toUpperCase();
    document.getElementById(
      "adsbxRegDetail"
    ).innerHTML = `${googSearch} ${finalUpper} / ${selectedReg} <br /> is associated with: <br /> <br />${NameConversion}`;
    $("head title", window.parent.document).text(
      `${regNumber} - ${NameConversion}`
    );
  } else if (openSkyList.hasOwnProperty(finalIcao)) {
    // if there was no data in the first file, show the data from the second
    NameConversion = openSkyList[`${finalIcao}`].Registrant.toUpperCase();
    document.getElementById(
      "adsbxRegDetail"
    ).innerHTML = `${googSearch} ${finalUpper} / ${selectedReg} <br /> is associated with: <br /> <br />${NameConversion}`;
    $("head title", window.parent.document).text(
      `${regNumber} - ${NameConversion}`
    );
  } else {
    // if no data was found in either file, show the no data message
    document.getElementById(
      "adsbxRegDetail"
    ).innerHTML = `${googSearch} Sorry, no ownership data is available for ${finalIcao.toUpperCase()}. <br /> <br /> If I should add it to the database, please tell me why on X - @RadarAtlas2`;
    console.log('no plane found');
    $("head title", window.parent.document).text(`${regNumber}`);
  }
  


  
    
  observer.observe(targetNode, { childList: true, subtree: true });
}

// Initial call to populate data when script runs
updateDetails();
