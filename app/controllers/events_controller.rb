class EventsController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :all_events]
  include EventsHelper

  def index
    @city = city_checker
    delete_events
    @events = Event.all
  end

  def all_events

    sleep 1

    lat = params[:lat].to_f
    lng = params[:lng].to_f
    # some location logic
    @events = []
    @today = []
    @tommorw = []

    if user_signed_in?
      today = Event.where(date: Date.today).where(acceptor_id: nil).where(Event.arel_table[:creator_id].not_eq(current_user.id))
      tomorrow = Event.where(date: Date.today+1).where(acceptor_id: nil).where(Event.arel_table[:creator_id].not_eq(current_user.id))
    else
      today = Event.where(date: Date.today).where(acceptor_id: nil)
      tomorrow = Event.where(date: Date.today+1).where(acceptor_id: nil)
    end

    if today.length > 0
      today.each do |event|
        d = haversine(event.latitude, event.longitude, lat, lng)
        if d < 5
          @today << {
            id: event.id,
            date: event.date,
            time: event.time,
            duration: event.duration,
            topic: event.topic,
            location: event.location,
            image: event.image,
            address: event.address,
            distance: d
          }
        end
      end
    end

    if tomorrow.length > 0
      tomorrow.each do |event|
        d = haversine(event.latitude, event.longitude, lat, lng)
        if d < 5
          @tomorrow << {
            id: event.id,
            date: event.date,
            time: event.time,
            duration: event.duration,
            topic: event.topic,
            location: event.location,
            image: event.image,
            address: event.address,
            distance: d
          }
        end
      end
    end

    @events << @today
    @events << @tomorrow
    render :json => @events
  end

  def new
    @event = Event.new
    @city = city_checker
  end

  def create
    @event = Event.new(params[:event])
    @event.creator_id = current_user.id

    if @event.save
      @client = Twilio::REST::Client.new TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
      message = @client.account.sms.messages.create(:body => "One event added online by #{@event.creator.name}. Just to let you know.",
          :to => "+14156466565",     # Replace with your phone number
          :from => "+16503519558")   # Replace with your Twilio number
      puts message.sid
      render :show
    else
      flash[:error] = "You need to fill in all the details"
      redirect_to('/events/new')
    end

  end

  def show
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
  end

  def accept
    @event = Event.find(params[:id])
    @event.acceptor_id = params[:acceptor_id]
    @event.acceptor_identifier = params[:acceptor_identifier]

    if @event.save
      redirect_to "/events/#{@event.id}"
    else
      redirect_to "/"
    end

  end

  def destroy
    event = Event.find(params[:id])
    event.delete
    redirect_to(events_path)
  end

  def search

    @find = params[:find]
    @place = params[:place]

    consumer_key = YELP_CONSUMER_KEY
    consumer_secret = YELP_CONSUMER_SECRET
    token = YELP_TOKEN
    token_secret = YELP_TOKEN_SECRET

    api_host = 'api.yelp.com'
    consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => "http://#{api_host}"})
    access_token = OAuth::AccessToken.new(consumer, token, token_secret)
    path = "/v2/search?term=#{URI.escape(@find)}&ll=#{URI.escape(@place)}"
    @raw = access_token.get(path).body
    @results = JSON.load(@raw)["businesses"]
    render :json => @results

  end

  def display

    @created = Event.searchcreated(current_user.id)
    @attending = Event.searchattending(current_user.id)

  end

end
