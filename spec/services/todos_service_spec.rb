require "rails_helper"

RSpec.describe TodosService, type: :service do
  describe "#move" do
    before do
      create(:todo, label: "One", index: 1)
      create(:todo, label: "Two", index: 2)
      create(:todo, label: "Three", index: 3)
    end

    context "moving up the list" do
      it "correctly changes the order of the todos" do
        expect { subject.move(2, 1) }
          .to change { Todo.order(:index).map(&:label) }
          .from(%w(One Two Three)).to(%w(Two One Three))
      end
    end

    context "moving down the list" do
      it "correctly changes the order of the todos" do
        expect { subject.move(1, 4) }
          .to change { Todo.order(:index).map(&:label) }
          .from(%w(One Two Three)).to(%w(Two Three One))
      end
    end
  end
end
