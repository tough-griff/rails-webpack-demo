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

RSpec.describe TodoSerializer, type: :serialzer do
  let(:todo) { build_stubbed(:todo) }

  subject { described_class.new(todo) }

  it "returns the expected attributes" do
    expect(subject.attributes)
      .to include(:id, :index, :is_complete, :label, :created_at, :updated_at)
  end

  context "#is_complete" do
    specify { expect(subject.attributes[:is_complete]).to eq(todo.complete?) }
  end
end
