require 'csv'
require 'json'

module EveDB
  def self.none
    Proc.new do
      Hash.new
    end
  end

  def self.find_item(name)
    @@types.find(none) do |type|
      type['typeName'] == name
    end
  end

  def self.find_location(name)
    find_region = Proc.new do
      @@regions.find(none) do |region|
        region['regionName'] == name
      end
    end

    @@systems.find(find_region) do |system|
      system['solarSystemName'] == name
    end
  end

  def self.update
    `curl -s https://www.fuzzwork.co.uk/dump/latest/invTypes.csv.bz2 | bzip2 -dc >tmp/invTypes.csv`
    `curl -s https://www.fuzzwork.co.uk/dump/latest/mapSolarSystems.csv.bz2 | bzip2 -dc >tmp/mapSolarSystems.csv`
    `curl -s https://www.fuzzwork.co.uk/dump/latest/mapRegions.csv.bz2 | bzip2 -dc >tmp/mapRegions.csv`
  end

  def self.restore
    @@types = CSV.read('tmp/invTypes.csv', headers: true)
    @@systems = CSV.read('tmp/mapSolarSystems.csv', headers: true)
    @@regions = CSV.read('tmp/mapRegions.csv', headers: true)
  end

  restore
end

