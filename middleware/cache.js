let cache={}
// {
//     request:{
//         data:"",
//         time:''
//     }
// }

function clearExpiredCache(){
    for(let route in cache){
        if(Date.now()-cache[route].time>=60000){
            delete cache[route]
        }
    }
}

function checkCache(req,res,next){
    clearExpiredCache()
        const route = req.url
        if(cache[route]){
            res.setHeader('X-Cache', 'HIT')
            res.json(cache[route].data)
            return
        }
        res.setHeader('X-Cache', 'MISS')
        next()
}

function clearCache(){
    cache={}
}

function addCache(key,data){
    cache[key] = {
            data: data,
            time: Date.now()
        }
}

module.exports = {checkCache, clearCache, addCache}