class EventsController < ApplicationController
  before_filter :authenticate_user!#, except: [:index, :show]
  include EventsHelper

  def index
    @params = params

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

    @duration = params[:duration]

    @currentid = current_user.id

    @events = Event.search(@duration, @setdate, @currentid)

    @event = Event.new(params[:event])

  end

  def display

    @currentid = current_user.id
    @created = Event.searchcreated(@currentid)
    @attending = Event.searchattending(@currentid)

  end

  def new
    @event = Event.new
  end


  def search

    @find = params[:find]
    @place = params[:place]

    consumer_key = '_RQOKbYP2zws0jkBK4rp_w'
    consumer_secret = 'jH4gh4svxyqw3p7DMZqCdBJCv3Y'
    token = 'p8TCLcjX4cPJY1F9wy9KVx60RQASxngU'
    token_secret = 'SUHLkl-XQvUX_XM-NP-QPTtmcMA'
    api_host = 'api.yelp.com'
    consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => "http://#{api_host}"})
    access_token = OAuth::AccessToken.new(consumer, token, token_secret)

    path = "/v2/search?term=#{URI.escape(@find)}&location=#{URI.escape(@place)}"
    @raw = access_token.get(path).body
    @results = JSON.load(@raw)["businesses"]
    render :json => @results

  end

  def create
    @event = Event.new(params[:event])
    @event.creator_id = current_user.id
    @event.save

    #Twilio
    account_sid = 'AC5eadc2f446566e4dea21fb6190cf6176'
    auth_token = '8249d2fd3ac1cb91790345af8340ebeb'
    @client = Twilio::REST::Client.new account_sid, auth_token

    message = @client.account.sms.messages.create(:body => "One event added online. Just to let you know.",
        :to => "+14156466565",     # Replace with your phone number
        :from => "+16503519558")   # Replace with your Twilio number
    puts message.sid

    render :show
  end

  def show

    @event = Event.find(params[:id])

  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    @event.update_attributes(params[:event])
    render :show
  end

  def destroy
    event = Event.find(params[:id])
    event.delete
    redirect_to(events_path)
  end

end

