import requests
# import urllib
import json
# result = urllib.urlencode(formdata)

url = "http://192.168.0.161:3000/chat"

msg = {"name":"Username","msg":"Hello world"}
room = "1234"
event = "chat message"

querystring = {"room":room,"event":event,"message":json.dumps(msg)}

headers = {
    'content-type': "application/json",
    'cache-control': "no-cache",
    'postman-token': "f6cd0f7e-145c-9e1e-4800-5d11d82992e8"
    }

for x in xrange(1,100):
	response = requests.request("POST", url, headers=headers, params=querystring)


print(response.text)