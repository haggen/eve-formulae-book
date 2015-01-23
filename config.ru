require './web'

use Rack::Cors do
  allow do
    origins('*') and resource('/*', :headers => :any, :methods => :get)
  end
end

run Sinatra::Application
