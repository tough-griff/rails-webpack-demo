require "rails_helper"

RSpec.describe ApplicationHelper, type: :helper do
  describe "#meta_tags" do
    subject { meta_tags }

    it { is_expected.to match(%r{<meta charset="utf-8" />}) }
    it { is_expected.to match(%r{<meta name="viewport" content="width=device-width, initial-scale=1" />}) }
  end
end
