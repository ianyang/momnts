module EventsHelper

  def city_checker
  # based on IP. Does not work on localhost
    if request.location.city == ""
      "San Francisco"
    else
      request.location.city
    end
  end

  def locate(city)
    Geocoder.search(city)
  end

  def delete_events
    Event.pastevents.each do |x|
      x.delete
    end
  end

end
