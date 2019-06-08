function getDefaultUrl(type) {
    if(type == 'plugin') {
        return '/images/logos/plugin_default.jpg';
    } else if(type == 'trigger') {
        return '/images/logos/trigger_default.jpg';
    } else {
        return '/images/logos/leto.png';
    }
}

function checkImageLoad(url, type) {
    // check if an image URL loads, if not use the type to find a default placeholder image
    return new Promise((resolve, reject) => {
        let errors = {};

        let img = new Image(),    
            loaded = false,
            errored = false;
    
        img.onload = () => {
            if (loaded) {
                resolve(url);
            }
        
            loaded = true;
            resolve(url);
        };
    
        img.onerror = () => {
            if (errored) {
                reject(getDefaultUrl(type));
            }
        
            errors[url] = errored = true;
            reject(getDefaultUrl(type));
        };
    
        if (errors[url]) {
            img.onerror.call(img);
            return;
        }
        
        img.src = url;
    
        if (img.complete) {
            img.onload.call(img);
        }
    });
}

function checkImageExtensions(url, type) {
    return new Promise((resolve, reject) => {
        checkImageLoad(url, type)
            .then((r) => {
                resolve(r);
            })
            .catch((e) => {
                if(url && url.split) {
                    // if original url didn't work
                    // check alternate extension
                    let splitUrl = url.split('.');
                    let ogExtension = splitUrl[splitUrl.length - 1];
                    let nextUrl;
    
                    if(ogExtension == 'png') {
                        nextUrl = splitUrl;
                        nextUrl[nextUrl.length - 1] = 'jpg';
                        nextUrl = nextUrl.join('.');
                    } else if(ogExtension == 'jpg') {
                        nextUrl = splitUrl;
                        nextUrl[nextUrl.length - 1] = 'jpeg';
                        nextUrl = nextUrl.join('.');
                    } else {
                        nextUrl = splitUrl;
                        nextUrl[nextUrl.length - 1] = 'png';
                        nextUrl = nextUrl.join('.');
                    }
    
                    checkImageLoad(nextUrl, type)
                            .then((result) => {
                                resolve(result);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                } else {
                    reject(e);
                }
            });
    });
}

export default function(url, type) {
    return checkImageExtensions(url, type);
}