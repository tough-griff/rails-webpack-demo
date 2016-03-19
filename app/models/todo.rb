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
  default_scope { order(index: :asc) }

  validates :label, presence: true
  validates :index, presence: true, uniqueness: true

  before_create :set_index

  private

  # Auto-increment the todo's `index` to last.
  def set_index
    self.index = (Todo.maximum(:index) || 0) + 1 unless index > 0
  end
end
