require "rails_helper"

RSpec.describe TodoSerializer, type: :serialzer do
  let(:todo) { build_stubbed(:todo) }

  subject { described_class.new(todo) }

  it "returns the expected attributes" do
    expect(subject.attributes).to include(:id, :index, :isComplete, :label)
  end

  context "#isComplete" do
    specify { expect(subject.attributes[:isComplete]).to eq(todo.complete?) }
  end
end
