// const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     const reader = new FileReader();
  
//     reader.onload = async () => {
//       const imageData = reader.result.split(',')[1]; // Extracting base64 data
  
//       const requestData = {
//         comment: comment,
//         image: imageData,
//       };
  
//       try {
//         const response = await fetch('http://your-backend-api-endpoint', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestData),
//         });
  
//         if (response.ok) {
//           console.log('Form data sent successfully!');
//         } else {
//           console.error('Failed to send form data.');
//         }
//       } catch (error) {
//         console.error('Error sending form data:', error);
//       }
//     };
  
//     if (image) {
//       reader.readAsDataURL(image);
//     } else {
//       console.error('No image selected.');
//     }
//   };