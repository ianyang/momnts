# == Schema Information
#
# Table name: events
#
#  id                  :integer          not null, primary key
#  date                :date
#  time                :time
#  duration            :integer
#  topic               :text
#  creator_identifier  :text
#  acceptor_identifier :text
#  location            :string(255)
#  link                :text
#  image               :text
#  address             :string(255)
#  latitude            :float
#  longitude           :float
#  creator_id          :integer
#  acceptor_id         :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
