require "rails_helper"

RSpec.describe ApplicationHelper, type: :helper do
  describe "#include_webpack_assets" do
    subject { include_webpack_assets("shared", "app") }

    it { is_expected.to match(/shared\.bundle\.js/) }
    it { is_expected.to match(/app\.bundle\.js/) }

    context "when including CSS" do
      before do
        allow(Rails).to receive_message_chain(:env, :production?)
          .and_return(true)

        allow(Rails.application).to receive_message_chain(:assets_manifest, :assets, :keys)
          .and_return(["app.bundle.css"])
      end

      it { is_expected.to match(/shared\.bundle\.js/) }
      it { is_expected.to match(/app\.bundle\.js/) }
      it { is_expected.to match(/app\.bundle\.css/) }
    end
  end

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
