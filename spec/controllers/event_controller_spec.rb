require 'spec_helper'

describe EventsController do

  before :each do
    @event = Event.create(location: "fake location")
  end

  describe 'GET index' do

    it 'assigns @events' do
      events = Event.create(location: 'fake event')
      get :index
      expect(assigns(:events)).to eq([event])
    end

    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end

  end

end