const Promise = require('bluebird'); 

module.exports = (functionConfigs) => {
    // All promises will be executed serrialy the next 
    // iteration will start only after the previous promise is fulfilled return 
    return Promise.each(functionConfigs, (functionConfig) => { 
        return functionConfig.func( ...functionConfig.args ); 
    });
};

