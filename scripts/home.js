const api_location = 'https://api.themcoldbloodeddrifters.com';
const left_home_text = document.getElementById("left_home_text")
const right_home_text = document.getElementById("right_home_text")

function render_text_from_api(left,right)
{
    left_home_text.innerHTML = `${left}`
    right_home_text.innerHTML = `${right}`
}

fetch(`${api_location}/home_data`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
  },)
  .then(res => {
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return res.json();
  })
  .then(data => {
  if (data && data.status === "success" && data.left && data.right) {
    console.log("Loading Home Text Data: " + data.status);
    render_text_from_api(data.left, data.right);
  } else {
    console.warn("Empty or malformed API response, using defaults.");
  }
})
  .catch((error) => {
      console.warn("Fetch error, using default images:", error)
  });