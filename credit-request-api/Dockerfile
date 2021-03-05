FROM ruby:2.5

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y \
  curl \
  build-essential \
  libpq-dev \
  postgresql-client \
  locales

ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY Gemfile /usr/src/app/Gemfile
COPY Gemfile.lock /usr/src/app/Gemfile.lock

RUN bundle install
COPY . /usr/src/app/

EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
