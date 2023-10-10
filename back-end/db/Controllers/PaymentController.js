const  axios=require    ("axios")


 async function add(req, res) {
    const url="https://developers.flouci.com/api/generate_payment"
const payLoad={
    "app_token": "c7c49995-2ef6-4a4d-8a63-7092b025bb7b", 
    "app_secret": "81f13633-f85b-4928-bebc-b36410190b33",
    "amount": req.body.amount,
    "accept_card": "true",
    "session_timeout_secs": 1200,
    "success_link": "http://192.168.10.4:3000/front-end/src/screens/premium/Success",
    "fail_link": "http://192.168.10.4:3000/fail",
    "developer_tracking_id": "f78f1859-edb5-4abf-b27b-f0a01d404340"
}
  
  await axios
  .post(url,payLoad)
  .then(
    result=>{
        res.send(result.data);
    }
  )
  .catch(err=>{console.log(err)})
}

 async function verify(req, res) {
  const url = `https://developers.flouci.com/api/verify_payment/${req.params.id}`;

  // Define headers as an object
  const headers = {
      'apppublic': "c7c49995-2ef6-4a4d-8a63-7092b025bb7b",
      'appsecret': "81f13633-f85b-4928-bebc-b36410190b33" // Use the correct environment variable name
  };

  try {
      const result = await axios.get(url, { headers }); // Pass headers as an object
      res.send(result.data);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred' });
  }
}



module.exports ={
    add,
    verify
}

// const axios = require("axios");

// const api = axios.create({
//   baseURL: "https://developers.flouci.com/api",
//   headers: {
//     'apppublic': "c7c49995-2ef6-4a4d-8a63-7092b025bb7b",
//     'appsecret': "81f13633-f85b-4928-bebc-b36410190b33",
//   },
// });

// // Add an interceptor for handling errors
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response) {
//       // The request was made, but the server responded with an error status code
//       console.error("Server responded with status code:", error.response.status);
//       console.error("Response data:", error.response.data);
//     } else if (error.request) {
//       // The request was made, but no response was received
//       console.error("No response received from the server");
//     } else {
//       // Something else went wrong
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// async function generatePayment(amount) {
//   const url = "/generate_payment";
//   const payload = {
//     amount,
//     accept_card: true,
//     session_timeout_secs: 1200,
//     developer_tracking_id: "f78f1859-edb5-4abf-b27b-f0a01d404340",
//   };

//   try {
//     const result = await api.post(url, payload);
//     return result.result.payment_id;
//   } catch (error) {
//     throw new Error("Payment request failed");
//   }
// }

// async function checkPaymentStatus(paymentId) {
//   const url = `/check_payment/${paymentId}`;

//   try {
//     const response = await api.get(url);

//     if (response.result.status === "SUCCESS") {
//       return "SUCCESS";
//     } else if (response.result.status === "FAIL") {
//       return "FAIL";
//     } else {
//       return "PENDING";
//     }
//   } catch (error) {
//     throw new Error("An error occurred while checking payment status");
//   }
// }

// async function add(req, res, navigation) {
//   try {
//     const paymentId = await generatePayment(req.body.amount);
//     let paymentStatus = await checkPaymentStatus(paymentId);

//     while (paymentStatus === "PENDING") {
//       // Delay and check payment status again
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       paymentStatus = await checkPaymentStatus(paymentId);
//     }

//     if (paymentStatus === "SUCCESS") {
//       navigation.navigate("Success");
//     } else if (paymentStatus === "FAIL") {
//       navigation.navigate("Failure");
//     }

//     res.send({ message: "Payment request completed" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "An error occurred" });
//   }
// }

// async function verify(req, res) {
//   const url = `/verify_payment/${req.params.id}`;

//   try {
//     const result = await api.get(url);
//     res.send({ status: result.result.status });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// }

// module.exports = {
//   add,
//   verify,
// };