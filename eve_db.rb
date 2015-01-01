require 'json'

module EveDb
  REGIONS = JSON.load(File.open('./public/regions.json'), nil, :symbolize_names => true)
  TYPES = JSON.load(File.open('./public/types.json'), nil, :symbolize_names => true)
  SYSTEMS = JSON.load(File.open('./public/systems.json'), nil, :symbolize_names => true)
  LOCATIONS = JSON.load(File.open('./public/locations.json'), nil, :symbolize_names => true)

  def self.find_item(name)
    TYPES.find do |type|
      name == type[:name]
    end
  end

  def self.find_location(name)
    LOCATIONS.find do |location|
      name == location[:name]
    end
  end
end
