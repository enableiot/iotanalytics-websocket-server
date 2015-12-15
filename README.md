# IoT Websocket Server

This component is used to support actuations over websocket protocol. It is an alternative for mqtt protocol. 

Server listens on determined port. It uses 'echo-protocol' for receiving and sending requests.

Websocket client also has to use 'echo-protocol'. After the establishment of connection client has to send initial json object message:

<table>
 <tbody>
  <tr>
   <td><b>Key</b></td><td><b>Description</b></td>
  </tr>
  <tr>
   <td>type</td><td>type of message, always "device" for clients</td>
  </tr>
  <tr>
   <td>deviceId</td><td>identifier of your device in iotkit database</td>
  </tr>
  <tr>
   <td>deviceToken</td><td>token of device which is received after activation</td>
  </tr>
 </tbody>
</table>

 Example json message:
```
{
    "type": "device",
    "deviceId": <deviceId>,
    "deviceToken": "eyJ0eXA....asdfwefadA"
}
```

Basic response codes:
<table>
 <tbody>
  <tr>
   <td><b>Code</b></td><td><b>Description</b></td>
  </tr>
  <tr>
   <td>401</td><td>"Invalid device token" or "Wrong message format"</td>
  </tr>
  <tr>
   <td>500</td><td>Internal server error</td>
  </tr>
  <tr>
   <td>200</td><td>Subscribed to ws server</td>
  </tr>
  <tr>
   <td>1024</td><td>Received actuation message</td>
  </tr>
 </tbody>
</table>

Example of actuations message:
```
{
    "code":1024,
    "content": {
        "type":"command",
        "transport":"ws",
        "content": {
            "accountId":"c4715841-bb1e-4c87-ad78-2376fe596a11",
            "deviceId":"example001",
            "gatewayId":"example001",
            "componentId":"1e447b10-9afd-4221-b4d8-7bc5c5bb6c3f",
            "command":"LED.v1.0","params":[{"name":"LED","value":"1"}]
        }
    }
}
```

More informations about websockets on website https://github.com/theturtle32/WebSocket-Node/blob/master/docs/index.md


### Pre-requirements
- Node.js v0.10.x
    - Latest in https://launchpad.net/~chris-lea/+archive/ubuntu/node.js
    
- grunt-cli
    - npm install grunt-cli

- Git

- Cloud Foundry CLI and Trusted Analytics Platform account (https://github.com/trustedanalytics)

## Requirements to run

1. Generate a pair RSA keys and put your public keys in ./security/ directory as  public.pem

#### On Trusted Analytics Platform (https://github.com/trustedanalytics)
Before installation, make sure that you are logged into Trusted Analytics Platform with command:
```
cf login
```

1. Create instances with specified name for each of required services from marketplace:
    * PostgreSQL 9.3 or newer with name mypostgres
    
1. Create following user-provided services with properties filled with real values:

        cf cups websocket-ups -p "{\"username\":\"${USER}\",\"password\":\"${PASSWORD}\"}"

1. Executing ./cf-deploy.sh in main repository catalog builds package and pushes it to CF as an app with name {SPACE}-dashboard where space is currently selected space by cf t -s "SPACE"  
1. Check logs and wait for application start.
