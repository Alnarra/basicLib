# basicLib
Just some basic Javascript / Node.JS functionality that I use a lot

For the Logging Class: 
Logging Module, this is what we're going to use to log everything 
A handy reminder for what the logging modules actually are 

1. Fatal -  App Killing
2. Error - Doesn't kill the app, but if it happens something is broken 
3. Warn - Doesn't kill the app, and it doesn't necessarily mean something is broken
4. Info - The app is doing what it's supposed to do 
5. Debug - More thenn info we want to see steps along the way
6. Trace - We want line numbers

Calling this is simple, just created a new logging

``` Javascript
log.newEvent(String:Description, Integer or String Log Level)
log.newEvent(String:Description, Integer or String Log Level, Object Object)
```
You can overwrite the default logging level (4 / Info) like so 
```
log.logLevel = Integer
```
For the Encryption Class you simply need to give it a key of the correct size we can create one quickly like so:
```Javascript 
key = crypto.randomBytes(256/8).toString('hex'); 
enc = new encryption(key) 
enc.encrypt("text here") 
enc.decrypt("text here") 
```
