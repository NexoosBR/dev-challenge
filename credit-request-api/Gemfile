source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.8'

gem 'bootsnap', '>= 1.1.0', require: false
gem 'jbuilder', '~> 2.5'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.4', '>= 5.2.4.5'
gem 'apipie-rails', '~> 0.5.18'
gem 'pg', '~> 1.2', '>= 1.2.3'
gem 'active_model_serializers', '~> 0.10.12'
gem 'rack-attack', '~> 6.5'
gem 'rack-cors', '~> 1.1', '>= 1.1.1', require: 'rack/cors'

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
end

group :development, :test do
  gem 'factory_bot_rails', '~> 6.1'
  gem 'faker', '~> 2.16'
  gem 'dotenv-rails'
  gem 'pry-rails'
  gem 'rspec-rails'
  gem 'rubocop', require: false
  gem 'rubocop-rails'
  gem 'rubocop-rspec'
  gem 'shoulda-matchers', '~> 4.5', '>= 4.5.1'
  gem 'spring-commands-rspec'
  gem 'webmock'
end
