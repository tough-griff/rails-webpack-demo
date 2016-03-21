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

class Todo < ActiveRecord::Base
  validates :label, presence: true
  validates :index, presence: true, numericality: { greater_than: 0 }

  before_validation :increment_index, on: :create

  private

  # Auto-increment a new todo's `index`.
  def increment_index
    self.index = (Todo.maximum(:index) || 0) + 1
  end
end
