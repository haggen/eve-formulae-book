require 'sinatra'
require 'sinatra/json'

require 'newrelic_rpm'

require './eve_db'
require './eve_api'
require './market_api'

# GET /market?item=Veldspar&minimum=10000&location=Sinq%20Laison
#
# {
#   "buy": {
#     "min": 12.0,
#     "max": 17.0,
#     "avg": 14.5
#   },
#   "sell": {
#     "min": 12.0,
#     "max": 17.0,
#     "avg": 14.5
#   },
#   "all": {
#     "min": 12.0,
#     "max": 17.0,
#     "avg": 14.5
#   }
# }
#
get '/market' do
  item = EveDb.find_item(params[:item])
  location = EveDb.find_location(params[:location])

  json MarketApi.price_of(params[:minimum], item[:id], location[:id])
end
