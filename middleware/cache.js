let cache = {}
// {
//     request:{
//         data:"",
//         time:''
//     }
// }

function getCache() {
    return cache
}

function clearCache() {
    cache = {}
}

module.exports = { getCache, clearCache }
