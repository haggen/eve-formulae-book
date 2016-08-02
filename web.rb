require 'sinatra'
require 'sinatra/json'
require 'newrelic_rpm'

require './eve_db'
require './market_api'

get '/' do
  'Okay'
end

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
  item = EveDB.find_item(params[:item])
  location = EveDB.find_location(params[:location])

  json MarketAPI.price_of(params[:minimum], item['typeID'], location['solarSystemID'] || location['regionID'])
end

post '/update' do
  EveDB.update
  EveDB.restore
  json true
end
