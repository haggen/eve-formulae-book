require 'httparty'

require 'active_support'
require 'active_support/all'

class MarketApi
  include HTTParty

  base_uri 'http://api.eve-central.com'

  parser -> (body) do
    JSON.parse(body)
  end

  def self.price_of(minimum, item_id, location_id)
    params = {'typeid' => item_id}

    if minimum
      params.update('minQ' => minimum.to_i)
    end

    if location_id
      if location_id.to_s =~ /^3/
        params.update('usesystem' => location_id)
      else
        params.update('regionlimit' => location_id)
      end
    end

    response = get('/api/marketstat/json', :query => params)

    raw = JSON.parse(response.body)

    {
      :buy => raw[0]['buy'].slice('min', 'max', 'avg'),
      :sell => raw[0]['sell'].slice('min', 'max', 'avg'),
      :all => raw[0]['all'].slice('min', 'max', 'avg')
    }
  end
end
