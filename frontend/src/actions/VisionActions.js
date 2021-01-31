export const scanItem = (base64) => async dispatch => {
  const payload = {
    requests: [
      {
        image: {
          "content": base64.replace("data:image/webp;base64,", "")
        },
        features: [
          {
            "maxResults": 1,
            "type": "LABEL_DETECTION"
          },
        ]
      }
    ]
  }

  const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_API_KEY}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Content-Length": base64.replace("data:image/webp;base64,", "").length
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log(data);
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);
  console.log(data);

}