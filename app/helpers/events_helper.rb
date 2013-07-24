module EventsHelper

  def city_checker
    if request.location.city == ""
      "San Francisco"
    else
      request.location.city
    end
  end

  def locate(city)
    Geocoder.search(city)
  end








end
