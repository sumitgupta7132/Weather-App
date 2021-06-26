const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.innerHTML = "<h1>Loading...</h1>";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.innerHTML = `<h1>${data.error}</h1>`;
      } else {
        const { icon, name, main, sys, weather } = data.response;
        const elem = `<div class="flex items-center justify-center">
          <div class="bg-white p-8 bg-opacity-80 rounded-3xl flex space-x-12 items-center shadow-md">
            <div>
              <img src=${icon}>
              <p class="text-center text-gray-800 mt-2 text-sm">${
                weather[0].description
              }</p>

              </div>
            <div>
              <p class="text-7xl font-bold text-right text-gray-900">${Math.round(
                main.temp
              )}&deg C</p>
              <p class="text-gray-700 text-md">${name},${sys.country}</p>

            </div>
            
          </div>
        
          <div class="absolute bottom-2  text-md">
            🌅${new Date(sys.sunrise * 1000).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })} &nbsp&nbsp&nbsp 🌆${new Date(sys.sunset * 1000).toLocaleString(
          "en-US",
          {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }
        )}
          </div>
        
        </div>`;
        messageOne.innerHTML = elem;
      }
    });
  });
});
