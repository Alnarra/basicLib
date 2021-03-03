"use strict"

const crypto = require('crypto'); 

class logging{
    constructor(config){
        this.logLevel = config.logLevel || "4"
        this.event = {} 
    }
    async _writeLog(){
        try{
            if((this.event.level <= this.logLevel) || typeof this.event.level === "string"){
                var message = ""
                //First Let's do some translation yeah? 
                switch(this.event.level){
                    case 1: 
                        this.event.logLevel = "Fatal"
                        break; 
                    case 2: 
                        this.event.logLevel = "Error"
                        break; 
                    case 3: 
                        this.event.logLevel = "Warning"
                        break; 
                    case 4: 
                        this.event.logLevel = "Info"
                        break; 
                    case 5: 
                        this.event.logLevel = "Debug"
                        break;
                    case 6: 
                        this.event.logLevel = "Trace"
                        break; 
                    default: 
                        this.event.logLevel = "Unknown"
                        break; 
                }
                //Write it out in for the logs 
                message = `[${this.event.logLevel}];Time:"${this.event.dateTime}";User: "${this.event.user}"`
                if(this.logLevel >= 5 ){
                    message += `;Version:"${this.event.version}";OS:"${this.event.os}";Hostname:"${this.event.hostname}";Network Info:"${this.event.network}"`
                }
                if(this.logLevel == 6){
                    message += `;Trace:"${this.event.callerLine}"`
                }
                this.event.object !== "" ? message += `;Additional Information: "${this.event.object}"` : "" 
                message += `;Description:"${this.event.description}"\n`
                //basically we're going to write to a file if not to webex
                var filepath = app.getPath("logs")
                fs.appendFile(filepath + "/" + this.event.dateTime.getFullYear() + (this.event.dateTime.getMonth() + 1) + this.event.dateTime.getDate() + ".log",message, (err) => {
                    if(err) throw err; 
                })
                //Now to ouptut it to the console
                switch(this.event.level){
                    case 1:
                    case 2:  
                        console.error(message)
                        break
                    case 3: 
                        console.warn(message)
                        break
                    case 5: 
                    case 6: 
                        console.info(message)
                        break
                    default: 
                        console.log(message) 
                }
            }
            else {
                //Log Event is below current threshold 
                return 
            }
        } catch(error){
            console.log(error)
        }
    }
    async newEvent(description, level, object) {
        var dec = new encrypt()
        this.event.level = level || 4 //If the user doesn't specify we'll set it as info
        this.event.description = description
        this.event.object = JSON.stringify(object) || "" 
        this.event.user = os.userInfo().username
        this.event.version = version
        this.event.callerLine = JSON.stringify((new Error).stack.split("\n"))
        this.event.dateTime = new Date()
        this.event.host = os.hostname()
        this.event.osver = os.platform() + ":" + os.release()
        this.event.network = JSON.stringify(os.networkInterfaces())
        await this._writeLog()
    }
}
let log = new log{[]} 

class encryption { 
    constructor(){ 
        this.algorithm = 'aes-256-cbc';
        this.key = Buffer.from(key,'hex'); 
    }
    encrypt(plainText){
        try{
            var iv = crypto.randomBytes(16);  
            var cipher = crypto.createCipheriv(this.algorithm,this.key,iv);
            var cipherText = cipher.update(plainText,'utf8','hex') + cipher.final('hex');
            return iv.toString('hex') + cipherText;
        } catch(err) {
            log.newEvent("Error Occured in Encryption",2,err)
        }
    }
    decrypt(cipherText){
        try{
            var iv = Buffer.from(cipherText.slice(0,32),'hex');
            var data = cipherText.slice(32);
            var decode = crypto.createDecipheriv(this.algorithm,this.key,iv);
            var decoded = decode.update(data,'hex','utf8') + decode.final('utf8');
            return decoded; 
        } catch (err){
            log.newEvent("Error Occured in Decryption",2,err)
        }
    }
}

module.exports = logging, encryption
