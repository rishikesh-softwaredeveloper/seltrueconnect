// import Constants from 'expo-constants';
// const { manifest } = Constants;
// const ip = manifest.debuggerHost.split(':').shift();

const ENV = {
  dev: {
    // apiUrl: 'http://sloyd.in:49152',
    apiUrl: 'http://103.86.177.62:49152',
    amplitudeApiKey: null,
    userName:"U2xveWQtRGVhbGVyLUFwcA==",
    passWord:"QXBwLVNsb3lkLURlYWxlcg==",
    razorpay_key:"rzp_test_JTqO73TKg7BfXj",// Your api key nagireddy
    build_no:38,
    version:"1.2.11"
  },

  staging: {
    apiUrl: 'http://103.86.177.62:49152',
    amplitudeApiKey: null,
    userName:"U2xveWQtRGVhbGVyLUFwcA==",
    passWord:"QXBwLVNsb3lkLURlYWxlcg==",
    // razorpay_key:"rzp_test_JTqO73TKg7BfXj",//Your api key sloyd  
    razorpay_key:"rzp_live_Vsj38zwNbmuE7B",//Your api key sloyd  
    build_no:38,
    version:"1.2.11"
  },
  
  prod: {
    apiUrl: 'http://sloyd.in:49153',
    amplitudeApiKey: null,
    userName:"U2xveWQtRGVhbGVyLUFwcA==",
    passWord:"QXBwLVNsb3lkLURlYWxlcg==",
    razorpay_key:"rzp_live_Vsj38zwNbmuE7B",// Your api key sloyd
    build_no:38,
    version:"1.2.11"
  }
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }else{
    return ENV.staging;
  }
};


export default getEnvVars;