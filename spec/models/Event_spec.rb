require 'spec_helper'

describe Event do

  it { should validate_presence_of :date}
  it { should validate_presence_of :time}
  it { should validate_presence_of :topic}

end