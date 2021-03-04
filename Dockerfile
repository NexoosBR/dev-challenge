FROM ruby:3.0

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee \
  /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs yarn postgresql-client vim

RUN mkdir -p /app/nexoos-challenge
WORKDIR /app/nexoos-challenge

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install -y -qq ./google-chrome-stable_current_amd64.deb
RUN rm ./google-chrome-stable_current_amd64.deb

ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN gem install bundler

ADD package.json package.json
ADD yarn.lock yarn.lock
RUN bundle install

ADD . /app/nexoos-challenge