require 'spec_helper'

describe EventsController do

  # let(:event) {Event.create()}

  describe 'GET index' do

    it 'assigns @events' do
      get :index
      expect(assigns(:events)).to eq([])
    end

    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end

  end

end