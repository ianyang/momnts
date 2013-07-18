# == Schema Information
#
# Table name: identifiers
#
#  id         :integer          not null, primary key
#  content    :text
#  user_id    :integer
#  event_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class IdentifierTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
