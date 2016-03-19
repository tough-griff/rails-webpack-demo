require "rails_helper"

RSpec.describe ApplicationHelper, type: :helper do
  describe "#style_tag" do
    subject { style_tag("bundle") }

    context "development or test mode" do
      it { is_expected.to match(%r{<script src=.*></script>}) }
    end

    context "production mode" do
      before do
        allow(Rails).to receive_message_chain(:env, :production?) { true }
      end

      it { is_expected.to match(/<link rel="stylesheet" media="all" href=.*>/) }
    end

    context "simulating production" do
      before { allow(ENV).to receive(:[]).with("SIMULATE_PROD") { true } }

      it { is_expected.to match(/<link rel="stylesheet" media="all" href=.*>/) }
    end
  end
end
