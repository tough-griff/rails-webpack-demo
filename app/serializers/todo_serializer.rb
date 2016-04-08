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

class TodoSerializer < ActiveModel::Serializer
  attributes :id, :index, :label, :created_at, :updated_at

  attribute(:is_complete) { object.complete? }
end
