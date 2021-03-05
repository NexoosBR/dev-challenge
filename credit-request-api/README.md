# credit-request-api

```
docker build . -t rails-credit-request
docker container run -p 3000:3000 --rm -it -v "$(pwd)":/usr/src/app rails-credit-request bundle exec rails server -b 0.0.0.0 -p 3000
```