require 'httparty'

class EveApi
  include HTTParty

  base_uri 'https://api.eveonline.com'

  parser -> (body) do
    Nokogiri::XML(body)
  end

  def initialize(key, vcode)
    @query = {'keyID' => key, 'vCode' => vcode}
  end

  def klass
    self.class
  end

  def characters
    klass.get('/account/Characters.xml.aspx', :query => @query)
  end

  def planetary_colonies(character_id)
    klass.get '/char/PlanetaryColonies.xml.aspx', :query => @query.merge(:characterID => character)
  end

  def planetary_pins(character_id, planet_id)
    klass.get '/char/PlanetaryPins.xml.aspx', :query => @query.merge(:characterID => character, :planetID => planet)
  end
end
