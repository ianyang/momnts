class EventsController < ApplicationController
  before_filter :authenticate_user!, except: [:index]
  include EventsHelper

  def index
    delete_events
  end

  def all_events

    @location = "location"

    if params[:date] != nil
      @year = params[:date]["(1i)"]
      @month = params[:date]["(2i)"].to_i
        if @month < 10
          @month = '0'+@month.to_s
        else
          @month.to_s
        end
      @day = params[:date]["(3i)"].to_i
        if @day < 10
          @day = '0'+@day.to_s
        else
          @day.to_s
        end
      @setdate = "#{@year}-#{@month}-#{@day}"
    else
      @setdate = nil
    end

    @duration = "90"

    @events = Event.search(@duration, @setdate)
    render :json => @events
  end

  def display

    @created = Event.searchcreated(current_user.id)
    @attending = Event.searchattending(current_user.id)

  end

  def new
    @event = Event.new
    @city = city_checker
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
      redirect_to 'events/new'
    end

  end

  def show

    @event = Event.find(params[:id])

  end

  def update

  end

  def destroy
    event = Event.find(params[:id])
    event.delete
    redirect_to(events_path)
  end

end


  # def edit
  #   @event = Event.find(params[:id])
  # end

  # def update
  #   @event = Event.find(params[:id])
  #   @event.update_attributes(params[:event])
  #   render :show
  # end


