# Starter Config
This repository demonstrates how to configure a rails app with webpack.

## SSL Setup (on OS X)
#### Self-signed certificate
First, we need to create a self-signed SSL certificate.
I used the following configuration file:

*cert.cnf*
```
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
CN = lvh.me
[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = *.lvh.me
DNS.2 = lvh.me
```

and ran the following shell scripts:
```sh
openssl req -new \
  -newkey rsa:2048 \
  -sha256 \
  -days 3650 \
  -nodes \
  -x509 \
  -keyout lvh.me.key \
  -out lvh.me.crt \
  -config cert.cnf

cat lvh.me.key lvh.me.crt > lvh.me.pem
cp lvh.me.* /usr/local/etc/
```


#### HTTPS Proxy
Then, we configure `pound` to redirect HTTP requests to HTTPS requests for the *lvh.me* domain.

*/usr/local/etc/pound.cfg*
```
Alive 10

# http://lvh.me
ListenHTTP
  Address 127.0.0.1
  Port    80

  Service
    BackEnd
      Address 127.0.0.1
      Port    5000
    End
  End
End

# https://lvh.me
ListenHTTPS
  Address 127.0.0.1
  Port    443
  Cert    "/usr/local/etc/lvh.me.pem"
  AddHeader "X-Forwarded-Proto: https"

  # STAQ
  Service
    BackEnd
      Address 127.0.0.1
      Port    5000
    End
  End
End
```

*/Library/LaunchDaemons/homebrew.mxcl.pound.plist*
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>homebrew.mxcl.pound.plist</string>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/sbin/pound</string>
      <string>-f</string>
      <string>/usr/local/etc/pound.cfg</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>WatchPaths</key>
    <array/>
    <key>QueueDirectories</key>
    <array/>
  </dict>
</plist>
```

And finally, run the following:
```bash
brew install pound
sudo chown root /Library/LaunchDaemons/homebrew.mxcl.pound.plist
sudo chgrp wheel /Library/LaunchDaemons/homebrew.mxcl.pound.plist
sudo chmod 644 /Library/LaunchDaemons/homebrew.mxcl.pound.plist
sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.pound.plist
```
