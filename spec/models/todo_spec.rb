# == Schema Information
#
# Table name: todos
#
#  id         :integer          not null, primary key
#  label      :string           default(""), not null
#  complete   :boolean          default(FALSE), not null
#  index      :integer          default(0), not null
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
  it { is_expected.to validate_numericality_of(:index) }

  describe "#index" do
    it "increments index on create" do
      previous, current = create_list(:todo, 2)
      expect(current.index).to eq(previous.index + 1)
    end
  end
end
