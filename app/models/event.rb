class Event < ActiveRecord::Base
  attr_accessible :date, :time, :duration, :topic, :creator_identifier, :acceptor_identifier, :location, :link, :image, :address, :latitude, :longitude, :creator_id, :acceptor_id

  geocoded_by :address
  after_validation :geocode
  after_validation :geocode, :if => :address_changed?

  belongs_to :creator, :class_name => "User", :foreign_key => "creator_id", :dependent => :destroy
  belongs_to :acceptor, :class_name => "User", :foreign_key => "acceptor_id"

  validates_presence_of :date, :time, :duration, :topic, :creator_identifier, :location, :address

  def self.search(duration, date, currentid)
    if duration && date && currentid
      where("duration <= #{duration} AND date = '#{date}' AND creator_id != #{currentid}")
    else
      scoped
    end
  end

  def self.searchcreated(currentid)
    if currentid
      where("creator_id = #{currentid}")
    else
      scoped
    end
  end

  def self.searchattending(currentid)
    if currentid
      where("acceptor_id = #{currentid}")
    else
      scoped
    end
  end

end
