require 'spec_helper'

describe User do

  it { should have_many :created_events }

end