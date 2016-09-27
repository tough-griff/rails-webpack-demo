require "rails_helper"

RSpec.describe ApplicationHelper, type: :helper do
  describe "#meta_tags" do
    subject { meta_tags }

    it { is_expected.to match(%r{<meta charset="utf-8" />}) }
    it { is_expected.to match(%r{<meta name="viewport" content="width=device-width, initial-scale=1" />}) }
  end

  describe "#title" do
    subject { title }

    it { is_expected.to match(/\(Test\)/) }

    context "in production" do
      before do
        allow(Rails).to receive_message_chain(:env, :production?)
          .and_return(true)
      end

      it { is_expected.not_to match(/\(Test\)/) }
    end
  end
end
