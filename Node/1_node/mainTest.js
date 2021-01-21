var express = require('express')
var app = express()

app.get('/BE', function(req, res){
    var json_string = {"tracks": [
        {"album":"BE","number": 1, "production":"RM,SUGA,J-Hope", "update_at:":"2020-11-20","track":"Life Goes On"},
        {"album":"BE","number": 2, "production":"RM,SUGA,J-Hope", "update_at:":"2020-11-20","track":"내 방을 여행하는 법 (Fly To My Room)"},
        {"album":"BE","number": 3, "production":"V,SUGA,RM,J-Hope", "update_at:":"2020-11-20","track":"Blue & Grey"},
        {"album":"BE","number": 4, "production":"", "update_at:":"2020-11-20", "track":"Skit"},
        {"album":"BE","number": 5, "production":"SUGA,RM,정국", "update_at:":"2020-11-20","track":" 잠시 (Telepathy)"},
        {"album":"BE","number": 6, "production":"J-Hope,RM,SUGA,지민", "update_at:":"2020-11-20","track":"병 (Dis-ease)"},
        {"album":"BE","number": 7, "production":"정국,RM,진", "update_at:":"2020-11-20","track":"Stay"},
        {"album":"BE","number": 8, "production":"", "update_at:":"2020-08-21", "track":"Dynamite"}
    ]}
    res.json(json_string)
})

app.listen(3000) //port 3000 in http requests