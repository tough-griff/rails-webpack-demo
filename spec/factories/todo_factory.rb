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

FactoryGirl.define do
  factory :todo do
    sequence(:label) { |n| "Todo #{n}" }

    trait :invalid do
      label ""
    end
  end
end
