import { ADD_ITEM } from './types';

export const scanItem = (base64, callback, drawCanvas, setMessage) => async dispatch => {
  const payload = {
    requests: [
      {
        image: {
          "content": base64.replace("data:image/webp;base64,", "")
        },
        features: [
          {
            "maxResults": 5,
            "type": "OBJECT_LOCALIZATION"
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
/*
  const data = await response.json();
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);
  if (data.responses && data.responses[0] && data.responses[0].localizedObjectAnnotations) {
    let annotation = null;
    for (let i = 0; i < data.responses[0].localizedObjectAnnotations.length; i++) {
      annotation = data.responses[0].localizedObjectAnnotations[i];
      if (annotation.name != "Person" && annotation.name != "Lighting") {
        break;
      }
    }
    if (annotation.name != "Person" && annotation.name != "Lighting") {
      console.log(data.responses);
      console.log(annotation.name);
      drawCanvas(annotation.boundingPoly.normalizedVertices);
      dispatch({
        type: ADD_ITEM,
        payload: annotation.name
      });
      setMessage(annotation.name + ' scanned');
    }
    else {
      setMessage('Nothing found :(');
    }
  }
  */

  setTimeout(() => {
    callback();
  }, 3000);
}