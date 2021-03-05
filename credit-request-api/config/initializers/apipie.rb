Apipie.configure do |config|
  config.app_name                = 'credit-request-api'
  config.api_base_url            = '/'
  config.doc_base_url            = '/docs'
  config.translate               = false
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/**/*.rb"
end
