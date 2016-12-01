# Rails & Webpack Starter Config [![Travis](https://img.shields.io/travis/tough-griff/rails-webpack-demo.svg)](https://travis-ci.org/tough-griff/rails-webpack-demo)
> This repository demonstrates how to configure a rails app with webpack.

## Development
`bin/setup` will take care of all your dependencies and other environment setup.

Run `foreman start -f Procfile.dev` to start up a development environment.

Browse to http://lvh.me:3000 or https://lvh.me:5000 if `SSL=true`

#### Simulating Production
Run `bundle exec rake webpack:build && foreman start -f Procfile.prod -e .env.prod`
to simulate a production environment (still using the development database).

## SSL Setup (on OS X)
#### Self-signed certificate
To use SSL in development we need to create a self-signed SSL certificate. This
one is configured as a wildcard cert for `*.lvh.me`.

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

**Please note:** You may want to add `lvh.me` to your */etc/hosts* file, but
`lvh.me` already redirects to `127.0.0.1`. Adding it to your hosts file just
eliminates the need to hit DNS.
