# == Schema Information
#
# Table name: todos
#
#  id         :integer          not null, primary key
#  label      :string           default(""), not null
#  complete   :boolean          default(FALSE), not null
#  index      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require "rails_helper"

RSpec.describe Todo, type: :model do
  subject { create(:todo) }

  it { is_expected.to respond_to(:label) }
  it { is_expected.to respond_to(:complete) }
  it { is_expected.to respond_to(:index) }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of(:label) }
  it { is_expected.to validate_presence_of(:index) }
end
