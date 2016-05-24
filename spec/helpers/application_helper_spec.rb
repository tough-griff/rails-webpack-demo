require "rails_helper"

RSpec.describe ApplicationHelper, type: :helper do
  describe "#meta_tags" do
    subject { meta_tags }

    it { is_expected.to match(%r{<meta charset="utf-8" />}) }
    it { is_expected.to match(%r{<meta name="viewport" content="width=device-width, initial-scale=1" />}) }
  end

  describe "#style_tag" do
    subject { style_tag("bundle") }

    context "in development or test mode" do
      it { is_expected.to match(%r{<script src=.*></script>}) }
    end

    context "in production mode" do
      before do
        allow(Rails).to receive_message_chain(:env, :production?).and_return(true)
      end

      it { is_expected.to match(%r{<link rel="stylesheet" media="all" href=.* />}) }
    end

    context "when simulating production" do
      before { allow(ENV).to receive(:[]).with("SIMULATE_PROD").and_return(true) }

      it { is_expected.to match(%r{<link rel="stylesheet" media="all" href=.* />}) }
    end
  end
end
